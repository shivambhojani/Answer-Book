import React, { useState } from "react";
import "./Form.css";
import useForm from "./useForm";
import validate from "./LoginFormValidationRules";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Grid, Typography, Box } from "@mui/material";
import logo from "../../assets/app-logo-2.png";
import Paper from "@mui/material/Paper";
import httpClient from "../../thunk/interceptor";
import { toast } from "react-toastify";
import { failedAuth, gotAuth } from "../../store/reducers/authentication";
import { useDispatch } from "react-redux";

const Form = (props: any): any => {
  const dispatch = useDispatch();
  const loggedInUserEmailId = localStorage.getItem("userID");
  
  const submitHandler = () => {
    
    httpClient.get("/userprofile/currentuser?email=" + values.email).then((res) => {
      if(res.data.user === null){
        toast.error("User not found")
        return
      }
      const isActive = res.data.user?.isActive;
       if(isActive === true){
      httpClient
      .post("/auth/login", {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        if (response.data.message === "ok") {
          localStorage.setItem("token", response.data.token); //DON'T UNCOMMENT THIS!!!!
          localStorage.setItem("userID", values.email);
          console.log("----------" + response.data.token);
          dispatch(gotAuth(response.data)); //store token in redux state---DONT DELETE THIS!!

          login();
          //IsSubmitted(true);
        } else {
          toast.error(response.data.message);
          failedAuth(""); //failed .. so store failed response
        }
      });
  }else{
    toast("user inactive")
  }
      
  })
 
  };

  const {
    values,
    errors: err,
    handleChange: manageChanges,
    handleSubmit: onsubmit,
    IsSubmitted,
  }: any = useForm(login, validate);
  const [_, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  function login() {
    
    setLoggedIn(true);
    console.log("logining----");
    if (values.email === "admin@xyz.com") {
      navigate("/adminhome");
    } else {
      navigate("/feeds");
    }
  
  
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item xs={false} sm={5} md={6} className="imagecontainer">
        <Grid container direction="column" className="imagegrid">
          <Grid>
            <section className="imagebox">
              <Box className="imageframe">
                <img src={logo} alt="Logo" className="image" />
              </Box>
            </section>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={7} md={6} component={Paper} elevation={0}>
        <Grid>
          <Box className="titlecontainer">
            <Typography component="h1" variant="h5" className="title">
              Answer Book
            </Typography>
          </Box>
        </Grid>
        <div className="loginBox">
          <form onSubmit={onsubmit} noValidate>
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
              {err.password && <p className="help is-danger">{err.password}</p>}
            </div>
            <Link to="/forgot-password">
              <p className="mt-2" style={{ textAlign: "center" }}>
                Forgot Password?
              </p>
            </Link>
            <button
              type="submit"
              className="button is-block is-info is-fullwidth"
              onClick={() => submitHandler()}
            >
              Submit
            </button>
            <Link to="/register">
              <p className="mt-5" style={{ textAlign: "center" }}>
                Create New Account ?
              </p>
            </Link>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Form;
