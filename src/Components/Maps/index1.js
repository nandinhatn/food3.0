import react,{useEffect, useState, useContext}  from 'react'

import { getDistance } from 'geolib'

import Geocode from "react-geocode";
import infos from '../../assets/Dates/infos';
import axios from 'axios';





const Maps = ()=>{

    const [distance, setDistance] = useState([])
    const [location, setLocation] = useState([])
    const [cep, setCep] = useState('04141100')
    const [street, setStreet] = useState()

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
        if(distance/1000<= infos.limit_entrega){
            console.log('atendimento é feito')
        }
        else{
            console.log('não permitido')
        }
          });

        
    }

    const getAddress= ()=>{
                           
        if(cep.length===8){
            axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res)=>{
                console.log(res)
            })
        }
       
        
       

    }
    
    useEffect(()=>{
        getAddress()
    },[cep])

    useEffect(()=>{
     getPosition() 
      
    },[])
    return(
        <>
        <div> Endereço</div>
        <div>CEP</div>
        <input value={cep} onChange={(e)=> setCep(e.target.value) }></input>


        </>
    )
}
export default Maps