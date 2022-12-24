import React from 'react'
import StartPage from '../StartPage';
import Questions from '../Questions';

function App2() {
  const [isStart, setIsStart] = React.useState(false);
  const [prefs, setPrefs] = React.useState(
    {
      category: "",
      difficulty: ""
    }
  )

  return (
    <div>
      {
        !isStart
          ? <StartPage
            isStart={isStart}
            setIsStart={setIsStart}
            prefs={prefs}
            setPrefs={setPrefs}
          />
          : <Questions
            prefs={prefs}
          />
      }
    </div>
  );
}

export default App
