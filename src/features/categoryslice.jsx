import { createSlice, nanoid } from "@reduxjs/toolkit"

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [
      {id: '1',type:'Movies'},
      {id: '2',type:'Todos'},
    ]
  },
  reducers: {
    addCategory: (state, action) => {
      console.log('Action-addCAtegory',action.payload)
      const type = action.payload
      state.categories.push({
        id: nanoid(),
        type: type
      })   
    },
    updateCategory: (state, action) => {
      console.log('Action-updateCAtegory',action.payload)
      const { id, type } = action.payload
      const category = state.categories.find(category => category.id === id)
      category && (category.type = type)
    },
    deleteCategory: (state, action) => {
       console.log('Action-deleteCAtegory',action.payload)
      const id = action.payload
      state.categories = state.categories.filter(category => category.id !== id)
    },
  },
})

export const { addCategory, updateCategory, deleteCategory } = categorySlice.actions
export default categorySlice.reducer

