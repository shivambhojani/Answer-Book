//author - Aman Singh BHandari
import httpClient from "../../thunk/interceptor";
//To get the current logged in user
const UtilityUser = async () => {
  return httpClient
    .get("/userprofile/currentuser?email=" + localStorage.getItem("userID"))
    .then(function (response) {
      return response.data;
    });
};

export default UtilityUser;
