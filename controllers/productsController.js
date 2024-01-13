// Controller Functions (productsController.js)
const Product = require("../model/products");

// API to add products to the database
const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    const product = new Product(productData);
    await product.save();
    res.status(201).json({ data: { product } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// API to list products
const listProducts = async (req, res) => {
  try {
    const products = await Product.find(
      {},
      "id name quantity price description"
    );
    if (!products) {
      res.status(200).json({ message: "Products list is empty" });
    }
    res.status(200).json({ data: { products } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// API to delete products
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id.trim(); // Trim the ID
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// API to update quantity of a product
const updateQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { number } = req.query;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    product.quantity += parseInt(number);
    await product.save();
    res
      .status(200)
      .json({ data: { product, message: "Updated successfully" } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//API to search products
const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res
        .status(400)
        .json({ error: 'Query parameter "q" is required.' });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { "variants.name": { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({ data: { products } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addProduct,
  listProducts,
  deleteProduct,
  updateQuantity,
  searchProducts,
};
