import { initMercadoPago,  Payment, CardNumber,CardPayment,ExpirationDate,ExpirationYear,createCardToken,  SecurityCode,  } from '@mercadopago/sdk-react'
import React, {useContext, useEffect, useState} from 'react'
initMercadoPago('TEST-fe39c48d-048d-4a28-9249-6baa6c7ad646', { locale: 'pt-BR' });
import QRCode from 'qrcode.react';
import {
  CartContext,
  CategoriesContext,
  ProductsContext, 
  FreteContext
} from '../../ContextProducts'
import axios from 'axios';
const PaymmentsCards = (props)=>{

    const [showQrcode, setShowQrcode] = useState(false);
    const [qrCode, setqrCode] = useState('')
    const {cart,setCart} = useContext(CartContext)
    const {frete, setFrete} = useContext(FreteContext)
    const initialization = {
        amount: 1,
        preferenceId: '207446753-ea3adb2e-a4f2-41dd-a656-11cb01b8772c',
      };
      
    
      const customization = {
        paymentMethods: {
       
          
          bankTransfer: ['pix'],
          creditCard: 'all',
          debitCard: 'all',
          
        },
      };
      const getProductsCart=()=>{
        let listProducts =[]
        cart.forEach(element => {
          listProducts.push({ "id": element.id, "quantidade": element.qtd})
          
        });
        console.log(listProducts)
        return listProducts
      }

      const getFrete=()=>{
        console.log(frete)

      }
    return(
        <>
       
        {/* <CardNumber placeholder='numero do cartao'></CardNumber>

        <ExpirationDate placeholder='Data de Exibiração'></ExpirationDate>

        <SecurityCode></SecurityCode> */}


      {showQrcode ? <QRCode value={qrCode}/> :  <Payment
      initialization={initialization}
      customization={customization}
     
      onSubmit={async (param) => {
        
        console.log(param);
        console.log(param)
        console.log(cart)
        console.log("frete",frete)
        console.log(param.formData.payer.email)
        
        let payment_type = "PIX"
        // forma_pagamento = param.formData.payment_method_id.toLocaleUpperCase() 
        getFrete()
        console.log(props)
        let complement = "" || props.complement
        getProductsCart()
       
       axios.post('http://localhost:8000/novo_pedido/',
        {
          "name_client": props.name,
          "address_client": props.address +  "Numero da casa: " + props.number + complement ,
          "cpf_client": props.cpf,
          "observacoes": "Observações adicionais sobre o pedido",
          "forma_pagamento":param.formData.payment_method_id,
          "faixa":1,
          "email_client": param.formData.payer.email,
          "produtos": getProductsCart()
        
           
        }).then((params)=> {

          console.log(params.data)
          setqrCode(params.data.pagamento.point_of_interaction.transaction_data.qr_code)
          setShowQrcode(true)

        }) 
      }} 
    />}  
        
 
      
        </>
    )
}

export default PaymmentsCards;

