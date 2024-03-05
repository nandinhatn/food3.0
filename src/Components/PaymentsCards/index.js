import { initMercadoPago,  Payment, CardNumber,CardPayment,ExpirationDate,ExpirationYear,createCardToken,  SecurityCode,  } from '@mercadopago/sdk-react'
import React, {useContext, useEffect, useState} from 'react'
initMercadoPago('TEST-fe39c48d-048d-4a28-9249-6baa6c7ad646', { locale: 'pt-BR' });

import axios from 'axios';
const PaymmentsCards = ()=>{

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
    return(
        <>
       
        {/* <CardNumber placeholder='numero do cartao'></CardNumber>

        <ExpirationDate placeholder='Data de Exibiração'></ExpirationDate>

        <SecurityCode></SecurityCode> */}
         <Payment
      initialization={initialization}
      customization={customization}
     
      onSubmit={async (param) => {
        
        console.log(param);
       axios.post('https://www.pix.poppytecnologias.com.br/mpCob',{
            ...param
        }).then((params)=> console.log(params)) 
      }} 
    />
        </>
    )
}

export default PaymmentsCards;

