import {MapContainer, TileLayer, Marker, Popup, Tooltip, useMap} from 'react-leaflet';
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

function onClickMarker(e) {
    console.log(e);
}

function PaneToFirstLocation({locations}) {
    const map = useMap();
    if (locations && locations.length>0) {
        console.log(locations[0].geo);
        const centerLat = locations[0].geo.coordinates[0];
        const centerLon = locations[0].geo.coordinates[1];
        map.panTo([centerLat, centerLon]);
    }
}


function DeclutterLabels({markers}) {
    let hideLabel = function(label){ if (label.labelObject.parentElement) { label.labelObject.parentElement.classList.add('my-div-icon-dot'); label.labelObject.parentElement.classList.remove('my-div-icon'); }};
    let showLabel = function(label){ if (label.labelObject.parentElement) { label.labelObject.parentElement.classList.remove('my-div-icon-dot'); label.labelObject.parentElement.classList.add('my-div-icon'); }};
    let labelEngine = new labelgun(hideLabel, showLabel, 100);
    const map = useMap();
    const minZoom = map.getMinZoom();
    const maxZoom = map.getMaxZoom();
    
    let i=1;
    markers.forEach(marker => {
        if (document.getElementsByClassName('leaflet-marker-icon')[i-1]) {
            addLabel(document.getElementsByClassName('leaflet-marker-icon')[i-1].querySelector('.my-div-div'), ++i);
        }
    })
    
    map.on("zoomend", () => {
        resetLabels(markers);
        i=1;
        console.log(map.getZoom());
        let zoom = map.getZoom();
        if (zoom<8) {
            markers.forEach(marker => {
                if (document.getElementsByClassName('leaflet-marker-icon')[i-1]) {
                    document.getElementsByClassName('leaflet-marker-icon')[i++ - 1].classList.add('my-div-icon-dot');
                    document.getElementsByClassName('leaflet-marker-icon')[i++ - 1].classList.remove('my-div-icon');
                }
            })
        } else if (zoom>13) {
            markers.forEach(marker => {
                if (document.getElementsByClassName('leaflet-marker-icon')[i-1]) {
                    document.getElementsByClassName('leaflet-marker-icon')[i++ - 1].classList.remove('my-div-icon-dot');
                    document.getElementsByClassName('leaflet-marker-icon')[i++ - 1].classList.add('my-div-icon');
                }
            })
        } else {
            markers.forEach(marker => {
                if (document.getElementsByClassName('leaflet-marker-icon')[i-1]) {
                    document.getElementsByClassName('leaflet-marker-icon')[i++ - 1].querySelector('.my-div-image').style.height= (10+5*(zoom-8)) + 'px';
                } 
            })
        }
      });

    resetLabels(markers);

    function resetLabels(markers) {

        let i = 1;
        markers.forEach(marker => {
            if (document.getElementsByClassName('leaflet-marker-icon')[i-1]) {
                addLabel(document.getElementsByClassName('leaflet-marker-icon')[i-1].querySelector('.my-div-div'), i++);
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


export default function CustomMap2(props) {


    const {locations} = props;

    

    const markers = [];
    locations.forEach(location => {
        markers.push(
            <Marker id={location.business.id} key={location.business.id} position={[location.geo.coordinates[0], location.geo.coordinates[1]]} icon={renderMarker(location.business.type, location.business.name)} eventHandlers={{ click: (e) => onClickMarker(e) }}>
            {/* <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup> */}
            <Tooltip>{location.business.type}</Tooltip>
        </Marker>
        )
    });



    return (
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
            <PaneToFirstLocation locations={locations}></PaneToFirstLocation>
            <DeclutterLabels markers={markers}></DeclutterLabels>
        </MapContainer>
    );
}