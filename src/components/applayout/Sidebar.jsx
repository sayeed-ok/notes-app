import Categorylist from "../category/Categorylist";
import AddCategory from "../category/AddCategory";
import { useState } from "react";
import NoteList from "../notes/NoteList";

export default function Sidebar({activeCategoryId,setActiveCategoryId}) {
  const [isAdding, setIsAdding] = useState(false); //opens input to add category
  

  return (
    <div className="overflow-hidden p-5 space-y-4" >
      <h2 className="text-3xl font-semibold text-gray-100">hii</h2>

      {/* ▼ Smooth collapsible add-category container */}
      <div
        className={`transition-all duration-300 overflow-hidden pr-2`}
        > 


        
        {isAdding ? (
          <AddCategory onDone={() => setIsAdding(false)} />
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="float-right w-fit flex items-center gap-3 bg-indigo-700 border border-indigo-900
                      rounded-xl text-gray-100 transition duration-100"
          >
            <img src="src\assets\AddCategory.png" />
          </button>
        )}
      </div>

      <Categorylist
        activeCategoryId={activeCategoryId}
        setActiveCategoryId={setActiveCategoryId}
      />

    </div>
  );
}
