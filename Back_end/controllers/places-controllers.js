const { v4: uuidv4 } = require('uuid');
const fs =require('fs')
const {validationResult} =require('express-validator')
const mongoose = require('mongoose')
const HttpError = require('../models/http-error')
const getCoordsForAddress = require('../util/location')
const Place = require('../models/place')
const User = require('../models/user');
const user = require('../models/user');
const { error } = require('console');
 
// const getPlaces =async(req,res,next)=>{
//   let place;
//     try{
//        place =await Place.find();   
//     }catch(err){
//       const error = new HttpError('Something went wrong, could not find a place', 500);
//     return next(error)
//     }
    
//     if (!place){
//         const error = new HttpError('could not find a place for the provided id.',404);
//         return next (error);
//       }
//       res.json({place: place.map(places => places.toObject({ getters: true}))});
      
// }
const getPlaceById = async(req,res,next)=>{
    const placeId = req.params.pid // {pid : 'p1'}
    
    let place;
    try{
       place =await Place.findById(placeId);   
    }catch(err){
      const error = new HttpError('Something went wrong, could not find a place', 500);
    return next(error)
    }
    
    if (!place){
        const error = new HttpError('could not find a place for the provided id.',404);
        return next (error);
      }
      res.json({place: place.toObject({ getters: true })}); // {place} =>{place : place}
}
//function getPlaceById(){...}
//const getplaceById = function(){....}
const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // let places;
  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(userId).populate('places');
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again later.',
      500
    );
    return next(error);
  }

  // if (!places || places.length === 0) {
  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    );
  }

  res.json({ places: userWithPlaces.places.map(place => place.toObject({ getters: true })) });
};
const createPlace = async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }


  const { title, description, coordinates,address, creator } = req.body;
//   let coordinates;
//   try {
//     coordinates = await getCoordsForAddress(address);
//   } catch (error) {
//     return next(error);
//  }


  const createdPlace = new Place({
   // id:uuidv4(),
    title,
    description,
    address,
    location: coordinates,
    //image: req.file.path,
    //image: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Collage_de_la_ciudad_de_Madrid%2C_capital_de_Espa%C3%B1a.png',
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  // console.log(user);

  try {
    // const sess = await mongoose.startSession();
    // sess.startTransaction();
    // await createdPlace.save({ session: sess }); 
    // user.places.push(createdPlace); 
    // await user.save({ session: sess }); 
    // await sess.commitTransaction();
    await createdPlace.save();
    await user.places.push(createdPlace); 
    await user.save();
    

  }  catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  
  }

  
  res.status(201).json({ place: createdPlace });
};

  const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!(errors.isEmpty())) {
      return next( new HttpError('Invalid inputs passed, please check your data.', 422))
    }
    const { title, description } = req.body;
    const placeId = req.params.pid;
    
    let place;

    try{
      place = await Place.findById(placeId)
    }catch(err){
      const error = new HttpError('Somthing went wrong, could not update place.',500)
      return next(error)
    }
    
    place.title = title;
    place.description = description;

    try{
      await place.save();
    }catch(err){
      const error = new HttpError('Somthing went wrong, could not update place.',500)
      return next(error)
    }
  
    res.status(200).json({place: place.toObject({getters: true})});
  };
  
  const deletePlace = async (req, res, next) => {
      const placeId = req.params.pid;
      let place;
      try{
        place =await Place.findById(placeId).populate('creator')
      }catch(err){
       
        const error = new HttpError('Somthing went wrong, could not delete place.',500)
        return next(error)
      }

      if(!place){
        const error = new HttpError('could not find place for this id.',404)
        return next(error)
      }
      const imagePath = place.image;

      try{
   
       await place.remove()
       await place.creator.places.pull(place)
       await place.creator.save()
       
      }catch(err){
        console.log(err)
        const error = new HttpError('Somthing went wrong, could not delete place.',500)
        return next(error)
      }
      fs.unlink(imagePath, err =>{
        console.log(err)
      })

      res.status(200).json({message: 'Deleted place.'})
  };




exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
//exports.getPlaces = getPlaces;