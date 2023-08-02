import { createContext, useContext, useState } from "react";

const SortContext = createContext()

export function SortBy(){
    return useContext(SortContext)
}

export function Sorting({children}){
     const [sortByAZContext, setSortByAZContext] = useState('')

     return (
        <SortContext.Provider value={{sortByAZContext, setSortByAZContext}}>
            {children}
        </SortContext.Provider>
     )
}

// <Button variant="outlined" onClick={handleSortToggle}>
//         Sort {sortByAZ ? 'Z-A' : 'A-Z'}
//       </Button>
// 
//  const handleSortToggle = () => {
//     setSortByAZ((prevSortByAZ) => !prevSortByAZ); // Toggle the sorting order
//   };