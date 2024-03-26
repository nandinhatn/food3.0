import React,{useContext, useEffect, useState}from "react";
import {
    ProductsContext,
    CategoriesContext,
    CartContext,
    SelectCategoryContext
} from '../../ContextProducts'
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
import { mdiColorHelper } from "@mdi/js";



const ContainerInner = ()=>{

    const {listProducts,setListProducts} = useContext(ProductsContext);
    const {listCategories, setListCategories} = useContext(CategoriesContext)
    const {cart, setCart} = useContext(CartContext)
    const {selectCategory, setSelectCategory} = useContext(SelectCategoryContext)
    const [listCategoriesState, setCategoriesState] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState([])
    const [exibAll, setExibAll] = useState(true)
    const [productSelf, setProductSelf] = useState(false)
    const [productQtd, setProductQtd] = useState(0)
    const [modalAction, setModalAction] = useState(0)
    const [pares, setPares]= useState([])
    const navigate = useNavigate()

//ModalAction
//0 - content initial
//1- after add cart
   
    const filterProducts = (category)=>{
        let productsFilter = listProducts.filter((el)=> el.categoria===category && el.disponivel===true)
      
       
        

       
      
        return productsFilter
    }

    useEffect(()=>{
        

    },[listCategories])

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
                item.title = item.title + ' 1/2 porção'
                item.qtd =1
            }
            else{
                
                const categoriaHas = cart.filter((el)=> el.categoria == item.categoria)
                console.log('categoria',categoriaHas)
                
                if(categoriaHas.length>0){
                    const filter = cart.filter((el)=> el.self===true && el.marker==false)

                

                if(item.self===true && filter.length>=1){
                    let valorMax = Math.max(parseInt(item.preco), parseInt(filter[0].preco))
                    console.log(valorMax)
                    console.log('aqui111111')
                    item.marker =true;
                    filter[0].marker= true;

                    
                    filter[0].preco= valorMax/2
                    item.qtd=1
                    filter[0].qtd=1
                    item.preco = valorMax/2
                    item.title = item.title + ' 1/2 pizza'
                    setPares([ [item.id, filter[0].id]])
                   
                    setCart([item, filter[0]])
                  
                  

                }
                else{
                    item.title = item.title +' 1/2 pizza'
                    item.qtd=1
                }
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
    console.log(productSelf)
    let result = productSelf==false ? true : false 
    console.log(result)
    setProductSelf(result)
    console.log('ativer', result)
    if(productSelf){
        setProductQtd(0)
    }
    
   }

   const goToCart=()=>{
        navigate('/carrinho')

   }

   const filterCategories =(id)=>{
      let result = listCategories.filter((el)=> el.id==id)
      console.log('dentro do filter', result)
      setCategoriesState(result)
      return result
   }
   useEffect(()=>{
      setCategoriesState(listCategories)
   },[listCategories])

  useEffect(()=>{
    console.log(selectCategory)
    if(selectCategory.search==true){
      console.log('selectionei')
      filterCategories(selectCategory.categorySelected)
      
    }
    
    else{
       console.log('não tem selecionado')
       setCategoriesState(listCategories)
     
       
    }
    

  },[selectCategory])
   
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

            {listCategoriesState.length>0  ? 
            <>
            {listCategoriesState.map((el)=>{
                return(<>

                {filterProducts(el.id).length>0 ? 
                
                 <>
                <TagCategory>
                {el.name}
                
                </TagCategory>
                <ContainerCards>
                 
                   {  filterProducts(el.id).map((el)=>{
                    return(
                    <>
                    <CardComponent title={el.name} price={el.preco} img={el.imagem} plus={()=>openModal(el)}/>
              
                        
                    </>
                    )
                   })} 
                </ContainerCards>
              
                </> 
                
                :  <>  </>}
               
            
                </>)
            })}
            
            </>
            
            :  <></>
            
            }
          
        </Container>
        </>
    )
}

export default ContainerInner