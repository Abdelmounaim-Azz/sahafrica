import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import getT from "next-translate/getT";
import { reformattedErr } from "../helpers/use-errors";
import { Title } from "../helpers/use-title";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocalState } from "../helpers/use-localState";
const PasswordReset = ({ staticData }) => {
  let { lang } = useTranslation();
  const { register, handleSubmit } = useForm({});
  const [data, setData] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);
  const [theme, setTheme] = useLocalState("theme", "light");

  function Alert() {
    const [show, setShow] = useState(true);
    if (show) {
      return (
        <div id="myAlert" className="alert alert-danger" role="alert">
          {lang === "en"
            ? staticData.errorEmail.substring(0, 38)
            : staticData.errorEmail.substring(0, 41)}
          <br />
          {lang === "en"
            ? staticData.errorEmail.substring(38, 81)
            : staticData.errorEmail.substring(40, 78)}
          <br />
          {lang === "en"
            ? staticData.errorEmail.substring(81)
            : staticData.errorEmail.substring(78)}
          <button
            onClick={() => setShow(false)}
            type="button"
            className="close"
          >
            <span>
              <i
                className="fas fa-times fa-xs"
                data-fa-transform="shrink-4"
              ></i>
            </span>
          </button>
        </div>
      );
    }
    return null;
  }
  function BeforeAfterSubmit() {
    if (isSubmitted === false) {
      return (
        <div>
          <Title title={staticData.titleBefore} />
          <div className="card bg-card mb-3">
            <div className="card-body">
              <p className="card-text f-w-600  text-home ">
                {staticData.cardText1}
                <br /> {staticData.cardText2}
                <br />
                <span
                  className={`${
                    lang === "ar" ? "d-flex justify-content-end" : ""
                  }`}
                >
                  {staticData.cardText3}
                </span>
              </p>
              <form onSubmit={handleSubmit(onFormSubmit)} className="form mb-4">
                <div className="form-group">
                  <input
                    className={`form-control rounded form-control-sm ${
                      lang === "ar" ? "rtl" : ""
                    }`}
                    placeholder={staticData.emailPlaceholder}
                    name="email"
                    ref={register}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-sm rounded btn-success btn-block"
                >
                  {data === "" ? staticData.btnCase1 : staticData.btnCase2}
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Title title={staticData.titleAfter} />
          <div className="card bg-card mb-3">
            <div className="card-body">
              <p className="card-text f-w-600 text-home ">
                {staticData.cardText4}
                <br />
                {staticData.cardText5}
                <br />
                {staticData.cardText6}
              </p>
              <Link href="/signin" passHref>
                <button className="btn btn-sm mt-3 rounded btn-info text-light btn-block font-weight-bold">
                  <i className="fas text-black fa-arrow-circle-left"></i>{" "}
                  {staticData.returnBack}
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
  const onFormSubmit = async (data) => {
    try {
      const res = axios.post("/api/users/forgotpassword", data);
      setData(res);
      await res;
      setSubmitted(true);
    } catch (error) {
      setData("");
      const errEmail = reformattedErr(error.response.data.errors, "email")
        ?.email;
      setErrEmail(errEmail);
    }
  };
  return (
    <HelmetProvider>
      <Helmet>
        <body data-theme={theme} />
      </Helmet>
      <div className="container">
        <div className="margin-top-20">
          <div className="row justify-content-center">
            <div className="col-xs">
              <div className="rounded-circle d-flex justify-content-center">
                <Image
                  src="/logo_africa.webp"
                  alt={data.logo}
                  width={100}
                  height={100}
                  quality={100}
                  priority
                />
              </div>
              <div className=" text-center">
                <p className="d-flex text-angellist lead justify-content-center font-weight-normal">
                  {data.resetPass}
                </p>
                {errEmail && !isSubmitted && <Alert />}
              </div>
              <BeforeAfterSubmit />
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};
export async function getStaticProps({ locale }) {
  const t = await getT(locale, "passwordreset");
  const titleBefore = t("titlebefore");
  const titleAfter = t("titleafter");
  const cardText1 = t("cardtext1");
  const cardText2 = t("cardtext2");
  const cardText3 = t("cardtext3");
  const cardText4 = t("cardtext4");
  const cardText5 = t("cardtext5");
  const cardText6 = t("cardtext6");
  const emailPlaceholder = t("emailplaceholder");
  const btnCase1 = t("btncase1");
  const btnCase2 = t("btncase2");
  const returnBack = t("returnback");
  const logo = t("logo");
  const resetPass = t("resetpass");
  const errorEmail = t("errorEmail");
  return {
    props: {
      staticData: {
        titleBefore,
        titleAfter,
        cardText1,
        cardText2,
        cardText3,
        cardText4,
        cardText5,
        cardText6,
        emailPlaceholder,
        btnCase1,
        btnCase2,
        returnBack,
        logo,
        resetPass,
        errorEmail,
      },
    },
  };
}
export default PasswordReset;
