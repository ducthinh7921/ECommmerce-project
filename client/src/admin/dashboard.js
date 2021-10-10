import React from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/index'
import { Link} from 'react-router-dom'

const AdminDashboard = () => {
    const {user: {_id,name,email,role}} = isAuthenticated()

    const adminLink = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Link</h4>
                <ul className="list-group">
                    <li className="list-gruop-item">
                        <Link className="nav-link" to="/create/category" >Create Category</Link>
                    </li>
                    <li className="list-gruop-item">
                            <Link className="nav-link" to="/create/product" >Create Product</Link>

                    </li>

                </ul>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Infomation</h3>
                <ul className="list-group">
                    <li className="list-gruop-item">{name}</li>
                    <li className="list-gruop-item">{email}</li>
                    <li className="list-gruop-item">{role === 1 ? 'Admin' :'User'}</li>

                </ul>
            </div>
        )
    }



    return (
        <Layout title="Dashboard" description={`have a good day ${name}!`} className="container-fluid">
            <div className="row">
                <div className="col-3">
                      {adminLink()}
                </div>
                <div className="col-9">
                   {adminInfo()}
                     
                </div>
            </div>

        </Layout>
    )
}

export default AdminDashboard