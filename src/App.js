import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { supabase } from './client';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
    window.addEventListener('hashchange', function() {
      checkUser();
    });
  }, []);

  async function checkUser() {
    const user = await supabase.auth.getUser();
    console.log(user)
    setUser(user.data.user);
  }

  async function signInWithGithub() {
    const { user, session, error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    });
  }

  async function signOut() {
    supabase.auth.signOut();
    setUser(null);
  }

  if(user) {
    return (
      <div className="App">
        <h1>Welcome {user.email}</h1>
        <button onClick={signOut}>Sign Out</button>
      </div>);
  } else {
    return (
      <div className="App">
        <h1>Welcome</h1>
        <button onClick={signInWithGithub}>Sign In With Github</button>
      </div>);
  } 
}

export default App;
