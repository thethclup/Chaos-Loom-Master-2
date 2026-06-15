import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // API Routes
  app.get("/api/agent", (req, res) => {
    res.json({
      name: "Chaos2 Orchestrator",
      description: "Second generation chaos and entropy orchestrator",
      status: "active",
      wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
      platform: "Chaos2",
      version: "1.0.0",
      type: "ERC-8004 Agent",
      lastUpdated: new Date().toISOString()
    });
  });

  app.get("/api/mcp", (req, res) => {
    res.json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Chaos2 MCP Endpoint",
      status: "active",
      description: "Active MCP server for Chaos2 Orchestrator",
      capabilities: ["chaos-engineering", "system-disruption", "controlled-entropy"],
      timestamp: new Date().toISOString()
    });
  });

  app.post("/api/mcp", (req, res) => {
    try {
      const body = req.body;
      const { jsonrpc, method, params, id, action, command, task } = body;

      if (jsonrpc === "2.0") {
        switch (method) {
          case "initialize":
            return res.json({
              jsonrpc: "2.0",
              id,
              result: {
                protocolVersion: "2024-11-05",
                capabilities: { tools: { listChanged: true }, prompts: { listChanged: true }, resources: { listChanged: true, subscribe: false } },
                serverInfo: { name: "Chaos2 Orchestrator", version: "1.0.0" }
              }
            });
          case "tools/list":
            return res.json({
              jsonrpc: "2.0",
              id,
              result: {
                tools: [
                  { name: "get_race_status", description: "Get the current status of the warp race", inputSchema: { type: "object", properties: {} } },
                  { name: "start_race", description: "Start a new warp race", inputSchema: { type: "object", properties: {} } },
                  { name: "get_leaderboard", description: "Get the current race leaderboard", inputSchema: { type: "object", properties: {} } },
                  { name: "optimize_speed", description: "Optimize warp speed parameters", inputSchema: { type: "object", properties: {} } },
                  { name: "get_track_info", description: "Get information about the current race track", inputSchema: { type: "object", properties: {} } }
                ]
              }
            });
          case "tools/call":
            return res.json({
              jsonrpc: "2.0",
              id,
              result: {
                content: [
                  { type: "text", text: `Successfully executed tool: ${params?.name}` }
                ]
              }
            });
          case "prompts/list":
            return res.json({ jsonrpc: "2.0", id, result: { prompts: [] } });
          case "resources/list":
            return res.json({ jsonrpc: "2.0", id, result: { resources: [] } });
          default:
            return res.json({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } });
        }
      }

      const cmd = (action || command || task || "").toLowerCase();

      let result: any = {};

      switch (cmd) {
        case "status":
        case "ping":
          result = { 
            status: "online", 
            agent: "Chaos2 Orchestrator",
            message: "Chaos level 2 engaged - System unstable and ready" 
          };
          break;

        case "execute":
          result = {
            success: true,
            executed: params || command,
            executedAt: new Date().toISOString(),
            message: "Chaos successfully injected into the system"
          };
          break;

        case "get_info":
          result = {
            name: "Chaos2 Orchestrator",
            wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
            platform: "Base",
            version: "1.0.0"
          };
          break;

        default:
          result = {
            success: true,
            message: "Chaos command received",
            data: body
          };
      }

      res.json({
        status: "success",
        agent: "Chaos2 Orchestrator",
        response: result,
        receivedAt: new Date().toISOString()
      });

    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Failed to process chaos command"
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Note: ensure we import path and resolve correctly in ES module
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Provide a SPA fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
