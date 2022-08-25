const isValid = async (saleInfo, ids) => {
  if (!saleInfo.every(({ productId }) => productId !== undefined)) {
    return { code: 400, result: { message: '"productId" is required' } };
  }

  if (!saleInfo.every(({ productId }) => ids.includes(productId))) {
    return { code: 404, result: { message: 'Product not found' } };
  }

  if (!saleInfo.every(({ quantity }) => quantity !== undefined)) {
    return { code: 400, result: { message: '"quantity" is required' } };
  }

  if (!saleInfo.every(({ quantity }) => quantity >= 1)) {
    return {
      code: 422,
      result: { message: '"quantity" must be greater than or equal to 1' },
    };
  }
};

module.exports = isValid;