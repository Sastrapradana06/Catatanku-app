import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    memo: [],
    detailMemo: [],
    isBtnEdit: false,
    selectedId: [],
    bookMark: []
}

export const memoSlice = createSlice({
    name: 'memo',
    initialState,
    reducers: {
        getMemo: (state, action) => {
            state.memo = action.payload
        },
        getBookMark: (state, action) => {
            state.bookMark = action.payload
        },
        getDetailMemo: (state, action) => {
            state.detailMemo = action.payload
        },
        setIsBtnEdit: (state, action) => {
            state.isBtnEdit = action.payload
        },
        setSelectedId: (state, action) => {
            state.selectedId = action.payload
        }
    }
})

export const {getMemo, getDetailMemo, setIsBtnEdit, setSelectedId, getBookMark} = memoSlice.actions 
export default memoSlice.reducer