import React,{useContext,useState, useEffect} from "react";
import {
    CartContext,
    CategoriesContext,
    ProductsContext, 
    FreteContext
} from '../../ContextProducts'
import {
    ContainerCart,
    ItensCart,
    ItensCartTitle,
    ContainerNoCart,
    Title,
    Button
} from './style'
import {FaTrash} from 'react-icons/fa'
import Icon from "@mdi/react";
import {mdiCart} from '@mdi/js'
import {getDistance} from 'geolib'
import Maps from "../Maps";



const Cart = ()=>{

        const {cart,setCart} = useContext(CartContext)
        const {frete, setFrete} = useContext(FreteContext)
        const {listProducts, setListProducts} = useContext(ProductsContext)
        const {listCategories, setListCategories} = useContext(CategoriesContext)
        const [confirm, setConfirm] = useState(false)
        const [cartOk, setCartOk] = useState(false)
        let count=1;

        const priceTotal= (qtd, price, itemCart)=>{
            return parseFloat(qtd * parseFloat(price).toFixed(2))

        }
        const calcTotal= ()=>{
            
            let sum = cart.reduce((c, v)=>{
                    console.log(c,parseFloat(v.price))
                    return c + (parseInt(v.qtd * parseFloat(v.price)))
            },0)

            return  (sum + frete).toFixed(2)

        }

        const checkItensOnlySelf= () =>{
            if(cart.length>0){
                let filterMarker = cart.filter((el)=> el.self==true && el.marker==false)
                
                if(filterMarker.length<=0){
                    setCartOk(true)
                }
                
            }
        }

        useEffect(()=>{
            console.log(frete)
        },[frete])

        useEffect(()=>{
            checkItensOnlySelf()
            //check if ha no carrinho items com self and marker false? se true - não pode fechar a compra

        },[])
    return(
        <>
        
      <Title>Carrinho</Title>
        <ContainerCart>
            {cart.length>0?
            <>
            <ItensCartTitle>
             <div>Item</div>
        <div>Qtde</div>
        <div>Item</div>
        <div>Preço</div>
        <div>Total</div>
             </ItensCartTitle>
            </>
             : ''}
             
             {cart.length>0? 
             cart.map((item)=>{
                return(
                    <>
                <ItensCart>
                    <div>{count++}</div>
                    <div> {item.self==true? '1/2' : item.qtd}</div>
                    <div>{item.title}</div>
                    <div>R$ {parseFloat(item.price).toFixed(2)}</div>
                    <div>R$ {priceTotal(item.qtd, item.price, item).toFixed(2)}</div>
                    

                </ItensCart>
             
                    </>
                )
             })
             : 
             <ContainerNoCart>
                <Icon path={mdiCart} size={5} />
                <div>Não tem itens no carrinho</div>

             </ContainerNoCart>
             }

             {cart.length>0 ? 
             
             <>
               {frete!='undefined' && frete? <>
                
                <ItensCart>
                    <div></div>
                    <div></div>
                    <div>Frete</div>
                    <div></div>
                    <div> {frete.toFixed(2)!='NaN' || frete.toFixed(2)> 0 ? 
                    <>
                    R$
                    {frete.toFixed(2)}
                    </>
                    :''}</div>
                </ItensCart>
                </> : ''}

              
                <ItensCart>
                    <div></div>
                    <div></div>
                    <div>{frete? 'Valor  Total': ''}</div>
                    <div></div>
                    <div> {calcTotal()!='NaN'? 
                    <>
                    R$
                    {calcTotal()}
                    </>
                    :''}</div>
                </ItensCart>
                {cartOk ? <>
                    
                    {!confirm?  <Button onClick={()=> setConfirm(true)}>Prosseguir para informações de endereço</Button> : ''}
                   

                </> : 
                'Há porções a serem completadas'}
               
                
             </> 
             : ''}
          
          
          
            {confirm? 
            <>
            
              <Maps/>
            </> : ''}

        </ContainerCart>
        </>
    )
}

export default Cart