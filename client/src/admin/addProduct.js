import React , {useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/index'
import { Link} from 'react-router-dom'
import {CreateProduct,getCategory} from './apiAdmin'

const AddProduct = () => {

    const {user, token} = isAuthenticated()

    const [values,setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: [],
        category:"",
        shipping:"",
        quantity:"",
        photo:"",
        loading: false, 
        error:"",
        createProduct:"",
        redirectToProfile:false, 
        formData:"",
        success:false

    })

    const { name,
            description,
            price,
            categories,
            category,
            shipping,
            quantity,
            loading,
            error,
            createProduct,
            redirectToProfile, 
            formData,
            success
        } = values

    // load categories 
    const init = () => {
        getCategory()
            .then(data => {
                if(data.error) {
                    setValues({...values,error:data.error})
                }else {
                    setValues({...values, categories:data , formData: new FormData()})
                }
            })
    }
    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        setValues({...values,formData: new FormData()})
    }, [])
            

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name]:value })

    }


    const clickSubmit = e => {
        e.preventDefault()
        setValues({...values, error:"", loading:true,success:false})

        CreateProduct(user._id, token, formData)
            .then(data => {
                if(data.error){
                    setValues({...values,error:data.error})
                }else {
                    setValues({...values,
                        name: "",
                        description: "",
                        price: "",
                        quantity:"",
                        photo:"",
                        loading: false, 
                        success: true,
                        })
                }
            })
    }

    const newProductForm = () => (
        <form className="mb-3" onSubmit={clickSubmit} >

            <h4>Photo post</h4>
            <div className="form-group">
                <label className="btn btn-outline-secondary" >
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label  className="text-muted">Name</label>
                <input type="text" className="form-control" 
                onChange={handleChange('name')}  value={name}  />
            </div>

            <div className="form-group">
                <label  className="text-muted">Description</label>
                <textarea className="form-control"  
                onChange={handleChange('description')}  value={description}  />
            </div>

            <div className="form-group">
                <label  className="text-muted">Price</label>
                <input type="number" className="form-control" 
                onChange={handleChange('price')}  value={price}  />
            </div>

            <div className="form-group">
                <label  className="text-muted">Category</label>
                <select  className="form-control" onChange={handleChange('category')} >
                    <option  >Please Select</option>
                    {categories && categories.map((c,i) => (<option key={i} value={c._id} >{c.name}</option>))}

                </select>
            </div>

            <div className="form-group">
                <label  className="text-muted">Quantity</label>
                <input type="number" className="form-control" 
                onChange={handleChange('quantity')}  value={quantity}  />
            </div>

            <div className="form-group">
                <label  className="text-muted">Shipping</label>
                <select  className="form-control" onChange={handleChange('shipping')} >
                    <option  >Please Select</option>
                    <option value="0" >NO</option>
                    <option value="1" >YES</option>

                </select>
            </div>

         

            <button className="btn btn-outline-primary" >Create</button>
        </form>
    )

    const showSuccess = () => {
        if(success) {
            return <h3 className="text-info" >create successfully </h3>
        }
    }

    const showError = () => {
        if(error) {
            return <h3 className="text-danger" >{error} </h3>
        }
    }

    const showLoading = () => {
        loading && (<div className="text-success"><h2>Loading...</h2></div>)
    }

    return (
        <Layout title="Add new product" description="ready to add new product" >
            <div className="row ">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showError()}
                    {showSuccess()}
                    {newProductForm()}
                    </div>
            </div>

        </Layout>
    )
}

export default AddProduct