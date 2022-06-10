import axios from 'axios';

const apiUrl = 'http://localhost:3005/rental_event';

export function saveRental(rental) {
    if (!rental.id) {
        return axios.post(apiUrl, rental);
    }
    return axios.put(`${apiUrl}/${rental.id}`, rental);
}