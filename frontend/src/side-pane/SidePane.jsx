import { useEffect, useRef } from 'react';
import Card from '../card/Card';
import './SidePane.css'

export default function SidePane(props) {

    const { locations, selectedLocation, setSelectedLocation } = props;

    const listRef = useRef(null);

    useEffect(() => {
        const selectedCard = listRef.current.children.length>0? Array.from(listRef.current.children).find((card) => card.id==='card-'+selectedLocation):null;
        selectedCard?.scrollIntoView({ block: 'start',  behavior: 'smooth' });

        // console.log(listRef);
    }, [selectedLocation])

    const items = [];
    locations.forEach(location => {
        items.push(<Card 
                        key={location.business.id} 
                        location={location} 
                        selected={location.business.id === selectedLocation}
                        setSelectedLocation={setSelectedLocation}></Card>);
    })

    return (
        <div ref={listRef} className="side-pane">
           { items }
        </div>
    );
}