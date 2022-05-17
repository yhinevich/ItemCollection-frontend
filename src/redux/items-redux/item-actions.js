import { createAction } from "@reduxjs/toolkit";

export const listItemsRequest = createAction("items/listItemsRequest");
export const listItemsSuccess = createAction("items/listItemsSuccess");
export const listItemsError = createAction("items/listItemsError");

export const addItemsRequest = createAction("items/addItemsRequest");
export const addItemsSuccess = createAction("items/addItemsSuccess");
export const addItemsError = createAction("items/addItemsError");
