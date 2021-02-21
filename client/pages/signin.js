import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import useTranslation from "next-translate/useTranslation";
import getT from "next-translate/getT";
import { Title } from "../helpers/use-title";
import { reformattedErr } from "../helpers/use-errors";
import { useLocalState } from "../helpers/use-localState";
import Alert from "../components/Alert";
import { useHasMounted } from "../helpers/use-hasMounted";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

const SignIn = ({ data }) => {
  let { lang } = useTranslation();
  const [errPassword, setErrPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const { register, handleSubmit } = useForm({});
  const [theme, setTheme] = useLocalState("theme", "light");
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown === false);
    setErrPassword("");
    setErrEmail("");
  };

  const onFormSubmit = async (data) => {
    try {
      setErrEmail("");
      setErrPassword("");
      await axios.post("/api/users/signin", data);
      Router.push("/products");
    } catch (error) {
      const errPassword = reformattedErr(error.response.data.errors, "password")
        ?.password;
      const errEmail = reformattedErr(error.response.data.errors, "email")
        ?.email;
      setErrEmail(errEmail);
      setErrPassword(errPassword);
    }
  };
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }
  return (
    <HelmetProvider>
      <Helmet>
        <body data-theme={theme} />
      </Helmet>
      <Title title={data.title} />
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
              <div className="text-center">
                <p className="d-flex lead justify-content-center font-weight-normal text-angellist">
                  <i
                    data-fa-transform="down-6 left-6"
                    className={`fas fa-user-lock text-angellist ${
                      lang === "ar" ? "order-2 ml-3" : ""
                    }`}
                  ></i>
                  {data.sahAfrica}
                </p>
                {(errPassword || errEmail) && (
                  <Alert className="alert-danger" content={data.errorLogin} />
                )}
                <div className="card bg-card card-body">
                  <form
                    onSubmit={handleSubmit(onFormSubmit)}
                    className="form mb-4"
                  >
                    <div className="form-group">
                      <label
                        className={`d-flex flex-row f-w-600 ${
                          lang === "ar" ? "d-flex justify-content-end" : ""
                        }`}
                      >
                        {data.labelEmail}
                      </label>
                      <input
                        className={`form-control form-control-sm rounded ${
                          lang === "ar" ? "rtl" : ""
                        }`}
                        name="email"
                        ref={register}
                      />
                    </div>
                    <div className="form-group">
                      <div className="d-flex justify-content-between">
                        <label
                          className={`f-w-600 ${
                            lang === "ar" ? "order-2" : ""
                          } `}
                        >
                          {data.labelPassword}
                        </label>
                        <Link href="/password_reset">
                          <a
                            className={`link f-w-600 ${
                              lang === "ar" ? "order-1" : ""
                            }`}
                          >
                            <small>{data.forgotPass} </small>
                          </a>
                        </Link>
                      </div>
                      <div className="pass-wrapper">
                        <input
                          type={passwordShown ? "text" : "password"}
                          className={`form-control form-control-sm rounded ${
                            lang === "ar" ? "rtl" : ""
                          }`}
                          name="password"
                          ref={register}
                        />
                        <i
                          className={` ${
                            lang === "ar" ? "pass-icon-ar" : "pass-icon"
                          }`}
                          onClick={togglePasswordVisiblity}
                        >
                          {passwordShown ? eyeSlash : eye}
                        </i>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn rounded btn-success btn-block"
                    >
                      {data.login}{" "}
                      <i
                        className={`fas fa-sign-in-alt ${
                          lang === "ar" ? "d-none" : ""
                        }`}
                      ></i>
                    </button>
                  </form>
                </div>
              </div>

              <div className="card-body">
                <p className="my-1 border border-secondary bg-card card-footer justify-content-center text-secondary">
                  {data.newUser}{" "}
                  <Link href="/signup">
                    <a className="link">{data.createAccount}</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};
export async function getStaticProps({ locale }) {
  const t = await getT(locale, "signin");
  const title = t("title");
  const logo = t("logo");
  const sahAfrica = t("sahafrica");
  const labelEmail = t("labelemail");
  const labelPassword = t("labelpassword");
  const forgotPass = t("forgotpass");
  const login = t("login");
  const newUser = t("new");
  const createAccount = t("createaccount");
  const errorLogin = t("errorLogin");
  return {
    props: {
      data: {
        title,
        logo,
        sahAfrica,
        labelEmail,
        labelPassword,
        forgotPass,
        login,
        newUser,
        createAccount,
        errorLogin,
      },
    },
  };
}
export default SignIn;
