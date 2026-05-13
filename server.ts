import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Cache for subscriber count to avoid hitting API limits
  let cachedSubCount: string | null = null;
  let lastUpdate = 0;
  const CACHE_DURATION = 1000 * 60 * 15; // 15 minutes

  // Serve static files from public directory
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/api/social-stats", async (req, res) => {
    try {
      const now = Date.now();
      const apiKey = process.env.YOUTUBE_API_KEY;
      
      const stats = {
        YouTube: "3,28 Milhões",
        Instagram: "427 Mil",
        TikTok: "489,9 Mil",
        Facebook: "2,4 Mil"
      };

      // 1. YouTube Real Fetch
      if (apiKey) {
        try {
          const handle = "FalaGlauberPodcast";
          const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=${handle}&key=${apiKey}`;
          const ytRes = await fetch(url);
          const ytData = await ytRes.json();
          if (ytData.items && ytData.items.length > 0) {
            const count = parseInt(ytData.items[0].statistics.subscriberCount);
            if (count >= 1000000) {
              stats.YouTube = (count / 1000000).toFixed(2).replace(".", ",") + " Milhões";
            } else if (count >= 1000) {
              stats.YouTube = (count / 1000).toFixed(1) + "K";
            } else {
              stats.YouTube = count.toString();
            }
          }
        } catch (e) {
          console.error("YouTube fetch error:", e);
        }
      }

      // Note: Instagram, TikTok and Facebook normally require official API tokens and complex setups.
      // For this implementation, we return the high-quality baseline values.
      // In a real production environment, you would use Instagram Graph API, TikTok for Developers, etc.

      res.json(stats);
    } catch (error) {
      console.error("Social stats error:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/youtube-subs", async (req, res) => {
    // Keep for backward compatibility if needed, but redirects to social-stats logic
    try {
      const apiKey = process.env.YOUTUBE_API_KEY;
      if (!apiKey) return res.json({ subscribers: "3,28 Milhões" });
      
      const handle = "FalaGlauberPodcast";
      const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=${handle}&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const count = parseInt(data.items[0].statistics.subscriberCount);
        let formatted = count.toString();
        if (count >= 1000000) formatted = (count / 1000000).toFixed(2).replace(".", ",") + " Milhões";
        else if (count >= 1000) formatted = (count / 1000).toFixed(1) + "K";
        return res.json({ subscribers: formatted });
      }
      res.json({ subscribers: "3,28 Milhões" });
    } catch (err) {
      res.json({ subscribers: "3,28 Milhões" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
