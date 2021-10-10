import './App.css';
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Register from './auth/register';
import Login from './auth/login';
import Home from './core/home';
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import Dashboard from './user/dashboard';
import AdminDashboard from './admin/dashboard'
import AddCategory from './admin/addCategory'
import AddProduct from './admin/addProduct'
import Shop from './core/shop';
import Product from './core/product';
import Cart from './core/cart'





const Routes = () => {
    return (<BrowserRouter>
        <Switch>
            <Route path="/"  exact component={Home} />  
            <Route path="/shop"  exact component={Shop} />  
            <Route path="/cart"  exact component={Cart} />  

            <Route path="/register"  exact component={Register} />
            <Route path="/login"  exact component={Login} />
            <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
            <AdminRoute path="/create/category" exact component={AddCategory} />
            <AdminRoute path="/create/product" exact component={AddProduct} />
            <Route path="/product/:productId"  exact component={Product} />  


        </Switch>
    </BrowserRouter>)
}
export default Routes