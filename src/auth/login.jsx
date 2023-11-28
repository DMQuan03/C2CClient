import React, { useEffect, useState } from 'react'
import { useNavigate} from "react-router-dom"
import "./login.css"
import {io} from "socket.io-client"


const LOGIN = () => {
    const navigate = useNavigate()
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const [error , setError] = useState(false)
    
    const handle_Login = () => {
        if (username === "Admin123" && password === "Admin123") {
            navigate("/home")
        }else {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2000);
            return 0
        }
    }

  return (
    <div className='container_login'>
        <div className='main_login'>
            <header className='header_login'>Death Web Login</header>
            <div className='wrapper_input_login'>
                <div id="login_form">
                    <div className='us'>
                        <div>
                            <h2>user name</h2>
                        </div>
                        <input id="user_name" name="username" type='text' value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        /></div>
                    <div className='ps'>
                        <div>
                            <h2>pass word</h2>
                        </div>
                        <input id='pass_word' name="password" type="password" value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                         />
                    </div>
                    <div id="lg">
                        <button onClick={handle_Login} id="Login">
                            Sing in
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {error && <div className='error_login'>
            <h2>Wrong username or password :((</h2>
        </div>}
    </div>
  )
}

export default LOGIN