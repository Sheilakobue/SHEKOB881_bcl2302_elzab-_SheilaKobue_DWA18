import SupabaseClient from './SupabaseClient';
import { supabase } from './SupabaseClient'

export default function Impo() {

const [throwSignUp, setThrowSignUp] = useState('signUpPhase')

React.useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        console.log("User signed in successfully:", session.user.email);
        setThrowSignUp('PreviewPhase')
      }
    });
    return () => {
      authListener.unsubscribe;
    };
  }, []);


    return (
        
        {throwSignUp === 'signUpPhase' && <SupabaseClient />}
     {throwSignUp === 'PreviewPhase' &&
    
     }
    

        <div/>
    )
}