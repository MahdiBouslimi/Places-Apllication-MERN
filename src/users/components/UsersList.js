import React from 'react';
import './UsersList.css';
import Usersitems from './Usersitems';
import Card from '../../shared/components/UIelement/Card';

function UsersList(props) {
    if(props.items.length === 0){
      return (
      <div className="user-list">
          <Card>
          <h2>No Users founds  </h2>
          </Card>
      </div>
      ); 
    }
    return (
        <ul className="users-list"> 
            {props.items.map(user =>
                (<Usersitems
                 key={user.id} 
                 id={user.id} 
                 name={user.name} 
                 image={user.image} 
                 placeCount={user.places.length}
                 />))}
        </ul>
    );
    

}
export default UsersList;