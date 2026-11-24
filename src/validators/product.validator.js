
const { z } = require("zod");

const createProductSchema = z.object({
  sku: z.string().trim().min(2, "SKU must contain at least 2 characters"),

  m5ItemId: z.string().trim().min(1).optional(),

  name: z.string().trim().min(2, "Product name must contain at least 2 characters"),

  category: z.string().trim().min(2, "Category is required"),

  sellingPrice: z.coerce.number().positive(
    "Selling price must be greater than zero"
  ),

  unitCost: z.coerce.number().positive(
    "Unit cost must be greater than zero"
  ),

  description: z.string().trim().optional()
}).strict();

const updateProductSchema = z.object({
  sku: z.string().trim().min(2).optional(),

  m5ItemId: z.string().trim().min(1).nullable().optional(),

  name: z.string().trim().min(2).optional(),

  category: z.string().trim().min(2).optional(),

  sellingPrice: z.coerce.number().positive().optional(),

  unitCost: z.coerce.number().positive().optional(),

  description: z.string().trim().nullable().optional()
}).strict().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided for update"
  }
);

module.exports = {
  createProductSchema,
  updateProductSchema
};
