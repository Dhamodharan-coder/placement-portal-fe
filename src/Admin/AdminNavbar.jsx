import React, { useContext } from 'react'
import logo from "../assets/logo.png"
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const AdminNavbar = () => {
    const [profiletoggle,setprofiletoggle] = useState(false);
    const navigate = useNavigate();
    const login = localStorage.getItem("token3");
    function profilefun(){
    if(profiletoggle){
        setprofiletoggle(false)
    }else{
        setprofiletoggle(true)
    }
    }

    function handlelogout(){
      localStorage.removeItem('token3');
      navigate("/");
      toast.success("Logged Out Successfully!")
    }
  return (
    <div>
       <div>
      <nav class="bg-indigo-800 py-7">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">


      <div class="flex flex-wrap items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex flex-shrink-0 items-center">
          <img class="h-14 w-auto" src={logo} alt="Your Company" />
        </div>
      </div>
      
      <div class="flex-2">
          <div class="flex">

          <h1 className='text-3xl font-bold text-stone-200 mx-10'>Dhru Admin Placement Portal</h1>
          </div>
        </div>

      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        {/* <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span class="absolute -inset-1.5"></span>
          <span class="sr-only">View notifications</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
        </button> */}

        

        <div class="relative ml-3">
          <div>
            <button type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={profilefun}>
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">Open user menu</span>
              <img class="h-12 w-12 rounded-full" src={`https://img.icons8.com/3d-fluency/94/FA5252/person-male--v5.png`} alt="" />
            </button>
          </div>

         
          <div class={`absolute ${profiletoggle ?"block":"hidden"} right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
        
          <button href="#" class="block px-4 py-2 text-sm font-bold text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2" onClick={handlelogout}>{login? "Sign out" : "Sign in"}</button>
         
          </div>
        </div>
      </div>

    </div>
  </div>

 
</nav>

    </div>
    </div>
  )
}

export default AdminNavbar
