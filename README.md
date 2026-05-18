# Chaos2 Orchestrator

High-performance AI Agent specialized in warp racing mechanics, real-time automation, multi-track management, competitive optimization and ecosystem coordination on Base.

## Overview
Chaos2 platform utilizes second generation chaos mechanics, system disruption and controlled entropy orchestration. This project focuses on pushing the boundaries of AI agents running natively on Base matching the ERC-8004 standards.

## Tech Stack
- **Framework**: Next.js 14 API Routes (Serverless) / React / Express fallback
- **Ecosystem**: Web3 / Wagmi / Viem
- **AI Standard**: ERC-8004 compliant intelligent agent / MCP Supported

## MCP Connection Guide
The Model Context Protocol (MCP) server exposes endpoints that AI tools can discover and interact with.
- **Endpoint:** `https://chaos2.vercel.app/api/mcp`
- Follows standard JSON-RPC 2.0 specs for `tools/list`, `tools/call`, `prompts/list`, etc.
- **Exposed Tools**: `get_race_status`, `start_race`, `get_leaderboard`, `optimize_speed`, `get_track_info`

## Agent Registration Info
- **Agent Type:** ERC-8004 Registration v1
- **Supported Chains:** EIP155:8453 (Base)
- **Registries:** Support for EIP-8004 registries via standard on-chain interaction. Connect your wallet to record and register agent operations to the chain.
- The A2A Discovery card is located at `/.well-known/agent-card.json`.

## Capabilities
- Warp Racing
- Real-time Automation
- Multi-track Management
- Speed Optimization
- Competitive Orchestration
- Ecosystem Coordination

## How to Run Locally
1. Clone the repository.
2. `npm install`
3. `npm run dev` for local development.
