import L from 'leaflet';
import './CustomMarker.css';
import hospitalSmall from '../assets/icons/hospital/Hospital.svg';
import bankSmall from '../assets/icons/bank/Bank.svg';
import gymSmall from '../assets/icons/gym/Gym.svg';
import hotelSmall from '../assets/icons/hotel/Hotel.svg';
import mallSmall from '../assets/icons/mall/Mall.svg';
import restaurantSmall from '../assets/icons/restaurant/Restaurant.svg';

function CustomMarker(icon, label, type) {
    return L.divIcon({
        className: "my-div-"+ type +"-icon my-div-icon",
        html: '<div class="my-div-div"><img class="my-div-image" src="'+icon+'"/>'+
                '<span class="my-div-span">'+label+'</span></div>'
    })
}

export const HospitalMarker = CustomMarker(hospitalSmall, 'Hospital');

export const BankMarker = CustomMarker(bankSmall, 'Bank');

export const GymMarker = CustomMarker(gymSmall, 'Gym');

export const HotelMarker = CustomMarker(hotelSmall, 'Hotel');

export const MallMarker = CustomMarker(mallSmall, 'Mall');

export const RestaurantMarker = CustomMarker(restaurantSmall, 'Restaurant');


export default function renderMarker(type, name) {
    if (type.toLowerCase()==='hospital') {
        return CustomMarker(hospitalSmall, name, 'hospital');;
    } else if (type.toLowerCase()==='bank') {
        return CustomMarker(bankSmall, name, 'bank');
    } else if (type.toLowerCase()==='gym') {
        return CustomMarker(gymSmall, name, 'gym');
    } else if (type.toLowerCase()==='hotel') {
        return CustomMarker(hotelSmall, name, 'Hotel');
    } else if (type.toLowerCase()==='mall') {
        return CustomMarker(mallSmall, name, 'mall');
    } else if (type.toLowerCase()==='restaurant') {
        return CustomMarker(restaurantSmall, name, 'restaurant');
    }
}

