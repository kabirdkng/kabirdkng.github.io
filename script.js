import React, { useState, useEffect } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

const QuoteBox = () => {
  const [quote, setQuote] = useState('');
  const [refference, setRefference] = useState('');

  const ayatNumber = () => {
    const ayat = Math.floor(Math.random() * 6666 + 1);
    return ayat;
  };
  
const fetchQuote = async () => {
  try {
    const response = await fetch(`https://api.alquran.cloud/v1/ayah/${ayatNumber()}/en.asad`);
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    const { text, surah, numberInSurah } = await response.json();
    console.log(surah.englishName);
    setQuote(text);
    setRefference(surah.englishName + " " + surah.englishNameTranslation + " " + surah.number + ":" + numberInSurah);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchQuote();
  }, []);
  const handleNewQuote = () => {
    fetchQuote();
  };

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h1", null, "Random Quran Ayah"), /*#__PURE__*/
    React.createElement("div", { id: "quote-box", className: "box" }, /*#__PURE__*/
    React.createElement("div", { id: "text", className: "text" }, quote), /*#__PURE__*/
    React.createElement("div", { id: "author", className: "author" }, " - ", /*#__PURE__*/React.createElement("span", null, refference), " "), /*#__PURE__*/
    React.createElement("div", { className: "actions" }, /*#__PURE__*/
    React.createElement("button", { id: "new-quote", className: "button", onClick: handleNewQuote }, "Refresh"), /*#__PURE__*/
    React.createElement("a", { href: "twitter.com/intent/tweet", id: "tweet-quote", className: "button" }, "Tweet Ayah")))));





};

const App = () => /*#__PURE__*/
React.createElement("div", { className: "main", id: "wrapper" }, /*#__PURE__*/
React.createElement(QuoteBox, null));



ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector('#app'));
