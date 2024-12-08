import "./Stars.css"
import Star from "./star/Star";

 const Stars=({value})=> {
    const stars=Array.from({length:value},(_,index)=>(
        <Star key={index}/>
    ))
    return(
        <div className="stars">
            {stars}
        </div>
    )
};
export default Stars;