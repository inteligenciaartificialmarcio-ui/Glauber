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

  app.get("/api/youtube-subs", async (req, res) => {
    try {
      const now = Date.now();
      if (cachedSubCount && now - lastUpdate < CACHE_DURATION) {
        return res.json({ subscribers: cachedSubCount });
      }

      const apiKey = process.env.YOUTUBE_API_KEY;
      if (!apiKey) {
        console.warn("YOUTUBE_API_KEY NOT FOUND - Use .env to set it");
        return res.status(200).json({ subscribers: "3,28 Milhões", warning: "API key missing" });
      }

      // Handle for @FalaGlauberPodcast
      const handle = "FalaGlauberPodcast";
      const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=${handle}&key=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const count = parseInt(data.items[0].statistics.subscriberCount);
        
        // Format the count (e.g., 40.5K)
        let formatted = count.toString();
        if (count >= 1000000) {
          formatted = (count / 1000000).toFixed(2).replace(".", ",") + " Milhões";
        } else if (count >= 1000) {
          formatted = (count / 1000).toFixed(1) + "K";
        }
        
        cachedSubCount = formatted;
        lastUpdate = now;
        return res.json({ subscribers: formatted });
      }

      res.json({ subscribers: "3,28 Milhões", error: "Channel not found" });
    } catch (error) {
      console.error("Error fetching YouTube subs:", error);
      res.status(500).json({ subscribers: "3,28 Milhões", error: "Internal server error" });
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
