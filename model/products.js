const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  SKU: {
    type: String,
    required: true,
  },
  additionalCost: {
    type: Number,
    default: 0,
  },
  stockCount: {
    type: Number,
    default: 0,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    variants: [variantSchema],
  },
  {
    timestamps: true,
  }
);
productSchema.index({
  name: "text",
  description: "text",
  "variants.name": "text",
}); // Index for search optimization
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
