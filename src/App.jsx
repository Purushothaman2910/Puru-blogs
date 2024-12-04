import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components'
import { logOut, login } from './Store/AuthSlice'
import { useDispatch } from 'react-redux'
import appwriteServices from './appwrite/Auth'


function App() {
  const [loading, setLoading] = useState(true);
  let dispatch = useDispatch()
  useEffect(() => {
    appwriteServices.getCurrentUser().then((user) => {      
      if (user) {
        dispatch(login({ userData : user }))
      } else {
        dispatch(logOut())
      }
    }).finally(() => {
      setLoading(false)
    })
  }, [dispatch])
  return (!loading) ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main className='min-h-[70vh]'>
          <Outlet />
        </main>
      </div>
      <div className="w-full block">
        <Footer />
      </div>
    </div>
  ) : null
}

export default App