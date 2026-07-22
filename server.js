const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const connectDB = require("./DB/connect");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

//initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "app run successfully" });
});

app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

const startServer = async () => {
  const connected = await connectDB();
  if (!connected) {
    console.error("MongoDB is not connecting, error");
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server run on port ${PORT} using MongoDB`);
  });
};

startServer();
