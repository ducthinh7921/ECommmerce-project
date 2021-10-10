import React, {useState} from 'react'
import Layout from '../core/Layout'
import  {Redirect} from 'react-router-dom'
import {login, authenticate, isAuthenticated} from './index'

const Login = () => {

    const [values,setValues] = useState({
        email:"",
        password:"",
        error:"",
        loading:false, 
        redirectToReferrer: false,
    })

    const {email,password,loading,error, redirectToReferrer} = values
    const {user} = isAuthenticated()


    const handlerChange = name => event => {
        setValues({...values, error:false , [name]: event.target.value})
    }

    

 

    const onClickSubmit = (event) => {
        event.preventDefault()
        setValues({...values,error:false, loading:true})

        login({email,password})
        .then(data => {
            if(data.error) {
                setValues({...values,error:data.error,loading:false})
            }else {
                authenticate(data, () => {
                    setValues({...values,redirectToReferrer:true})
                })
            }
        })

    }
 
    const RegisterForm = () => (
        <form > 
     
        <div className="form-group">
            <label className="text-muted">Email</label>
            <input onChange={handlerChange('email')} type="email" className="form-control" value={email} />
        </div>
        <div className="form-group">
            <label className="text-muted">Password</label>
            <input onChange={handlerChange('password')} type="password" className="form-control" value={password} />
        </div>
        <button onClick={onClickSubmit} className="btn btn-primary">
            Submit
        </button>
    </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}} >
             {error}
        </div>
    )

    const showLoading = () => (
        loading && (<div className="alert alert-info" ><h2>Loading...</h2></div>)
    )

    const redirectUser = () => {
        if(redirectToReferrer) {
            if( user && user.role===1) {
                return <Redirect to="/admin/dashboard" />
            }else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()) {
            return <Redirect to="/" />

        }
    }
    

    return (
        <Layout title="Login Page" description="This is login page description" className="container col-md-8 offset-md-2 ">
            {showError()}
            {showLoading()}
            {RegisterForm()}
            {redirectUser()}
        </Layout>
    )
}

export default Login



