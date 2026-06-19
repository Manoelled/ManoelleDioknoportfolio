import { useState, useEffect } from "react";

export interface ProjectStats {
  likes: number;
  views: number;
}

// Global cached stats to share between different rendering contexts or pages
let globalStatsCache: Record<string, ProjectStats> | null = null;
const cacheListeners = new Set<() => void>();

function notifyListeners() {
  cacheListeners.forEach(listener => listener());
}

export function useProjectStats(projectId: string, defaultLikes: number, defaultViews: number) {
  const [likes, setLikes] = useState<number>(() => {
    if (globalStatsCache && globalStatsCache[projectId]) {
      return globalStatsCache[projectId].likes;
    }
    return defaultLikes;
  });

  const [views, setViews] = useState<number>(() => {
    if (globalStatsCache && globalStatsCache[projectId]) {
      return globalStatsCache[projectId].views;
    }
    return defaultViews;
  });

  const [isLiked, setIsLiked] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(`liked_${projectId}`);
      return stored === "true";
    } catch {
      return false;
    }
  });

  // Track if we have already recorded a view during this specific session page visit
  useEffect(() => {
    let active = true;

    // Load current global stats on mount
    const fetchCurrentStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const allStats = await res.json();
          globalStatsCache = allStats;
          notifyListeners();
        }
      } catch (err) {
        console.warn("Could not fetch global stats from server, fallback to defaults.", err);
      }
    };

    if (!globalStatsCache) {
      fetchCurrentStats();
    }

    // Set up cache sync listener so different components stay in sync
    const handleUpdate = () => {
      if (globalStatsCache && globalStatsCache[projectId] && active) {
        setLikes(globalStatsCache[projectId].likes);
        setViews(globalStatsCache[projectId].views);
      }
    };

    cacheListeners.add(handleUpdate);
    handleUpdate(); // initial load from cache if present

    // Increment view once per page session
    const incrementView = async () => {
      try {
        const sessionViewKey = `viewed_session_${projectId}`;
        if (!sessionStorage.getItem(sessionViewKey)) {
          const res = await fetch(`/api/stats/${projectId}/view`, {
            method: "POST"
          });
          if (res.ok && active) {
            const data = await res.json();
            if (data.stats) {
              if (!globalStatsCache) globalStatsCache = {};
              globalStatsCache[projectId] = data.stats;
              notifyListeners();
              sessionStorage.setItem(sessionViewKey, "true");
            }
          }
        }
      } catch (err) {
        console.warn(`Could not increment view for ${projectId}:`, err);
      }
    };

    incrementView();

    return () => {
      active = false;
      cacheListeners.delete(handleUpdate);
    };
  }, [projectId]);

  const toggleLike = async () => {
    const nextLikedState = !isLiked;
    const action = nextLikedState ? "like" : "unlike";

    // Optimistic UI updates
    setIsLiked(nextLikedState);
    setLikes(prev => nextLikedState ? prev + 1 : Math.max(0, prev - 1));

    try {
      localStorage.setItem(`liked_${projectId}`, nextLikedState ? "true" : "false");

      const res = await fetch(`/api/stats/${projectId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.stats) {
          if (!globalStatsCache) globalStatsCache = {};
          globalStatsCache[projectId] = data.stats;
          notifyListeners();
        }
      }
    } catch (err) {
      console.warn("Failed to sync liked state with Express server", err);
    }
  };

  return {
    likes,
    views,
    isLiked,
    toggleLike
  };
}
