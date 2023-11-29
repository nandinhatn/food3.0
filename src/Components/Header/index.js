import react from 'react';
import Logo from '../../assets/logo_pizza.jpg'

import {Container,LogoImage} from './styles.js'

import SlideBar from '../SlideBar/index.js';

const Header = ()=>{
    return(
        <>
        <Container>
            <LogoImage src={Logo}/>
       
        </Container>
        
        </>
    )
}

export default Header;