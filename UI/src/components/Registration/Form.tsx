import React, { useState } from "react";
import useForm from "./useForm";
import validate from "./LoginFormValidationRules";
import { useNavigate } from "react-router-dom";
import httpClient from "../../thunk/interceptor";
import { useDispatch } from "react-redux";
import { failedAuth, gotAuth } from "../../store/reducers/authentication";
import {toast} from "react-toastify"


const Form = () => {
  const dispatch = useDispatch();

  const {
    values,
    errors: err,
    handleChange: manageChanges,
    handleSubmit: onsubmit,
  }: any = useForm(login, validate);

  const navigate = useNavigate();

  function login() {
    httpClient
      .post("/auth/register", {

        email: values.email,
        password: values.password,
        firstname: values.firstName,
        lastname: values.lastName
      })
      .then((response:any) => {
        if (response.data.message === "OK") {
          localStorage.setItem("token", response.data.token); //DON'T UNCOMMENT THIS!!!!
          localStorage.setItem("userID", values.email);
          console.log("----------" + response.data.token);
          dispatch(gotAuth(response.data)); //store token in redux state---DONT DELETE THIS!!

          // login();
          // IsSubmitted(true);
          navigate("/");
        } else {
          
          toast.error(response.data.message);
          failedAuth(""); //failed .. so store failed response
        }
      }).catch((error: any) => {
        toast.error(error.message)
      });
  }

  return (
    <div className="section hightlight">
      <div className="container">
        <div className="column is-6 is-offset-3">
          <div className="">
            <h1>Register</h1>
            <form onSubmit={onsubmit} noValidate>
              <div className="attributes">
                <label className="label">First name</label>
                <div className="data-block">
                  <input
                    autoComplete="off"
                    className={`input ${err.firstName && "is-danger"}`}
                    type="text"
                    name="firstName"
                    onChange={manageChanges}
                    value={values.firstName || ""}
                    required
                  />
                  {err.firstName && (
                    <p className="help is-danger">{err.firstName}</p>
                  )}
                </div>
              </div>
              <div className="attributes">
                <label className="label">Last name</label>
                <div className="data-block">
                  <input
                    autoComplete="off"
                    className={`input ${err.lastName && "is-danger"}`}
                    type="text"
                    name="lastName"
                    onChange={manageChanges}
                    value={values.lastName || ""}
                    required
                  />
                  {err.lastName && (
                    <p className="help is-danger">{err.lastName}</p>
                  )}
                </div>
              </div>
              <div className="attributes">
                <label className="label">Email Address</label>
                <div className="data-block">
                  <input
                    autoComplete="off"
                    className={`input ${err.email && "is-danger"}`}
                    type="email"
                    name="email"
                    onChange={manageChanges}
                    value={values.email || ""}
                    required
                  />
                  {err.email && <p className="help is-danger">{err.email}</p>}
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className={`input ${err.password && "is-danger"}`}
                    type="password"
                    name="password"
                    onChange={manageChanges}
                    value={values.password || ""}
                    required
                  />
                </div>
                {err.password && (
                  <p className="help is-danger">{err.password}</p>
                )}
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    className={`input ${err.confirmPassword && "is-danger"}`}
                    type="password"
                    name="confirmPassword"
                    onChange={manageChanges}
                    value={values.confirmPassword || ""}
                    required
                  />
                </div>
                {err.confirmPassword && (
                  <p className="help is-danger">{err.confirmPassword}</p>
                )}
              </div>
              <button
                type="submit"
                className="button is-block is-info is-fullwidth"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
