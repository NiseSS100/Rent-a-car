import { Outlet, Route, Routes } from "react-router-dom";
import { UserForm } from "../users/user-form/UserForm";
import { User } from "../users/user/User";
import { UsersList } from "../users/user-list/UserList";

export function Main() {
    return (
        <div className="main-content my-5">
            <Outlet />
        </div>
    )
}