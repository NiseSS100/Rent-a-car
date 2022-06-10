import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export function VehicleCard({ vehicle, onVehicleDelete, changeStatus }) {
    const navigate = useNavigate();

    const navigateToEdit = () => {
        navigate(`/vehicle/edit/${vehicle.id}`);
    }

    const renderNextStateButton = () => {
        if (vehicle.isFree)
            return <Button variant='info' onClick={() => { changeStatus(!vehicle.isFree, vehicle.id); navigate(`/vehicle/rent/${vehicle.id}`); }
            }> Rent Vehicle</Button >;
        else
            return <Button variant='success' onClick={() => changeStatus(!vehicle.isFree, vehicle.id)}>Return Vehicle</Button>;
    }

    const renderEditButton = () => {
        return <Button variant="secondary" onClick={navigateToEdit}>Edit</Button>;
    }

    const renderDeleteButton = () => {
        return <Button variant="danger" onClick={() => onVehicleDelete(vehicle.id)}>Delete</Button>;
    }

    const onDragHandler = (event) => {
        event.dataTransfer.setData("vehicleId", vehicle.id);
    }

    return (
        <div className="task-card-wrapper" draggable={true} onDrag={(event) => onDragHandler(event)}>
            <Card style={{ width: '20rem', display: 'flex', }}>
                <Card.Body className='border border-info rounded'>
                    <Card.Title>{vehicle.brand + ' ' + vehicle.model}</Card.Title>
                    <Card.Text>
                        <span className='key'>Year: </span>
                        <span className='value'>{vehicle.construction_year}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className='key'>Type: </span>
                        <span className='value'>{vehicle.type}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className='key'>Fuel: </span>
                        <span className='value'>{vehicle.fuel_type}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className='key'>Seats: </span>
                        <span className='value'>{vehicle.number_of_seats}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className='key'>Price/Day: </span>
                        <span className='value'>{vehicle.price_per_day}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className='key'>Picture: </span>
                        <span className='value'><img width="280px" height="300px" src={require(`../../../picture/${vehicle.picture}`)} /></span>
                    </Card.Text>
                    <div className='btn-holder'>
                        {renderEditButton()}
                        {renderDeleteButton()}
                        {renderNextStateButton()}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}