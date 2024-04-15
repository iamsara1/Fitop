import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orderss: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getordersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getordersSuccess: (state, action) => {
      state.isFetching = false;
      state.orderss = action.payload;
    },
    getordersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteordersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteordersSuccess: (state, action) => {
      state.isFetching = false;
      state.orderss.splice(
        state.orderss.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteordersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
      updateordersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateordersSuccess: (state, action) => {
      state.isFetching = false;
      state.orderss[
        state.orderss.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.orders;
    },
    updateordersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getordersStart,
  getordersSuccess,
  getordersFailure,
  deleteordersStart,
  deleteordersSuccess,
  deleteordersFailure,
  updateordersStart,
  updateordersSuccess,
  updateordersFailure,
  addordersStart,
  addordersSuccess,
  addordersFailure,
} = ordersSlice.actions;

export default ordersSlice.reducer;
