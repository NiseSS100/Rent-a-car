import axios from "axios";

export const VehicleType = {
    SUV: 'SUV',
    CARGO: 'Cargo',
    ECONOMY: 'Economy',
    ESTATE: 'Estate',
    LUXURY: 'Luxury'
};

export const VehicleFuelType = {
    DIESEL: 'Diesel',
    PETROL: 'Petrol',
    ELECTRIC: 'Electric',
    HYBRID: 'Hybrid'
};

const apiUrl = 'http://localhost:3005/vehicle';

export function getAllVehicles() {
    return axios.get(apiUrl);
}

export function getAllRentedVehiclesByUser(userId) {
    var info = [];
    axios.get(`http://localhost:3005/rental_event?Customer=${userId}`).then(data => data.data.map(
        val => axios.get(apiUrl + '/' + val.Vehicle).then(ret => info.push(ret.data))));
    return info;
}

export function getVehicleById(vehicleId) {
    return axios.get(`${apiUrl}/${vehicleId}`);
}

export function saveVehicle(vehicle) {
    if (!vehicle.id) {
        return axios.post(apiUrl, vehicle);
    }
    return axios.put(`${apiUrl}/${vehicle.id}`, vehicle);
}

export function deleteVehicle(id) {
    return axios.delete(`${apiUrl}/${id}`);
}