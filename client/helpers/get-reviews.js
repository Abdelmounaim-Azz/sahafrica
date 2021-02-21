import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { ReviewStarsSimple } from "./use-star-simple";
import { reformattedErr } from "./use-errors";

import { FormattedDate } from "./use-date-format";

import { ShiftBy } from "./ShiftBy";
export function Reviews({ product }) {
  //For some reason mapping through reviews does not diplay anything,maybe i should have make a get reviews by userName route but decided to minimize api routes so this is a workaround..
  let reviews = [];
  for (let i = 0; i < product.numReviews; i++) {
    const onInputClick = async () => {
      try {
        await axios.post(
          `/api/products/${product.id}/review/${product.reviews[i].userName}`
        );
        alert("your feedback has been submitted,Thank you.");
      } catch (error) {
        const errReviewHelpful = reformattedErr(
          error.response.data.errors,
          "feedback"
        )?.feedback;
        alert(`${errReviewHelpful}`);
      }
    };
    reviews.push(
      <div key={product.reviews[i].userName} id="reviews">
        <div className="d-flex align-items-end">
          <Image
            width={30}
            height={30}
            quality={100}
            src="/img/customer-avatar-male.webp"
            alt="Customer profile"
          />
          <h6 className="f-s-0-7-half  l-space f-w-600 text-home ml-2">
            {" "}
            {product.reviews[i].userName}
          </h6>
        </div>
        <div className="d-flex align-items-center ">
          <ShiftBy x={-3}>
            {" "}
            <ReviewStarsSimple number={product.reviews[i].rating} />
          </ShiftBy>

          <ShiftBy y={4}>
            <h6 className="text-home f-w-650 ">{product.reviews[i].title} </h6>
          </ShiftBy>
        </div>

        <FormattedDate date={product.reviews[i].createdAt} msg="Reviewed on" />
        <p className="text-home  text-left f-s-0-9">
          {product.reviews[i].text}
        </p>
        <h6 className="text-muted f-w-600 mb-2">
          {product.reviews[i].helpful.length}{" "}
          {product.reviews[i].helpful.length == 1 ? "Person" : "People"} found
          this helpful.
        </h6>
        <input
          className={`btn-rev f-w-600 l-space mb-4`}
          value="Helpful"
          type="button"
          onClick={onInputClick}
          disabled={
            product.currentUser?.validated === false || !product.currentUser
          }
        />
      </div>
    );
  }

  return <div className="p-2">{reviews}</div>;
}
