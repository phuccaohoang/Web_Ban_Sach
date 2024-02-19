import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    refesh: false,
}

export const refeshSlice = createSlice({
    name: 'refesh',
    initialState,
    reducers: {
        updateRefesh: (state) => {
            state.refesh = !state.refesh
            console.log('đã refesh')
        }
    }
})

export const { updateRefesh } = refeshSlice.actions;

export default refeshSlice.reducer;