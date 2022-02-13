import React,{useState} from 'react'; 
import './Mainnavigation.css';
import Mainheader from './Mainheader';
import { Link } from 'react-router-dom';
import Navlink from './Navlinks';
import Sidedrawer from './Sidedrawer';
import Backdrop from '../components/UIelement/Backdrop';


function Mainnavigation(props){
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const openDrawerHandler = () =>{
        setDrawerIsOpen(true);

    }
    const closeDrawerHandler = () =>{
        setDrawerIsOpen(false);
    };
    

    return(
        <React.Fragment>
            { drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}
            
            <Sidedrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <Navlink />

                </nav>
            </Sidedrawer>
            

        
        <Mainheader>
            <button className="main-navigation__menu-btn" onClick={openDrawerHandler }>
                <span></span>
                <span></span>
                <span></span>
                </button>
                <h1 className="main-navigation__title">
                   <Link to="/">Your places</Link> 
                </h1>
                <nav className="main-navigation__header-nav">
                   <Navlink></Navlink>
                </nav>
        </Mainheader>
        </React.Fragment>
         
    );
}
export default Mainnavigation;