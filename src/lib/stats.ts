import { useState, useEffect } from "react";

export interface ProjectStats {
  likes: number;
  views: number;
  isLiked?: boolean;
}

// Global cached stats to share between different rendering contexts or pages
let globalStatsCache: Record<string, ProjectStats> | null = null;
const cacheListeners = new Set<() => void>();

function notifyListeners() {
  cacheListeners.forEach(listener => listener());
}

// Generate or retrieve a persistent session ID for the current tab/window session
function getSessionId(): string {
  try {
    let sessId = sessionStorage.getItem("portfolio_session_id");
    if (!sessId) {
      sessId = "sess_" + Math.random().toString(36).substring(2, 11);
      sessionStorage.setItem("portfolio_session_id", sessId);
    }
    return sessId;
  } catch {
    return "sess_default";
  }
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
    if (globalStatsCache && globalStatsCache[projectId] && typeof globalStatsCache[projectId].isLiked === "boolean") {
      return globalStatsCache[projectId].isLiked!;
    }
    try {
      const stored = sessionStorage.getItem(`liked_${projectId}`);
      return stored === "true";
    } catch {
      return false;
    }
  });

  // Track if we have already recorded a view during this specific session page visit
  useEffect(() => {
    let active = true;
    const sessId = getSessionId();

    // Load current global stats on mount
    const fetchCurrentStats = async () => {
      try {
        const res = await fetch("/api/stats", {
          headers: {
            "x-session-id": sessId
          }
        });
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
        if (typeof globalStatsCache[projectId].isLiked === "boolean") {
          setIsLiked(globalStatsCache[projectId].isLiked!);
        }
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
            method: "POST",
            headers: {
              "x-session-id": sessId
            }
          });
          if (res.ok && active) {
            const data = await res.json();
            if (data.stats) {
              if (!globalStatsCache) globalStatsCache = {};
              globalStatsCache[projectId] = {
                likes: data.stats.likes,
                views: data.stats.views,
                isLiked: data.stats.likedSessions?.includes(sessId) ?? false
              };
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
    const sessId = getSessionId();

    // Optimistic UI updates
    setIsLiked(nextLikedState);
    setLikes(prev => nextLikedState ? prev + 1 : Math.max(0, prev - 1));

    try {
      sessionStorage.setItem(`liked_${projectId}`, nextLikedState ? "true" : "false");

      const res = await fetch(`/api/stats/${projectId}/like`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-session-id": sessId
        },
        body: JSON.stringify({ action })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.stats) {
          if (!globalStatsCache) globalStatsCache = {};
          globalStatsCache[projectId] = {
            likes: data.stats.likes,
            views: data.stats.views,
            isLiked: data.stats.likedSessions?.includes(sessId) ?? nextLikedState
          };
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
