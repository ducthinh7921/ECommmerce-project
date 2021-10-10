import React,{useState,useEffect, Fragment} from 'react'

const RadioBox = ({prices,handleFilter}) => {
    const [values,setValues] = useState(0)

    const handleChange = (e) => {
        handleFilter(e.target.value)
        setValues(e.target.value)
    }


    return prices.map((p,i)=> (
        <div key={i} >
            <input onChange={handleChange} value={`${p._id}`} name={p}
                type="radio" className="mr-2 ml-4" />
            <label className="form-check-label">{p.name}</label>
        </div>
        ))
}

export default RadioBox