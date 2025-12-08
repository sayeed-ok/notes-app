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
    <div className="
  relative 
  h-full flex flex-col min-h-0 flex-1
  p-2
  rounded-2xl rounded-bl-none rounded-tl-none
  bg-white/7 backdrop-blur-xl border border-white/10
  shadow-[0_0_50px_rgba(0,0,0,0.25)] border-l-0
  bg-undertone-mono w-full 
">


      

     


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
            className="group fixed bottom-10 right-10 z-50 w-15 h-15 rounded-full bg-indigo-600 text-white text-3xl flex  items-center justify-center shadow-lg shadow-indigo-600/40  animate-pulse-slow hover:animate-none hover:scale-110 transition-all duration-300 ease-out"
          >
            <img src={AddNoteIcon}/>
          </button>
        )
      }



    </div>
  )
}
