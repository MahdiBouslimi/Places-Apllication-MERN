import React, { useEffect, useState , useContext} from 'react';
import { useParams, useHistory } from 'react-router';
//import img from '../../images/img1.jpg';
import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button'
import {VALIDATOR_MINLENGTH,VALIDATOR_REQUIRE} from '../../shared/util/validators'
import './Newplace.css'
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIelement/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIelement/LoadingSpinner';
import ErrorModal from '../../shared/components/UIelement/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';
// const DUMMY_PLACES=[
//     {
//         id: 'p1',
//         title: 'Empire State Building',
//         description: 'one of the most famous sky scraper in the world!',
//         imageUrl: img,
//         adress :'Université de Tunis El Manar',
//         location :{
//             lat : 36.7952338 ,
//             lng : -10.0732369
//         },
//         creator :'u1'
//     },
//     {
//         id: 'p2',
//         title: 'Empire',
//         description: 'one of the most famous sky scraper in the world!',
//         imageUrl: img,
//         adress :'Université de Tunis El CARTHAGE',
//         location :{
//             lat :36.7952338 ,
//             lng :-10.0732369
//         },
//         creator :'u2'
//     }
// ];


const Updateplace = ()=>{
    const auth =useContext(AuthContext)
    const {isLoading, error, sendRequest, clearError}= useHttpClient();
    const [loadPlaces, setLodedPlaces]=useState()

const placeId = useParams().placeId; 
const history =useHistory()
const [formState, inputHandler, setFormdata] = useForm(
    {
    title:{
        value : '',
        isValid : false
    },
    description: {
        value : '',
        isValid : false
    }
}, false) 

//const identifiedPlace = DUMMY_PLACES.find(p=>p.id=== placeId);
useEffect(()=>{
    const fetchPlaces= async()=>{
        try{
         const resposeData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
            setLodedPlaces(resposeData.place)
            setFormdata(
                {
                    title: {
                        value : resposeData.place.title,
                        isValid : true
                    },
                    description: {
                        value: resposeData.place.description,
                        isValid: true
                    } 
                },
                true
            );
        }catch(err){}
    }
    fetchPlaces()
}, [sendRequest,placeId, setFormdata])




const PlaceUpdateSubmithandler = async event=>{
    event.preventDefault();
    try{
         await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
            
         }),
         {'Content-Type':'application/json'}
         ); 
         history.push('/'+ auth.userId+ '/')
    }catch(err){}
    
}
if (isLoading){
    return (<div className="center" >
        <LoadingSpinner />
        </div>);
}

if (!loadPlaces && !error){
    return (<div className="center" >
        <Card>
        <h2>Could not find place!</h2>
        </Card>
        </div>);
}



return (
    <React.Fragment>
        <ErrorModal  error={error} onClear={clearError}/>
<form className="place-form" onSubmit={PlaceUpdateSubmithandler}>
    <Input
    id="title"
    element="input"
    type="text"
    label="title"
    validators={[VALIDATOR_REQUIRE()]}
    errorText ="please enter a valid title."
    onInput= {inputHandler}
    initialvalue={loadPlaces.title}
    initialvalid={true}
    />
    <Input
    id="description"
    element="textarea"
    label="Description"
    validators={[VALIDATOR_MINLENGTH(5)]}
    errorText="Please enter a valid discription at least 5 characters."
    onInput= {inputHandler}
    initialvalue={loadPlaces.description}
    initialvalid={true}
    />
    <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
</form>
</React.Fragment>
)
}
export default Updateplace;
