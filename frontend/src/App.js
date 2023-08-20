// import logo from './logo.svg';
import './App.css';
import FullyCustomMap from './custom-map/CustomMap';
import { ComposableMap, ZoomableGroup } from 'react-simple-maps';
import CustomMap2 from './custom-map2/CustomMap2';
import SidePane from './side-pane/SidePane';
import { useState, useEffect } from 'react';
import ControlPane from './control-pane/ControlPane';
import logo from './assets/logo.png'

function App() {

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  let [ currUserLoc, setCurrUserLoc ] = useState();


  const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:8080/geolocation/get-all', {
          method: 'GET',
          headers: {
            "Accept": "application/json"
          }
        });
        // console.log(response.json());
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setLocations(data.geoLocations);
      } catch (error) {
        console.error('Error:', error);
      }
  }

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    setSelectedLocation(null);
  }, [locations])

  return (
    <div className="App">
      <div className='app-container'>

        <div className='map-logo'>
          <img alt='logo' src={logo} className='map-logo'></img>
        </div>
        <ControlPane 
          setLocations={setLocations} 
          currUserLoc={currUserLoc} 
          fetchLocations={fetchLocations}
        ></ControlPane>

        <SidePane selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} locations={locations}></SidePane>


        <CustomMap2 
          selectedLocation={selectedLocation} 
          setSelectedLocation={setSelectedLocation} 
          locations={locations} 
          currUserLoc={currUserLoc} 
          setCurrUserLoc={setCurrUserLoc}
        ></CustomMap2>

      </div>
    </div>
  );
}

export default App;
