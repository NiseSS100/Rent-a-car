import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
import { getVehicleById, saveVehicle, VehicleType, VehicleFuelType } from "../../../utils/http-utils/vehicle-requests";
import './VehicleForm.scss';

export function VehicleForm() {
    const navigate = useNavigate();
    const params = useParams();
    const [vehicle, setVehicle] = useState({
        type: '',
        brand: '',
        construction_year: '',
        fuel_type: '',
        number_of_seats: '',
        price_per_day: '',
        isFree: true
    });

    useEffect(() => {
        if (params.id) {
            getVehicleById(params.id).then((response) => {
                setVehicle(response.data);
            });
        }
    }, [params.id]);

    const onInputChange = (event) => {
        setVehicle((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onVehicleSubmit = (event) => {
        event.preventDefault();

        saveVehicle(vehicle).then(() => {
            navigate('/vehicles-list');
        });
    }

    return (
        <div className="task-form-wrapper">
            <Form onSubmit={onVehicleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" placeholder="Enter model" name="model" required value={vehicle.model} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" placeholder="Enter brand" name="brand" required value={vehicle.brand} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Price per day</Form.Label>
                    <Form.Control type="number" placeholder="Enter price per day" name="price_per_day" required min={23} max={65} step={1} value={vehicle.price_per_day} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Number of seats</Form.Label>
                    <Form.Control type="number" placeholder="Enter number of seats" name="number_of_seats" required min={4} max={5} value={vehicle.number_of_seats} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Type</Form.Label>
                    <Form.Select placeholder="Select Type" name="type" required value={vehicle.type} onChange={onInputChange}>
                        {Object.keys(VehicleType).map(type => <option key={type} value={VehicleType[type]}>{VehicleType[type]}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="number" name="construction_year" required min={2010} max={2022} step={1} value={vehicle.construction_year} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Fuel Type</Form.Label>
                    <Form.Select placeholder="Select Fuel Type" name="fuel_type" required value={vehicle.fuel_type} onChange={onInputChange}>
                        {Object.keys(VehicleFuelType).map(type => <option key={type} value={VehicleFuelType[type]}>{VehicleFuelType[type]}</option>)}
                    </Form.Select>
                </Form.Group>
                <Button variant="outline-primary" type="submit" size="lg">{vehicle.id ? 'Edit Vehicle' : 'Add Vehicle'}</Button>
            </Form>
        </div>
    );
}