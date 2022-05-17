import * as authActions from "./auth-actions";
import axios from "axios";
import config from "../../config.js";

axios.defaults.baseURL = config.server_host_name + "/app";

const signUp = data => async dispatch => {
  dispatch(authActions.signUpUserRequest());
  try {
    const response = await axios.post("/signup", data);
    dispatch(authActions.signUpUserSuccess(response.data));
    alert("Registration complete.")
  } catch (error) {
    alert("Provided email is already in use or incorrect.")
    dispatch(authActions.signUpUserError(error.message));
  }
};

const signIn = data => async dispatch => {
  dispatch(authActions.signInUserRequest());
  try {
    const response = await axios.post("/signin", data);
    dispatch(authActions.signInUserSuccess(response.data));
    return true;
  } catch (error) {
    alert("Invalid data or user was blocked.")
    dispatch(authActions.signInUserError(error.message));
    return true;
  }
};

const logOut = currentUser => async dispatch => {
  dispatch(authActions.logOutUserRequest());
  try {
    await axios.put("/users", currentUser);
    dispatch(authActions.logOutUserSuccess());
  } catch (error) {
    dispatch(authActions.logOutUserError(error.message));
  }
};

export default { signUp, signIn, logOut };
