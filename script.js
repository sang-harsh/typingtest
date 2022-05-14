const QUOTE_URL = 'https://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
let noOfCharecters;
quoteInputElement.addEventListener('input',()=>{
      const arrayQuote = quoteDisplayElement.querySelectorAll('span');
      noOfCharecters = arrayQuote.length;
      const arrayValue = quoteInputElement.value.split('');
      let speed;
      let correct = true;
      arrayQuote.forEach((characterSpan,index)=>{
            const character = arrayValue[index];
            if(character==null){
                  characterSpan.classList.remove('correct');
                  characterSpan.classList.remove('incorrect');
                  correct =false;
            }else if(character === characterSpan.innerText){
                  characterSpan.classList.add('correct');
                  characterSpan.classList.remove('incorrect');
            }else{
                  characterSpan.classList.remove('correct');
                  characterSpan.classList.add('incorrect');
                  correct =false;
            }
      }) 
      if(correct) {
            speed = Math.ceil(noOfCharecters/endTime);
            if(speed<1){
                  alert(`You are very slow.\nWork on your typing.\nYour speed is less than 1 char/sec.`);
            }else{
                  alert(`Time taken to type the quote is ${endTime}+ Seconds.\nYour speed is ${speed} char/sec.`);
            }
            renderNewQuote();
      };
});

function getRandomQuote(){
      return fetch(QUOTE_URL)
            .then(response=>response.json())
            .then(data=> data.content)
}

async function renderNewQuote(){
      const quote = await getRandomQuote()
      quoteDisplayElement.innerHTML = ''
      quote.split('').forEach((character) =>{
            const characterSpan = document.createElement('span');
            // characterSpan.classList.add('correct');
            characterSpan.innerText = character
            quoteDisplayElement.appendChild(characterSpan);
      });
      quoteInputElement.value=null
      startTimer();
}

let startTime ,endTime;

function startTimer(){
      timerElement.innerText=0
      startTime = new Date()
      setInterval(()=>{
            endTime = getTimerTime()
            timer.innerText = endTime;
      },1000)
}

function getTimerTime(){
      return Math.ceil((new Date() - startTime)/1000)
}

renderNewQuote();