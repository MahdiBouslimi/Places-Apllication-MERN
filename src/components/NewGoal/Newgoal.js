import React, {useState} from 'react';

function Newgoal(props){
    const [entertext, Setentertext] = useState('');

    const AddgoalHandeller =event =>{
        event.preventDefault();
        const newgoal = {
            id: Math.random().toString(),
            text: entertext
        };
        Setentertext('');
        props.onAddGoal(newgoal);
        console.log(newgoal);
    }
    const textChangeHandeller = event =>{
       Setentertext(event.target.value);
        
    };

    return(
        <form className="Newgoal" onSubmit={AddgoalHandeller}>
            <input type="text" value={entertext} onChange={textChangeHandeller}/>
            <button type="submit"> Add goal</button>
        </form>
    );

}
export default Newgoal;