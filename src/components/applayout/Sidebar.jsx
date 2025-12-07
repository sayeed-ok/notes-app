import AddCategoryIcon from "../../assets/AddCategory.png";

import Categorylist from "../category/Categorylist";
import AddCategory from "../category/AddCategory";
import { useState } from "react";
import NoteList from "../notes/NoteList";

export default function Sidebar({ activeCategoryId, setActiveCategoryId }) {
  const [isAdding, setIsAdding] = useState(false); //opens input to add category


  return (
    <div className="  p-2 h-full flex flex-col min-h-0 rounded-2xl rounded-tr-none rounded-br-none bg-white/7 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.3)] verflow-hidden
        border border-white/10 border-r-0    
      "
    >

      {/* logo 
      <div className="border  p-0.5 rounded-sm w-fit">
        <h1 className="text-white text-3xl font-semibold ">Bare</h1>
        <span className="text-2xl font-bold bg-white text-black inline-block">Minimum</span>
        <p className="text-white/40 text-2xl font-medium">app</p>
      </div>
      */}
      <div className=" w-fit">
        <h1 className="text-white text-3xl font-semibold ">Barely</h1>
        <div className="inline-flex items-baseline">
          <span className="text-2xl font-bold bg-white px-1 text-black inline-block">Do</span>
          <p className="text-white/40 text-2xl font-medium  ml-1">It.</p>
        </div>
      </div>


      {/* <img src="src\assets\favicon.png" alt="favicon" /> */}

      {/* ▼ Smooth collapsible add-category container */}
      <div className={`transition-all duration-300 overflow-hidden pr-2`}>

        {isAdding ? (
          <AddCategory onDone={() => setIsAdding(false)} />
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="float-right w-fit flex items-center gap-3 bg-indigo-700 border border-indigo-900
          rounded-xl text-gray-100 transition duration-100">

            <img src={AddCategoryIcon} />
          </button>
        )}
      </div>

      {/* HEADING */}
      <h3 className="text-sm text-gray-400 tracking-wide">Categories</h3>

      {/* CATEGORY LIST */}
      <div className="flex-1 overflow-y-auto pr-2 no-scrollbar smooth-scroll">
        <Categorylist
          activeCategoryId={activeCategoryId}
          setActiveCategoryId={setActiveCategoryId}
        />
      </div>

    </div>
  );
}
