import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  NotFoundError,
  requireAuth,
  validateRequest,
  isAdmin,
  NotAuthorizedError,
  BadRequestError
} from 'azz-sahafrica';
import { Product } from '../models/product';
import { ProductUpdatedPublisher } from '../events/publishers/product-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/products/:id',
  requireAuth,
  isAdmin,
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('category').not().isEmpty().withMessage('Category is required'),
    body('brand').not().isEmpty().withMessage('Brand is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be provided and must be greater than 0'),
    body('countInStock')
      .isFloat({ gt: 0 })
      .withMessage('countInStock must be provided and must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new NotFoundError();
    }

    if (product.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (product.orderId) {
      throw new BadRequestError('product is reserved,cannot be edited.','reserved');
    }

    product.set({
      name: req.body.name,
      price: req.body.price,
      category:req.body.category,
      brand:req.body.brand,
      countInStock:req.body.countInStock,
      description:req.body.description,
    });
    await product.save();
    new ProductUpdatedPublisher(natsWrapper.client).publish({
      id: product.id,
      name:product.name,
      price: product.price, 
      userId: product.userId,
      version: product.version,
      orderId:product.orderId,
      description:product.description,
      image:product.image,
    });

    res.send({ message: 'Product Updated', product});
  }
);

export { router as updateProductRouter };
