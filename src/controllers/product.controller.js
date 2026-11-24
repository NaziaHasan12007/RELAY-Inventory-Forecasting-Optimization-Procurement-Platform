
const productService = require("../services/product.service");

const {
  createProductSchema,
  updateProductSchema
} = require("../validators/product.validator");

const createProduct = async (req, res) => {
  const validation = createProductSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message
      }))
    });
  }

  const product = await productService.createProduct(validation.data);

  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product
  });
};

const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();

  return res.status(200).json({
    success: true,
    message: "Products retrieved successfully",
    count: products.length,
    data: products
  });
};

const getProductById = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID"
    });
  }

  const product = await productService.getProductById(id);

  return res.status(200).json({
    success: true,
    message: "Product retrieved successfully",
    data: product
  });
};

const updateProduct = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID"
    });
  }

  const validation = updateProductSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message
      }))
    });
  }

  const product = await productService.updateProduct(
    id,
    validation.data
  );

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product
  });
};

const deleteProduct = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID"
    });
  }

  await productService.deleteProduct(id);

  return res.status(204).send();
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
