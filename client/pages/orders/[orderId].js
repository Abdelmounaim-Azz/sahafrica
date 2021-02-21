import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Title } from "../../helpers/use-title";
import { useLocalState } from "../../helpers/use-localState";
import buildClient from "../../helpers/build-client";
import StripeCheckout from "react-stripe-checkout";
import { useHasMounted } from "../../helpers/use-hasMounted";

import Header from "../../components/Header";

import Alert from "../../components/Alert";

const orderProduct = (props) => {
  const router = useRouter();
  const [theme, setTheme] = useLocalState("theme", "light");
  const { currentUser } = props;
  const { id } = props;

  const hasMounted = useHasMounted();
  const [timeLeft, setTimeLeft] = useState(0);

  const handleToken = async (token) => {
    await axios({
      method: "post",
      url: `/api/payments/${id}`,
      data: {
        token: `${token.id}`,
      },
    });
    router.push("/orders");
  };
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(props.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [props]);

  if (timeLeft < 0) {
    return (
      <>
        <HelmetProvider>
          <Helmet>
            <body data-theme={theme} />
          </Helmet>
          <Title title="Order expired" />

          <Header currentUser={currentUser} />
          <div className="container">
            <div className="margin-top-80"></div>
            <div className="jumbotron jumbotron-fluid bg-home">
              <div className="container">
                <div className="d-flex text-center justify-content-center align-items-center">
                  <h1 className="display-5">Your order has been expired</h1>
                  <span className="badge badge-success">verified user</span>
                </div>
                <p className="lead">Sorry but you took too long to order.</p>
              </div>
            </div>
          </div>
        </HelmetProvider>
      </>
    );
  }
  if (!hasMounted) {
    return null;
  }
  const contentValidatedUser = (
    <div className=" text-center">
      <h1>Create your order</h1>
      <div className="d-flex justify-content-center flex-column">
        <div className="text-muted mb-2">
          You have <span className="text-success">{timeLeft} </span> seconds to
          pay for this order.
        </div>
        <div className="w-80">
          <StripeCheckout
            token={handleToken}
            stripeKey={process.env.NEXT_PUBLIC_STRIPE_KEY}
            amount={Math.round(props.product.price * 100)}
            description={props.product.description}
            panelLabel="Purchase product"
            image={props.product.image}
            email={currentUser.email}
            name={props.product.name}
            currency="USD"
          />
        </div>
      </div>
    </div>
  );
  const contentUnvalidatedUser = (
    <div className="jumbotron jumbotron-fluid bg-home">
      <div className="container">
        <div className="d-flex text-center justify-content-center align-items-center">
          <h1 className="display-5">you can't purchase this product yet.</h1>
          <span className="badge badge-warning">Unverified</span>
        </div>
        <p className="lead">
          Sorry but only verified users can purchase our products.Make sure you
          validate your account from the link we sent you.
        </p>
      </div>
    </div>
  );
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <body data-theme={theme} />
        </Helmet>

        <Header currentUser={currentUser} />
        <Title title="Order product  ¤ Sahafrica" />
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
    </>
  );
};
export async function getServerSideProps(context) {
  const client = buildClient(context);
  const { orderId } = context.query;

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
    const res = await client.get(`/api/orders/${orderId}`);
    const order = await res.data;

    return {
      props: {
        ...data,
        ...order,
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
export default orderProduct;
