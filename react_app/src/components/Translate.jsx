import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Translate() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState({
    libre: "en",
    speechSynth: "en-US",
    display: "English",
  });
  const [loading, setLoading] = useState(false);
  const onChangeHandler = (e) => {
    setText(e.target.value);
  };
  const onSubmit = async () => {
    console.log("text: ", text);
    setLoading(true);
    const res = await fetch("http://localhost:5000/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "en",
        target: language.libre,
      }),
      headers: { "Content-Type": "application/json" },
    });
    let translateText = await res.json();
    translateText = translateText.translatedText;
    setLoading(false);
    console.log(translateText);
    const utterance = new SpeechSynthesisUtterance(translateText);
    // const voices = window.speechSynthesis.getVoices();
    // eslint-disable-next-line prefer-destructuring
    // utterance.voice = voices.filter((voice) => voice.name === "Alex")[0];
    utterance.lang = language.speechSynth;
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };
  const handleChange = (e) => {
    setLanguage(e.target.value);
  };
  return (
    <div className="bg-light">
      <div className="container">
        <input type="text" onChange={onChangeHandler} />
        <>
          {loading ? (
            <CircularProgress />
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              Translate
            </button>
          )}
        </>
      </div>
      <div className="container">
        <FormControl>
          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            renderValue={(value) => `${value.display}`}
            onChange={handleChange}
          >
            <MenuItem
              value={{
                libre: "en",
                speechSynth: "en-US",
                display: "English",
              }}
            >
              English
            </MenuItem>
            <MenuItem
              value={{
                libre: "es",
                speechSynth: "es-ES",
                display: "Spanish",
              }}
            >
              Spanish
            </MenuItem>
            <MenuItem
              value={{
                libre: "zh",
                speechSynth: "zh-CN",
                display: "Chinese-CN",
              }}
            >
              Chinese-CN
            </MenuItem>
            <MenuItem
              value={{
                libre: "hi",
                speechSynth: "hi-IN",
                display: "Hindi",
              }}
            >
              Hindi
            </MenuItem>
            <MenuItem
              value={{
                libre: "fr",
                speechSynth: "fr-FR",
                display: "French",
              }}
            >
              French
            </MenuItem>
            <MenuItem
              value={{
                libre: "de",
                speechSynth: "de-DE",
                display: "German",
              }}
            >
              German
            </MenuItem>
            <MenuItem
              value={{
                libre: "ja",
                speechSynth: "ja-JP",
                display: "Japanese",
              }}
            >
              Japanese
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
