import React from 'react'
import Container from '../containers/Container'
import Logo from '../Logo'
import Logout from './Logout'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ListItem({children}) {
    return (
      <li className='flex items-center px-6 py-1 duration-200 hover:bg-blue-100 rounded hover:shadow-slate-400 hover:hadow-lg' >
          {children}
      </li> 
    )
  }

function HeaderDiv() {
    const authStatus = useSelector((state) => state.auth.status)

    let navigationItems = [
        {
            name : "Home" ,
            slug : "/" ,
            active : true 
        } ,
        {
            name : "Login" ,
            slug : "/login" ,
            active : !authStatus 
        } ,
        {
            name : "Sign up" ,
            slug : "/signup" ,
            active : !authStatus 
        } ,
        {
            name : "All posts" ,
            slug : "/all-post" ,
            active : authStatus
        } ,
        {
            name : "Add posts" ,
            slug : "/add-post" ,
            active : authStatus
        } ,
    ]

  return (
    <header className='py-3 shadow bg-gray-400'>
        <Container>
            <nav className='flex justify-between'>
                <div className='mr-4 flex-grow'>
                    <Link to="/">
                        <Logo className='rounded object-cover h-[60px] w-[50px]' width='75px'/>
                    </Link>
                </div>
                <ul className='flex flex-grow justify-evenly'>
                    {
                        navigationItems.filter(item => item.active).map(({name , slug , active} , i ) => (
                            <ListItem key={i}>                                
                                <Link to={slug}>{name}</Link>
                            </ListItem>
                            
                        ))
                    }
                    {
                        (authStatus) && ( <ListItem ><Logout /> </ListItem>)
                    }
                </ul>
                </nav>
        </Container>
    </header>
  )
}

export default HeaderDiv