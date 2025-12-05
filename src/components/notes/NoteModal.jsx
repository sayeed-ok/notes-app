import { useSelector } from "react-redux";
import { formatTimeAgo } from "../utilities/formatTimeAgo";
import { memo, useState, useEffect } from "react";

export default function NoteModal({ noteId, onClose }) {
  const note = useSelector(state => state.note.notes.find(n => n.id === noteId));
  const { type } = useSelector(state => state.category.categories).find(c => c.id === note.categoryId) // shows category type for selected note
  const [timeAgo, setTimeAgo] = useState(formatTimeAgo(note.lastEdited));




  console.log(type);


  useEffect(() => {
    setTimeAgo(formatTimeAgo(note.lastEdited));
  }, [note.lastEdited]);


  useEffect(() => {
    const t = setInterval(() => {
      setTimeAgo(formatTimeAgo(note.lastEdited));
    }, 60000);
    return () => clearInterval(t);
  }, []);



  if (!note) return null;

  return (
    <div
      className="fixed inset-0 bg-neutral-900/70 backdrop-brightness-50 flex justify-center items-center p-4 z-50 rounded-2xl"
      onClick={onClose}


    >

      <div
        className="bg-neutral-900/70  
        w-1/2 max-w-2xl p-6 rounded-xl shadow-xl border border-amber-700/30 "
        onClick={(e) => e.stopPropagation()}
      >

        <button
          onClick={onClose}
          className="absolute top-15 left-15 text-2xl text-gray-400 hover:text-white"
        > ✖</button>


        <h1 className="text-3xl font-semibold mb-4
            after:content-[''] after:block after:w-20 after:h-0.5 
          after:bg-yellow-400 after:mt-1 after:rounded-full"      
        >{note.title}</h1>


        <p className="text-gray-300 whitespace-pre-line mb-6 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 break-all"
        >{note.content}</p>


        <div className="flex justify-between ">
          <p className="text-sm text-indigo-300">
          <span className="text-gray-300 p-1 border border-indigo-800/50 rounded-md">{type}</span>
        </p>
        <p className="text-xs text-gray-400 ">
          Last edited: {timeAgo}
        </p>
        </div>

      </div>
    </div>
  );
}
