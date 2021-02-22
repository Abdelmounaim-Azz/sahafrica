import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
  validateRequest
} from 'azz-sahafrica';
import { Product } from '../models/product';

const router = express.Router(); 

router.post('/api/products/:id/reviews',requireAuth, [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('text').not().isEmpty().withMessage('Description is required'),
  body('rating')
    .isFloat({ gt: 0 })
    .withMessage('Rating must be provided and must be greater than 0'),
], async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new NotFoundError();
  }

  if (product.userId === req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  if (product.reviews?.find((review: { userName: string; }) => review.userName ===req.currentUser!.name)){
    throw new BadRequestError("You already submitted a review","review")
  }
 
  const review = {
    userName: req.currentUser!.name,
    title:req.body.title,
    rating: Number(req.body.rating),
    text: req.body.text,
    helpful: []
  };
 
  product.reviews.push(review);
  product.set('numReviews',product.reviews.length);
  const avgRating=product.reviews.reduce((a: any, c: { rating: any; }) => c.rating + a, 0) /
  product.reviews.length || 0;
  product.set('rating',avgRating.toFixed(1));
  const updatedProduct = await product.save();
  
  res.status(201).send({
    message: 'Review Created',
    review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
  });
  
});

export { router as reviewProductRouter };
