import { createSlice } from '@reduxjs/toolkit';

import appApi from '../service/appApi';

const initialState = [];
export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProducts: (_, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.updateProduct.matchFulfilled,
      (_, { payload }) => payload
    );
    builder.addMatcher(
      appApi.endpoints.createProduct.matchFulfilled,
      (_, { payload }) => payload
    );
    builder.addMatcher(
      appApi.endpoints.deleteProduct.matchFulfilled,
      (_, { payload }) => payload
    );
  },
});

export const { UpdateProducts } = productSlice.actions;
export default productSlice.reducer;
