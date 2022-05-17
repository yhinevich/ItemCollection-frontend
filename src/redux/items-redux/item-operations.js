import * as itemActions from "./item-actions";
import axios from "axios";
import * as userActions from "../user-redux/user-actions";
import config from "../../config.js";

axios.defaults.baseURL = config.server_host_name + "/app";

const listItems = item  => dispatch => {
    dispatch(itemActions.listItemsRequest());
    axios
        .get("/items", item)
        .then(({ data }) => dispatch(itemActions.listItemsSuccess(data)))
        .catch(error => dispatch(itemActions.listItemsError(error.message)));
};

const addItem = data => async dispatch => {
    dispatch(itemActions.addItemsRequest());
    try {
        const response = await axios.post("/item", data);
        dispatch(itemActions.addItemsSuccess(response.data));
        alert("item Added")
    } catch (error) {
        alert("Item incorrect.")
        dispatch(itemActions.addItemsError(error.message));
    }
};

export default { listItems, addItem };
