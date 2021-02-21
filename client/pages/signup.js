import Link from "next/link";
import Router from "next/router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";
import getT from "next-translate/getT";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { Title } from "../helpers/use-title";
import { yupResolver } from "@hookform/resolvers/yup";
import { reformattedErr } from "../helpers/use-errors";
import { useLocalState } from "../helpers/use-localState";
import { useHasMounted } from "../helpers/use-hasMounted";

const SignUp = ({ staticData }) => {
  let { lang } = useTranslation();
  const schema = yup.object().shape({
    name: yup.string().required(staticData.yupUser).min(3, staticData.minName),
    email: yup.string().required(staticData.email1).email(staticData.email2),
    password: yup
      .string()
      .required(staticData.password)
      .min(8, staticData.minpass)
      .matches(/^(?=.*[a-zA-Z])/g, staticData.match1)
      .matches(/^(?=.*\d)/g, staticData.match2),
  });
  const [errName, setErrName] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [onClick, setOnClick] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onInputClick = () => {
    setOnClick(true);
  };
  const [theme, setTheme] = useLocalState("theme", "light");
  const onSubmit = async (data) => {
    try {
      setErrName("");
      setErrEmail("");
      setErrPassword("");
      await axios.post("/api/users/signup", data);
      Router.push("/");
    } catch (error) {
      const errName = reformattedErr(error.response.data.errors, "name")?.name;
      const errPassword = reformattedErr(error.response.data.errors, "password")
        ?.password;
      const errEmail = reformattedErr(error.response.data.errors, "email")
        ?.email;
      setErrName(errName);
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
      <Title title={staticData.title} />
      <div className="container">
        <div className="margin-top-20">
          <div className="row justify-content-center">
            <div className="col-xs">
              <h1 className="d-flex muted f-w-400 f-s-1 justify-content-center">
                {staticData.join}
              </h1>
              <p className="d-flex lead justify-content-center text-center font-weight-normal text-angellist">
                <i
                  data-fa-transform="down-6 left-6"
                  className={`fas fa-user-plus text-angellist ${
                    lang === "ar" ? "order-2 ml-3" : ""
                  }`}
                ></i>{" "}
                {staticData.createAccount}
              </p>
              <div className="card bg-card card-body">
                <form onSubmit={handleSubmit(onSubmit)} className="form mb-4">
                  <div className="form-group">
                    <label
                      className={`f-w-600 ${
                        lang === "ar" ? "d-flex justify-content-end" : ""
                      }`}
                    >
                      {staticData.labelUser}
                    </label>
                    <i
                      data-fa-transform="shrink-8 up-4"
                      className={`fas fa-asterisk fa-xs text-danger ${
                        lang === "ar" ? "d-none" : ""
                      }`}
                    ></i>
                    <input
                      type="text"
                      className={`form-control form-control-sm rounded ${
                        lang === "ar" ? "rtl" : ""
                      } ${!!errors.name ? "is-invalid" : ""} ${
                        !errors.name && onClick && errName ? "is-invalid" : ""
                      }`}
                      name="name"
                      onChange={() => setOnClick(false)}
                      ref={register}
                      error={`${!!errors.name}`.toString()}
                      aria-describedby="nameErr"
                    />
                    <small
                      id="nameErr"
                      className={`invalid-feedback ${
                        lang === "ar" ? "d-flex justify-content-end" : ""
                      }`}
                    >
                      {errors?.name?.message}
                    </small>
                    <small
                      id="nameErr"
                      className={`invalid-feedback ${
                        lang === "ar" ? "d-flex justify-content-end" : ""
                      }`}
                    >
                      {!errors.name && onClick && errName
                        ? staticData.errorUser
                        : ""}
                    </small>
                  </div>
                  <div className="form-group">
                    <label
                      className={`f-w-600 ${
                        lang === "ar" ? "d-flex justify-content-end" : ""
                      }`}
                    >
                      {staticData.labelEmail}
                      <i
                        data-fa-transform="shrink-8 up-4"
                        className={`fas fa-asterisk fa-xs text-danger ${
                          lang === "ar" ? "d-none" : ""
                        }`}
                      ></i>
                    </label>
                    <input
                      className={`form-control form-control-sm rounded ${
                        lang === "ar" ? "rtl" : ""
                      } ${!!errors.email ? "is-invalid" : ""} ${
                        !errors.email && onClick && errEmail ? "is-invalid" : ""
                      }`}
                      name="email"
                      ref={register}
                      onChange={() => setOnClick(false)}
                      error={`${!!errors.email}`.toString()}
                      aria-describedby="emailErr"
                    />
                    <small
                      id="emailErr"
                      className={`invalid-feedback ${
                        lang === "ar" ? "d-flex justify-content-end" : ""
                      }`}
                    >
                      {errors?.email?.message}
                    </small>
                    <small
                      id="emailErr"
                      className={`invalid-feedback ${
                        lang === "ar" ? "d-flex justify-content-end" : ""
                      }`}
                    >
                      {!errors.email && onClick && errEmail
                        ? staticData.errorEmail
                        : ""}
                    </small>
                  </div>
                  <div className="form-group">
                    <label
                      className={`f-w-600 ${
                        lang === "ar" ? "d-flex justify-content-end" : ""
                      }`}
                    >
                      {staticData.labelPassword}
                    </label>
                    <i
                      data-fa-transform="shrink-8 up-4"
                      className={`fas fa-asterisk fa-xs text-danger ${
                        lang === "ar" ? "d-none" : ""
                      }`}
                    ></i>
                    <input
                      type={"password"}
                      className={`form-control form-control-sm rounded ${
                        lang === "ar" ? "rtl" : ""
                      } ${!!errors.password ? "is-invalid" : ""} ${
                        !errors.password && onClick && errPassword
                          ? "is-invalid"
                          : ""
                      } `}
                      name="password"
                      ref={register}
                      onChange={() => setOnClick(false)}
                      error={`${!!errors.password}`.toString()}
                      aria-describedby="passwordErr"
                    />
                    <small
                      id="passwordErr"
                      className={`invalid-feedback ${
                        lang === "ar" ? "d-flex justify-content-end" : ""
                      }`}
                    >
                      {errors?.password?.message}
                    </small>
                    <small
                      id="passwordErr"
                      className={`invalid-feedback ${
                        lang === "ar" ? "d-flex justify-content-end" : ""
                      }`}
                    >
                      {!errors.password && onClick && errPassword
                        ? staticData.errorPassword
                        : ""}
                    </small>
                  </div>
                  <input
                    type="submit"
                    value={staticData.signUp}
                    onClick={onInputClick}
                    className="btn  btn-primary f-w-400  rounded btn-block"
                  />
                </form>
              </div>
              <div className="card-body ">
                <p className="my-1 card-footer bg-card  border border-secondary text-secondary justify-content-center">
                  {staticData.already}{" "}
                  <Link href="/signin">
                    <a className="link">{staticData.signIn}</a>
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
  const t = await getT(locale, "signup");
  const yupUser = t("yupuser");
  const minName = t("minname");
  const email1 = t("email1");
  const email2 = t("email2");
  const password = t("password");
  const minpass = t("minpass");
  const match1 = t("match1");
  const match2 = t("match2");
  const title = t("title");
  const join = t("join");
  const createAccount = t("createaccount");
  const labelUser = t("labeluser");
  const labelEmail = t("labelemail");
  const labelPassword = t("labelpassword");
  const signUp = t("signup");
  const already = t("already");
  const signIn = t("signin");
  const errorUser = t("errorUser");
  const errorPassword = t("errorPassword");
  const errorEmail = t("errorEmail");
  return {
    props: {
      staticData: {
        yupUser,
        minName,
        email1,
        email2,
        password,
        minpass,
        match1,
        match2,
        title,
        join,
        createAccount,
        labelUser,
        labelEmail,
        labelPassword,
        signUp,
        already,
        signIn,
        errorUser,
        errorPassword,
        errorEmail,
      },
    },
  };
}

export default SignUp;
