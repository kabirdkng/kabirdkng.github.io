import * as React from 'https://esm.sh/react';

const ayatNumber = () => {
  const ayat = Math.floor(Math.random() * 6236 + 1);
  return ayat;
};

const QuoteBox = () => {
  const [quote, setQuote] = React.useState('');
  const [refference, setRefference] = React.useState('');

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
      console.error(error);
      setQuote('Failed to fetch quote');
      setRefference('');
    }
  };

  React.useEffect(() => {
    fetchQuote();
  }, []);

  const handleNewQuote = () => {
    fetchQuote();
  };

  return (
    <React.Fragment>
      <h1>Random Quran Ayah</h1>
      <div id="quote-box" className="box">
        <div id="text" className="text">
          {quote}
        </div>
        <div id="author" className="author">
          - <span>{refference}</span>
        </div>
        <div className="actions">
          <button id="new-quote" className="button" onClick={handleNewQuote}>
            Refresh
          </button>
          <a href="twitter.com/intent/tweet" id="tweet-quote" className="button">
            Tweet Ayah
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

const App = () => (
  <div className="main" id="wrapper">
    <QuoteBox />
  </div>
);

export { App, QuoteBox };