import { createSlice, nanoid } from "@reduxjs/toolkit"
let prev = []

const noteSlice = createSlice({
  name: 'note',
  initialState: {
    notes: [
      {
        id: "1",
        title: "Title",
        content: "Content",
        categoryId: "1",
        pinned: true,
        createdAt: Date.now(),
        lastEdited: Date.now()
      }
    ]
  },
  reducers: {
    addNote: (state, action) => {
      // console.log('Action-addNote', action.payload)
      const { title, content, categoryId } = action.payload
      state.notes.push({
        id: nanoid(),
        title: title,
        content: content,
        categoryId: categoryId,
        pinned: false,
        createdAt: Date.now(),
        lastEdited: Date.now()
      })
    },
    updateNote: (state, action) => {
      const { id, title, content, categoryId } = action.payload;

      state.notes = state.notes.map(note =>
        note.id === id
          ? {
            ...note,
            title: title !== undefined ? title : note.title,
            content: content !== undefined ? content : note.content,
            categoryId: categoryId !== undefined ? categoryId : note.categoryId,
            lastEdited: Date.now(),
          }
          : note
      );
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload)
    },
    toggleNote: (state, action) => {
      const noteid = state.notes.find(note => note.id === action.payload)
      noteid && (noteid.pinned = !noteid.pinned)
    },
    moveNote: (state, action) => {
      console.log('movenote', action.payload)
      const { id, categoryId } = action.payload
      const noteid = state.notes.find(note => note.id === id)
      noteid && (noteid.categoryId = categoryId)

      prev += categoryId
      //  console.log(prev);

    }
  },
})

export const { addNote, updateNote, deleteNote, toggleNote, moveNote } = noteSlice.actions
export default noteSlice.reducer


/*

*/