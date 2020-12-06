import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddMedicine from './admin/AddMedicine';
import Shop from './core/Shop';
import Medicine from './core/Medicine';
import Cart from './core/Cart';
import Orders from './admin/Orders';
import Profile from './user/Profile';
import ManageMedicines from './admin/ManageMedicines';
import UpdateMedicine from './admin/UpdateMedicine';
import UpdateCategory from './admin/updateCategory';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/Medicine" exact component={AddMedicine} />
                <Route path="/Medicine/:MedicineId" exact component={Medicine} />
                <Route path="/cart" exact component={Cart} />
                <AdminRoute path="/admin/orders" exact component={Orders} />
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
                <PrivateRoute path="/admin/Medicines" exact component={ManageMedicines} />
                <AdminRoute path="/admin/Medicine/update/:MedicineId" exact component={UpdateMedicine} />
                <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
