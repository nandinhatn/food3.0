import react,{useState, useContext, useEffect} from 'react';
import Logo from '../../assets/logo_pizza.jpg'
import {CartContext,ProductsContext,CategoriesContext} from '../../ContextProducts.js'
import {FaCartPlus} from 'react-icons/fa'
import { NavLink, useLocation, redirect, useNavigate } from 'react-router-dom';
import {
    Container,
    LogoImage,
    ContainerCountCart
} from './styles.js'

import SlideBar from '../SlickBar/index.js';

const Header = ()=>{
    const {listProducts,setListProducts} = useContext(ProductsContext);
    const {listCategories, setListCategories} = useContext(CategoriesContext)
    const {cart, setCart} = useContext(CartContext)
    const [countItem, setCountItem] = useState(0)
    const navigate = useNavigate()

const countItens= ()=>{
    if(cart.length>0){
        let initialValue=0

        const sum = cart.reduce((a, c)=> { return a + c.qtd},0)
       
        console.log(sum)
        setCountItem(sum)
    }
    else{
        setCountItem(0)
    }

}
 useEffect(()=>{
    countItens()
 },[cart])
    
    return(
        <>
        <Container>
            <LogoImage onClick={()=> navigate('/')} src={Logo}/>
            {countItem && countItem>0?  
            <ContainerCountCart onClick={()=> navigate('/carrinho')}>
                <FaCartPlus></FaCartPlus>
                <div>{countItem}</div>
            </ContainerCountCart> : ''}
            
             
        </Container>
        
        </>
    )
}

export default Header;