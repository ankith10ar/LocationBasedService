import { render, screen, queryByAttribute, getByText, waitFor, fireEvent } from '@testing-library/react';
import ControlPane from './ControlPane';
import * as services from "../services/Service";
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const getById = queryByAttribute.bind(null, 'id');

const setLocations = jest.fn();
const fetchLocations = jest.fn();
const currUserLoc = {
    "lat": 50.012,
    "lng": 41.234
}

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

const mockFetchLocationsByDistance = jest.spyOn(services, 'FetchLocationsByDistance')
                    .mockImplementation(async () => {
                        return locations;
                    });

const mockFetchLocationsByType = jest.spyOn(services, 'FetchLocationsByType')
                    .mockImplementation(async () => {
                        return locations;
                    });

const mockFetchLocationsByTypeAndDistance = jest.spyOn(services, 'FetchLocationsByTypeAndDistance')
                    .mockImplementation(async () => {
                        return locations;
                    });

const mockFetchLocationsByText = jest.spyOn(services, 'FetchLocationsByText')
                    .mockImplementation(async () => {
                        return locations;
                    });

function setDistanceFilter(dom) {
    act(() => {
        userEvent.type(getById(dom.container, 'distanceFilter'), '10000');
    });
}

function setTypeFilter(dom) {
    act(() => {
        userEvent.selectOptions(getById(dom.container, 'typeSelect'), 'hospital');
    });
}

function setTextFilter(dom) {
    act(() => {
        userEvent.type(getById(dom.container, 'filterText'), 'hospital');
    });
}   

async function clickSearch(dom) {
    await userEvent.click(getById(dom.container, 'filterBtn'));
}

function clickFilter() {
    act(() => {
        userEvent.click(screen.getByText("Clear filter"));
    });
}





test("Check if elements are rendered properly", () => {
    const dom = render(<ControlPane 
                            fetchLocations={fetchLocations} 
                            currUserLoc={null} 
                            setLocations={setLocations}/>);

    let linkElements = [];
    linkElements.push(expect(getById(dom.container, 'filterText')));
    linkElements.push(expect(getById(dom.container, 'typeSelect')));
    linkElements.push(expect(getById(dom.container, 'distanceFilter')));
    linkElements.push(expect(getById(dom.container, 'filterBtn')));
    linkElements.push(expect(screen.getByText("Clear filter")));

    Array.from(linkElements).forEach(e => e.toBeInTheDocument());
})

test("If currUserLoc is null then distanceFilter should be disabled", () => {
    const dom = render(<ControlPane 
                            fetchLocations={fetchLocations} 
                            currUserLoc={null} 
                            setLocations={setLocations}/>);

    expect(getById(dom.container, 'distanceFilter')).toBeDisabled();
})

test("If currUserLoc is present then distanceFilter should be enabled", () => {
    const dom = render(<ControlPane 
                            fetchLocations={fetchLocations} 
                            currUserLoc={currUserLoc} 
                            setLocations={setLocations}/>);

    expect(getById(dom.container, 'distanceFilter')).toBeEnabled();
})

test("If distance is set and search button is clicked then fetchByDistance should be called", () => {
    const dom = render(<ControlPane 
                            fetchLocations={fetchLocations} 
                            currUserLoc={currUserLoc} 
                            setLocations={setLocations}/>);

    setDistanceFilter(dom);
    clickSearch(dom)
    expect(mockFetchLocationsByDistance).toHaveBeenCalled();
})

test("If type is set and search button is clicked then fetchByType should be called", () => {
    const dom = render(<ControlPane 
                            fetchLocations={fetchLocations} 
                            currUserLoc={currUserLoc} 
                            setLocations={setLocations}/>);

    setTypeFilter(dom);
    clickSearch(dom)
    expect(mockFetchLocationsByType).toHaveBeenCalled();
})

test("If search text is entered and search button is clicked then fetchByText should be called", () => {
    const dom = render(<ControlPane 
                            fetchLocations={fetchLocations} 
                            currUserLoc={currUserLoc} 
                            setLocations={setLocations}/>);

    setTextFilter(dom);
    clickSearch(dom)
    expect(mockFetchLocationsByText).toHaveBeenCalled();
})

test("If type and distance is entered and search button is clicked then fetchByDistance should be called", async () => {
    const dom = render(<ControlPane 
                            fetchLocations={fetchLocations} 
                            currUserLoc={currUserLoc} 
                            setLocations={setLocations}/>);

    setDistanceFilter(dom);
    setTypeFilter(dom);
    clickSearch(dom)
    expect(mockFetchLocationsByDistance).toHaveBeenCalled();
})

test("If type and text is entered and search button is clicked then fetchByType should be called", async () => {
    const dom = render(<ControlPane 
                            fetchLocations={fetchLocations} 
                            currUserLoc={currUserLoc} 
                            setLocations={setLocations}/>);

    setTextFilter(dom);
    setTypeFilter(dom);
    clickSearch(dom);
    expect(mockFetchLocationsByType).toHaveBeenCalled();
})

test("If distance and text is entered and search button is clicked then fetchByDistance should be called", async () => {
    const dom = render(<ControlPane 
                            fetchLocations={fetchLocations} 
                            currUserLoc={currUserLoc} 
                            setLocations={setLocations}/>);

    setTextFilter(dom);
    setDistanceFilter(dom);
    clickSearch(dom);
    expect(mockFetchLocationsByDistance).toHaveBeenCalled();
})

test("If distance, type and text is entered and search button is clicked then fetchByTypeAndDistance should be called", async () => {
    const dom = render(<ControlPane 
                            fetchLocations={fetchLocations} 
                            currUserLoc={currUserLoc} 
                            setLocations={setLocations}/>);

    setTextFilter(dom);
    setDistanceFilter(dom);
    setTypeFilter(dom);
    clickSearch(dom);
    expect(mockFetchLocationsByTypeAndDistance).toHaveBeenCalled();
})

test("clear filter should clear values", async () => {
    const dom = render(<ControlPane 
                            fetchLocations={fetchLocations} 
                            currUserLoc={currUserLoc} 
                            setLocations={setLocations}/>);

    setTextFilter(dom);
    setDistanceFilter(dom);
    setTypeFilter(dom);
    clickFilter();
    await waitFor(() => {
        expect(getById(dom.container, 'filterText').value).toBe("");
    })
})

// test("if user hovers over disabled distance filter then tooltip should appear", async () => {
//     const dom = render(<ControlPane 
//                             fetchLocations={fetchLocations} 
//                             currUserLoc={null} 
//                             setLocations={setLocations}/>);

//     // userEvent.hover(getById(dom.container, 'distanceFilter'));
//     // fireEvent.mouseOver(getById(dom.container, 'distanceFilter'))
//     // const style = window.getComputedStyle()
//     await waitFor(() => {
//         expect(getById(dom.container, 'filterDistanceToolTip')).toHaveStyle('z-index: 5');
//     });
// })



