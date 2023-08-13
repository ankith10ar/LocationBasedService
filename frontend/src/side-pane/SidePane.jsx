import Card from '../card/Card';
import './SidePane.css'

export default function SidePane(props) {

    const { locations } = props;
    // console.log(locations);

    const items = [];
    locations.forEach(location => {
        // console.log(location);
        items.push(<Card location={location}></Card>);
    })

    return (
        <div className="side-pane">
           { items }
            
        </div>
    );
}