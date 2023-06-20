import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    judulMemo: '',
    teksMemo: '',
    day: '',
    time: ''
}

export const inputSlice = createSlice({
    name: 'memo',
    initialState,
    reducers: {
        setJudulMemo: (state, action) => {
            state.judulMemo = action.payload
        },
        setTeksMemo: (state, action) => {
            state.teksMemo = action.payload
        },
        setDay: (state, action) => {
            state.day = action.payload
        },
        setTime: (state, action) => {
            state.time = action.payload
        }
    }
})

export const {setDay, setTime, setJudulMemo, setTeksMemo } = inputSlice.actions;
export default inputSlice.reducer