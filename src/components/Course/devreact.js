import React from "react";

function devReact(props)
{
  console.log(props.goals);
    return(
        <div>  
        <ul className="goal-list"> 
        {
          props.goals.map((goal)=>{
            return <li key={goal.id}>{goal.text}</li>;
          })
        }

        </ul>
        </div>
    );

}

export default devReact;
