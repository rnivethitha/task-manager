const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// ✅ Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes (adjust if needed)
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

// Use routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// ✅ Make io accessible in controllers
app.set("io", io);

// ✅ Socket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User left:", socket.id);
  });
});

// ✅ PORT
const PORT = 5000;

// ✅ Start server
server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});