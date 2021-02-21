import { Helmet, HelmetProvider } from "react-helmet-async";
import Link from "next/link";
import Header from "../../components/Header";
import { useState } from "react";
import SideBar from "../../components/SideBar";
import Modal from "../../components/Modal";
import DeleteAccount from "../../components/deleteAccount";
import { Title } from "../../helpers/use-title";
import buildClient from "../../helpers/build-client";
import { useLocalState } from "../../helpers/use-localState";
import { useHasMounted } from "../../helpers/use-hasMounted";

const Account = ({ currentUser }) => {
  const [theme, setTheme] = useLocalState("theme", "light");
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <body data-theme={theme} />
        </Helmet>
        <div className="width">
          <Title title="Change website Theme" />
          {currentUser?.validated === false && (
            <Alert
              content="Your account has not been validated yet.please check your email for a validation link.You won't be able to fully use our services."
              className="text-center alert-warning"
            />
          )}
          <Header currentUser={currentUser} />
          <div className="row">
            <div className="col-md-3 margin-left-1 margin-top-20">
              <SideBar currentUser={currentUser} />
            </div>
            <div className="col-md-8 text-center account-small text-center">
              <h3 className="f-z-1  text-angellist margin-top-40 ">
                Change Theme
              </h3>
              <div className="bottom-line mb-2"></div>
              <div className="bulb ">
                <div className="switch">
                  <input
                    readOnly
                    id="darkSwitch"
                    type="checkbox"
                    className="button-theme"
                    checked={theme === "dark"}
                    onClick={() =>
                      setTheme((cur) => (cur === "light" ? "dark" : "light"))
                    }
                  />
                </div>
                <h3>{theme === "dark" ? "Dark Mode" : "Light Mode"} </h3>
              </div>
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
  if (!data.currentUser) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { ...data },
  };
}
export default Account;
