import { useState } from 'react'
import './App.css'
import Layout from './layout';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Dashboard from './pages/dashboard';
import Departments from './pages/departments';


import React,{useEffect} from "react";
// importing aos
import AOS from 'aos';
import 'aos/dist/aos.css';
import Department from './pages/department';
import Employees from './pages/department/employees';
import Tasks from './pages/tasks';
import Task from './pages/task';

function App() {
  useEffect(() => {
    AOS.init();
    
      AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
        
      
        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 400, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
      
      });
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/departments",
          element: <Departments />,
        },
        {
          path: "/departments/department/:id",
          element: <Department />,
         
        },
        {
          path: "/tasks",
          element: <Tasks />,
        },
        {
          path: "/tasks/task/:id",
          element: <Task />,
        },
      ],
    },
  ]);
  return (
    <div>
   <RouterProvider router={router} />
    </div>
  )
}

export default App
