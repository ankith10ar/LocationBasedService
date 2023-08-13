export default function Card(props) {
    
    const { location } = props;
    const { name, address, contact, email } = location.business;

    // console.log(location);

    return (
        <div className="card">
            <span className="title">{name}</span>
            <span className="address">{address}</span>
            <span className="contact">{contact}</span>
            <span className="email">{email}</span>
        </div>
    );
}