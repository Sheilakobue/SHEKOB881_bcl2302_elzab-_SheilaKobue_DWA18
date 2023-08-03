import  { useEffect } from 'react'; 
import { supabase } from '../supabaseClient'; 
import { ThemeSupa } from '@supabase/auth-ui-shared';
 import { Auth } from '@supabase/auth-ui-react'; 

  const Login = ({ onLogin, setShowAuth }) => { 

        const handleSession = (session) => {    
           if (session?.user) {handleLogin(session);     }   };
               return (         
                   <div className="login">     
                 <header className="App-Header">       
                   <Auth         
                     supabaseClient={supabase}          
                      appearance={{ theme: ThemeSupa }}          
                       theme="dark"           
                       providers={['google']}           
                       handleSession={handleSession} // Call handleLogin when the session
                       />
                       </header>
                       </div>
               )
  };