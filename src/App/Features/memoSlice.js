import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    memo: [],
    detailMemo: []
}

export const memoSlice = createSlice({
    name: 'memo',
    initialState,
    reducers: {
        getMemo: (state, action) => {
            state.memo = action.payload
        },
        getDetailMemo: (state, action) => {
            state.detailMemo = action.payload
        }
    }
})

export const {getMemo, getDetailMemo} = memoSlice.actions 
export default memoSlice.reducer