import React from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/index'
import { Link} from 'react-router-dom'

const Dashboard = () => {
    const {user: {_id,name,email,role}} = isAuthenticated()

    const userLink = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Link</h4>
                <ul className="list-group">
                    <li className="list-gruop-item">
                        <Link className="nav-link" to="/card" >Card</Link>
                    </li>
                    <li className="list-gruop-item">
                            <Link className="nav-link" to="/profile/update" >Update profile</Link>

                    </li>

                </ul>
            </div>
        )
    }

    const userInfo = () => {
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

    const Purchase = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase History</h3>
                <ul className="list-group">
                    <li className="list-gruop-item">history</li>
                </ul>

            </div>
        )
    }


    return (
        <Layout title="Dashboard" description={`have a good day ${name}!`} className="container">
            <div className="row">
                <div className="col-3">
                      {userLink()}
                </div>
                <div className="col-9">
                   {userInfo()}
                     
                </div>
            </div>

        </Layout>
    )
}

export default Dashboard