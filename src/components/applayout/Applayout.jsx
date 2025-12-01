import Sidebar from "./Sidebar"
import Mainarea from "./Mainarea"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setTheme, toggleTheme } from "../../features/themeslice";

export default function Applayout() {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const notes = useSelector(state => state.note.notes)
  const dispatch = useDispatch()





  return (
    <>
      <header className="">

        <select
          className=" p-2 rounded"
          >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

      </header>

      <div className="h-screen w-full flex overflow-hidden">

        <aside className="h-full w-80 overflow-y-auto ">
          <Sidebar activeCategoryId={activeCategoryId} setActiveCategoryId={setActiveCategoryId} />
        </aside>

        <main className="h-full flex-1 overflow-y-auto ">
          <Mainarea activeCategoryId={activeCategoryId} setActiveCategoryId={setActiveCategoryId} />
        </main>

      </div>
    </>
  )
}





/*  
  to get independent scrolling the container must be 'h-screen' prevents the page itself from scrolling.
  then both children have same overflow-y-auto for the independent scrolling.


  const [activeCategoryId, setActiveCategoryId] = useState(null);
    data flow -> render notelist based on category

   1️⃣ User selects an option  
      ↓
   2️⃣<select onChange> fires → event.target.value (string)  
      ↓
   3️⃣setActiveCategoryId(...) updates React state  
      ↓
   4️⃣The parent component re-renders with new state  
      ↓
   5️⃣New activeCategoryId flows down into NoteList  
      ↓
   6️⃣Notes get filtered/sorted based on the new category  

*/