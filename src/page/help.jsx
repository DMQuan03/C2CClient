import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./help.css"

const command = [
    "1 . Dir",
    "2 . Whoami",
    "3 . Screen"
]

const Documents = [
    "1 . Warning !!! I do not take any responsibility for your actions !!!",
    "2 . I do not take any responsibility for your actions !!!",
    "3 . Website created by Mr. Duong Minh Quan from Vietnam",
    "4 . C2 server site created for educational purposes or used for site vulnerability testing with permission",
    "5 . cyberattacks are illegal very high penalties beware use for legal purposes we are not responsible for any illegal actions of you"
]

const HELP = () => {
    const [message , setMessage] = useState("")
    const [list_data , setListData] = useState([
        {
            data : "robot_help",
            ip : "2"
        },
        {
            data : "robot_documents",
            ip: "2"
        }
    ])

    const handle_help = (data) => {
        switch(data){
            case "help":
                data = 
                {
                    data : "robot_help",
                    ip : "2"
                }
                return data
            case "command":
                data = {data : "robot_command",
                    ip : "2"
                }
                return data
            case "documents":
                data = {
                    data : "robot_documents",
                    ip : "2"
                }
                return data
            default:
                data = {
                    data : "please send help",
                    ip : "2"
                }
                return data
        }
    }

    const handle_message = () => {
        const data_sie = {
            data : message,
            ip : "1"
        }
        setListData(prev => [...prev , data_sie])
        let data = handle_help(message)
        setListData(prev => [...prev , data])
        // const socket = io.connect("http://localhost:5678")
        // socket.emit("help", message)
        // socket.on("result_help", (data) => {
        //     alert(data)
        // })
        setMessage("")
    }
  return (
    <div className='wrapper_help'>
        <div className='message'>
            {list_data.map((el) => {
                if (el.ip === "1") {
                    var ip_message = "you"
                    var ip_message1 = "you1"
                }else if (el.ip === "2") {
                    var ip_message = "robot"
                    var ip_message1 = "robot1"
                }
                if (el.data === "robot_help") {
                    return <div className={ip_message}><p className={ip_message1}>
                        <div className='just_one'>1 . help</div>
                        <div className='just_one'>2 . command</div>
                        <div className='just_one'>3 . attack</div>
                        <div className='just_one'>4 . documents</div>
                        <div className='just_one'>5 . clear</div>
                    </p></div>
                }else if (el.data === "robot_command") {
                    return <div className={ip_message}><p className={ip_message1}>
                        {command.map((el) => {
                            return <div className='just_one'>{el}</div>
                        })}
                    </p></div>
                }else if (el.data === "clear") {
                    setListData([])
                }
                else if (el.data === "robot_documents") {
                    return <div className={ip_message}><p className={ip_message1}>
                        {Documents.map((el) => {
                            return <div className='just_one'>{el}</div>
                        })}
                    </p></div>
                }
                else {
                    return <h1 className={ip_message}><p className={ip_message1}>{el.data}</p></h1>
                }
            })}
        </div>
        <div className='send_message'>
            <input value={message} onChange={(e) => {
                setMessage(e.target.value)
            }} className='input_help' />
            <button onClick={handle_message}>Send</button>
        </div>
        <NavLink to={"/home"} className='back_home' >{"<< to home"}</NavLink>
    </div>
  )
}

export default HELP