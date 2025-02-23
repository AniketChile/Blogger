import { useEffect, useState } from 'react'
import './App.css'
import conf from './conf/conf'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'
import Logo from './components/Logo'

function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData)=> {
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    } )
    .finally(()=>setLoading(false))
  }, []);
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>  
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
