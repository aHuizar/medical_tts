import React, { useState } from 'react';
import gTTS from 'gtts';
import TranslateForm from '../forms/TrasnlateForm';

export default function Translate() {
  const [text, setText] = useState('');
  const onChangeHandler = (e) => {
    setText(e.target.value);
    console.log(e);
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
    const gtts = gTTS(translateText, 'es');
    // eslint-disable-next-line no-unused-vars
    gtts.save('../../public/trans.mp3', (err, _result) => {
      if (err) { throw new Error(err); }
      console.log('Success!');
    });
  };
  return (
    <div className="bg-light">
      <TranslateForm
        text={text}
        onChangeHandler={onChangeHandler}
        onSubmit={onSubmit}
      />
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
