import './Card.css';

export default function Card(props) {
    
    const { location, selected, setSelectedLocation } = props;
    const { id, name, address, contact, email } = location.business;

    // console.log(location);

    return (
        <div id={ "card-"+ id } className={"card " + (selected==true? "card-selected": "")} onClick={ e => setSelectedLocation(id) } >
            <span className="title">{name}</span>
            <span className="address">{address}</span>
            <span className="contact">{contact}</span>
            <span className="email">{email}</span>
        </div>
    );
}