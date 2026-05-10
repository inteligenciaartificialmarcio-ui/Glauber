import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

async function startServer() {
  const PORT = 3000;

  // Cache for subscriber count to avoid hitting API limits
  let cachedSubCount: string | null = null;
  let lastUpdate = 0;
  const CACHE_DURATION = 1000 * 60 * 15; // 15 minutes

  // Serve static files from public directory
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/api/social-stats", async (req, res) => {
    // ... (rest of the social-stats logic remains same)
  });

  // ... (rest of the routes)

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

  // Only listen if not running in a serverless environment (like Vercel)
  if (process.env.VERCEL === undefined) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer();

export default app;

