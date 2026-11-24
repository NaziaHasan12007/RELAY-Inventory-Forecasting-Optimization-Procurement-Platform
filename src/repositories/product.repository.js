
const prisma = require("../config/db");

const create = (data) => {
  return prisma.product.create({
    data
  });
};

const findAll = () => {
  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};

const findById = (id) => {
  return prisma.product.findUnique({
    where: { id }
  });
};

const findBySku = (sku) => {
  return prisma.product.findUnique({
    where: { sku }
  });
};

const update = (id, data) => {
  return prisma.product.update({
    where: { id },
    data
  });
};

const remove = (id) => {
  return prisma.product.delete({
    where: { id }
  });
};

module.exports = {
  create,
  findAll,
  findById,
  findBySku,
  update,
  remove
};
