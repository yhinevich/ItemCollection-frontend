import { combineReducers, createReducer } from "@reduxjs/toolkit";
import * as itemActions from "./item-actions";


const points = createReducer([], {
    [itemActions.addItemsSuccess()]: (_, { payload }) => payload
});

const error = createReducer(null, {
    [itemActions.listItemsError()]: (_, { payload }) => payload
});

const redirect = createReducer(false, {
    [itemActions.listItemsSuccess()]: () => true
});

const loading = createReducer(false, {
    [itemActions.listItemsRequest()]: () => true,
    [itemActions.listItemsSuccess()]: () => false,
});

export default combineReducers({
    points,
    error,
    redirect,
    loading,
});
