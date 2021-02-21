import { useState, useEffect } from "react";
import Link from "next/link";
import ReactImageZoom from "react-image-zoom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import buildClient from "../../helpers/build-client";
import Header from "../../components/Header";
import Alert from "../../components/Alert";
import { useLocalState } from "../../helpers/use-localState";
import { ReviewStars } from "../../helpers/use-review";
import { useWindowSize } from "../../helpers/use-windowSize";
import { Title } from "../../helpers/use-title";
import { getProducts } from "../../helpers/get-products";

const showProducts = ({ currentUser }) => {
  const desiredWith = useWindowSize();
  const [theme, setTheme] = useLocalState("theme", "light");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let mounted = true;
    getProducts("/api/products").then((items) => {
      if (mounted) {
        setProducts(items);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <body data-theme={theme} />
        </Helmet>
        <Header currentUser={currentUser} />
        <Title title="Online Shopping for African products ¤ Sahafrica" />
        {currentUser?.validated === false && (
          <Alert
            content="Your account has not been validated yet.please check your email for a validation link.You won't be able to fully use our services."
            className="text-center alert-warning"
          />
        )}
        <div className="container mt-5 mb-5">
          <div className="d-flex justify-content-center row">
            <div className="col-md-10">
              {products.map((product) => (
                <div
                  className="row p-2 bg-card border rounded mb-3"
                  key={product.image}
                >
                  <div className="col-lg-4 mt-1 text-center">
                    <div className="img-fluid img-responsive rounded product-image ">
                      <ReactImageZoom
                        {...{
                          width: 270,
                          height: 210,
                          scale: 1.5,
                          img: `${product.image}`,
                          offset: { vertical: 0, horizontal: 10 },
                          zoomStyle: "z-index: 1",
                          zoomPosition: `${
                            desiredWith === true ? "bottom" : "right"
                          }`,
                        }}
                      />
                      <small className="text-muted">
                        Roll over image to zoom in
                      </small>
                    </div>
                  </div>
                  <div className="col-lg-8 mt-1">
                    <div className="row  ml-1">
                      <div className="col-lg-8">
                        <h5>
                          {product.name}
                          {"   "}
                          <small className="text-muted">
                            by {product.brand}
                          </small>{" "}
                        </h5>
                        <div className="d-flex flex-row mt-2">
                          <ReviewStars number={product.rating} />
                          <span className="link">
                            {product.numReviews} global ratings
                          </span>
                        </div>
                        <p className="text-justify  para">
                          {product.description} <br />
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <div className="align-items-center align-content-center  border-left ">
                          <div className="d-flex flex-row align-items-center">
                            <h4 className="ml-1">
                              ${Number(product.price).toFixed(2)}
                            </h4>
                            <span className="strike-text ml-1">
                              ${Number(product.price + 10).toFixed(2)}
                            </span>
                          </div>
                          <h6 className="text-success ml-1">
                            countInStock:{" "}
                            <span className="text-home ml-1">
                              {product.countInStock}
                            </span>
                          </h6>
                          <div className="d-flex flex-column mt-4 ml-1">
                            <Link
                              href="/products/[category]/[id]/[slug]"
                              as={`/products/${product.category}/${product.id}/${product.slug}`}
                            >
                              <input
                                className="btn btn-warning btn-sm "
                                value="Details"
                                type="button"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </HelmetProvider>
    </>
  );
};
export async function getServerSideProps(context) {
  const client = buildClient(context);

  const { data } = await client.get("/api/users/currentuser");
  //You need to take this off to some admin :) one time click
  return {
    props: {
      ...data,
    },
  };
}
export default showProducts;
