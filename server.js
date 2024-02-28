// server.js
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 8000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "src")));
// var router = express.Router();
// router.get("/", function (req, res) {
//   res.json({ message: "hooray! welcome to our api!" });
// });
// app.use("/api", router);
// Define routes
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other routes should serve the React app
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "src", "index.js"));
// });

// Mock data
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", message: "Hello1" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", message: "Hello2" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", message: "Hello3" },
];
app.get("/api/users", (req, res) => {
  res.json(users);
});
app.post("/api/register", (req, res) => {
  const { id, name, email, message } = req.body;

  console.log("Received user data:", { id, name, email, message });
  users.push({ id, name, email, message });

  // Respond with a success message
  res.json({ message: "User registered successfully here" });
});
app.delete("/api/delete/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex((user) => user.id === userId);
  if (index > -1) {
    users.splice(index, 1);
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});
app.put("/api/update/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const { name, email, message } = req.body;
  const index = users.findIndex((user) => user.id === userId);
  // Find the user by id in your user data array or database
  const user = [...users].find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update user data
  user.name = name;
  user.email = email;
  user.message = message;
  users[index] = user;
  // Respond with updated user data
  res.json({ message: "User data updated successfully", user });
});
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
