import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from "./admin/products-slice";
import ShopProductsSlice from "./shop/products-slice";
import shopCartSlice from "./shop/cart-slice";
const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts: AdminProductsSlice,
        shopProducts : ShopProductsSlice,
        shopCart:shopCartSlice,
    },
})

export default store;