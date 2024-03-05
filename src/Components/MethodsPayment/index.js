import React, {useState, useContext, useEffect} from "react";
import apiWhats from "../../assets/Dates/apiWhats";
import axios from "axios";
import {Container, Title, ContainerRadios, Radios, Label, Button} from './style'
import {
    CartContext,
    CategoriesContext,
    ProductsContext, 
    FreteContext
} from '../../ContextProducts'
import PaymentsPix from "../PaymentsPix";
import PaymentsCards from '../PaymentsCards'

const MethodsPayment =(props)=>{

    const [paymentsType, setPaymentType] = useState()
    const [pix, setPix] = useState()
    const [card, setCard] = useState()
    const [delivered, setDelivered] = useState()
    const {cart,setCart} = useContext(CartContext)
    const {frete, setFrete} = useContext(FreteContext)

    const sendMessageDelivered= ()=>{
        console.log(cart)
        console.log(frete)
        console.log('forma de pagamento', paymentsType)
        console.log('endereco', props.address)
        console.log('number', props.number)
        console.log('complement', props.complement)

        let pedido;

        cart.map((el)=> {
            pedido = `Item: ${el.title} ,qtd: ${el.qtd}, self: ${el.self}`
        })
        pedido += `Frete Valor: ${frete}`
        console.log(pedido)

        let message = `######## Novo Pedido ########  \n \n
            Entrega: Av/R ${props.address} - Número: ${props.number} \n
            Complemento: ${ props.complement!="" ? props.complement : '-'} \n
            ${pedido}\n
            ${props.name}
            ${props.cpf}
            ${props.celular}
            `


        axios.post("http://189.126.111.155:8082/send-message",{
    
        number: "5511969748216@c.us",
        message : message
      }).then(res=> {console.log(res.data.response._data.body);
    /* setPedido(res.data.response._data.body) */
})  
    }

    useEffect(()=>{
        console.log(paymentsType)
        if(paymentsType=='delivered'){
            setDelivered(true)
            setCard(false)
            setPix(false)
        }
        else if(paymentsType=="card"){
            setDelivered(false)
            setCard(true)
            setPix(false)
        }
        else if(paymentsType=="pix"){
            setDelivered(false)
            setCard(false)
            setPix(true)
        }
        else{
            setDelivered(false)
            setCard(false)
            setPix(false)
        }
    }, [paymentsType])

    useEffect(()=>{
        console.log(frete)
    },[frete])
    return(
        <>
        <Title>Metodos de pagamento</Title>
        <Container>
        <ContainerRadios onChange={(e)=> setPaymentType(e.target.value)}>
        <Radios name="payment" type="radio" value="delivered"/> 
        <Label>Pagamento na Entrega</Label>
        <Radios name="payment" type="radio" value="card"/> 
        <Label>Pagamento Cartão
            </Label>
        <Radios name="payment" type="radio" value="pix"/> 
        <Label>Pagamento Pix
            </Label>
        </ContainerRadios>
        
      

        {delivered ? 
        
        <>
        <div>
       
        <Button onClick={()=> sendMessageDelivered()}> Confirmar pedido</Button>
        </div>
        </>
        
        :  pix ? 
        <PaymentsPix></PaymentsPix>
        :  card? 
        
      <PaymentsCards></PaymentsCards>
        : 'Aguardando definição de pagamento' }
        </Container>
        </>
    )
}

export default MethodsPayment