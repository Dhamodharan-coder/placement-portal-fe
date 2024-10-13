import React, { useState } from 'react'
import Contentbox from './Contentbox'


const Togglebar = () => {
    const [togglenav,settogglenav]=useState("one")
  return (
    <div className='m-7 togglebar'>
      <div className='bg-indigo-800 py-4 rounded-3xl toggle'>
<ul className='flex flex-wrap text-2xl text-stone-200 justify-around'>
    <li className={`${togglenav === "one" ? 'active' : ""}`} onClick={()=>{settogglenav("one")}}>Profile</li>
    <li className={`${togglenav === "two" ? 'active' : ""}`} onClick={()=>{settogglenav("two")}}>Jobs</li>
    <li className={`${togglenav === "three" ? 'active' : ""}`} onClick={()=>{settogglenav("three")}}>Applied</li>
    <li className={`${togglenav === "four" ? 'active' : ""}`} onClick={()=>{settogglenav("four")}}>Interviews</li>
    <li className={`${togglenav === "six" ? 'active' : ""}`} onClick={()=>{settogglenav("six")}}>Results</li>
    <li className={`${togglenav === "five" ? 'active' : ""}`} onClick={()=>{settogglenav("five")}}>Statitics</li>
</ul>
      </div>
      <Contentbox togglenav={togglenav}/>
    </div>
  )
}

export default Togglebar
