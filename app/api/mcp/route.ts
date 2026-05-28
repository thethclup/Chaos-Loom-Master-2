import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    protocol: "MCP",
    version: "1.0.0",
    name: "Chaos2 MCP Endpoint",
    status: "active",
    description: "Active MCP server for Chaos2 Orchestrator",
    capabilities: ["chaos-engineering", "system-disruption", "controlled-entropy"],
    timestamp: new Date().toISOString()
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    }
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jsonrpc, method, params, id, action, command, task } = body;

    // Handle Standard MCP Protocol JSON-RPC
    if (jsonrpc === "2.0") {
      switch (method) {
        case "initialize":
          return NextResponse.json({
            jsonrpc: "2.0",
            id,
            result: {
              protocolVersion: "2024-11-05",
              capabilities: { tools: { listChanged: true }, prompts: { listChanged: true }, resources: { listChanged: true, subscribe: false } },
              serverInfo: { name: "Chaos2 Orchestrator", version: "1.0.0" }
            }
          }, { headers: { 'Access-Control-Allow-Origin': '*' } });
        case "tools/list":
          return NextResponse.json({
            jsonrpc: "2.0",
            id,
            result: {
              tools: [
                {
                  name: "get_race_status",
                  description: "Get the current status of the warp race",
                  inputSchema: { type: "object", properties: {}, required: [] }
                },
                {
                  name: "start_race",
                  description: "Start a new warp race",
                  inputSchema: { type: "object", properties: {}, required: [] }
                },
                {
                  name: "get_leaderboard",
                  description: "Get the current race leaderboard",
                  inputSchema: { type: "object", properties: {}, required: [] }
                },
                {
                  name: "optimize_speed",
                  description: "Optimize warp speed parameters",
                  inputSchema: { type: "object", properties: {}, required: [] }
                },
                {
                  name: "get_track_info",
                  description: "Get information about the current race track",
                  inputSchema: { type: "object", properties: {}, required: [] }
                }
              ]
            }
          }, { headers: { 'Access-Control-Allow-Origin': '*' } });
        case "tools/call":
          return NextResponse.json({
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                { type: "text", text: `Successfully executed tool: ${params?.name}` }
              ]
            }
          }, { headers: { 'Access-Control-Allow-Origin': '*' } });
        case "prompts/list":
          return NextResponse.json({ jsonrpc: "2.0", id, result: { prompts: [] } }, { headers: { 'Access-Control-Allow-Origin': '*' } });
        case "resources/list":
          return NextResponse.json({ jsonrpc: "2.0", id, result: { resources: [] } }, { headers: { 'Access-Control-Allow-Origin': '*' } });
        default:
          return NextResponse.json({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } }, { headers: { 'Access-Control-Allow-Origin': '*' } });
      }
    }

    // Handle Custom System Actions
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

    return NextResponse.json({
      status: "success",
      agent: "Chaos2 Orchestrator",
      response: result,
      receivedAt: new Date().toISOString()
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });

  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Failed to process chaos command"
    }, { status: 400 });
  }
}
