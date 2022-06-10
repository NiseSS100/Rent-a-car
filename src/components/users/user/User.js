import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../../utils/http-utils/user-requests";
import { getAllRentedVehiclesByUser, deleteVehicle, saveVehicle } from "../../../utils/http-utils/vehicle-requests";
import { UserCard } from "../user-card/UserCard";
import { VehicleCard } from "../../vehicles/vehicle-card/VehicleCard";
import './User.scss';

export function User(props) {
    const params = useParams();
    const [user, setUser] = useState(null);
    const [userVehicles, setUserVehicles] = useState();

    useEffect(() => {
        getUserById(params.id).then(response => setUser(response.data));
        let data = getAllRentedVehiclesByUser(params.id);
        setUserVehicles(data);
    }, [params.id])

    const onDeleteHandler = (id) => {
        deleteVehicle(id).then(() => {
            setUserVehicles((prevState) => {
                return prevState.filter(vehicle => vehicle.id !== id);
            });
        });
    }

    const onChangeStatusHandler = (status, id) => {
        const vehicle = userVehicles.find(el => el.id === id);
        vehicle.status = status;
        saveVehicle(vehicle).then(() => {
            setUserVehicles([...userVehicles]);
        });
    }

    return (
        <div className="user">
            <UserCard user={user} />
            <div className="user-tasks-holder">
                {userVehicles?.map(el => <VehicleCard key={el.id} vehicle={el} onVehicleDelete={onDeleteHandler} changeStatus={onChangeStatusHandler} />)}
            </div>
        </div>
    )
}