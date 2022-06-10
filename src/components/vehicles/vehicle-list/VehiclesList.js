import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteVehicle, getAllVehicles, getAllRentedVehiclesByUser, saveVehicle, VehicleType, VehiclelFuelType } from "../../../utils/http-utils/vehicle-requests";
import { VehicleCard } from "../vehicle-card/VehicleCard";

import './VehiclesList.scss';

export function VehiclesList() {
    const [vehicles, setVehicles] = useState([]);
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getAllRentedVehiclesByUser(params.id).then(response => {
                setVehicles(response.data);
            });
        }
        else {
            getAllVehicles().then(response => {
                console.log(response.data);
                setVehicles(response.data);
            });
        }

    }, [params.id])

    const onDeleteHandler = (id) => {
        deleteVehicle(id).then(() => {
            setVehicles((prevState) => {
                return prevState.filter(vehicle => vehicle.id !== id);
            });
        });
    }

    const onChangeStatusHandler = (isFree, id) => {
        const vehicle = vehicles.find(vehicle => vehicle.id === id);
        vehicle.isFree = isFree;
        saveVehicle(vehicle).then(() => {
            setVehicles([...vehicles]);
        });
    }

    const getVehiclesWithStatus = (status) => {
        return vehicles.filter(vehicle => vehicle.isFree === status).map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} onVehicleDelete={onDeleteHandler} changeStatus={onChangeStatusHandler} />)
    }

    const onDropHandler = (event, status) => {
        event.preventDefault();

        const vehicleId = event.dataTransfer.getData('vehicleId');
        onChangeStatusHandler(status, vehicleId);
    }

    return (
        <div className="vehicles-list-wrapper">
            {vehicles.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} onVehicleDelete={onDeleteHandler} changeStatus={onChangeStatusHandler} />)}

            <div className="status new" onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDropHandler(event, true)}>
                <div className="column-header" >Free</div>
                {getVehiclesWithStatus(true)}
            </div>
            <div className="status in-progress" onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDropHandler(event, false)}>
                <div className="column-header">Rented</div>
                {getVehiclesWithStatus(false)}
            </div>
        </div>
    );
}