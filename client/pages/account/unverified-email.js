import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import getT from "next-translate/getT";
import Header from "../../components/Header";
import buildClient from "../../helpers/build-client";
import { Title } from "../../helpers/use-title";
import { Redirect } from "../../helpers/use-redirect";
import { reformattedErr } from "../../helpers/use-errors";
import Alert from "../../components/Alert";

import axios from "axios";
const UnverifiedEmail = ({ currentUser, staticData }) => {
  const [emailRes, setEmailRes] = useState(null);
  const onClick = async () => {
    try {
      setEmailRes(null);
      const { data } = await axios.post("/api/users/resend-email");
      setEmailRes(data.message);
    } catch (error) {
      const errEmail = reformattedErr(error.response.data.errors, "email")
        ?.email;
      setEmailRes(errEmail);
    }
  };
  return currentUser.validated === false ? (
    <>
      <Title title={staticData.title} />
      <Header currentUser={currentUser} />
      <div className="container">
        <div className="margin-top-20">
          {emailRes && (
            <Alert content={emailRes} className="alert-info text-center" />
          )}
          <div className="row justify-content-center">
            <div className="col-xs">
              <div className="rounded-circle d-flex justify-content-center">
                <Image
                  src="/logo_africa.webp"
                  alt={staticData.logo}
                  width={100}
                  height={100}
                  quality={100}
                  priority
                />
              </div>
              <div className="text-center">
                <h3>{staticData.heading}</h3>
                <p className="text-muted text-center">
                  {staticData.content1}
                  <br />
                  {staticData.content2}{" "}
                  <span className="font-weight-bolder">
                    {currentUser?.email}
                  </span>
                </p>
                <input
                  type="button"
                  value={staticData.resend}
                  className="btn btn-sm btn-outline-info font-weight-bold mr-2"
                  onClick={onClick}
                />
                <Link href="/products">
                  <input
                    type="button"
                    value={staticData.product}
                    className="btn btn-sm btn-outline-info font-weight-bold"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/products" />
  );
};
export async function getServerSideProps(context, locale) {
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

  const t = await getT(locale, "unverified");

  const title = t("title");
  const logo = t("logo");
  const heading = t("heading");
  const content1 = t("content1");
  const content2 = t("content2");
  const resend = t("resend");
  const product = t("product");
  return {
    props: {
      ...data,
      staticData: {
        title,
        logo,
        heading,
        content1,
        content2,
        resend,
        product,
      },
    },
  };
}
export default UnverifiedEmail;
