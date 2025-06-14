// App.jsx
import React from 'react'
import Navbar from './components/Navbar'
import Body from './components/Body'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import MentorsPage from './pages/Mentors'
import ContactPage from './pages/Contact'
import ExercisePage from './pages/Exercise'
import Error from './components/ErrorPage'
import './App.css'

const AppLayout = () => {
  return (
    <div className='app'>
      <Navbar />
      <Outlet /> {/* This is where nested routes render */}
      <div className="footer-bottom">
Copyright © 2025 Fitzen. All rights reserved.
</div>
    </div>
  )
}

// Optional: Example of routes inside <Body /> if needed
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Body />
      },

      {
        path: '/exercise',
        element: <ExercisePage/>
      },

      {
        path:"/mentors",
        element: <MentorsPage/>
      },
      
      {
        path: "/contact",
        element: <ContactPage/>

      }
      // Add more nested routes here if needed
    ],
    errorElement: <Error/>
  }
])

function App() {
  return <RouterProvider router={appRouter} />
}

export default App