import React,{useContext, useEffect, useState}from "react";
import {ProductsContext,CategoriesContext} from '../../ContextProducts'
import {
    Container,
    TagCategory,
    ContainerCards
} from './style'
import api from "../../assets/Dates/api";
import CardComponent from "../CardComponent";



const ContainerInner = ()=>{

    const {listProducts,setListProducts} = useContext(ProductsContext);
    const {listCategories, setListCategories} = useContext(CategoriesContext)
   
    const filterProducts = (category)=>{
        let productsFilter = listProducts.filter((el)=> el.id_categoria===category)
        console.log(productsFilter)
        return productsFilter
    }

    
  const getCategories=()=>{
    api.get('/api/categorias').then((res)=>{
      console.log(res)
      setListCategories(res.data.response)
    })
  }
  const getProducts =()=>{
    api.get('/api/produtos').then((res)=>{
      console.log(res)
      setListProducts(res.data.response)
    })
  }
  useEffect(()=>{
     getCategories() 
    getProducts()
  },[])
   
    return(
        <>
        <Container>

            {listCategories.length>0 ? 
            <>
            {listCategories.map((el)=>{
                return(<>

                {filterProducts(el.id).length>0? 
                
                                <>
                 <TagCategory>
                {el.title}
                
            </TagCategory>
                    <ContainerCards>
                   {filterProducts(el.id).map((el)=>{
                    return(
                        <>
                        <CardComponent title={el.title} price={el.price} img={el.img}/>
                        <div>{el.title}</div>
                        </>
                    )
                   })} 
           </ContainerCards>
                </> 
                
                : ''}
               
            
                </>)
            })}
            
            </>
            
            : ''}

        </Container>
        </>
    )
}

export default ContainerInner