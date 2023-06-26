
import '../stylesheets/break.css';


const Break = ( { length, increment, decrement }) => {
    
    return (
        <div className="col-5 counter">
            <h1 className="text-center" id="break-label">Break Length</h1>
            <div className="buttons-counter">
                <button id="break-decrement" onClick={decrement}>-</button>
                <span id="break-length">{length / 60}</span>
                <button id="break-increment" onClick={increment} >+</button>
            </div>
        </div>
    )
};
export default Break;