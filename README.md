# Airdrop Journal Frontend

A simple React + TypeScript interface for browsing and tracking crypto airdrops alongside the Airdrop Journal backend.

## Features

- Browse airdrops (upcoming / active / completed)
- View detailed airdrop info (rewards, links, requirements)
- Personal dashboard with quick stats & today’s tasks
- Add and manage your own tracked airdrops
- Basic news / updates section

## Prerequisites

- Node.js 16+
- Backend running (see backend repo) on `http://localhost:3001` or adjust the env value.

## Installation

```bash
git clone https://github.com/nadunhasalanka/Airdrop_Journal_Frontend.git
cd Airdrop_Journal_Frontend
npm install
```

## Environment

Create a `.env` file (adjust if your backend differs):

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

## Run (dev)

```bash
npm run dev
```

Open: `http://localhost:8081`

## Build

```bash
npm run build
npm run preview   # (optional) serve the build locally
```

## Backend

Backend repository: [Airdrop_Journal_Backend](https://github.com/nadunhasalanka/Airdrop_Journal_Backend)