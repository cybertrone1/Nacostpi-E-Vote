import { configureStore } from "@reduxjs/toolkit";
import voterReducer from "./slice/voterSlice"
const store = configureStore({
    reducer: {
        voters: voterReducer,
    }
});
 
export default store;