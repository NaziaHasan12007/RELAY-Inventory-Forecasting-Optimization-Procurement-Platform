
const productRepository = require("../repositories/product.repository");

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

const createProduct = async (data) => {
  const existingProduct = await productRepository.findBySku(data.sku);

  if (existingProduct) {
    throw new AppError("A product with this SKU already exists", 409);
  }

  return productRepository.create(data);
};

const getAllProducts = async () => {
  return productRepository.findAll();
};

const getProductById = async (id) => {
  const product = await productRepository.findById(id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
};

const updateProduct = async (id, data) => {
  const existingProduct = await getProductById(id);

  if (data.sku && data.sku !== existingProduct.sku) {
    const duplicate = await productRepository.findBySku(data.sku);

    if (duplicate) {
      throw new AppError("A product with this SKU already exists", 409);
    }
  }

  return productRepository.update(id, data);
};

const deleteProduct = async (id) => {
  await getProductById(id);

  await productRepository.remove(id);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
