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

const Account = ({ currentUser }) => {
  const [theme, setTheme] = useLocalState("theme", "light");

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <body data-theme={theme} />
        </Helmet>
        <div className="width">
          <Title title="Your Account" />
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
            <div className="col-md-8 account-small">
              <h3 className="f-z-1  text-danger margin-top-40 ">
                Delete Account
              </h3>
              <div className="bottom-line"></div>
              <p className="margin-top-20">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <DeleteAccount>
                <Modal title="Are you sure you want to do this?" />
              </DeleteAccount>
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
