import { Helmet, HelmetProvider } from "react-helmet-async";
import buildClient from "../../helpers/build-client";
import { Title } from "../../helpers/use-title";
import { useLocalState } from "../../helpers/use-localState";
import Header from "../../components/Header";
import { Orders } from "../../helpers/get-orders";
import Alert from "../../components/Alert";

const OrderIndex = (props) => {
  const { currentUser } = props;
  const [theme, setTheme] = useLocalState("theme", "light");
  return (
    <HelmetProvider>
      <Helmet>
        <body data-theme={theme} />
      </Helmet>
      <Header currentUser={currentUser} />
      <Title title="Customer Orders  ¤ Sahafrica" />
      {currentUser?.validated === false && (
        <Alert
          content="Your account has not been validated yet.please check your email for a validation link.You won't be able to fully use our services."
          className="text-center alert-warning"
        />
      )}
      <div className="text-center">
        <h1>List of all your orders</h1>
        <Orders orders={props} />
      </div>
    </HelmetProvider>
  );
};

export async function getServerSideProps(context) {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  if (!data.currentUser) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  const res = await client.get("api/orders");
  const orders = res.data;
  return {
    props: {
      ...data,
      orders: {
        ...orders,
      },
    },
  };
}

export default OrderIndex;
