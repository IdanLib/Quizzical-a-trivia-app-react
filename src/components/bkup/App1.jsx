import React from 'react'
import StartPage from './components/StartPage';
import Questions from './components/Questions';

function App1() {
  const [isStart, setIsStart] = React.useState(false);
  // const [prefs, setPrefs] = React.useState({});


  return (
    <div>
      {
        !isStart
          ? <StartPage
            isStart={isStart}
            setIsStart={setIsStart}
          // setPrefs={setPrefs}
          />
          : <Questions />
      }
    </div>
  );
}

export default App
