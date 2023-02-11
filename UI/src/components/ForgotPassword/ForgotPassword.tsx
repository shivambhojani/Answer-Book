import React, { useState } from "react";
import useForm from "./useForm";
import validate from "./LoginFormValidationRules";
import {  useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import httpClient from "../../thunk/interceptor";
import {toast} from "react-toastify"

const Form = (props:any) => {
  const {
    values,
    errors: err,
    handleChange: manageChanges,
    handleSubmit: onsubmit,
  }:any = useForm(login, validate);
  const navigate = useNavigate();

  function login(e: any) {
    
    e.preventDefault();
    if(!values.email){
      toast.error("email is required")
      return
    }
    httpClient
      .post("/auth/request-password-reset", {
        email: values.email,
      })
      .then(() => {
        
       toast("Password reset link sent successfully") 
        navigate("/login");
      }).catch((error: Error) => {
        console.log("errror");
        
        toast.error(error.message)
      });
  }

  return (
    <div className="section hightlight">
      <div className="container">
        <div className="column is-6 is-offset-3">
          <div className="box">
            <h1 className="is-size-3">Forgot Password</h1>

            <form  noValidate>
              <div className="attributes mt-5">
                <label className="label">Email Address</label>
                <div className="data-block">
                  <input
                    placeholder="Enter email to reset the password"
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

              <button
                className="button is-block is-info is-fullwidth my-3"
                onClick={(e) =>login(e)}
              >
                Reset Password
              </button>
             <Link to='/login'>
              <p className="mt-5">Go Back</p>
             </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
