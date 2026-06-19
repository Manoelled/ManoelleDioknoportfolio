import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Path to stats persistence file
const STATS_FILE_PATH = path.join(process.cwd(), "src/data/stats.json");

// Define Initial Default Counts (seeded values from the current portfolio)
const INITIAL_STATS: Record<string, { likes: number; views: number }> = {
  crumb: { likes: 210, views: 1245 },
  ramngo: { likes: 124, views: 1085 },
  nomad: { likes: 310, views: 1390 },
  stackhouse: { likes: 215, views: 1175 },
  creativeworks: { likes: 280, views: 1312 },
  designsentiments: { likes: 284, views: 3084 },
  cliptographic: { likes: 420, views: 1420 },
};

// Ensure data folder and file exist with initial counts
function loadStats(): Record<string, { likes: number; views: number }> {
  try {
    // Ensure parent directory exists
    const dir = path.dirname(STATS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(STATS_FILE_PATH)) {
      fs.writeFileSync(STATS_FILE_PATH, JSON.stringify(INITIAL_STATS, null, 2), "utf-8");
      return INITIAL_STATS;
    }

    const fileContent = fs.readFileSync(STATS_FILE_PATH, "utf-8");
    const data = JSON.parse(fileContent);
    
    // Merge any missing projects from INITIAL_STATS and validate types
    let updated = false;
    for (const key of Object.keys(INITIAL_STATS)) {
      if (!data[key] || typeof data[key].likes !== "number" || typeof data[key].views !== "number") {
        data[key] = { ...INITIAL_STATS[key] };
        updated = true;
      }
    }
    
    if (updated) {
      fs.writeFileSync(STATS_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    }

    return data;
  } catch (error) {
    console.error("Error loading or initializing stats file. Using memory cache:", error);
    return { ...INITIAL_STATS };
  }
}

// Save stats helper
function saveStats(data: Record<string, { likes: number; views: number }>) {
  try {
    fs.writeFileSync(STATS_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to persist stats to file system:", error);
  }
}

// InMemory reference
let statsDb = loadStats();

// API: Get overview of all project stats
app.get("/api/stats", (req, res) => {
  res.json(statsDb);
});

// API: Track unique or incremental views
app.post("/api/stats/:projectId/view", (req, res) => {
  const { projectId } = req.params;
  
  if (!statsDb[projectId]) {
    statsDb[projectId] = { likes: 100, views: 500 };
  }
  
  statsDb[projectId].views += 1;
  saveStats(statsDb);
  
  res.json({
    projectId,
    stats: statsDb[projectId]
  });
});

// API: Dynamic like increments and decrements based on current user toggle status
app.post("/api/stats/:projectId/like", (req, res) => {
  const { projectId } = req.params;
  const { action } = req.body; // 'like' or 'unlike'

  if (!statsDb[projectId]) {
    statsDb[projectId] = { likes: 100, views: 500 };
  }

  if (action === "like") {
    statsDb[projectId].likes += 1;
  } else if (action === "unlike") {
    // Prevent starting likes below 0 or below original baseline
    const minLikes = INITIAL_STATS[projectId] ? INITIAL_STATS[projectId].likes : 0;
    if (statsDb[projectId].likes > minLikes) {
      statsDb[projectId].likes -= 1;
    }
  }

  saveStats(statsDb);

  res.json({
    projectId,
    stats: statsDb[projectId]
  });
});

// Serve static assets in production or handle dev workflow via Vite middleware
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT-assisted mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION-assisted mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Live at http://localhost:${PORT}`);
  });
}

setupServer().catch((error) => {
  console.error("Critical: Failed to setup production and dev pipeline", error);
});
