import MoveNoteDropdown from "./MoveNotedropdown";
import { memo, useState, useEffect } from "react";
import { formatTimeAgo } from "../utilities/formatTimeAgo";


function NoteCard({ note, onEdit, onDelete, onTogglePin, onMove, onOpen, searchQuery }) {

  const [timeAgo, setTimeAgo] = useState(formatTimeAgo(note.lastEdited));


  useEffect(() => {
    setTimeAgo(formatTimeAgo(note.lastEdited));
  }, [note.lastEdited]);


  useEffect(() => {
    const t = setInterval(() => {
      setTimeAgo(formatTimeAgo(note.lastEdited));
    }, 60000);
    return () => clearInterval(t);
  }, []);




  function highlight(text, query) {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, `<mark class="bg-yellow-500 text-black">$1</mark>`);
  }



  return (
    //  'animate-fadeIn' for filtered result
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 cursor-pointer hover:shadow-lg transition animate-fadeIn h-fit"
      onClick={(e) => { onOpen(note.id) }}
     
      >

      <h1 className="mb-2 text-4xl wrap-break-word">{note.title}</h1>


      <p
        className="text-sm text-gray-300"
        dangerouslySetInnerHTML={{
          __html: highlight(
            note.content.length > 100
              ? note.content.slice(0, 100) + "..."
              : note.content,
            searchQuery
          )
        }}
      />


      <div className="flex justify-between">


        <div className="flex gap-2 mt-3">
          {/* pin button */}
          <button onClick={(e) => { e.stopPropagation(); onTogglePin(note.id) }}>📌</button>
          {/* edit button */}
          <button onClick={(e) => { e.stopPropagation(); onEdit(note.id) }}>✏️</button>
          {/* delete button */}
          <button onClick={(e) => { e.stopPropagation(); onDelete(note.id) }}>🗑️</button>
        </div>

        <div className="mt-3"
          onClick={(e) => e.stopPropagation()}>

          <MoveNoteDropdown
            noteId={note.id}
            categoryId={note.categoryId}
            onClick={(e) => e.stopPropagation()}
          />
        </div>

      </div>

      <div className="">
        <p className="text-xs text-gray-500 mt-2">
          Edited: {timeAgo}

        </p>
      </div>

    </div>
  )
}
export default memo(NoteCard)