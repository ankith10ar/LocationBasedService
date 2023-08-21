import { render, screen, queryByAttribute, getByText, waitFor } from '@testing-library/react';
import SidePane from './SidePane';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const getById = queryByAttribute.bind(null, 'id');

const setSelectedLocation = jest.fn();
const scrollIntoView = jest.fn();
const selectedLocation = '1';

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
    const dom = render(<SidePane 
                            locations={locations} 
                            selectedLocation={null} 
                            setSelectedLocation={setSelectedLocation}/>);

    let linkElements = [];
    linkElements.push(expect(screen.getByText("CultFit")));
    linkElements.push(expect(screen.getByText("Bellandur")));
    linkElements.push(expect(screen.getByText("+91 0408532919")));
    linkElements.push(expect(screen.getByText("cult@cultfit.com")));
    linkElements.push(expect(getById(dom.container, 'card-1')));

    Array.from(linkElements).forEach(e => e.toBeInTheDocument())
})

test("Click on the card and check if setSelectedLocation is called", () => {
    const dom = render(<SidePane 
                            locations={locations} 
                            selectedLocation={null} 
                            setSelectedLocation={setSelectedLocation}/>);

    userEvent.click(getById(dom.container, 'card-1'));
    expect(setSelectedLocation).toHaveBeenCalled();    
})

test("If selectedLocation is set then check scrollIntoView is called", async () => {
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView;
    const dom = render(<SidePane 
                            locations={locations} 
                            selectedLocation={selectedLocation} 
                            setSelectedLocation={setSelectedLocation}/>);
    expect(scrollIntoView).toHaveBeenCalled();    
})