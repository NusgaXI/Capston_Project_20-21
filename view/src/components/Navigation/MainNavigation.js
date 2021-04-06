import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import './MainNavigation.css';
import SidebarIcon from '../../Photo/Sidebar.png';

function MainNavigation() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
      <AuthContext.Consumer>
          {context => (
        <React.Fragment>
        <div class="flex-1 flex flex-col">
		<nav class="px-4 flex justify-between bg-white h-16 border-b-2">
			<ul class="flex items-center">
				<li class="h-6 w-6">
					<img class="cursor-pointer h-full w-full mx-auto" src={SidebarIcon} alt="sidebar logo" onClick={showSidebar}/>
				</li>
			</ul>
			<ul class="flex items-center">
				<li>
					<h1 class="pl-8 lg:pl-0 text-gray-700">Online Reservation System</h1>
				</li>
			</ul>
            <ul class="flex items-center">
                <li>
                    <h1 class="pl-8 lg:pl-0 text-gray-700">Welcome, {context.fullName}</h1>
                </li>
            </ul>
        </nav>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>

        <div class=" flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
        <div class="overflow-y-auto overflow-x-hidden flex-grow">
        <ul class="flex flex-col py-4 space-y-1">
            <li class="px-5">
                <div class="flex flex-row items-center h-8">
                <div class="text-sm font-light tracking-wide text-gray-500">Menu</div>
                </div>
            </li>
            {context.token && (context.role === "ADMIN") &&(
            <li>
                <NavLink to="/users" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-red-500 pr-6">
                    <span class="inline-flex justify-center items-center ml-4">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </span>
                    <span class="ml-2 text-sm tracking-wide truncate">Users</span>
                </NavLink>
            </li>
            )}
            {context.token && (
            <li>
                <NavLink to="/timeslots" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-red-500 pr-6">
                    <span class="inline-flex justify-center items-center ml-4">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    </span>
                    <span class="ml-2 text-sm tracking-wide truncate">Timeslots</span>
                </NavLink>
            </li>
            )}
            {context.token && (
            <li>
                <NavLink to="/bookings" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-red-500 pr-6">
                    <span class="inline-flex justify-center items-center ml-4">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                    </span>
                    <span class="ml-2 text-sm tracking-wide truncate">Bookings</span>
                </NavLink>
            </li>
            )}
            <li>
                <NavLink to="/" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-red-500 pr-6" onClick={context.logout}>
                    <span class="inline-flex justify-center items-center ml-4">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    </span>
                    <span class="ml-2 text-sm tracking-wide truncate">Logout</span>
                </NavLink>
            </li>
        </ul>
        </div>
        </div>
        
        </ul>
        </nav>
        </React.Fragment>
        )}
        </AuthContext.Consumer>
  );
}

export default MainNavigation;