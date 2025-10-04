import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nacosId: "",
}

const voterSlice = createSlice({
    name: 'voters',
    initialState,
    reducers: {
        setNacosId: (state, action) => {
            state.nacosId = action.payload;
            console.log(state.nacosId);
        }
    }
})

export const {setNacosId} = voterSlice.actions;
export default voterSlice.reducer;