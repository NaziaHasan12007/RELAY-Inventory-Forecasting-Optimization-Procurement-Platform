
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env.test"),
  override: true
});

const prisma = require("../src/config/db");

beforeAll(async () => {
  await prisma.$connect();
});

afterEach(async () => {
  await prisma.product.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
