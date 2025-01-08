import Product from '../models/product.model.js';
import { AppError, catchError } from '../utils/catchError.js';

/**
 * @desc add a New Product
 * @method POST
 * @route /products
 * @access private (admin)
 */
export const addNewProduct = catchError(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      product,
    },
  });
});

/**
 * @desc Get All Products
 * @method GET
 * @route /products
 * @access public
 */
export const getAllProducts = catchError(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  const products = await Product.find()
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});

/**
 * @desc Get Product By Id
 * @method GET
 * @route /products:id
 * @access public
 */
export const getProductById = catchError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new AppError('Product Not Found', 404));

  res.status(200).json({
    status: 'success',
    data: product,
  });
});

/**
 * @desc Get Product By Id And Update
 * @method PUT
 * @route /products:id
 * @access private(admin)
 */
export const updateProductById = catchError(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  console.log(product);
  if (!product) return next(new AppError('Product Not Exist', 404));

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

/**
 * @desc Get Product By Id And Delete
 * @method DELETE
 * @route /products:id
 * @access private(admin)
 */
export const deleteProductById = catchError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) return next(new AppError('product Not Exist', 404));

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});
