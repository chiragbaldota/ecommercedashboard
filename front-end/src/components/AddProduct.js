import React from 'react';

const AddProduct =()=>{
    const [name,setName] = React.useState('')
    const [price,setPrice] = React.useState('')
    const [category,setCategory] = React.useState('')
    const [company,setCompany] = React.useState('')
    const [error,setError] = React.useState(false)

    const addproduct = async () =>{
        
        console.warn(!name)
        if(!name || !price || !category || !company)
        {
            setError(true)
            return false;
        }

        console.warn(name,price,category,company)
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product",{
            method:'post',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.warn(result)
    }

    return(
        <div>
            <h1>Add Product</h1>
            <input className="productbox" type="text" placeholder='Enter Product Name'
            value={name} onChange={(e)=>{setName(e.target.value)}}/>

           {error && !name &&  <span className='errormsg'>enter valid name</span>}

            <input className="productbox" type="text" placeholder='Enter Product Price'
            value={price} onChange={(e)=>{setPrice(e.target.value)}}/>

           {error && !price &&  <span className='errormsg'>enter valid price</span>}

            <input className="productbox" type="text" placeholder='Enter Product Category'
            value={category} onChange={(e)=>{setCategory(e.target.value)}}/>

            {error && !category &&  <span className='errormsg'>enter valid category</span>}

            <input className="productbox" type="text" placeholder='Enter Product Company'
            value={company} onChange={(e)=>{setCompany(e.target.value)}}/>

            {error && !company &&  <span className='errormsg'>enter valid company</span>} 

            <button onClick={addproduct} className='productbutton'>Add Product</button>

        </div>
    )
}

export default AddProduct;