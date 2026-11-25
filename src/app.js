
const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/product.routes");

const errorHandler = require("./middleware/error.middleware");
const notFound = require("./middleware/notFound.middleware");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RELAY API is running"
  });
});

app.use("/api/v1/products", productRoutes);

app.use(notFound);

app.use(errorHandler);

module.exports = app;
