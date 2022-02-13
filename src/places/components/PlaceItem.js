import React, { useState,useContext } from 'react';

import Card from '../../shared/components/UIelement/Card';
import Button from '../../shared/FormElements/Button';
import Modal from '../../shared/components/UIelement/Modal';
import Map from '../../shared/components/UIelement/Map';
import './PlaceItem.css';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIelement/ErrorModal';
import LoadingSpinner from '../../shared/components/UIelement/LoadingSpinner';

const PlaceItem = props => {
  const {isLoading, error, sendRequest, clearError}= useHttpClient();

  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);

  const [showconfirmModal, setshowconfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler =() =>{
    setshowconfirmModal(true);
  }
  const cancelDeleteHandler =() =>{
    setshowconfirmModal(false);
  }

  const confirmDeleteHandeler =async() =>{
    setshowconfirmModal(false)
    try{
      await sendRequest(`http://localhost:5000/api/places/${props.id}`,'DELETE');
      props.onDelete(props.id);
    }catch(err){}
    
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.adress}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.cordinates} zoom={16}/>
        </div>
      </Modal>
      <Modal
      show={showconfirmModal}
      onCancel={cancelDeleteHandler}
      header="Are you sure?" 
      footerClass="place-item__modal-actions" 
      footer={
        <React.Fragment>
          <Button inverse onClick={cancelDeleteHandler}>CANSEL</Button>
          <Button danger onClick={confirmDeleteHandeler}>DELETE</Button>
          
        </React.Fragment>
      }>
        <p>do you want to proceed and delete this place? 
          please note that it can't be undone there after</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay/>}
          <div className="place-item__image">
            <img /*src={props.image}*/ src={`http://localhost:5000/${props.image}`} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            {auth.isLoggedIn &&
            <Button to={`/places/${props.id}`}>EDIT</Button>
            }
            {auth.isLoggedIn &&
            <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
            }
            </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
