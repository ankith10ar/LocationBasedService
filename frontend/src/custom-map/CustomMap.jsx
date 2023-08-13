import { ComposableMap, ZoomableGroup, Geographies, Geography } from "react-simple-maps"
import { useState } from "react";
import geoUrl from "../assets/china.json"

export default function FullyCustomMap() {

    const [position, setPosition] = useState({ coordinates: [15, 50], zoom: 1 });

    function handleZoomIn() {
        if (position.zoom >= 4) return;
        setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
    }

    function handleZoomOut() {
        if (position.zoom <= 1) return;
        setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
    }

    function handleMoveEnd(position) {
        setPosition(position);
    }
    // const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/north-america.json";
    console.log("render maps", geoUrl);

    return (
        <ComposableMap
            className="custom-map"
            projection="geoEqualEarth"
            projectionConfig={{
                // center: [0, 55.4],
                // rotate: [4.4, 0, 0],
                // parallels: [50, 60],
                // scale: 200,
            }}>
            <ZoomableGroup
                zoom={position.zoom}
                center={position.coordinates}
                onMoveEnd={handleMoveEnd}>
                <Geographies geography={geoUrl}>
                    {({ geographies, borders, outline }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#DDD"
                                stroke="#FFF"
                            />
                        ))
                    }
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    )
}