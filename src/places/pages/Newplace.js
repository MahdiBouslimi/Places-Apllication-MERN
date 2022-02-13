import React,{useContext} from 'react'; 
import { useHistory } from 'react-router';
import './Newplace.css';
import Input from '../../shared/FormElements/Input';
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/validators';
import Button from '../../shared/FormElements/Button' 
import {useForm} from '../../shared/hooks/form-hook'
import {useHttpClient} from '../../shared/hooks/http-hook'
import {AuthContext} from '../../shared/context/auth-context'
import ErrorModal from '../../shared/components/UIelement/ErrorModal';
import LoadingSpinner from '../../shared/components/UIelement/LoadingSpinner';
import ImageUpload from '../../shared/FormElements/ImageUpload';

function Newplace() {

  const auth = useContext(AuthContext)
  const {isLoading, error, sendRequest, clearError}= useHttpClient();
  const [formState, inputHandler] = useForm(
   {
    title: {
      value : '',
      isValid : false 
    },
   description:{
     value:'',
     isValid :false
    }, 
   adress:{ 
     value:'',
     isValid :false
    },
    image:{
      value: null,
      isValid: false
    }
  },false
  );
  const history = useHistory()
  
  const placeSubmitHandler = async event =>{
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('creator', auth.userId);
      formData.append('image', formState.inputs.image.value);
      await sendRequest(
        'http://localhost:5000/api/places', 
        'POST', 
        formData);
      history.push('/');
    } catch (err) {}
    

  };

  return( 
   <React.Fragment> 
     <ErrorModal error={error} onClear={clearError}/>
        <form className="place-form" onSubmit={placeSubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay/>}
      
      <Input
      id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="adress"
        element="input"
        label="Adress"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid adress."
        onInput={inputHandler}
      />
      <Input
      id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid discription at least 5 characters."
        onInput={inputHandler}
      />
      <ImageUpload 
        id="image" 
        onInput={inputHandler}
        errorText="Please provide an image."
      />
      <Button 
        type="submit" 
        disabled={!formState.isValid}>ADD PLACE</Button>
    </form>

    </React.Fragment>
    ); 

};
export default Newplace;