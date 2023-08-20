export const FetchLocationsByDistance = async (lat, lng, distance) => {
    try {   
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

export const FetchLocationsByType = async (filterType) => {
    try {   
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


export const FetchLocationsByTypeAndDistance = async (lat, lng, filterType, distance) => {
    try {
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


export const FetchLocationsByText = async (filterText) => {
    try {
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
