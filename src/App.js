
import './App.css';

import Header from './Components/Header/index.js';
import {Container} from './styles.js'
import {ThemeProvider} from 'styled-components'
import theme from './theme'
import SlideBar from './Components/SlideBar/index.js';
import ContainerInner from './Components/ContainerInner/index.js';
function App(props) {
  return (
    <ThemeProvider theme={theme}>

      <Container>

        <Header></Header>
       <SlideBar></SlideBar>
       <ContainerInner>
        
       </ContainerInner>
      </Container>
    </ThemeProvider>
   
  );
}

export default App;
