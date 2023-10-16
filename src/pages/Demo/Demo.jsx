import React,{ useState }from 'react'
import Header from '../../components/common/header/Header'
function Demo() {
  const triggerFlaskAction = () => {
    const [audioSrc, setAudioSrc] = useState(null);
    const apiUrl = 'http://127.0.0.1:5000/start_exam';
    console.log('Fetching from:', apiUrl);
    fetch(apiUrl, {
      method: 'GET',
    })
      .then(response => {
        console.log('Response status:', response.status);
        return response.blob();
      })
      .then(blob => {
        const url = URL.createObjectURL(blob);
        console.log('Audio URL:', url);
        setAudioSrc(url);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
      return (
          <>
          <Header/>
            <div>
              <button onClick={triggerFlaskAction}>Start Exam</button>
              {audioSrc && (
                <audio controls>
                  <source src={audioSrc} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
            </>
      );
    };


export default Demo;