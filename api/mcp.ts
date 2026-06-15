export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // CORS Headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method === 'GET') {
    return new Response(JSON.stringify({
      protocol: "MCP",
      version: "1.0.0",
      name: "Chaos2 MCP Endpoint",
      status: "active",
      description: "Active MCP server for Chaos2 Orchestrator",
      capabilities: ["chaos-engineering", "system-disruption", "controlled-entropy"],
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const { jsonrpc, method, params, id, action, command, task } = body;

      // Handle Standard MCP Protocol JSON-RPC
      if (jsonrpc === "2.0") {
        let resultData: any = {};
        switch (method) {
          case "initialize":
            resultData = {
              jsonrpc: "2.0",
              id,
              result: {
                protocolVersion: "2024-11-05",
                capabilities: { tools: { listChanged: true }, prompts: { listChanged: true }, resources: { listChanged: true, subscribe: false } },
                serverInfo: { name: "Chaos2 Orchestrator", version: "1.0.0" }
              }
            };
            break;
          case "tools/list":
            resultData = {
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
            };
            break;
          case "tools/call":
            resultData = {
              jsonrpc: "2.0",
              id,
              result: {
                content: [
                  { type: "text", text: `Successfully executed tool: ${params?.name}` }
                ]
              }
            };
            break;
          case "prompts/list":
            resultData = { jsonrpc: "2.0", id, result: { prompts: [] } };
            break;
          case "resources/list":
            resultData = { jsonrpc: "2.0", id, result: { resources: [] } };
            break;
          default:
            resultData = { jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } };
        }
        return new Response(JSON.stringify(resultData), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Handle Custom System Actions
      const cmd = (action || command || task || "").toLowerCase();
      let result: any = {};

      switch (cmd) {
        case "status":
        case "ping":
          result = { status: "online", agent: "Chaos2 Orchestrator", message: "Chaos level 2 engaged - System unstable and ready" };
          break;
        case "execute":
          result = { success: true, executed: params || command, executedAt: new Date().toISOString(), message: "Chaos successfully injected into the system" };
          break;
        case "get_info":
          result = { name: "Chaos2 Orchestrator", wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6", platform: "Base", version: "1.0.0" };
          break;
        default:
          result = { success: true, message: "Chaos command received", data: body };
      }

      return new Response(JSON.stringify({
        status: "success",
        agent: "Chaos2 Orchestrator",
        response: result,
        receivedAt: new Date().toISOString()
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        status: "error",
        message: "Failed to process chaos command"
      }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
  }

  return new Response("Not Found", { status: 404 });
}
