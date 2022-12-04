import { useState } from 'react'
import './App.css'
import Layout from './layout';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Dashboard from './pages/dashboard';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
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
