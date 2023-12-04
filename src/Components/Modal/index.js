import react from 'react';
import Modal, { contextType } from 'react-modal'
import {
    Button,
    ButtonCheckout,
    ButtonMinus,
    ButtonPlus,
    ButtonShop,
    ContainerButton,
    ContainerButtons,
    ContainerDetails,
    ContainerDetailsText,
    ContainerInput,
    ContainerModal,
    ContainerShop,
    Title,
    Image,
    OptionSelfText,
    Input,
    QtdTxt


} from './style'
Modal.setAppElement('#root');

const ModalWindow = ({
    open, 
    closeModal,
    contentModal, 
    productSelf, 
    markProductsSelf, 
    productsQtd,
    clickMinus,
    clickPlus,
    checkButtonAdd,
    addCart,
})=>{
   
    
    return(<>
    
    <Modal isOpen={open} onRequestClose={closeModal} 
    style={{
        content:{
            left: '0',
             right: '0',
             top: '0',
             bottom: '0',
             margin: 'auto',
             width:'350px',
             height:  '500px' ,
             zIndex:'90000000',
            
             boxShadow:'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
             borderRadius: '10px 20px 0px  0px',
             padding:0,
        }
    }}
    >
        
        <ContainerButton>
          
             <Button onClick={closeModal}>X</Button>
        </ContainerButton>
        <ContainerModal>
            <Title>{contentModal.title}</Title>
            <Image src={contentModal.img}/>
            {contentModal.allowSelf? 

            <>
           
            <>
            <OptionSelfText>
                Este produto tem opção de meia, deseja

            </OptionSelfText>
            <ContainerInput>
                <Input value={productSelf} defaultChecked={productSelf} type="checkbox" onChange={markProductsSelf}/> Meia Pizza
            </ContainerInput>
            </>
           
           

            </>: ''}
            {productSelf ==false? 
            <>
             <ContainerButtons>
                <ButtonMinus disabled={productsQtd<=0? true : false} onClick={clickMinus}> -</ButtonMinus>
                <QtdTxt>{productsQtd}</QtdTxt>
                <ButtonPlus onClick={clickPlus}>+</ButtonPlus>
            </ContainerButtons>
            </>
            : null}
           
            <ContainerDetails>
                <ContainerDetailsText>Detalhes</ContainerDetailsText>
                <div>{contentModal.details}</div>
            </ContainerDetails>
            <ButtonCheckout disabled={checkButtonAdd()}  onClick={addCart} >Colocar no Carrinho</ButtonCheckout>
        </ContainerModal>

    </Modal>
    </>)
}

export default ModalWindow