/*
  Mainarea
  ├─ Add Note (floating button)
  ├─ NoteList
  │   ├─ Pinned section
  │   ├─ All Notes section
  ├─ EditNote modal (only when editing)

*/
import { useState } from "react"
import AddNote from "../notes/AddNote.jsx"
import NoteList from "../notes/NoteList.jsx"
import AddNoteIcon from "../../assets/AddNote.png"


export default function Mainarea({ activeCategoryId, setActiveCategoryId }) {
  const [isAdding, setIsAdding] = useState(false)
  return (
    <div className="relative flex-1 p-6 overflow-y-auto">


      <h1 className="text-3xl font-semibold mb-4">Notes</h1>

     


      {/* Note List */}
      <NoteList activeCategoryId={activeCategoryId} setActiveCategoryId={setActiveCategoryId} />

      {/* Overlay */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"></div>
      )}
      {/* Add Note Form*/}
      {isAdding ?
        (
          <div className="fixed inset-0 flex justify-center items-start pt-24 z-40">
            <AddNote onDone={() => setIsAdding(false)} />
          </div>
        )
        :
        (
          <button
            onClick={() => setIsAdding(true)}
            className="group fixed bottom-15 right-6 z-50 w-14 h-14 rounded-full bg-indigo-600 text-white text-3xl flex  items-center justify-center shadow-lg shadow-indigo-600/40  animate-pulse-slow hover:animate-none hover:scale-110 transition-all duration-300 ease-out"
          >
            <img src={AddNoteIcon}/>
          </button>
        )
      }



    </div>
  )
}
