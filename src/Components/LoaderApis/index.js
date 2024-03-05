import React, {useContext, useEffect , useState} from "react";

import api from "../../assets/Dates/api";
import {CartContext,CategoriesContext,ProductsContext} from '../../ContextProducts'


const LoaderApis = ()=>{

    const {listProducts,setListProducts} = useContext(ProductsContext);
    const {listCategories, setListCategories} = useContext(CategoriesContext)
    const {cart, setCart} = useContext(CartContext)
    
    const getCategories=()=>{
       
        api.get('categorias', { mode: 'no-cors'}).then((res)=>{
            console.log(res.data)
            setListCategories(res.data)
        })
      }
    const getProducts =()=>{
        api.get('/produtos',{ mode:'no-cors'}).then((res)=>{
           console.log(res.data)
           setListProducts(res.data)
        })
      }
    useEffect(()=>{
        getCategories()
        getProducts()
    },[])
    return(
        <>

        </>
    )
}

export default LoaderApis