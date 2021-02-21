
import express, { Request, Response } from 'express';
import { NotFoundError,NotAuthorizedError,BadRequestError } from 'azz-sahafrica';
import { Product } from '../models/product';
//This route could take less code if i add get reviews by userName or something like that but it s a choice to minimize api routes.
const router = express.Router();

router.post('/api/products/:id/review/:reviewUserName', async (req: Request, res: Response) => {
 const product =await Product.findById(req.params.id);
 if(!product){
   throw new NotFoundError()
 }
 const review=product.reviews.find((review:{userName:string})=>review.userName===req.params.reviewUserName);
 if(!review){
  throw new NotFoundError()
}
const existingFeedBack=review.helpful.find((feedback:{owner:string})=>feedback.owner===req.currentUser!.name)
if(existingFeedBack){
  throw new BadRequestError('You already submitted a feedback',"feedback")
};
review.helpful.push({owner:req.currentUser!.name});
const updatedProduct=await product.save();
  res.send({message:"Thank you for your feedback",updatedProduct});
});

export { router as ProductFeedBackRouter };
