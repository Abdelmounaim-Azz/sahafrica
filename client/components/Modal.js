import { useForm } from "react-hook-form";
import axios from "axios";
import Router from "next/router";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { reformattedErr } from "../helpers/use-errors";
const schema = yup.object().shape({
  password: yup.string().required("Enter your password"),
});

const Modal = ({ title }) => {
  const [openModal, setOpenModal] = useState(true);
  const [errPassword, setErrPassword] = useState("");
  const [onClick, setOnClick] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onInputClick = () => {
    setOnClick(true);
  };
  const onSubmit = async (data) => {
    try {
      setErrPassword("");
      await axios.post("/api/users/delete-account", data);
      Router.push("/");
    } catch (error) {
      const errPassword = reformattedErr(error.response.data.errors, "password")
        ?.password;
      setErrPassword(errPassword);
    }
  };
  return openModal ? (
    <div className="container">
      <div className="card-modal">
        <div className="card bg-card">
          <div className="card-header f-w-400">
            {title}
            <button
              type="button"
              className="close"
              onClick={() => setOpenModal(false)}
            >
              <span>
                <i
                  className="fas fa-times fa-xs"
                  data-fa-transform="shrink-4"
                ></i>
              </span>
            </button>
          </div>
          <div className="alert alert-danger brr-0" role="alert">
            <i className="fas fa-exclamation-triangle"></i> This is extremely
            important.
          </div>
          <p className=" ml-2 p-2">
            We will immediately delete all of your products, along with all of
            your orders, payments.
          </p>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mx-3">
              <label className="d-flex font-weight-bold">
                Confirm your password:
              </label>
              <input
                type={"password"}
                className={`form-control form-control-sm rounded ${
                  !!errors.password ? "is-invalid" : ""
                } ${
                  !errors.password && onClick && errPassword ? "is-invalid" : ""
                }`}
                name="password"
                ref={register}
                onChange={() => setOnClick(false)}
                error={`${!!errors.password}`.toString()}
                aria-describedby="passwordErr"
              />
              <small id="passwordErr" className="invalid-feedback">
                {errors?.password?.message}
              </small>
              <small id="nameErr" className="invalid-feedback">
                {!errors.password && onClick && errPassword}
              </small>
              <input
                type="submit"
                value="Cancel plan and delete this account"
                className="btn mt-3  btn-outline-danger  rounded btn-block"
                onClick={onInputClick}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
