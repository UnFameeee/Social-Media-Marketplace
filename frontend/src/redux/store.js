import {configureStore} from "@reduxjs/toolkit"
import postReducer from "./postSlice"
import authReducer from "./authSlice"

export default configureStore({
    reducer:{
        post: postReducer,
        auth: authReducer,
    }
})