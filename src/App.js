
import React,{useCallback, useState}from "react";
import './App.css';
//import DevReact from "./components/Course/devreact";
//import Newgoal from "./components/NewGoal/Newgoal";
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Users from "./users/pages/Users";
import Newplace from "./places/pages/Newplace";
import Mainnavigation from "./shared/navigation/Mainnavigation";
import Userplaces from "./places/pages/Userplaces";
import Updateplace from "./places/pages/Updateplace";
import Auth from "./users/pages/Auth";
import {AuthContext} from './shared/context/auth-context';

// We use Route in order to define the different routes of our application

function App() {
const [isLoggedIn,setIsLoggedIn]=useState(false);
const [userId,setUserId]=useState(false);

const login = useCallback((uid)=>{
  setIsLoggedIn(true);
  setUserId(uid)
}, []);
const logout = useCallback(()=>{
  setIsLoggedIn(false);
  setUserId(null)
}, []) 
let routes ;
if (isLoggedIn){
  routes =(
    <Switch>
    <Route path="/" exact>
            <Users />
          </Route>
     <Route path="/:userId/places" exact>
     <Userplaces />
    </Route>
    <Route path="/place/new" exact>
        <Newplace />
      </Route>
      <Route path="/places/:placeId" exact>
        <Updateplace />
      </Route>
    <Redirect  to="/"/>        
    </Switch> 
    
  );
}else 
{routes =(
  <Switch>
<Route path="/" exact>
        <Users />
      </Route>
 <Route path="/:userId/places" exact>
 <Userplaces />
</Route>
<Route path="/auth" exact>
        <Auth />
      </Route> 
<Redirect  to="/auth"/>        
</Switch>  
);}

  return (
    <AuthContext.Provider 
    value={{
    isLoggedIn: isLoggedIn, 
    login: login,
    userId:userId,
    logout: logout}}>
    <Router>
      <Mainnavigation />
      <main>
      {routes}
      </main>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
