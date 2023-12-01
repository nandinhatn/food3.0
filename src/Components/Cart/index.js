import React,{useContext,useState, useEffect} from "react";
import {CartContext,CategoriesContext,ProductsContext} from '../../ContextProducts'
import {
    ContainerCart,
    ItensCart,
    ItensCartTitle,
    ContainerNoCart
} from './style'
import {FaTrash} from 'react-icons/fa'
import Icon from "@mdi/react";
import {mdiCart} from '@mdi/js'



const Cart = ()=>{

        const {cart,setCart} = useContext(CartContext)
        const {listProducts, setListProducts} = useContext(ProductsContext)
        const {listCategories, setListCategories} = useContext(CategoriesContext)
        let count=1;

        const priceTotal= (qtd, price, itemCart)=>{
            return parseFloat(qtd * parseFloat(price).toFixed(2))

        }
    return(
        <>
        <ContainerCart>
            {cart.length>0?
            <>
            <ItensCartTitle>
             <div>Item</div>
        <div>Qtde</div>
        <div>Prato</div>
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
                    <div>{item.qtd}</div>
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
          
           

        </ContainerCart>
        </>
    )
}

export default Cart