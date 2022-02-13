import React from 'react';
import './Usersitems.css';
import Avatar from '../../shared/components/UIelement/Avatar';
import Card from '../../shared/components/UIelement/Card';
import {Link} from 'react-router-dom';
function Usersitems(props){
    return(
        <li className="user-item">
            
                <Card className="user-item__content">
                <Link to={`/${props.id}/places`}>
                <div className="user-item__image">
                    <Avatar image={`http://localhost:5000/${props.image}`} alt={props.alt} />
                </div>
                <div className="user-item__info">
                    <h2>{props.name}</h2>
                    <h3>{props.placeCount} {props.placeCount===1 ? 'place' : 'places'}</h3>
                </div>
                </Link>
                </Card>
          
            
        </li>
    );

}
export default Usersitems;