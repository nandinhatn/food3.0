
import './App.css';
  import react,{useContext, useEffect, useState} from 'react'
import Header from './Components/Header/index.js';
import {Container} from './styles.js'
import {ThemeProvider} from 'styled-components'
import theme from './theme'
import SlideBar from './Components/SlickBar/index.js';
import ContainerInner from './Components/ContainerInner/index.js';
import {ProductsContext,CategoriesContext,CartContext} from './ContextProducts.js'
import ScrollToTop from "react-scroll-to-top";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Cart from './Components/Cart/index.js';
import api from './assets/Dates/api.js'
import LoaderApis from './Components/LoaderApis/index.js';
function App(props) {
   
      const [listProducts,setListProducts] = useState([])
      const [listCategories,setListCategories] = useState([])
      const [cart,setCart] = useState([])
   

  return (
    
    <ProductsContext.Provider value ={{listProducts, setListProducts}}>
      <CategoriesContext.Provider value={{listCategories, setListCategories}}>
      <CartContext.Provider value={{cart,setCart}}>
        

    <ThemeProvider theme={theme}>
    <ScrollToTop smooth />
      <Container>

       <BrowserRouter>
        <Header></Header>
        <LoaderApis/>

       <SlideBar></SlideBar>
       <Routes>
        <Route  index path='/' element={<ContainerInner/>}/>
        <Route path='/carrinho' element={<Cart/>} />
       </Routes>
       </BrowserRouter>
       {/* <ContainerInner>
        
       </ContainerInner> */}
      </Container>
    </ThemeProvider>
      </CartContext.Provider>
    </CategoriesContext.Provider>
    </ProductsContext.Provider>
   
   
  );
}

export default App;
