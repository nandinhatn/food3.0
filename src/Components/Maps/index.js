import react,{useEffect, useState, useContext}  from 'react'
import {
    CartContext, 
    FreteContext, 
    ProductsContext, 
    CategoriesContext,
   
} from '../../ContextProducts'

import {
    Input,
    Button,
    Container,
    Title,
    ContainerButtons
} from './style'
import { getDistance } from 'geolib'

import Geocode from "react-geocode";
import infos from '../../assets/Dates/infos';
import axios from 'axios';


import { withMask } from 'use-mask-input';
import apiKey from '../../assets/Dates/keys';
import api from '../../assets/Dates/api'
import MethodsPayment from '../MethodsPayment';



const Maps = ({confirm, total})=>{

    const [distance, setDistance] = useState([])
 
    const [cep, setCep] = useState('04141100')
    const [cepConfirm, setCepConfirm] = useState(false)
    const [address, setAddress] = useState()
    const [neighborhood, setNeighborhood] = useState()
    const [city, setCity] = useState()
    const [uf, setUF] = useState() 
    const [complement, setComplement] = useState("-")
    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [celular, setCelular] = useState('')
    const [confirmAddres, setConfirmAddress] = useState(false)
    const [faixasFrete, setFaixasFrete] = useState([])
 
   
    const {frete,setFrete} = useContext(FreteContext)
    const {cart,setCart} = useContext(CartContext)
    const [txtAddress, setTxtAddress] = useState('')
    

    

    const getPosition = ()=>{
        console.log('*************************************************aqui')
        const key = apiKey
        
     
     let query= infos.cidade + txtAddress
     
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${key}`).then((res)=>{
            if(res){
                console.log(res.data.results[0].address_components) 
                console.log(res.data.results[0].address_components[0])// cep
                console.log(res.data.results[0].address_components[1].long_name)// rua
                console.log(res.data.results[0].address_components[2].long_name)// bairro
                console.log(res.data.results[0].address_components[3].long_name)// cidade
                console.log(res.data.results[0].address_components[4].long_name)// estado 
                console.log(res.data.results[0].formatted_address)// endereço formatado
                setAddress(res.data.results[0].formatted_address)
                console.log(res.data.results[0].geometry.location.lat)// lat
                console.log(res.data.results[0].geometry.location.lng)// lat */
    
               
                let lat = res.data.results[0].geometry.location.lat
                let long = res.data.results[0].geometry.location.lng 
    
                setAddress(res.data.results[0].formatted_address) 
             
                getDistanceBettwenn(lat,long) 
                console.log(res.data.results)
            }
            
           
        }).catch((e)=>{
            console.log(e)
        })
       
       
       
   

        
    }
    function getFaixas (distance){
        console.log(distance)
        if(faixasFrete){
            console.log('exite')
            let result =faixasFrete.filter((el)=> el.distance <= Math.round(distance))
            console.log(result)
            if(result.length>0){
                let resultado = result.sort().reverse()[0]
                console.log(typeof resultado)

                return result.sort().reverse()[0]
            }
            else{
                return false
            }
           

        }
       
      

       
                     
                  
 
    }

    function getDistanceBettwenn(lat,long){
        console.log(lat,long)
        const distance = getDistance(
            { latitude: lat, longitude: long },
            { latitude: -24.3173, longitude: -46.9956 }
           
        )
        console.log('lat',lat,long)
        console.log(distance)
        let distanceKm = distance/1000
        if(distanceKm<= infos.limit_entrega){
            console.log('atendimento é feito')
            console.log(infos.faixas)
            const filter = infos.faixas.filter((el)=> el.distance <= distanceKm)
            // calcular do path criado das faixas.
             let freteFinal= getFaixas(distanceKm)
             console.log(freteFinal)

             if(freteFinal){
                setFrete(freteFinal)
             }
             else{
                console.log('nao permitido')
             }
            //  console.log(freteFinal)
            // limite  fazer com o path criado do restaurante.
            // console.log('infos',filter[0])
            // setFrete(filter[0].value)
            setConfirmAddress(true)
        }
        else{
            console.log('não permitido')
        }
    }

    useEffect(()=>{
        api.get('/faixas').then((res)=> {
        
            console.log(res.data)
         
            setFaixasFrete(res.data)
        }
           
           )
    },[])

    useEffect(()=>{
        console.log(faixasFrete)
    },[faixasFrete])



    const clearForm=()=>{
        setBairro('')
        setComplemento('')
        setUF('')
        setStreet('')
        setLocalidade('')
    }

    

    return(
        <>
        <Container></Container>
        <Title> Informações de  Endereço</Title>
       {/*  <div> Digite seu CEP </div>
        <input ref={withMask('99999-999')} onChange={(e)=> setCep(e.target.value) }></input> */}
       
        <Input value={txtAddress} onChange={(e)=> setTxtAddress(e.target.value)} placeholder='Digite seu endereço'></Input>
        <ContainerButtons>

        <Button  onClick={confirm}>Adicionar mais itens</Button>
        <Button  onClick={()=> getPosition()}>Confirma Endereço</Button>
        </ContainerButtons>
        

       

            

           {/*  {confirmAddres?  */}

            <>
            <div>Informe o numero</div>

            <Input value={number} onChange={(e)=> setNumber(e.target.value)}></Input>
            <div>Informe o Complemento</div>
            <Input value={complement} onChange={(e)=> setComplement(e.target.value)}></Input>
          {/*   {confirmAddres && number !='' ?  */}
            <>
            <Title>Endereço de Entrega</Title>
            <Container>

            <div>{address}</div>
            </Container>
            <Title>Informações Pessoais</Title>
            <div>Informe seu nome</div>
            <Input value={name} onChange={(e)=> setName(e.target.value)}></Input>
            <div>Informe CPF</div>
            <Input value={cpf} onChange={(e)=> setCpf(e.target.value)}></Input>
            <div>Informe Celular</div>
            <Input value={celular} onChange={(e)=> setCelular(e.target.value)}></Input>
         
         
            <MethodsPayment cart={cart} address={address} cpf={cpf} name={name} number={number} celular={celular} complement={complement} uf={uf} ></MethodsPayment>
          
            </>
           {/*   :''} */}
            

            </>
          {/*   : ''} */}
        </>
    )
}
export default Maps;