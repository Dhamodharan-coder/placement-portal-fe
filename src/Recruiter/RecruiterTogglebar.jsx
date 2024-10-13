import React from 'react'
import { useState } from 'react'
import RecruiterContentbox from './RecruiterContentbox'

const RecruiterTogglebar = () => {
    const [recruitertogglenav,setrecruitertogglenav]=useState("one")
  return (
    <div>
      <div className='m-7 togglebar'>
      <div className='bg-indigo-800 py-4 rounded-3xl toggle'>
<ul className='flex flex-wrap text-2xl text-stone-200 justify-around'>
    <li className={`${recruitertogglenav === "one" ? 'active' : ""}`} onClick={()=>{setrecruitertogglenav("one")}}>Post Job</li>
    <li className={`${recruitertogglenav === "two" ? 'active' : ""}`} onClick={()=>{setrecruitertogglenav("two")}}>Applications</li>
    <li className={`${recruitertogglenav === "three" ? 'active' : ""}`} onClick={()=>{setrecruitertogglenav("three")}}>Results</li>
    <li className={`${recruitertogglenav === "four" ? 'active' : ""}`} onClick={()=>{setrecruitertogglenav("four")}}>Interviews Schedule</li>
    <li className={`${recruitertogglenav === "five" ? 'active' : ""}`} onClick={()=>{setrecruitertogglenav("five")}}>Shortlist</li>
</ul>
      </div>
      <RecruiterContentbox recruitertogglenav={recruitertogglenav}/>
    </div>
   
    </div>
  )
}

export default RecruiterTogglebar
