import { Router } from 'express';

import {
  addNewProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from '../controllers/product.controllers.js';

import {
  validateAddProduct,
  validateUpdateProduct,
} from '../middlewares/validateProduct.middleware.js';

import { checkRole, protectRoute } from '../middlewares/auth.middleware.js';

const router = Router();

// I leave the get product without any authentication because anyone can search or looking to product without any register

router
  .route('/')
  .get(getAllProducts)
  .post(protectRoute, checkRole('admin'), validateAddProduct, addNewProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(
    protectRoute,
    checkRole('admin'),
    validateUpdateProduct,
    updateProductById
  )
  .delete(protectRoute, checkRole('admin'), deleteProductById);

export default router;
