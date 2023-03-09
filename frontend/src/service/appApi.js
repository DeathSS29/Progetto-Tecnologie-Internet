import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//creazione dell'api
export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:27017' }),

  endpoints: (builder) => ({
    //Register
    register: builder.mutation({
      query: (user) => ({
        url: '/user/register',
        method: 'POST',
        body: user,
      }),
    }),

    //Login
    login: builder.mutation({
      query: (user) => ({
        url: '/user/login',
        method: 'POST',
        body: user,
      }),
    }),

    // creat product
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/products',
        body: product,
        method: 'POST',
      }),
    }),

    // add to cart
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: '/products/add-to-cart',
        body: cartInfo,
        method: 'POST',
      }),
    }),

    // remove from cart
    removeFromCart: builder.mutation({
      query: (body) => ({
        url: '/products/remove-from-cart',
        body,
        method: 'POST',
      }),
    }),

    // increase cart
    increaseCartProduct: builder.mutation({
      query: (body) => ({
        url: '/products/increase-cart',
        body,
        method: 'POST',
      }),
    }),

    // decrease cart
    decreaseCartProduct: builder.mutation({
      query: (body) => ({
        url: '/products/decrease-cart',
        body,
        method: 'POST',
      }),
    }),

    // create order
    createOrder: builder.mutation({
      query: (body) => ({
        url: '/orders',
        body,
        method: 'POST',
      }),
    }),

    //delete Product
    deleteProduct: builder.mutation({
      query: ({ product_id, user_id }) => ({
        url: `/products/${product_id}`,
        body: {
          user_id,
        },
        method: 'DELETE',
      }),
    }),

    //edit produts
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product.id}`,
        body: product,
        method: 'PATCH',
      }),
    }),
  }),
});
export const {
  useRegisterMutation,
  useLoginMutation,
  useCreateProductMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useCreateOrderMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = appApi;
export default appApi;
