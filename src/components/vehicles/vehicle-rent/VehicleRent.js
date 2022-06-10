import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllUsers } from '../../../utils/http-utils/user-requests';
import { saveRental } from '../../../utils/http-utils/rent-requests';
import { getVehicleById } from '../../../utils/http-utils/vehicle-requests';

export function VehicleRent() {
    const navigate = useNavigate();
    const params = useParams();
    const navigateToCustomersList = () => {
        navigate('/user/users-list');
    };

    const [rental, setRental] = useState({
        start_date_time: '',
        end_date_time: '',
        Vehicle: '',
        Customer: ''
    });
    const [allUsers, setUsers] = useState([]);
    const [vehicle, setVehicle] = useState({
        model: '',
        brand: ''
    });

    useEffect(() => {
        usrs();
        if (params.id) {
            getVehicleById(params.id).then((response) => {
                setVehicle(response.data);
            });
        }
    }, [params.id]);

    const usrs = async () => {
        var prom = await getAllUsers();

        setUsers(prom);
    }


    const onInputChange = (event) => {
        setRental((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        saveRental(rental).then(() => {
            navigateToCustomersList();
        });
    };
    if (allUsers.length !== 0)
        return (
            <div className="user-form-wrapper">
                <h2>Rent {vehicle.brand + ' ' + vehicle.model}</h2>
                <Form onSubmit={onFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>By</Form.Label>
                        <Form.Select placeholder="Select Renter" name="Customer" onChange={onInputChange}>
                            {Object.keys(allUsers).map(user => <option key={user} value={user.id}>{user.name}</option>)}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Start date</Form.Label>
                        <Form.Control type="date" placeholder="Enter start date" name="start_date_time" onChange={onInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>End date</Form.Label>
                        <Form.Control type="date" placeholder="Enter end date" name="end_date_time" onChange={onInputChange} />
                    </Form.Group>

                    <Button variant="outline-primary" type="submit" size="lg" >
                        Submit
                    </Button>
                </Form>
            </div>
        );
};