import React from 'react';
import './App.css';
import {bankOne as audioClips} from "./audiobank.js"

function App() {

  const [volume, setVolume] = React.useState(1);
  const [soundS, setSoundS] = React.useState("Press Key");

  return (
    <div className="bg-info min-vh-100 text-white">
      <div className="Drum">
      <div id="drum-machine" className="text-center">
      <h2>Drum Machine</h2>
      {audioClips.map(clip => {
        return <Pad clip={clip} key={clip.id} volume={volume} setSoundsS={setSoundS}/>
      })}
      <br />
      <div id="display"><Display soundS={soundS}/></div>
      <br />
      <div id="volume">
      <h4>Volume</h4>
      <input type="range" step="0.1" value={volume} onChange={(event) => setVolume(event.target.value)} max="1" min="0" className="w-50" />
      <p>{volume}</p>
      </div>
      </div>
      </div>
    </div>
  );
}

function Display({soundS}){
  return(
    <h3>Sound: {soundS}</h3>
  );
}

function Pad({clip, volume, setSoundsS}){

  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.keyCode === clip.keyCode){
      playSound();
    }
  };

  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    setActive(true);
    setTimeout(() => setActive(false), 200);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    Display(clip);
    setSoundsS(clip.id);
  };

  return (
    <div onClick={playSound} className={`btn btn-secondary p-4 m-3 ${active && "btn-warning"}`}>
      <audio id={clip.keyTrigger} src={clip.url} />
      {clip.keyTrigger}
    </div>
  );
}


export default App;
