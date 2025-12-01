import { configureStore } from '@reduxjs/toolkit'
import noteReducer from '../features/notesslice.jsx'
import categoryReducer from '../features/categoryslice.jsx'
import themeReducer from "../features/themeslice.jsx"

export const store = configureStore({
  reducer: {
    note: noteReducer,
    category: categoryReducer,
    theme:themeReducer,
  }
})
/*
This builds Redux state like:
state = {
  category: {
    categories: [
      { id: 1, type: "books" },
      { id: 2, type: "movies" },
      { id: 3, type: "work" }
    ]
  },

  note: {
    notes: [
      { id: 10, title: "React learning", categoryId: 1 },
      { id: 11, title: "Watch Inception", categoryId: 2 },
      { id: 12, title: "Shopping list", categoryId: 3 }
    ]
  }
}
*/