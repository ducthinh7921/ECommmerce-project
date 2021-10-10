import React,{useState,useEffect} from 'react'

const Checkbox = ({category,handleFilter}) => {

    const [checked,setChecked] = useState([])

    const handleToggle = c => () => {
        // return the first index or -1
        const currentCatId = checked.indexOf(c)
        const newCheckedCatId = [...checked]
        // neu current check trong state rong => push 
        // else pull/check off  
        if(currentCatId === -1 ) {
            newCheckedCatId.push(c)
        }else {
            newCheckedCatId.splice(currentCatId, 1)
        }
        // console.log(newCheckedCatId) 
        setChecked(newCheckedCatId)
        handleFilter(newCheckedCatId)

    }

    return category.map((cat,i)=> (
        <li key={i} className="list-unstyled">
            <input onChange={handleToggle(cat._id)} value={checked.indexOf(cat._id === -1)} type="checkbox" className="form-check-input" />
            <label className="form-check-label">{cat.name}</label>
        </li>
        ))
} 

export default Checkbox