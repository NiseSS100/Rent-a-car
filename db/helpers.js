export default function getAvailableCars(data) {
    let counter = 0;
    if (undefined != data.vehicle) {
        data.vehicle.map(el => el.isFree ? counter++ : null);
    }
    return counter;
}
//import data from '../../db/db.json';
//import getAvailableCars from '../../db/helpers.js';