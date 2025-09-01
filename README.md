# Feed Content – Real-Time Social Feed

A **real-time social feed platform** built with **Next.js** (frontend) and **GraphQL Yoga** (backend) that supports **adding posts, liking posts, infinite scroll, and live updates** using GraphQL subscriptions.

**Live Demo:** [https://feed-content.vercel.app](https://feed-content.vercel.app)
**Backend API:** [https://feed-content.onrender.com/api/graphql](https://feed-content.onrender.com/api/graphql)

---

! becasue of render.com the initila fetch will take time becasue of inactivity

## DEMO

| Screenshot 1 | Screenshot 2 | Screenshot 3 |
|--------------|--------------|--------------|
| <img width="300" src="https://github.com/user-attachments/assets/baf2200c-b273-4a79-8bfa-97999473d5d1" /> | <img width="300" src="https://github.com/user-attachments/assets/9dabe086-866e-451a-a626-03baeef0fcf1" /> | <img width="300" src="https://github.com/user-attachments/assets/e3a80f34-42f0-4f75-bc98-0b1a7514575d" /> |


## **Features**

- **Real-time updates**: Posts and likes update instantly across clients using GraphQL subscriptions.
- **Infinite scroll**: Loads posts in pages as the user scrolls down.
- **Optimistic UI**: Likes update immediately for better user experience.
- **Buffered new posts banner**: Shows new posts when user is not at top (Twitter-style).
- **Modular architecture**: Clear separation of components, GraphQL queries, and state management.

---

## **Tech Stack**

**Frontend:**

- Next.js (React framework)
- Apollo Client (GraphQL queries, mutations, subscriptions)
- Zustand (lightweight state management)
- TypeScript (type safety)
- TailwindCSS (UI styling)

**Backend:**

- Node.js
- GraphQL Yoga
- WebSocket (via `graphql-ws`) for subscriptions
- In-memory storage (can be replaced with a database)
- TypeScript

---

## **Project Structure**

```
frontend/
├─ app/
├─ components/      # React components (organisms, molecules, atoms)
├─ graphql/         # Queries, mutations, subscriptions
├─ lib/
├─ store/
└─ ...
backend/
├─ lib/
│  ├─ schema.ts     # GraphQL typeDefs and resolvers
├─ index.ts
└─ ...
```

---

## **Setup Instructions**

### **Backend (GraphQL Server)**

1. Clone the repo and navigate to backend:

```bash
cd feec-content/backend
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the server:

```bash
pnpm start
```

> The server will run at `http://localhost:4000/api/graphql`. Subscriptions are available at `ws://localhost:4000/api/graphql`.

### **Frontend (Next.js)**

1. Navigate to frontend:

```bash
cd feec-content/frontend
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file and add GraphQL endpoints:

```env
NEXT_PUBLIC_GRAPHQL_HTTP=https://feed-content.onrender.com/api/graphql
NEXT_PUBLIC_GRAPHQL_WS=wss://feed-content.onrender.com/api/graphql
```

4. Run development server:

```bash
pnpm dev
```

> The frontend will run at `http://localhost:3000`.

---

## **Usage**

- Add a new post using the form (frontend header or modal if implemented).
- Like a post using the ❤️ button. Likes update immediately using **optimistic UI**.
- Scroll down to automatically fetch more posts with **infinite scroll**.
- When new posts arrive while you are not at the top, a banner appears to show buffered posts.

---

## **Contact**

Created by **Ullas Kunder**
Portfolio: [https://ullaskunder.tech](https://ullaskunder.tech)
