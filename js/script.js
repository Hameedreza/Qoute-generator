const qouteURL = 'https://type.fit/api/quotes';
const quoteContainer = document.querySelector('.quote-container');
const newQBtn = document.querySelector('.new-quote');
const twitterBtn = document.querySelector('.twitter-button');
const quote = document.querySelector('#quote');
const author = document.querySelector('#author');
const qouteSign = document.querySelector('i');
const loader = document.querySelector('.loader');
const body = document.querySelector('body');


/**
 * show loading
 */
const loading = ()=>{
  loader.hidden = false;
  quoteContainer.hidden = true;
}

/**
 * hide loading
 */
const complete = ()=>{
  loader.hidden = true;
  quoteContainer.hidden = false;
}

const newQuote = async()=>{
  try{
    loading();
    const response = await fetch(qouteURL);
    const qouteArray = await response.json();
    let randomNum = Math.floor(Math.random()*qouteArray.length);
    let quoteRandom = qouteArray[randomNum].text;
    let authorRandom = qouteArray[randomNum].author;
    if(!authorRandom){
      author.textContent = 'Unknown';
    }else{
      author.textContent = authorRandom;
    }
    if(quoteRandom.length > 120){
      quote.classList.add('long-quote');
    }else{
      quote.classList.remove('long-quote');
    }
    quote.textContent = quoteRandom;
    const localQ = localQuotes[Math.floor(Math.random()*100)];
    console.log(localQ.text);
    }catch(e){
      quote.textContent = 'Not available for now!';
      author.textContent = '...';
      console.error({error : e});
      qouteSign.remove();
      newQBtn.disabled = true;
  }
  complete();
}

const init = async()=>{
  newQuote();
}

init();

/**
 * Tweet Quote
 */

 const tweetQuote = ()=>{
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} "${author.textContent}"`;
  window.open(twitterUrl , '_blank');

}

newQBtn.addEventListener('click' , newQuote);
twitterBtn.addEventListener('click', tweetQuote);
