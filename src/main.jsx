import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Store/Store.js'
import { AllPost, Home ,Login, SignUp , EditPost ,AddPost, Post  } from './pages'
import { AuthLayout } from './components'
let router = createBrowserRouter([
  {
    path : '/' ,
    element : <App /> ,
    children : [
      {
        path : "/" ,
        element : <Home />
      } ,
      {
        path : "/login" ,
        element : (
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      )
      } ,
      {
        path : '/signup' ,
        element : (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        )
      } ,
      {
        path : '/all-post' ,
        element : (
          <AuthLayout authentication>
            <AllPost />
          </AuthLayout>
        )
      } ,
      {
        path : '/add-post' ,
        element : (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        )
      } ,
      {
        path : '/edit-post/:slug' ,
        element : (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        )
      } ,
      {
        path : '/post/:slug' ,
        element : (
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        )
      } ,
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>    
  </StrictMode>,
)
