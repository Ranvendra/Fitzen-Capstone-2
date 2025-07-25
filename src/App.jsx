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
import ScrollToTop from './components/ScrollToTop'
import FooterSection from './components/FooterSection'

import Signup from './components/Signup';
import Login from './components/Login';


const AppLayout = () => {
  return (
    <div className='app'>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <FooterSection/>
    </div>
  )
}

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
      ,
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      }
      
     
    ],
    errorElement: <Error/>
  }
])

function App() {
  return <RouterProvider router={appRouter} />
}

export default App