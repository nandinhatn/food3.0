
import './App.css';
  import react,{useContext, useEffect, useState} from 'react'
import Header from './Components/Header/index.js';
import {Container} from './styles.js'
import {ThemeProvider} from 'styled-components'
import theme from './theme'
import SlideBar from './Components/SlickBar/index.js';
import ContainerInner from './Components/ContainerInner/index.js';
import {ProductsContext,CategoriesContext} from './ContextProducts.js'
import api from './assets/Dates/api.js'
function App(props) {
   
      const [listProducts,setListProducts] = useState([])
      const [listCategories,setListCategories] = useState([])
   

  return (
    
    <ProductsContext.Provider value ={{listProducts, setListProducts}}>
      <CategoriesContext.Provider value={{listCategories, setListCategories}}>
    

    <ThemeProvider theme={theme}>

      <Container>

        <Header></Header>
       <SlideBar></SlideBar>
       <ContainerInner>
        
       </ContainerInner>
      </Container>
    </ThemeProvider>
    </CategoriesContext.Provider>
    </ProductsContext.Provider>
   
   
  );
}

export default App;
