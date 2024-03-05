import React, {useState,useContext,useEffect} from "react";

import axios from "axios";

const PaymentsPix = ()=>{

    const [idPayment, setIdPayment] = useState()
    const [qrcode, setQrcode] = useState()
    const [copiaCola, setCopiaCola] = useState()

    const getQrcode=()=>{
        axios.post('http://localhost:8000/mpCob',{
            "preco" : 10.00,
            "payer_email": "fernanda@poppymidia.com.br",
            "descricao" : "1/2 calabreza  + 1/2 mussarela"
        }).then((res)=>{
            console.log(res)
            setIdPayment(res.data.response)
            console.log(res.data.response.qrcodeImage)
            setQrcode(res.data.response.qrcodeImage)
            console.log(res.data.response.copia)
            setCopiaCola(res.data.response.copia)
            console.log(copiaCola)
        })
    }

    return(
        <>
        <div>
            Pagamento via Pix teste
            <button onClick={()=> getQrcode()}>Pagar via Pix</button>
            </div>  
            {qrcode !="" ? 
            
            <>
            <img width={200} height={200} src={qrcode}/>
           
            <input value={copiaCola}></input>
            <button>Copiar</button>
            </>
            : ''}
        
        </>
    )
}
export default PaymentsPix;