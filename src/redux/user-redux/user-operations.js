import * as userActions from "./user-actions";
import axios from "axios";

import config from "../../config.js";

axios.defaults.baseURL = config.server_host_name + "/app";

const fetchUsers = user  => dispatch => {
  dispatch(userActions.fetchUserRequest());
  axios
    .get("/users", user)
    .then(({ data }) => dispatch(userActions.fetchUserSuccess(data)))
    .catch(error => dispatch(userActions.fetchUserError(error.message)));
};

const updateBlockData = users => dispatch => {
  dispatch(userActions.updateBlockDataRequest());
  users.forEach(user => {
    axios
      .put(`/users/`, user)
      .then(({ data }) => dispatch(userActions.updateBlockDataSuccess(data)))
      .catch(error =>
        dispatch(userActions.updateBlockDataError(error.message)),
      );
  });
};

const deleteUsers = ids => dispatch => {
  dispatch(userActions.deleteUsersRequest());
  ids.forEach(id => {
    axios
      .delete(`/users/${id}`)
      .then(({ data }) => dispatch(userActions.deleteUsersSuccess(data)))
      .catch(error => dispatch(userActions.deleteUsersError(error.message)));
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchUsers, updateBlockData, deleteUsers };
