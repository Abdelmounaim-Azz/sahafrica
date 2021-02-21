import express, { Request, Response } from 'express';
import { Product } from '../models/product';
import {
  NotFoundError,
  requireAuth,
  isAdmin,
  NotAuthorizedError,
  BadRequestError
} from 'azz-sahafrica';
import { ProductDeletedPublisher } from '../events/publishers/product-deleted-publisher';
import { natsWrapper } from '../nats-wrapper';
const router = express.Router();

router.delete('/api/products/:id',
requireAuth,
isAdmin, async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new NotFoundError();
  }

  if (product.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  if (product.orderId) {
    throw new BadRequestError('product is reserved,cannot be deleted.','reserved');
  }

 
    const deletedProduct = await product.remove();
    new ProductDeletedPublisher(natsWrapper.client).publish({
      id: product.id,
      userId: product.userId,
      version: product.version,
    });
    res.send({ message: 'Product Deleted', product: deletedProduct });
  
});

export { router as deleteProductRouter };