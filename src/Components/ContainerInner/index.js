import React,{useContext, useEffect, useState}from "react";
import {ProductsContext,CategoriesContext,CartContext} from '../../ContextProducts'
import {NavLink, useLocation, redirect, useNavigate} from 'react-router-dom'

import ModalWindow from "../Modal";
import {
    Container,
    TagCategory,
    ContainerCards
} from './style'
import api from "../../assets/Dates/api";
import CardComponent from "../CardComponent";
import moment from "moment";



const ContainerInner = ()=>{

    const {listProducts,setListProducts} = useContext(ProductsContext);
    const {listCategories, setListCategories} = useContext(CategoriesContext)
    const {cart, setCart} = useContext(CartContext)
    const [modalIsOpen, setIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState([])
    const [productSelf, setProductSelf] = useState(false)
    const [productQtd, setProductQtd] = useState(0)
    const [modalAction, setModalAction] = useState(0)
    const navigate = useNavigate()

//ModalAction
//0 - content initial
//1- after add cart
   
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


    const addCart=(itemCart)=>{
       
        const item ={ 
            ...itemCart, 
            qtd: productQtd, 
            self: productSelf, 
            marker:false, 
            date:moment()
        }
        
        const id = item.id
        const hasItemCart= cart.filter((item)=> item.id===id)
        const hasNotItemCart= cart.filter((item)=> item.id !==id)
        const cartLength = cart.length
        const thereAreItens = cartLength>0? true : false
        const itemIsCart = hasItemCart.length>0 ? true: false
        const hasNotItemCartOff = hasNotItemCart.length>0? true : false
        
        //set marker 1/2 products

        if(item.self){

            if(cart.length<=0){
                item.title = item.title + ' 1/2 pizza'
                item.qtd =1
            }
            else{
                const filter = cart.filter((el)=> el.self===true && el.marker==false)

                if(item.self===true && filter.length===1){
                    let valorMax = Math.max(parseInt(item.price), parseInt(filter[0].price))
                    console.log(valorMax)
                    item.marker =true;
                    filter[0].marker= true;

                    
                    filter[0].price= valorMax/2
                    item.qtd=1
                    filter[0].qtd=1
                    item.price = valorMax/2
                    item.title = item.title + ' 1/2 pizza'
                    setCart([item, filter[0]])
                    return

                }
                else{
                    item.title = item.title +' 1/2 pizza'
                    item.qtd=1
                }
            }

        }
        if(!thereAreItens){
            console.log('aqui')
            setCart([item])
       
            
        }
        else{

            if(itemIsCart && !hasNotItemCartOff){
                item.qtd = productQtd;
                setCart([item])


            }
            if(!itemIsCart && hasNotItemCartOff){
                setCart([item, ...hasNotItemCart])
            }
            if(itemIsCart && hasNotItemCartOff){
                item.qtd = productQtd
                setCart([item, ...hasNotItemCart])
            }

        }
       
           
          
     setModalAction(1)
        
            
    }
    
    const checkItemIsCart=(item)=>{
        const id = item.id
        const cartFilter = cart.filter((item)=> item.id===id)
        return cartFilter

    }

    const openModal=(element)=>{
        setIsOpen(true)
        setModalContent(element)
        const item = checkItemIsCart(element)
        if(item.length>0){
            setProductQtd(item[0].qtd)
            setProductSelf(item[0].self)
        }
        document.body.style.overflow = 'hidden'
    }
    const closeModal=(element)=>{
        setIsOpen(false)
        setModalContent([])
        document.body.style.overflow = 'auto'
        setProductQtd(0)
        setProductSelf(false)
        setModalAction(0)
    }
    
    const checkButtonAdd=()=>{
        if(productQtd>0){
            return false
        }
        if(productSelf){
            return false
        }
        else{
            return true
        }


    }
    
 
   const markProductsSelf=()=>{
    setProductSelf(!productSelf)
    console.log('ativer', productSelf)
    if(productSelf){
        setProductQtd(0)
    }
    
   }

   const goToCart=()=>{
        navigate('/carrinho')

   }
  

    useEffect(()=>{
        console.log(cart)
    },[cart])
   
    return(
        <>
        <Container>

            <ModalWindow
            open={modalIsOpen}
            contentModal ={modalContent}
            closeModal={()=>closeModal()}
            productSelf={productSelf}
            markProductsSelf={()=>markProductsSelf()}
            checkButtonAdd={()=> checkButtonAdd()}
            productsQtd={productQtd}
            clickMinus={()=> onClickMinus()}
            clickPlus={()=> onClickPlus()}
            addCart={()=> addCart(modalContent)}
            modalAction= {modalAction}
            goToCart={()=> goToCart()}
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