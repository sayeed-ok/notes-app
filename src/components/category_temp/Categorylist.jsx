import { useSelector } from "react-redux"
import Categoryitem from './Categoryitem.jsx'
import { useState } from "react"


export default function Categorylist({ activeCategoryId, setActiveCategoryId }) {
  const categories = useSelector(state => state.category.categories)
  const [editingId, setEditingId] = useState(null)

  return (<>

    <ul >
      {categories.map(category => (
        <li key={category.id}>
          <Categoryitem
            category={category}
            isEditing={editingId === category.id}
            onEdit={() => setEditingId(category.id)}
            onCancelEdit={() => setEditingId(null)}
            // highlight props
            isActive={activeCategoryId === category.id}
            // sort based on category
            onSelect={() => {
              if (activeCategoryId === category.id) {
                setActiveCategoryId(null);    // unselect category
              } else {
                setActiveCategoryId(category.id);
              }
            }}
          />
        </li>
      ))}
    </ul>
  </>)
}

/* 
CategoryList:
- Reads categories with useSelector
- Maps categories
- Holds editingId
- Passes props to CategoryItem

CategoryItem:
- Shows ONE category only
- Shows edit/delete UI
- Uses local state ONLY for input
- NO mapping, NO <ul>, NO list logic
- updateCategory, deleteCategory are dispatched here

Main mistake I made:
- I mapped categories INSIDE CategoryItem
- CategoryItem re-rendered the entire list
- Editing logic broke because isEditing was not isolated to one item
 
*/