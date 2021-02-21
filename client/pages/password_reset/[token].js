import { useState } from "react";
import axios from "axios";
import Router from "next/router";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { reformattedErr } from "../../helpers/use-errors";
import buildClient from "../../helpers/build-client";
import { Title } from "../../helpers/use-title";

const ResetPassword = ({ userName, token }) => {
  let { t } = useTranslation();
  const schema = yup.object().shape({
    password: yup
      .string()
      .required(t("passwordtoken:pass"))
      .min(8, t("passwordtoken:passmin"))
      .matches(/^(?=.*[a-zA-Z])/g, t("passwordtoken:passmatch1"))
      .matches(/^(?=.*\d)/g, t("passwordtoken:passmatch2")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], t("passwordtoken:confirmpass1"))
      .required(t("passwordtoken:confirmpass2")),
  });
  const [errPassword, setErrPassword] = useState("");
  const onFormSubmit = async (data) => {
    try {
      await axios.put(`/api/users/password_reset/${token}`, data);
      Router.push("/signin");
    } catch (error) {
      const errPassword = reformattedErr(error.response.data.errors, "password")
        ?.password;
      setErrPassword(errPassword);
    }
  };
  function ChangePassword() {
    const [errPassword, setErrPassword] = useState("");

    const { register, handleSubmit, errors } = useForm({
      mode: "onBlur",
      resolver: yupResolver(schema),
    });
    return (
      <div>
        <Title title={t("passwordtoken:title")} />
        <div className="container">
          <div className="margin-top-20">
            <div class="row justify-content-center">
              <div class="col-xs">
                <div className="rounded-circle d-flex justify-content-center">
                  <Image
                    src="/logo_africa.webp"
                    alt={t("passwordtoken:logo")}
                    width={100}
                    height={100}
                    quality={100}
                    priority
                  />
                </div>
                <div className="text-center">
                  <p className="d-flex lead justify-content-center font-weight-normal">
                    {t("passwordtoken:change")}
                    <br />@{userName}
                  </p>
                  <div
                    className="card  bg-light card-body"
                    style={{ width: "20rem" }}
                  >
                    <form
                      onSubmit={handleSubmit(onFormSubmit)}
                      className="form mb-4"
                    >
                      <div className="form-group">
                        <label className="d-flex font-weight-bold">
                          {t("passwordtoken:passlabel")}
                        </label>
                        <input
                          type={"password"}
                          className={`form-control form-control-sm rounded  ${
                            !!errors.password ? "is-invalid" : ""
                          } ${errPassword ? "is-invalid" : ""}`}
                          name="password"
                          ref={register}
                          error={!!errors.password}
                          aria-describedby="passwordErr"
                        />
                        <small id="passwordErr" class="invalid-feedback">
                          {errors?.password?.message}
                        </small>
                        <small id="nameErr" class="invalid-feedback">
                          {errPassword}
                        </small>
                      </div>
                      <div className="form-group">
                        <label className="d-flex font-weight-bold">
                          {t("passwordtoken:confirmlabel")}
                        </label>
                        <input
                          type={"password"}
                          className={`form-control form-control-sm rounded  ${
                            !!errors.confirmPassword ? "is-invalid" : ""
                          } ${errPassword ? "is-invalid" : ""}`}
                          name="confirmPassword"
                          ref={register}
                          error={!!errors.confirmPassword}
                          aria-describedby="passwordErr"
                        />
                        <small id="passwordErr" class="invalid-feedback">
                          {errors?.confirmPassword?.message}
                        </small>
                      </div>
                      <small className="form-text text-left text-muted">
                        {t("passwordtoken:req1")}
                        <br />
                        {t("passwordtoken:req2")}
                      </small>
                      <input
                        type="submit"
                        value={t("passwordtoken:submit")}
                        className="btn mt-4 btn-info  rounded btn-block"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ChangePassword />;
};

export async function getServerSideProps(context) {
  const { token } = context.query;
  const client = buildClient(context);
  try {
    const { data } = await client.get(`/api/users/validate_token/${token}`);
  } catch (error) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return { props: { ...data, token } };
}
export default ResetPassword;
