
require("dotenv").config();

const app = require("./app");
const prisma = require("./config/database");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await prisma.$connect();

    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`RELAY API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();
