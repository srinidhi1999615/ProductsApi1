const tape = require("tape");
const supertest = require("supertest");
const app = require("../index");
const mongoose = require("../config/mongoose");
const Product = require("../model/products");

const request = supertest(app);
let agent;
tape("beforeEach", async (t) => {
  try {
    // To Ensure that  the database connection is established before each test
    await mongoose;
    // TO Clear the products collection before each test
    await Product.deleteMany({});
    // Optional: If we need an agent for maintaining state between requests
    agent = supertest.agent(app);
    t.end();
  } catch (error) {
    console.error("Error in beforeEach:", error);
    t.fail("Error in beforeEach");
  }
});

tape("should add a product", async (t) => {
  const response = await agent.post("/products/create").send({
    name: "Test Mobile",
    quantity: 10,
    price: 20,
    description: "This is a test product",
  });

  t.equal(response.status, 201);
  t.ok(response.body.data.product._id);
  t.end();
});

tape("should list products", async (t) => {
  // Add a product to the database for testing
  const testProduct = new Product({
    name: "Test Laptop",
    quantity: 10,
    price: 20,
    description: "This is a test product",
  });
  await testProduct.save();

  const response = await agent.get("/products/");
  console.log("Response body:", response.body);
  t.equal(response.status, 200);
  t.ok(Array.isArray(response.body.data && response.body.data.products));
  t.end();
});

tape("should delete a product", async (t) => {
  // Add a product to the database for testing
  const testProduct = new Product({
    name: "Test power",
    quantity: 10,
    price: 20,
    description: "This is a test product",
  });
  await testProduct.save();

  const response = await agent.delete(`/products/${testProduct._id}`);

  t.equal(response.status, 200);
  t.equal(response.body.message, "Product deleted");
  t.end();
});
