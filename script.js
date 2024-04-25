const quoteContainer=document.getElementById('quote-container')
const quoteText =document.getElementById("quote");
const AuthorText =document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn =document.getElementById('new-quote');
const loader =document.getElementById("loader");

function loading()
{
    quoteContainer.hidden =true;
    loader.hidden=false;
}
    
function complete()
{
    quoteContainer.hidden=false;
    loader.hidden =true;
}

let apiQuotes=[];

//Show New Quotes
function newQuote()
{
    loading();
    //Pick a  random quote from api Quotes array
    const quote =apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    console.log(quote)
    //Check if Author field is blank replace it with 'Unknown'
    if(!quote.author)
    {
        AuthorText.textContent ='Unknown';
    }
    else
    {
        AuthorText.textContent = quote.author;
    }
    //Check Quote lenth to determine styling
    if(quote.text.length>120) 
    {
        quoteText.classList.add('long-quote')
    }
    else
    {
        quoteText.classList.remove('long-quote')
    }
    //set Quote,Hide Loader
    quoteText.textContent =  quote.text;
    complete();
}

 //Get Quote From API
async function getQuotes()
{
    loading();
    const apiUrl ='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch(error)
    {
        alert(error)
        {
            //Catch Error
        }
    }
}

//Tweet Quote
function tweetQuote()
{
    const twitterUrl =`https://twitter.com/intent/tweet?text= ${quoteText.textContent} -  
    ${AuthorText.textContent}`;
    window.open(twitterUrl , '_blank');
}
// Event Listeners
newQuoteBtn.addEventListener('click' , newQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On Load
getQuotes();
