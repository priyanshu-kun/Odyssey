import React from 'react';
import {useHistory} from "react-router-dom"
import "./Auth.css"
import { useAuth0 } from "@auth0/auth0-react"



function Auth() {

  const {loginWithRedirect} = useAuth0()
  const {  isAuthenticated, isLoading } = useAuth0()
  const history = useHistory()

  return (
    isLoading ?<div class="spinner"></div> : (
     !isAuthenticated ? (
      <div className="auth-overlay">
      <div className="auth-card">
        <h1 style={{opacity: "0.6",fontSize: "1.6rem",color: "#000"}}>Create a account 👩‍🏫</h1>
        <button className="loginBtn" onClick={() => loginWithRedirect()}>Log In with Auth0 </button>
      </div>
    </div>
     ): (
      history.push("/Home")
     )
    )
  );
}

export default Auth;