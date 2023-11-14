import { render, screen, queryByAttribute, getByText, waitFor, fireEvent } from '@testing-library/react';
import * as services from "../services/Service";
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import CustomMap2 from './CustomMap2';

const getById = queryByAttribute.bind(null, 'id');
let currUserLoc = null;
const setCurrUserLoc = jest.fn();
// () => {
//     currUserLoc = {
//         "lat": 50.012,
//         "lng": 41.234
//     }
// }
const setSelectedLocation = jest.fn();


const locations = [
    {
        "business": {
            "id": "1",
            "name": "CultFit",
            "address": "Bellandur",
            "type": "HOTEL",
            "contact": "+91 0408532919",
            "email": "cult@cultfit.com",
            "latitude": 49.3490210804,
            "longitude": 49.4433130888
        },
        "geo": {
            "type": "Point",
            "coordinates": [
                49.3490210804,
                49.4433130888
            ]
        }
    }
]

test("Check if elements are rendered properly", () => {
    const dom = render(<CustomMap2 
                            setCurrUserLoc={setCurrUserLoc} 
                            currUserLoc={null} 
                            locations={locations}
                            selectedLocation={null}
                            setSelectedLocation={setSelectedLocation}/>);

    let linkElements = [];
    linkElements.push(expect(screen.getByText("CultFit")));

    Array.from(linkElements).forEach(e => e.toBeInTheDocument());
})


test("Add user location on map", async () => {
    const dom = render(<CustomMap2 
                            setCurrUserLoc={setCurrUserLoc} 
                            currUserLoc={currUserLoc} 
                            locations={locations}
                            selectedLocation={null}
                            setSelectedLocation={setSelectedLocation}/>);

    const map = screen.getByTestId('map-div').getElementsByClassName('leaflet-container')[0];
    fireEvent.keyDown(map, {key: 'Control', charCode: 17});
    // await userEvent.keyboard('[Control]')
    
    fireEvent.click(map);
    fireEvent.keyUp(map, {key: 'Control', charCode: 17});
    await waitFor(() => {
        
        expect(screen.getByText("You")).toBeInTheDocument();
    });    
})