//import { useState } from 'react'
//import Header from './components/Header'
//import Cards from './components/Cards'
import './components/HomePage/HomePage.css'
import SignInButton from './components/HomePage/SignInForm'
import SignUpForm from './components/HomePage/SignUpForm'
import NavBar from './components/HomePage/NavBar'
import HeroBanner from './components/HomePage/HeroBanner'
function App() {
  
      return(
        <div>
         <NavBar/>
         <HeroBanner/>
         <SignUpForm/>
          <SignInButton/>   
        </div>
        
    )
}

export default App
