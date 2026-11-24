
const express = require("express");

const router = express.Router();

const productController = require("../controllers/product.controller");
const asyncHandler = require("../middleware/asyncHandler");

router.post(
  "/",
  asyncHandler(productController.createProduct)
);

router.get(
  "/",
  asyncHandler(productController.getAllProducts)
);

router.get(
  "/:id",
  asyncHandler(productController.getProductById)
);

router.put(
  "/:id",
  asyncHandler(productController.updateProduct)
);

router.delete(
  "/:id",
  asyncHandler(productController.deleteProduct)
);

module.exports = router;
