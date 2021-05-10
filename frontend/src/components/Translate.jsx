import React, { useState } from 'react';

export default function Translate() {
  const [text, setText] = useState('');
  const onChangeHandler = (e) => {
    setText(e.target.value);
  };
  const onSubmit = async () => {
    console.log('clicked', text);
    const res = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: 'es',
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    let translateText = await res.json();
    translateText = translateText.translatedText;
    console.log(translateText);
    const utterance = new SpeechSynthesisUtterance(translateText);
    const voices = window.speechSynthesis.getVoices();
    // eslint-disable-next-line prefer-destructuring
    utterance.voice = voices.filter((voice) => voice.name === 'Alex')[0];
    utterance.lang = 'es-ES';
    window.speechSynthesis.speak(utterance);
  };
  return (
    <div className="bg-light">
      <div className="container">
        <input type="text" onChange={onChangeHandler} />
        <button type="button" className="btn btn-primary" onClick={onSubmit}>Translate</button>
      </div>
      <button
        type="button"
        className="btn btn-warning"
        onClick={
          () => {
            const audio = new Audio('../../public/trans.mp3');
            audio.play();
          }
      }
      >
        Play text
      </button>
    </div>
  );
}
