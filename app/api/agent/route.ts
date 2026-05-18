import { NextResponse } from 'next/server';

/**
 * Chaos2 Orchestrator - Agent Info Endpoint
 * 
 * Bu endpoint, agent'in temel kimlik ve durum bilgilerini sağlar.
 * ERC-8004 uyumlu keşif, A2A ve platform entegrasyonları için kullanılır.
 */

export async function GET() {
  return NextResponse.json({
    name: "Chaos2 Orchestrator",
    description: "Second generation chaos and entropy orchestrator",
    status: "active",
    wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
    platform: "Chaos2",
    version: "1.0.0",
    type: "ERC-8004 Agent",
    lastUpdated: new Date().toISOString()
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    }
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
