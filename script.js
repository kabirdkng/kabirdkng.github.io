import * as React from 'https://esm.sh/react';
import * as ReactDOM from 'https://esm.sh/react-dom';

const ayatNumber = () => {
  const ayat = Math.floor(Math.random() * 6236 + 1);
  return ayat;
};

const QuoteBox = () => {
  const [quote, setQuote] = useState('');
  const [refference, setRefference] = useState('');

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

  useEffect(() => {
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

ReactDOM.render(<App />, document.querySelector('#app'));
