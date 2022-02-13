import React , {useEffect, useState}from 'react';
import PLaceList from '../components/PlaceList';
//import img from '../../images/img1.jpg';
import {useParams} from'react-router-dom';
import {useHttpClient} from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/components/UIelement/ErrorModal';
import LoadingSpinner from '../../shared/components/UIelement/LoadingSpinner';

function Userplaces (){
    const [loadPlaces, setLodedPlaces]=useState()
    const {isLoading, error, sendRequest, clearError}= useHttpClient();
    // const DUMMY_PLACES=[   
    //     {
    //         id: 'p2',
    //         title: 'Empire ',
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
    
    const userId= useParams().userId;

    useEffect(()=>{
        const fetchPlaces= async()=>{
            try{
             const resposeData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
                setLodedPlaces(resposeData.places)
            }catch(err){}
        }
        fetchPlaces()
    },[sendRequest, userId])

    const placeDeletedHandler = deletePlaceId =>{
        setLodedPlaces(prevPlaces => 
            prevPlaces.filter(place => place.id !== deletePlaceId ));
    }
    //const loadPlace = DUMMY_PLACES.filter(place =>place.creator===userId);
    return (

        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading &&(
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadPlaces && <PLaceList items={loadPlaces} onDeletePlace={placeDeletedHandler}/>}
        </React.Fragment>
    );

}

export default Userplaces;