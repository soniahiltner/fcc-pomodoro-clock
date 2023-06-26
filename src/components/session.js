
import '../stylesheets/session.css';


const Session = ({ length, increment, decrement }) => {
    
    return (
        <div className="col-5 counter">
            <h1 className="text-center" id="session-label">Session Length</h1>
            <div className="buttons-counter">
                <button id="session-decrement" onClick={decrement}>-</button>
                <span id="session-length">{length / 60}</span>
                <button id="session-increment" onClick={increment}>+</button>
            </div>
        </div>
    )
};
export default Session;