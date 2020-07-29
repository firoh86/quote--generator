const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

const loader = document.getElementById('loader');

// Show loading
const loading = () => {
  quoteContainer.hidden = true;
  loader.hidden = false;
};
// Hide loading
const complete = () => {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
};

// Get Quote From API
async function getQuote() {
  loading();

  const apiUrl = 'http://quotes.stormconsultancy.co.uk/random.json';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data);
    // If author is blank, 'Unknow'
    if (data.author === '') {
      authorText.innerText = 'Unknow';
    } else {
      authorText.innerText = data.author;
    }
    // Reduce font size for long Quotes
    if (data.quote.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quote;
    // Stop Loader, Show quote
    complete();
  } catch (error) {
    // getQuote();
    // console.log('whoops, no quote', error);
  }
}

const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
};

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
window.addEventListener('load', () => {
  getQuote();
});
