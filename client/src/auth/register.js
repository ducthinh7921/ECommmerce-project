import React, {useState} from 'react'
import Layout from '../core/Layout'
import  {Link} from 'react-router-dom'
import {register} from './index'

const Register = () => {

    const [values,setValues] = useState({
        name: "",
        email:"",
        password:"",
        error:"",
        success:false
    })

    const {name,email,password,success,error} = values

    const handlerChange = name => event => {
        setValues({...values, error:false , [name]: event.target.value})
    }

   

    const onClickSubmit = (event) => {
        event.preventDefault()
        setValues({...values,error:false})

        register({name,email,password})
        .then(data => {
            if(data.error) {
                setValues({...values,error:data.error,success:false})
            }else {
                setValues({...values,name:"",email:"",password:"",error:"",success:true})
            }
        })

    }
 
    const RegisterForm = () => (
        <form > 
        <div className="form-group">
            <label className="text-muted">Name</label>
            <input onChange={handlerChange('name')} type="text" className="form-control" value={name} />
        </div>
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

    const showSuccess = () => (
         <div className="alert alert-info" style={{display: success ? '' : 'none'}} >
            Register Successfully! Please <Link to="/login" >Login</Link>
        </div>
    )
    

    return (
        <Layout title="Register Page" description="This is register page description" className="container col-md-8 offset-md-2 ">
            {showError()}
            {showSuccess()}
            {RegisterForm()}
        </Layout>
    )
}

export default Register



