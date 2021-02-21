import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState } from "react";
import axios from "axios";
import Router from "next/router";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Header from "../../../../../components/Header";
import useStarRating from "../../../../../components/starRating";
import Alert from "../../../../../components/Alert";

import buildClient from "../../../../../helpers/build-client";
import { reformattedErr } from "../../../../../helpers/use-errors";
import { Title } from "../../../../../helpers/use-title";
import { useLocalState } from "../../../../../helpers/use-localState";
const writeReview = (props) => {
  const [theme, setTheme] = useLocalState("theme", "light");
  const { currentUser } = props;

  const { content, starsSelected } = useStarRating();
  const [onClick, setOnClick] = useState(false);
  const [errReview, setErrReview] = useState(null);

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("You need to add a title about the product.")
      .min(3, "Minimum is 3 characters."),

    text: yup
      .string()
      .required("You need to add a description about the product.")
      .min(10, "Description is too short...minimum is 10 characters."),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onInputClick = () => {
    setOnClick(true);
  };
  const onSubmit = async (data) => {
    try {
      setErrReview(null);
      await axios.post(`/api/products/${props.id}/reviews`, {
        // userName: props.currentUser.name,
        title: data.title,
        text: data.text,
        rating: starsSelected,
      });
      Router.push(
        `/products/${props.category}/${props.id}/${props.slug}#reviews`
      );
    } catch (error) {
      const errReview = reformattedErr(error.response.data.errors, "review")
        ?.review;
      setErrReview(errReview);
    }
  };
  const contentValidatedUser = (
    <div className="row justify-content-center text-center">
      <p className="lead justify-content-center font-weight-bold text-angellist">
        Rate Your Experience.
      </p>

      <div className="col-xs w-400">
        {starsSelected == 0 && onClick && (
          <Alert
            content="Select the stars indicating your rating."
            className="alert-danger"
          />
        )}
        {errReview && <Alert content={errReview} className="alert-danger" />}

        <div className="card bg-card card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="form mb-4">
            <div className="mb-4">{content}</div>
            <div className="form-group">
              <input
                className={`form-control  rounded 
              } ${!!errors.title ? "is-invalid" : ""}`}
                name="title"
                ref={register}
                error={`${!!errors.title}`.toString()}
                aria-describedby="titleErr"
                placeholder="Review Title"
                onChange={() => setOnClick(false)}
              />
              <small id="titleErr" className={`invalid-feedback `}>
                {errors?.title?.message}
              </small>
            </div>
            <div className="form-group">
              <input
                className={`form-control  rounded 
              } ${!!errors.text ? "is-invalid" : ""}`}
                name="text"
                ref={register}
                error={`${!!errors.text}`.toString()}
                aria-describedby="textErr"
                placeholder="Review Description"
                onChange={() => setOnClick(false)}
              />
              <small id="textErr" className={`invalid-feedback `}>
                {errors?.text?.message}
              </small>
            </div>
            <input
              type="submit"
              value="Submit Review"
              className="btn  btn-warning f-w-400  rounded btn-block"
              onClick={onInputClick}
            />
          </form>
        </div>
      </div>
    </div>
  );
  const contentUnvalidatedUser = (
    <div className="jumbotron jumbotron-fluid bg-home">
      <div className="container">
        <div className="d-flex text-center justify-content-center align-items-center">
          <h1 className="display-5">you can't review this product yet.</h1>
          <span className="badge badge-warning">Unverified</span>
        </div>
        <p className="lead">
          Sorry but only verified users can review our products.Make sure you
          validate your account from the link we sent you.
        </p>
      </div>
    </div>
  );
  return (
    <HelmetProvider>
      <Helmet>
        <body data-theme={theme} />
      </Helmet>
      <Title title="Review product  ¤ Sahafrica" />
      <Header currentUser={currentUser} />
      {currentUser?.validated === false && (
        <Alert
          content="Your account has not been validated yet.please check your email for a validation link.You won't be able to fully use our services."
          className="text-center alert-warning"
        />
      )}
      <div className="container">
        <div className="margin-top-80"></div>
        {currentUser?.validated === false
          ? contentUnvalidatedUser
          : contentValidatedUser}
      </div>
    </HelmetProvider>
  );
};
export async function getServerSideProps(context) {
  const client = buildClient(context);
  const { id, slug, category } = context.query;
  const { data } = await client.get("/api/users/currentuser");
  if (!data.currentUser) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  try {
    const res = await client.get(`/api/products/${id}`);
    const product = await res.data;

    if (product.slug !== slug || product.category !== category) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
    return {
      props: {
        ...data,
        ...context.query,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
export default writeReview;
