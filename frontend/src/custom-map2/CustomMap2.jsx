import {MapContainer, TileLayer, Marker, Popup, Tooltip, useMap, useMapEvent} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import 'leaflet/dist/images/marker-icon.png';
// import 'leaflet/dist/images/layers-2x.png';
// import 'leaflet/dist/images/layers.png';
// import 'leaflet/dist/images/marker-icon-2x.png';
// import 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import renderMarker from '../markers/CustomMarker';
import  labelgun  from 'labelgun';
import { useEffect, useState, useRef } from 'react';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const hospital = L.divIcon({
    className: "my-div-icon",
    html: '<img class="my-div-image" src="'+icon+'"/>'+
            '<span class="my-div-span">Hospital</span>'
})



function PaneToFirstLocation({locations, selectedLocation}) {
    const map = useMap();
    // const id = selectedLocation ? selectedLocation:0;
    if (locations && locations.length>0) {
        // console.log(selectedLocation);

        if (selectedLocation) {
            const location = locations.find( (loc) => loc.business.id === selectedLocation);
            if (!location) return;
            const centerLat = location.geo.coordinates[0];
            const centerLon = location.geo.coordinates[1];
            // map.panTo([centerLat, centerLon]);
            // map.setView([centerLat, centerLon], 12, { animate: true, pan: {duration: 1}});
            map.flyTo([centerLat, centerLon], 13, { animate: true, duration: 1});
        } 
        // else {
        //     const centerLat = locations[0].geo.coordinates[0];
        //     const centerLon = locations[0].geo.coordinates[1];
        //     // map.panTo([centerLat, centerLon]);
        //     // map.setView([centerLat, centerLon], 12, { animate: true, pan: {duration: 1}});
        //     map.flyTo([centerLat, centerLon], 13, { animate: true, duration: 1});
        // }

        
    }
}



function DeclutterLabels({markers}) {
    let hideLabel = function(label){ if (label.labelObject.parentElement) { label.labelObject.parentElement.classList.add('my-div-icon-dot'); label.labelObject.parentElement.classList.remove('my-div-icon'); }};
    let showLabel = function(label){ if (label.labelObject.parentElement) { label.labelObject.parentElement.classList.remove('my-div-icon-dot'); label.labelObject.parentElement.classList.add('my-div-icon'); }};
    let labelEngine = new labelgun(hideLabel, showLabel, 100);
    const map = useMap();
    // const minZoom = map.getMinZoom();
    // const maxZoom = map.getMaxZoom();
    
    let i=1;
    Array.from(document.getElementsByClassName('leaflet-marker-icon')).forEach( (element, index) => {
        if (element) {
            addLabel(element.querySelector('.my-div-div'), index);
        }
    })
    
    map.on("zoomend", () => {
        resetLabels(markers);
        i=1;
        // console.log(map.getZoom());
        let zoom = map.getZoom();
        if (zoom<8) {
            Array.from(document.getElementsByClassName('leaflet-marker-icon')).forEach(element => {
                if (element) {
                    element.classList.add('my-div-icon-dot');
                    element.classList.remove('my-div-icon');
                }
            })
        } else if (zoom>13) {
            Array.from(document.getElementsByClassName('leaflet-marker-icon')).forEach( element => {
                if (element) {
                    element.classList.remove('my-div-icon-dot');
                    element.classList.add('my-div-icon');
                }
            })
        } else {
            Array.from(document.getElementsByClassName('leaflet-marker-icon')).forEach( element => {
                if (element) {
                   element.querySelector('.my-div-image').style.height= (10+5*(zoom-8)) + 'px';
                } 
            })
        }
      });

    resetLabels(markers);

    function resetLabels(markers) {

        let i = 1;
        Array.from(document.getElementsByClassName('leaflet-marker-icon')).forEach( (element, index) => {
            if (element) {
                addLabel(element.querySelector('.my-div-div'), index);
            }
        })
        labelEngine.update();
      
    }


    function addLabel(label, id) {

        // This is ugly but there is no getContainer method on the tooltip :(
        // var label = layer.getTooltip()._source._tooltip._container;
        if (label) {
      
          // We need the bounding rectangle of the label itself
          var rect = label.getBoundingClientRect();
      
          // We convert the container coordinates (screen space) to Lat/lng
          var bottomLeft = map.containerPointToLatLng([rect.left, rect.bottom]);
          var topRight = map.containerPointToLatLng([rect.right, rect.top]);
          var boundingBox = {
            bottomLeft : [bottomLeft.lng, bottomLeft.lat],
            topRight   : [topRight.lng, topRight.lat]
          };
      
          // Ingest the label into labelgun itself
          labelEngine.ingestLabel(
            boundingBox,
            id,
            parseInt(Math.random() * (5 - 1) + 1), // Weight
            label,
            "Test " + id,
            false
          );
      
        }
    }
}


function AddCurrentLocation({currUserLoc, setCurrUserLoc, setSelectedLocation}) {

    const map = useMap();
    let [ ctrlEnabled, setCtrlEnabled ] = useState(false);
    const ctrlRef = useRef();
    ctrlRef.current = ctrlEnabled;

    

    function keyDownFunction(e) {
        e.preventDefault();
        // console.log('Keydown Func');
        if (e.ctrlKey && !ctrlRef.current) {
            setCtrlEnabled(true);
            // console.log('CTRL enabled');
        } 
    }

    function keyUpFunction(e) {
        e.preventDefault();
        // console.log('Keyup Func');
        if (!e.ctrlKey && ctrlRef.current) {
            setCtrlEnabled(false);
            // console.log('CTRL disabled');
        }
    }

    useEffect(() => {

        document.getElementsByClassName('leaflet-container')[0].addEventListener('mouseover', (event) => {
            document.addEventListener('keydown', keyDownFunction);
            document.addEventListener('keyup', keyUpFunction);
        })

        document.getElementsByClassName('leaflet-container')[0].addEventListener('mouseleave', (event) => {
            document.removeEventListener('keydown', keyDownFunction);
            document.removeEventListener('keyup', keyUpFunction);
        })
        
    }, [ctrlEnabled]);


    function addMarker(e) {
        setCurrUserLoc(e.latlng);
        setSelectedLocation(null);
        console.log(e);
    }

    console.log(ctrlEnabled);
    if (ctrlEnabled) {
        L.DomUtil.addClass(map._container,'leaflet-crosshair');
        L.DomUtil.removeClass(map._container,'leaflet-grab');
        map.on('click', addMarker);
    } else {
        L.DomUtil.removeClass(map._container,'leaflet-crosshair');
        L.DomUtil.addClass(map._container,'leaflet-grab');
        map.off('click');
    }

    if (currUserLoc) {
        
        return (
                <Marker 
                    id='user'
                    key='user' 
                    position={currUserLoc} 
                    icon={renderMarker('user', 'You')} 
                // eventHandlers={{ click: (e) => onClickMarker(e, location.business.id) }}
                >

                {/* <Tooltip>{location.business.type}</Tooltip> */}
                </Marker>
        )
    }
}


export default function CustomMap2(props) {


    const {locations, selectedLocation, setSelectedLocation, currUserLoc, setCurrUserLoc} = props;

    function onClickMarker(e, id) {
        setSelectedLocation(id);
    }


    
    

    const markers = [];
    locations.forEach(location => {
        markers.push(
            <Marker id={location.business.id} 
                    key={location.business.id} 
                    position={[location.geo.coordinates[0], location.geo.coordinates[1]]} 
                    icon={renderMarker(location.business.type, location.business.name)} 
                    eventHandlers={{ click: (e) => onClickMarker(e, location.business.id) }}>
            {/* <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup> */}
                <Tooltip>{location.business.type}</Tooltip>
            </Marker>
        )
    });



    return (
        <div className='map-div'>
            <MapContainer style={{ width: "100%", height: "60vh" }} center={[50.0, 50.0]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <Marker position={[50.0, 50.0]} icon={hospital} eventHandlers={{ click: (e) => onClickMarker(e) }}> */}
                    {/* <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup> */}
                    {/* <Tooltip>Hospital</Tooltip>
                </Marker> */}

                {markers}
                <PaneToFirstLocation locations={locations} selectedLocation={selectedLocation}></PaneToFirstLocation>
                <DeclutterLabels markers={markers}></DeclutterLabels>
                <AddCurrentLocation currUserLoc={currUserLoc} setCurrUserLoc={setCurrUserLoc} setSelectedLocation={setSelectedLocation}></AddCurrentLocation>
            </MapContainer>
        </div>
    );
}