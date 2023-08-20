import { useEffect, useState } from "react";
import './ControlPane.css';




export default function ControlPane({setLocations, currUserLoc, fetchLocations, locations}) {

    let [ nearBy, setNearBy ] = useState("");
    let [ filterType, setFilterType ] = useState("null");
    let [ filterText, setFilterText] = useState("");

    const fetchLocationsByDistance = async () => {
        try {
            if (!isNearByValid()) {
                return;
            }
            const lat = currUserLoc.lat, lng = currUserLoc.lng, distance = nearBy;
            const response = await fetch('http://localhost:8080/geolocation/'+lat+'/'+lng+'/'+distance, {
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
            return data.geoLocations;
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const filterTypes = new Set(["hospital", "bank", "gym", "hotel", "mall", "restaurant"]);

    const filterTypesHtml = [];
    filterTypes.forEach( type => (
        filterTypesHtml.push(<option key={type} value={type}> {type.charAt(0).toUpperCase() + type.slice(1)} </option>)
    ))

    const fetchLocationsByType = async () => {
        try {
            if (!isFilterTypeValid()) {
                return;
            }
            const response = await fetch('http://localhost:8080/geolocation/'+filterType.toUpperCase(), {
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
            return data.geoLocations;
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    const fetchLocationsByTypeAndDistance = async () => {
        try {
            if (!isNearByValid() || !isFilterTextValid()) {
                return;
            }
            const lat = currUserLoc.lat, lng = currUserLoc.lng, distance = nearBy;
            const response = await fetch('http://localhost:8080/geolocation/'+lat+'/'+lng+'/'+filterType.toUpperCase()+'/'+distance, {
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
            return data.geoLocations;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const fetchLocationsByText = async () => {
        try {
            if (!isFilterTextValid()) {
                return;
            }
            const response = await fetch('http://localhost:8080/geolocation/search'+'/'+ encodeURIComponent(filterText), {
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
            return data.geoLocations;
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    const filterByLocation = (locs) => {
        return Array.from(locs).filter((loc) => filterType.toLowerCase() === loc.business.type.toLowerCase());
    }

    const filterByText = (locs) => {
        return locs.filter(loc => loc.business.name.toLowerCase().includes(filterText.toLowerCase()) || 
                                    loc.business.address.toLowerCase().includes(filterText.toLowerCase()));
    }

    const isFilterTypeValid = () => {
        return ( filterType && filterType!=="null");
    }

    const isNearByValid = () => {
        return (currUserLoc && nearBy && nearBy>0);
    }

    const isFilterTextValid = () => {
        return (filterText && filterText!=="");
    }

    const filterClicked = async () => {
        //if all filter are manually resetted and clicked on search
        if (!isFilterTypeValid() && !isNearByValid() && !isFilterTextValid()) {
            fetchLocations();
            console.log("resetted manually")
            return;
        }


        let locs;

        if (isFilterTypeValid() && isNearByValid() && isFilterTextValid()) {
            locs = await fetchLocationsByTypeAndDistance();
            locs = filterByText(locs);
        } else if (isFilterTypeValid() && isNearByValid()) {
            locs = await fetchLocationsByDistance();
            locs = filterByLocation(locs);
        } else if (isFilterTypeValid() && isFilterTextValid()) {
            locs = await fetchLocationsByType();
            locs = filterByText(locs);
        } else if (isNearByValid() && isFilterTextValid()) {
            locs = await fetchLocationsByDistance();
            locs = filterByText(locs);
        } else if (isFilterTextValid()) {
            locs = await fetchLocationsByText();
        } else if (isFilterTypeValid()) {
            locs = await fetchLocationsByType();
        } else if (isNearByValid()) {
            locs = await fetchLocationsByDistance();
        } else {
            return;
        }
    
        setLocations(locs);
    }

    const clearFilter = () => {
        setNearBy("");
        setFilterType("null");
        setFilterText("");
        fetchLocations();
    }

    // useEffect( () => {
    //     console.log("call fetch");
    // }, [nearBy])

    return (
        <div className="control-pane">

            <div className="filter-text">
                <span>Search</span>
                <input placeholder="Search" id="filterText" value={filterText} onChange={ e => setFilterText(e.target.value)}></input>
            </div>

            <div className="filter-type">
                <span>Type</span>
                <select name="type-select" id="typeSelect" value={filterType} onChange={ e => setFilterType(e.target.value)}>
                    <option value="null">-Select-</option>
                    {filterTypesHtml}
                </select>
            </div>

            <div className="filter-distance">
                <span>Distance(in mts)</span>
                <input disabled={!currUserLoc || currUserLoc===null} placeholder="Distance" value={nearBy} type="number" min="0" step="1" id="distanceFilter" onInput={e => setNearBy(e.target.value)}>
                </input>
                <div>Add current location by holding ctrl + left click on map</div>
            </div>

            <button id="filterBtn" className="filter-btn" onClick={e => filterClicked()}>
                Search
            </button>

            <span className="filter-clear" onClick={e => clearFilter()}>Clear filter</span>
        </div>
    )

}