import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { moveNote } from "../../features/notesslice"



export default function MoveNoteDropdown({ noteId, categoryId, onClick }) {
  const category = useSelector(state => state.category.categories)
  const notes = useSelector(state => state.note.notes)
  const dispatch = useDispatch()



  return (
    <>


      <select
        value={categoryId}
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-neutral-900 p-2 rounded-lg border border-neutral-700 focus:border-indigo-500 outline-none text-white"
        onChange={e => {

          // console.log('before-movenotedropdown',e.target.value)
          const newCategoryId = e.target.value
          dispatch(moveNote({ id: noteId, categoryId: newCategoryId }))
        }}
      >

        {category.map(item => (
          <option key={item.id} value={item.id} className="">
            {item.type}
          </option>
        ))}
      </select>

    </>
  )
}