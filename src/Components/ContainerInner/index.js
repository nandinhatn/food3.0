import React,{useContext, useEffect, useState}from "react";
import {ProductsContext,CategoriesContext} from '../../ContextProducts'

import ModalWindow from "../Modal";
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
    const [modalIsOpen, setIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState([])
    const [productSelf, setProductSelf] = useState(false)
    const [productQtd, setProductQtd] = useState(0)
   
    const filterProducts = (category)=>{
        let productsFilter = listProducts.filter((el)=> el.id_categoria===category)
      
        return productsFilter
    }

    const onClickPlus = ()=>{
        setProductQtd(productQtd + 1)
        

    }
    const onClickMinus = ()=>{
       if(productQtd>0){
        setProductQtd(productQtd -1)
       }
        
    }


    const openModal=(element)=>{
        setIsOpen(true)
        setModalContent(element)
        document.body.style.overflow = 'hidden'
    }
    const closeModal=(element)=>{
        setIsOpen(false)
        setModalContent([])
        document.body.style.overflow = 'auto'
        setProductQtd(0)
    }
    
    const checkButtonQtd=()=>{
        if(productQtd>0){
            return true
        }
        if(productSelf){
            return true
        }
        else{
            return true
        }
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
   const markProductsSelf=()=>{
    setProductSelf(!productSelf)
    console.log('ativer', productSelf)
    if(productSelf){
        setProductQtd(0)
    }
    
   }
    useEffect(()=>{
     getCategories() 
     getProducts()
  },[])
   
    return(
        <>
        <Container>

            <ModalWindow
            open={modalIsOpen}
            contentModal ={modalContent}
            closeModal={()=>closeModal()}
            productSelf={productSelf}
            markProductsSelf={()=>markProductsSelf()}
            checkButtonQtd={()=> checkButtonQtd()}
            productsQtd={productQtd}
            clickMinus={()=> onClickMinus()}
            clickPlus={()=> onClickPlus()}
            />

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
                    <CardComponent title={el.title} price={el.price} img={el.img} plus={()=>openModal(el)}/>
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