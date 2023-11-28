import React from 'react'
import { NavLink } from 'react-router-dom'
import "./default.css"

const DEFAULT_LAYOUT = ({children}) => {
  return (
    <div className='default_wrapper'>
      <header className='header_default'>
        <div>
          <NavLink className="one" to={"/home"}>HOME</NavLink>
          <NavLink className="one" to={"/attack"}>ATTACK</NavLink>
          <NavLink className="one" to={"/payload"}>PAYLOAD</NavLink>
          <NavLink className="one" to={"/one-victim"}>ONLY_VICTIM</NavLink>
          <NavLink className="one" to={"/help"}>HELP</NavLink>
        </div>
        <div>
          <img className='img_user' src='https://i.pinimg.com/originals/30/b7/25/30b7255ad8d4f4359cc65ccbfb154444.jpg' />
        </div>
      </header>
      {children}
    </div>
  )
}

export default DEFAULT_LAYOUT