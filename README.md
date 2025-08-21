# 📝 Mini Task Manager

A simple task management app with separate **frontend** (Next.js/React) and **backend** (Node.js/Express).  
The app can be run locally with just two commands (one per service).

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/mini-task-manager.git
cd mini-task-manager
```

### 2. Run the Backend 🚀
> Run these commands inside the `frontend` folder:

```bash
cd frontend
npm install
npm run dev
```

### 3. Run the Frontend 🚀
> Run these commands inside the `frontend` folder:

```bash
cd backend
npm install
npm run dev
```

# Tech stack used and reasons for choice.
### Frontend 🚀
For frontend I used the React with Typescript as it is client based applicaiton. React was a natural choice due to its component-based architecture and ease of managing state and routing I also have prior experience with React + TypeScript, which made development faster.

### Backendtend 🚀
or the backend, I chose Express.js with TypeScript easy to use and also It’s easy to set up and has a large ecosystem of npm packages, which speeds up development. TypeScript ensures type safety on the server side as well. Since I already have hands-on experience with Express.js, it was a practical and efficient choice.

### Database 🚀
For the database, I used MongoDB. I have worked with MongoDB in multiple projects, so I’m comfortable with it. It also provides MongoDB Atlas, which makes deployment very simple. On top of that, I used Mongoose (an ODM) for schema modeling and validation, which integrates seamlessly with MongoDB. Given my experience and the flexibility MongoDB offers, it was the best fit for this project.

# Time spent and any trade-offs made.

I have probably spent 6-7 hours considering everything and for tradeoffs i will say simple UI and basic error handling


# sample .env.example files.
### backend 

```bash
APP_PORT=8080
APP_PREFIX_PATH=/api
DB_URI=mongodb+srv://tejasvaidya59:3o95yGwzNZ37Cegs@cluster0.54rawh3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
DB_NAME=mini_task_manager_db
JWT_SECRET=797e8f771ae08a7e9bda313b5ca7132d
```


### frontend 
```bash 
VITE_API_URL=http://localhost:8080/api
```

you can change the port as you need I have also pushed the .env files




