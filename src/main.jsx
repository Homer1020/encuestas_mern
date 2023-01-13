import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Dashboard from './Dashboard'
import ErrorPage from './pages/ErrorPage'
import MisNotas from './pages/MisNotas'
import CrearNota from './pages/CrearNota'
import EditarNota, { loader as notaLoader } from './pages/EditarNota'
import HomePage, { loader as homeLoader } from './pages/HomePage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Nota from './pages/Nota'
import AuthProvider from './contexts/authContext'
import { AuthRoute } from './AuthRoute'
import { PublicRoute } from './PublicRoute'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import './scss/style.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        loader: homeLoader,
        element: <HomePage />
      },
      {
        path: 'notas/:id',
        loader: notaLoader,
        element: <Nota />
      },
      {
        path: 'login',
        element: <PublicRoute><Login /></PublicRoute>
      },
      {
        path: 'register',
        element: <PublicRoute><Register /></PublicRoute>
      }
    ]
  },
  {
    path: '/dashboard',
    element: (
      <AuthProvider>
        <AuthRoute>
          <Dashboard />
        </AuthRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: 'notas',
        element: <MisNotas />
      },
      {
        path: 'notas/crear',
        element:<CrearNota />
      },
      {
        path: 'notas/:id/editar',
        loader: notaLoader,
        element: <EditarNota />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider
      router={ router }
    />
  </React.StrictMode>
)
