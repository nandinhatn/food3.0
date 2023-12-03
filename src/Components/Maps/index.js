import react,{useEffect, useState, useContext}  from 'react'
import {CartContext, FreteContext, ProductsContext, CategoriesContext} from '../../ContextProducts'
import { getDistance } from 'geolib'

import Geocode from "react-geocode";
import infos from '../../assets/Dates/infos';
import axios from 'axios';

import { withMask } from 'use-mask-input';




const Maps = ()=>{

    const [distance, setDistance] = useState([])
    const [location, setLocation] = useState([])
    const [cep, setCep] = useState('04141100')
    const [cepConfirm, setCepConfirm] = useState(false)
    const [street, setStreet] = useState()
    const [bairro, setBairro] = useState()
    const [localidade, setLocalidade] = useState()
    const [uf, setUF] = useState() 
    const [complemento, setComplemento] = useState()
    const [numero, setNumero] = useState()
    const [confirmAddres, setConfirmAddress] = useState(false)
    
    const {frete,setFrete} = useContext(FreteContext)
    const {cart,setCart} = useContext(CartContext)
    

    //6d3600f53d3a810a01e61276b18a238f58b135bb
   /*  const teste = ()=>{
        console.log('aqui222')
        const successCallback = (position) => {
            console.log(position);
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            console.log(lat,long)
          };
          
          const errorCallback = (error) => {
            console.log(error);
            console.log('as permissões de localização devem ser autorizadas')
          };
          
          navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    } */
    

    const getPosition = ()=>{
        let lat;
        let long;
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
        
             console.log(lat)
             console.log(long)
          /*   latText.innerText = lat.toFixed(2);
        longText.innerText = long.toFixed(2); */

        const distance = getDistance(
            { latitude: lat, longitude: long },
            { latitude: -24.3173, longitude: -46.9956 }
           
        )
        console.log(distance)
        let distanceKm = distance/1000
        if(distanceKm<= infos.limit_entrega){
            console.log('atendimento é feito')
            console.log(infos.faixas)
            const filter = infos.faixas.filter((el)=> el.distance <= distanceKm)
            console.log('infos',filter[0])
            setFrete(filter[0].value)
        }
        else{
            console.log('não permitido')
        }
          });

        
    }

    const clearForm=()=>{
        setBairro('')
        setComplemento('')
        setUF('')
        setStreet('')
        setLocalidade('')
    }

    const getAddress= ()=>{
        let newcep =cep.replaceAll(' ', '').replaceAll('_','').replaceAll('-', '')
        console.log('chamei', newcep, newcep.length)
      if(newcep.length>=8){

            axios.get(`https://viacep.com.br/ws/${newcep}/json/`).then((res)=>{
                console.log(res)
                if(res.statusText=='OK'){
                    setCepConfirm(true)
                    setStreet(res.data.logradouro)
                    setBairro(res.data.bairro)
                    setLocalidade(res.data.localidade)
                    setUF(res.data.uf)
                    
                }
                if(res.data.error==true){
                    console.log('erroooooooooooooooo')
                }
            })
        }
        else{
           clearForm()
        }
       
        
       

    }

    const configCep= (value)=>{
        console.log('teste')
        setCep(value)
        getAddress()
        setBairro()
        setLocalidade()
        setStreet()


    }
    
    useEffect(()=>{
        getAddress()
        if(cep.length<8){
            clearForm()
        }
    },[cep])

    useEffect(()=>{
     getPosition() 
      
    },[])
    return(
        <>
        <div> Endereço</div>
        <div>CEP</div>
        <input ref={withMask('99999-999')} onChange={(e)=> setCep(e.target.value) }></input>

        {cepConfirm? 
        <>
        <input value={street} placeholder='Rua'></input>
        <input value={bairro} placeholder='Bairro'></input>
        <input value={localidade} placeholder='Localidade'></input>
        <input value={uf} placeholder='UF'></input>
        <input placeholder='Informe o numero'></input>
        <input placeholder='complemento'></input>
        </> : ''}

            <button onClick={()=> setConfirmAddress(true)}>Confirmar Endereço</button>

            {confirmAddres? 
            <>
            <div>Confirmar Pagamento</div>

            </>
            : ''}
        </>
    )
}
export default Maps