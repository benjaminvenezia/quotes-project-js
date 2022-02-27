
const quotes = [
    {
      quote: "Life isn’t about getting and having, it’s about giving and being.",
      author: "Kevin Kruse"
    },
    {
      quote: "Whatever the mind of man can conceive and believe, it can achieve.",
      author: "Napoleon Hill"
    },
    {
      quote: "Strive not to be a success, but rather to be of value.",
      author: "Albert Einstein"
    },
    {
      quote: "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.",
      author: "Robert Frost"
    },
    {
      quote: "I attribute my success to this: I never gave or took any excuse.",
      author: "Florence Nightingale"
    },
    {
      quote: "You miss 100% of the shots you don’t take.",
      author: "Wayne Gretzky"
    },
    {
      quote: "I’ve missed more than 9000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life. And that is why I succeed.",
      author: "Michael Jordan"
    },
    {
      quote: "The most difficult thing is the decision to act, the rest is merely tenacity.",
      author: "Amelia Earhart"
    },
    {
      quote: "Every strike brings me closer to the next home run.",
      author: "Babe Ruth"
    },
    {
      quote: "Definiteness of purpose is the starting point of all achievement.",
      author: "W. Clement Stone"
    },
    {
      quote: "We must balance conspicuous consumption with conscious capitalism.",
      author: "Kevin Kruse"
    },
    {
      quote: "Life is what happens to you while you’re busy making other plans.",
      author: "John Lennon"
    },
    {
      quote: "We become what we think about.",
      author: "Earl Nightingale"
    },
    {
      quote: "Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails.  Explore, Dream, Discover.",
      author: "Mark Twain"
    },
    {
      quote: "Life is 10% what happens to me and 90% of how I react to it.",
      author: "Charles Swindoll"
    },
    {
      quote: "The most common way people give up their power is by thinking they don’t have any.",
      author: "Alice Walker"
    },
    {
      quote: "The mind is everything. What you think you become.",
      author: "Buddha"
    },
    {
      quote: "The best time to plant a tree was 20 years ago. The second best time is now.",
      author: "Chinese Proverb"
    },
  ]


const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const newLocalQuoteBtn = document.getElementById('new-local-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Get Quote from API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        data.quoteAuthor === '' ? 
        authorText.innerText = 'Unknown' : 
        authorText.innerText = data.quoteAuthor;

        //Reduce font size for long quotes
        if(data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        console.log(data)
        quoteText.innerText = data.quoteText;
        //hide loader, show quote
        removeLoadingSpinner();
    } catch (error) {
        // quoteText.innerText = "Sorry, an error occur.";
    }
}

function getLocalQuote() {
    loading();
  
    const actualQuote = quoteText.innerText;
    let quoteObject = {}
    do {
        quoteObject = quotes[Math.floor(Math.random() * quotes.length)];

    } while(quoteObject.quote === actualQuote);
    
    quoteObject.quote.length > 120 ? 
    quoteText.classList.add('long-quote') :
    quoteText.classList.remove('long-quote');

    quoteText.innerText = quoteObject.quote;
    authorText.innerText = quoteObject.author;
    complete();
}
//Tweet QUote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newLocalQuoteBtn.addEventListener("click", getLocalQuote);
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getLocalQuote();
