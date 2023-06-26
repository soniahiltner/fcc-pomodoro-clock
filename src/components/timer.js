import '../stylesheets/timer.css';

function Timer({ type, time, beepPlay }) {

  const min = Math.floor(time / 1000 / 60);
  const sec = Math.floor((time / 1000) % 60);
  const timerLabelStyle = { animation: 'colorsize 1s 4'};
  
  return (
    <div className='timer'>
      <h1 id='timer-label' style={beepPlay ? timerLabelStyle : null} >{type}</h1>
      <span id='time-left'>{min.toString().length === 1 ? "0" + min : min}:{sec.toString().length === 1 ? "0" + sec : sec}</span> 
    </div>
  )
};
export default Timer;