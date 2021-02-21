import express, { Request, Response } from 'express';
const fs = require("fs");

import { Product } from '../models/product';
import {
  requireAuth,
  isAdmin
} from 'azz-sahafrica';
import { ProductCreatedPublisher } from '../events/publishers/product-created-publisher';
import { natsWrapper } from '../nats-wrapper';
const router = express.Router();
router.post(
  '/api/products/default',requireAuth,isAdmin,
  async (req: Request, res: Response) => {
    const products = JSON.parse(
      fs.readFileSync(`${__dirname}/_data/products.json`, "utf-8")
    );

    (async () => {
      for (let i = 0; i < 6; i++) {
        const product = Product.build({
          name:products[i].name,
          image: products[i].image,
          price: products[i].price,
          category: products[i].category,
          brand: products[i].brand,
          countInStock: products[i].countInStock,
          rating: products[i].rating,
          numReviews: products[i].numReviews,
          description: products[i].description,
          userId: products[i].userId,
          reviews:products[i].reviews
        });
        await product.save();
        new ProductCreatedPublisher(natsWrapper.client).publish({
          id: product.id,
          name:product.name,
          price: product.price,
          image:product.image,
          description:product.description,
          userId: product.userId,
          version: product.version,
        });
      }
    })();

  

    res.status(201).send({ message: 'Products created.', products});
  }
);

export { router as createProductRouter };
