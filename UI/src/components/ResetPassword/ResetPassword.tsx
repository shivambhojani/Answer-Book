import React, { useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import httpClient from "../../thunk/interceptor";
import {toast} from "react-toastify"

const Form = (props:any) => {
 
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const params =  useParams()

  function login(e: any) {
    e.preventDefault();
    if(!params.token){
      return
    }
    if(!password.trim().length){
      toast.error("Password is required")
      return
    }
   
    httpClient
      .post("/auth/reset-password", {
        password,
        token: params.token 
      })
      .then(() => {
       toast("Password update successfully") 
        navigate("/login");
      }).catch((error: Error) => {
        toast.error(error.message)
      });
  }

  return (
    <div className="section hightlight">
      <div className="container">
        <div className="column is-6 is-offset-3">
          <div className="box">
            <h1 className="is-size-3">Update Password</h1>

              <div className="attributes mt-5">
                <label className="label">New Password</label>
                <div className="data-block">
                  <input
                    placeholder="A very strong new password that you remember"
                    autoComplete="off"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    className="input"
                  />
                </div>
              </div>

              <button
                className="button is-block is-info is-fullwidth my-3"
                onClick={(e) =>login(e)}
              >
                Update Password
              </button>
             
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
