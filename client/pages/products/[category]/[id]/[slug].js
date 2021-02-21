import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Router from "next/router";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import axios from "axios";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import ReactImageZoom from "react-image-zoom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import buildClient from "../../../../helpers/build-client";
import Header from "../../../../components/Header";
import { useLocalState } from "../../../../helpers/use-localState";
import { useWindowSize } from "../../../../helpers/use-windowSize";
import { useHasMounted } from "../../../../helpers/use-hasMounted";
import { ReviewStars } from "../../../../helpers/use-review";
import { ReviewStats } from "../../../../helpers/use-statistics";
import { Reviews } from "../../../../helpers/get-reviews";
import PopoverStickOnHover from "../../../../components/PopoverStickOnHover ";
import Alert from "../../../../components/Alert";
import { ShiftBy } from "../../../../helpers/ShiftBy";
import { Title } from "../../../../helpers/use-title";

const showProduct = (props) => {
  const [theme, setTheme] = useLocalState("theme", "light");
  const { currentUser } = props;
  const [collapse, setCollapse] = useState(false);
  const [rating, setRating] = useState(0);
  const desiredWith = useWindowSize();
  const arrowDown = <FontAwesomeIcon icon={faChevronDown} />;
  const arrowUp = <FontAwesomeIcon icon={faChevronUp} />;
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setRating(props.rating);
      //props.rating is undefined in renderTooltip,cannot access it..this is a workaround.
    }
    return () => (mounted = false);
  }, []);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {rating} out of 5
    </Tooltip>
  );
  const popover = (
    <div className="m-2">
      <div className="d-flex flex-row mt-3 ">
        <ReviewStars number={props.rating} />
        <ShiftBy y={3}>
          <h6 className="f-w-500 text-dark-c">{props.rating} out of 5</h6>
        </ShiftBy>
      </div>
      <div className="mt-1 text-muted f-w-500 f-s-1">
        {props.numReviews} global ratings{" "}
      </div>
    </div>
  );
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }
  const onInputClick = async () => {
    try {
      const { data } = await axios.post(`/api/orders/${props.id}`);
      const orderId = data.order.id;
      Router.push("/orders/[orderId]", `/orders/${orderId}`);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <body data-theme={theme} />
      </Helmet>
      <Header currentUser={currentUser} />

      <Title title="Order Your product now ¤ Sahafrica" />
      {props.currentUser?.validated === false && (
        <Alert
          content="Your account has not been validated yet.please check your email for a validation link.You won't be able to fully use our services."
          className="text-center alert-warning"
        />
      )}
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mt-2  text-center">
            <ReactImageZoom
              {...{
                width: 320,
                height: 220,
                scale: 1.5,
                img: `${props.image}`,
                zoomStyle: "z-index: 1",
                zoomPosition: `${desiredWith === true ? "bottom" : "right"}`,
              }}
            />
            <small className="text-muted">Roll over image to zoom in</small>
          </div>
          <div className="col-lg-8">
            <h1 className="f-w-300">{props.name}</h1>
            <h6 className="text-success">
              brand: <small className="text-home f-w-400">{props.brand} </small>
            </h6>
            <div className="d-flex flex-row mt-2 ">
              <ReviewStars number={props.rating} />
              <PopoverStickOnHover
                placement="bottom"
                delay={250}
                onMouseEnter={() => {}}
                component={
                  <>
                    {popover}
                    <ReviewStats
                      reviews={props.reviews}
                      className="w-250 m-2"
                    />
                    <div className="bottom-line-thin mb-4"></div>
                    <div className="text-center mb-2">
                      <a className="link underline-link" href="#reviews">
                        See all customer reviews
                      </a>
                    </div>
                  </>
                }
              >
                <div className="arrow-down mr-2">{arrowDown}</div>
              </PopoverStickOnHover>

              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <a className="link underline-link" href="#reviews">
                  {props.numReviews} ratings
                </a>
              </OverlayTrigger>
            </div>
            <div className="bottom-line "></div>
            <p className="description text-left">{props.description}</p>
            <h6 className="mr-1 mb-2">
              Price: ${Number(props.price).toFixed(2)}
            </h6>
            <input
              className="btn btn-warning font-weight-bold"
              type="button"
              value="Order Now"
              onClick={onInputClick}
            />
          </div>
        </div>
        <div className="bottom-line-thin mt-4"></div>
      </div>
      <div className="reviews">
        <div className="statistics ml-2 text-home ">
          <>
            {popover}
            <ReviewStats reviews={props.reviews} className="auto m-2" />
            <Accordion>
              <Accordion.Toggle
                as={Button}
                variant="link d-block"
                eventKey="0"
                onClick={() => setCollapse(!collapse)}
              >
                {collapse ? arrowUp : arrowDown} How are ratings calculated?
              </Accordion.Toggle>

              <Accordion.Collapse eventKey="0">
                <p className="mb-0 text-home f-s-0-9 l-space ln-hgt f-w-500 text-left ml-2">
                  To calculate the overall star rating and percentage breakdown
                  by star, we don’t use a simple average. Instead, our system
                  considers things like how recent a review is and if the
                  reviewer bought the item on Sahafrica. It also analyzes
                  reviews to verify trustworthiness.
                </p>
              </Accordion.Collapse>
            </Accordion>
            <div className="bottom-line-thin mt-4"></div>
            <h5 className="font-weight-bold mt-4 ml-2">Review this product</h5>
            <p className="text-home f-s-0-9 ml-2">
              Share your thoughts with other customers
            </p>
            <Link
              href="/products/[category]/[id]/[slug]/write-review"
              as={`/products/${props.category}/${props.id}/${props.slug}/write-review`}
            >
              <input
                className="btn-review f-w-600 l-space mb-4"
                value="Write customer review"
                type="button"
              />
            </Link>
          </>
        </div>
        <div className="main mt-2 ">
          <h5 className="font-weight-bold ml-2">
            Customer reviews from all over the world.
          </h5>
          <Reviews product={props} />
        </div>
      </div>
    </HelmetProvider>
  );
};
export async function getServerSideProps(context) {
  const client = buildClient(context);
  const { id, slug, category } = context.query;
  const { data } = await client.get("/api/users/currentuser");
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
        ...product,
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
export default showProduct;
