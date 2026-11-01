# ChessMat

ChessMat is a full-stack online multiplayer chess platform for the web, iOS, and Android.

## Stack
- Web: Next.js
- Mobile: Expo + React Native
- Backend: Node.js + Express + Socket.IO
- Shared logic: workspace package
- Database: PostgreSQL + Prisma
- Real-time multiplayer: Socket.IO
- Chess rules: chess.js (can be added next)

## Workspace structure
- apps/web
- apps/mobile
- apps/backend
- packages/shared
- prisma

## Quick start

```bash
npm install
npm run dev
```

This starts:
- Web app at http://localhost:3000
- Backend at http://localhost:4000
- Mobile app via Expo at the mobile dev server

## Notes
This scaffold is ready for extension into a full online chess game with rooms, matchmaking, turn validation, and multiplayer sync.
