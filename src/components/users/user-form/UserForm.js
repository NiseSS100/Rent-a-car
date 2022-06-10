import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './UserForm.scss';
import { getUserById, saveUser } from '../../../utils/http-utils/user-requests';
import { useNavigate, useParams } from 'react-router-dom';

export function UserForm() {
    const params = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (params.id) {
            getUserById(params.id).then(response => {
                setUser(response.data);
            });
        }
    }, [params.id])


    const onInputChange = (event) => {
        setUser((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        saveUser(user).then(() => {
            console.log('Success');
            navigate('/users-list');
        });
    }

    return (
        <div className="user-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" required value={user.name} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" required value={user.email} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone" name="phone" required minLength={10} maxLength={10} value={user.phone} onChange={onInputChange} />
                </Form.Group>

                <Button variant="outline-primary" type="submit" size="lg" >
                    Submit
                </Button>
            </Form>
        </div>
    );
}