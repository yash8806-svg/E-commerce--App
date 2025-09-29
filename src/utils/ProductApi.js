import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productSlice = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:"https://fakestoreapi.com/"}),
    endpoints:(builder) => ({
        getProducts:builder.query({
            query:()=>"products",
        })
    })
})

export const {useGetProductsQuery} = productSlice;