import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "../resetStore";
const initialState = {
  tabMarketPlaceLeftBar: {
    currentIndex: "2",
  },
};
export const tabIndexSlice = createSlice({
  name: "tabIndex",
  initialState: {
    tabMarketPlaceLeftBar: {
      currentIndex: "2",
    },
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    setTabMarketPlaceLeftBarIndex:(state,action) =>{
        state.tabMarketPlaceLeftBar.currentIndex = action.payload;
    }
  },
});
export const {setTabMarketPlaceLeftBarIndex} = tabIndexSlice.actions;

export default tabIndexSlice.reducer;
