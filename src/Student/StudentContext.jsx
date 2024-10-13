import React, { createContext, useState } from 'react'
export const Pipeline = createContext();
export const StudentContext = ({children}) => {
const [navimage,setnavimage] = useState([]);
const [recruiternavimage,setrecruiternavimage] = useState([])
const [linechartselect,setlinechartselect]=useState(0);
const [linechartreject,setlinechartreject]=useState(0);
  return (
  
<Pipeline.Provider value={{navimage,setnavimage,recruiternavimage,setrecruiternavimage,linechartselect,setlinechartselect,linechartreject,setlinechartreject}}>
      {children}
    </Pipeline.Provider>
 
  )
}


