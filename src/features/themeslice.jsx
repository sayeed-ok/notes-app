
import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: "system",
  },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "dark" ? "light" : "dark"
    },
    setTheme(state, action) {
      state.mode = action.payload
    },
  }
})

export const { toggleTheme, setTheme } = ThemeSlice.actions
export default ThemeSlice.reducer