
const request = require("supertest");
const app = require("../src/app");

describe("RELAY Product API Integration Tests", () => {
  let productId;

  const validProduct = {
    sku: "RELAY-001",
    m5ItemId: "FOODS_1_001",
    name: "Rice",
    category: "Food",
    sellingPrice: 80,
    unitCost: 60,
    description: "Premium quality rice"
  };

  test("POST /api/v1/products - Create product", async () => {
    const response = await request(app)
      .post("/api/v1/products")
      .send(validProduct);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.sku).toBe(validProduct.sku);

    productId = response.body.data.id;
  });

  test("GET /api/v1/products - Retrieve all products", async () => {
    const response = await request(app)
      .get("/api/v1/products");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test("GET /api/v1/products/:id - Retrieve product by ID", async () => {
    const response = await request(app)
      .post("/api/v1/products")
      .send(validProduct);

    const id = response.body.data.id;

    const getResponse = await request(app)
      .get(`/api/v1/products/${id}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.data.id).toBe(id);
  });

  test("PUT /api/v1/products/:id - Update product", async () => {
    const created = await request(app)
      .post("/api/v1/products")
      .send(validProduct);

    const id = created.body.data.id;

    const response = await request(app)
      .put(`/api/v1/products/${id}`)
      .send({
        sellingPrice: 100
      });

    expect(response.status).toBe(200);
    expect(Number(response.body.data.sellingPrice)).toBe(100);
  });

  test("DELETE /api/v1/products/:id - Delete product", async () => {
    const created = await request(app)
      .post("/api/v1/products")
      .send(validProduct);

    const id = created.body.data.id;

    const response = await request(app)
      .delete(`/api/v1/products/${id}`);

    expect(response.status).toBe(204);
  });

  test("Return 404 for a nonexistent product", async () => {
    const response = await request(app)
      .get("/api/v1/products/999999");

    expect(response.status).toBe(404);
  });

  test("Reject duplicate SKU", async () => {
    await request(app)
      .post("/api/v1/products")
      .send(validProduct);

    const response = await request(app)
      .post("/api/v1/products")
      .send(validProduct);

    expect(response.status).toBe(409);
  });

  test("Reject invalid product data", async () => {
    const response = await request(app)
      .post("/api/v1/products")
      .send({
        sku: "A",
        name: "",
        category: "Food",
        sellingPrice: -10,
        unitCost: 20
      });

    expect(response.status).toBe(422);
  });

  test("Reject an empty update request", async () => {
    const created = await request(app)
      .post("/api/v1/products")
      .send(validProduct);

    const response = await request(app)
      .put(`/api/v1/products/${created.body.data.id}`)
      .send({});

    expect(response.status).toBe(422);
  });

  test("Reject an invalid product ID", async () => {
    const response = await request(app)
      .get("/api/v1/products/abc");

    expect(response.status).toBe(400);
  });
});
