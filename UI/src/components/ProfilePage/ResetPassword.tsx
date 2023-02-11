import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button, Grid, TextField } from "@mui/material";
import "./UserProfile.css";
import httpClient from "../../thunk/interceptor";

const ResetPasswprd = () => {
    const loggedInUserEmailId = localStorage.getItem("userID");
    console.log('email', loggedInUserEmailId)
    const [oldpassword, setoldpassword] = React.useState<string>();
    const [errorsoldpassword, setErrosoldpassword] = React.useState<{ name: string }>();

    const [newpassword, setnewpassword] = React.useState<string>();
    const [errorsnewpassword, setErrosnewpassword] = React.useState<{ name: string }>();
    const handleChangeInOldPassword = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const {
          target: { value },
        } = event;
        setErrosoldpassword({ name: "" });
        setoldpassword(value);
      };

      const handleChangeInNewPassword = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const {
          target: { value },
        } = event;
        setErrosnewpassword({ name: "" });
        setnewpassword(value);
        
      };
    const checkforEmptyValue = (
        oldpassword: any,
        newpassword: any
    ) => {

        setErrosoldpassword({ name: "" });
        setErrosnewpassword({ name: "" });

        let err: number = 0;

        console.log('oldpassword',oldpassword);
        console.log('newpassword',newpassword);

        let str = oldpassword || "";
        let result1 = typeof str === "string" ? str.trim() : "";
        if (result1.length === 0) {
            setErrosoldpassword({ name: "Field Cannot be empty" });
            err = err + 1;
        }

        str = newpassword || "";
        result1 = typeof str === "string" ? str.trim() : "";
        if (result1.length === 0) {
            setErrosnewpassword({ name: "Field Cannot be empty" });
            err = err + 1;
        }
        console.log('err', err);
        if (err === 0) {
            console.log("check passwords");
            httpClient
                .put("/userprofile/changepassword?email=" + loggedInUserEmailId, {
                    oldpassword: oldpassword,
                    newpassword: newpassword
                })
                .then((res) => {
                    console.log(res.data);
                    alert("Password changed successfully")
                    window.location.reload();
                })
                .catch((err) => {
                    alert("Error!! - Please make sure that oldpassword is correct")
                    console.log(err);
                });
        }
    };
    return (
        <>
            <Grid item xs={12} md={6}>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Old Password"
                    id="oldpassword"
                    onChange={handleChangeInOldPassword}
                    variant="outlined"
                    required
                    value={oldpassword}


                    fullWidth
                ></TextField>
            </Grid>
            <br />
            <Grid item xs={12} md={6}>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    label="New Password"
                    id="newpassword"

                    variant="outlined"
                    required
                    onChange={handleChangeInNewPassword}
                    // value={firstname}
                    // error={Boolean(errorsfirstname?.name)}
                    // helperText={errorsfirstname?.name}
                    fullWidth
                ></TextField>
            </Grid>{" "}
            <br />
            <Button

                variant="contained"
                color="primary"
                onClick={() =>
                    checkforEmptyValue(
                        oldpassword,
                        newpassword,
                    )
                }
            >
                Reset Password
            </Button>

        </>
    )
}

export default ResetPasswprd;