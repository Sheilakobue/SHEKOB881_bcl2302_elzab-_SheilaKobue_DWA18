import React, {useState} from 'react'
import Header from "./components/MainPages/Header";
import Cards from "./components/MainPages/Cards";
import Carousel from "./components/MainPages/Carousel";
import "./components/MainPages/MainPage.css";
import "./Carousel.css";
import { supabase } from "./components/MainPages/SupabaseClient";
import SupabaseClient from "./components/MainPages/SupabaseClient";

//import SignInOut from './components/MainPages/SignInOut'

export default function App() {
const [throwSignUp, setThrowSignUp] = useState("signUpPhase");

  React.useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        console.log("User signed in successfully:", session.user.email);
        setThrowSignUp("PreviewPhase");
      }
    });
    return () => {
      authListener.unsubscribe;
    };
  }, []);

  return (
    <div>
    {throwSignUp === 'signUpPhase' && <SupabaseClient />}
      {throwSignUp === 'PreviewPhase' &&
    <div>
    
      <Header />
      <Carousel />
      <Cards />
    </div>
  }

  </div>
  );
}
