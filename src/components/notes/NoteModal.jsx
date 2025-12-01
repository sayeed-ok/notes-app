import { useSelector } from "react-redux";
import { formatTimeAgo } from "../utilities/formatTimeAgo";
import { memo, useState, useEffect } from "react";

export default function NoteModal({ noteId, onClose }) {
  const note = useSelector(state => state.note.notes.find(n => n.id === noteId));
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



  if (!note) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50"
      onClick={onClose}
     
      
      >

      <div
        className="bg-neutral-900 w-full max-w-2xl p-6 rounded-xl shadow-xl border border-neutral-700"
        onClick={(e) => e.stopPropagation()}
        
        >
      
        <button
          onClick={onClose}
          className="absolute top-15 left-15 text-2xl text-gray-400 hover:text-white"
        > ✖</button>


        <h1 className="text-3xl font-semibold mb-4" >{note.title}</h1>

        <p className="text-gray-300 whitespace-pre-line mb-6" >{note.content} </p>

        <p className="text-sm text-indigo-300">
          Category: <span className="text-gray-300">{note.categoryId}</span>
        </p>
        <p className="text-xs text-gray-400 mt-4">
          Last edited: {timeAgo}
        </p>

      </div>
    </div>
  );
}
