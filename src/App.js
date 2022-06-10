import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import './App.scss';
import { VehicleForm } from './components/vehicles/vehicle-form/VehicleForm';
import { VehiclesList } from './components/vehicles/vehicle-list/VehiclesList';
import { UserForm } from './components/users/user-form/UserForm';
import { User } from './components/users/user/User';
import { UsersList } from './components/users/user-list/UserList';
import { VehicleRent } from './components/vehicles/vehicle-rent/VehicleRent';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/users-list" element={<UsersList />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/user/create" element={<UserForm />} />
          <Route path="/user/edit/:id" element={<UserForm />} />
          <Route path="/vehicle/rent/:id" element={<VehicleRent />} />
          <Route path="/vehicles-list" element={<VehiclesList />} />
          <Route path="/vehicle/:id" element={<VehiclesList />} />
          <Route path="/vehicle/create" element={<VehicleForm />} />
          <Route path="/vehicle/edit/:id" element={<VehicleForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;