import './App.css';
import { BrowserRouter as Router ,Route , Routes } from 'react-router-dom';
import public_Router from './router/router';
import DEFAULT_LAYOUT from './defaultLayout/header';
import { Fragment, useEffect, useState } from 'react';
// API key of the google map
// const GOOGLE_MAP_API_KEY = 'AIzaSyBQiTn-kIN8jRvHrCsclhDjD8QAxf_HSU4';

// // load google map script
// const loadGoogleMapScript = (callback) => {
//   if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
//     callback();
//   } else {
//     const googleMapScript = document.createElement("script");
//     googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
//     window.document.body.appendChild(googleMapScript);
//     googleMapScript.addEventListener("load", callback);
//   }
// }

function App() {

  // const [loadMap, setLoadMap] = useState(false);

  // useEffect(() => {
  //   loadGoogleMapScript(() => {
  //     setLoadMap(true)
  //   });
  // }, []);
  
  return (
    <div className="App">
      <Router>
          <Routes>
            {public_Router.map(rou => {
              const PAGE = rou.component
              var DEFAULT = DEFAULT_LAYOUT
              if (rou.not_Layout === true) {
                var DEFAULT = Fragment
              }
              return <Route path={rou.path} element={<DEFAULT><PAGE /></DEFAULT>}/>
            })}
          </Routes>
      </Router>
    </div>
  );
}

export default App;
