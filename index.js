'use strict';

//const STORE with all the questions and answers


const STORE = [
  {question: 'Who created Slapsgiving?', 
    answers: ['Barney and Marshall', 'Robin and Lily', 'Ted and Barney', 'Ted and Marshall', 'Ted and Punchy'],
    correctAnswer: 'Barney and Marshall',
    correctImg: 'https://thumbs.gfycat.com/ConsciousMistyCommongonolek-size_restricted.gif',
  }, {
    question: 'Who was named Beercules?',
    answers: ['Ted', 'Barney', 'Marshall', 'Lily', 'Punchy'],
    correctAnswer: 'Marshall',
    correctImg: 'https://media.giphy.com/media/1MpoE8YEebJQI/giphy.gif',
  }, {
    question: 'Who was Lilys’ doppelganger?',
    answers: ['Mustache Lily', 'Street Performer Lily', 'Lily the Wrestler', 'Stripper Lily', 'Teacher Lily'],
    correctAnswer: 'Stripper Lily',
    correctImg: 'https://66.media.tumblr.com/6edf3866a27ef97995da84287ecc6450/tumblr_mucx1iLX5U1qgmlszo3_250.gif',
  }, {
    question: 'What’s Barneys’ job?',
    answers: ['Please', 'Has a lot of keys', 'Stock Investor', 'Lawyer', 'Architech'],
    correctAnswer: 'Please',
    correctImg: 'https://media1.tenor.com/images/35c03f17fa5471e31f55a94d9281142d/tenor.gif?itemid=4625787',
  }, { 
    question: 'Whats Robin famous for in Canada?',
    answers: ['Being a Teenage Popstar', 'Being a Hockey Player', 'Being a News Reporter', 'Modeling', 'Being an Actress'],
    correctAnswer: 'Being a Teenage Popstar',
    correctImg: 'https://i.pinimg.com/originals/b4/89/7c/b4897c04f9902d7877a3d2b4a8a69619.gif',
  }

];

const wrongImg = 'https://media1.tenor.com/images/5d0bbf1b382baa24d7800a98a2776571/tenor.gif?itemid=5281300';

let currentQCount = 0; //technically first question, should get updated;
let score = 0;

function createQuestion(){ //update questions and answers
  if(currentQCount < STORE.length) {
    return `
        <section class="quiz">
            <div class="question-${currentQCount}">
                <h2>${STORE[currentQCount].question}</h2>
                <form>
                    <fieldset>
                        <label class="choices">
                            <input type="radio" value="${STORE[currentQCount].answers[0]}" name="answer" required>
                            <span>${STORE[currentQCount].answers[0]}</span>
                        </label>
                        <label class="choices">
                            <input type="radio" value="${STORE[currentQCount].answers[1]}" name="answer" required>
                            <span>${STORE[currentQCount].answers[1]}</span>
                        </label>
                        <label class="choices">
                            <input type="radio" value="${STORE[currentQCount].answers[2]}" name="answer" required>
                            <span>${STORE[currentQCount].answers[2]}</span>
                        </label>
                        <label class="choices">
                            <input type="radio" value="${STORE[currentQCount].answers[3]}" name="answer" required>
                            <span>${STORE[currentQCount].answers[3]}</span>
                        </label>
                        <label class="choices">
                            <input type="radio" value="${STORE[currentQCount].answers[4]}" name="answer" required>
                            <span>${STORE[currentQCount].answers[4]}</span>
                        </label>
                        <button type="submit" class="submitButton">Submit</button>
                    </fieldset>
                </form>
            </div>
        </section>
      `;
  }
  else {
    console.log('the end');
    endResult();
    $('.question-number').text(currentQCount + 1);
  }
}

function changeCurrentQCount(){
  currentQCount++;
  $('.question-number').text(currentQCount + 1);
}

function changeScore(){
  score ++;
}

function startQuiz () {
  $('.start').on('click', function (){
    console.log('start function firing');
    $('.start').remove();
    $('.question-number').text(1);
    renderQuestion();

  });
}

function renderQuestion(){
  $('main').html(createQuestion());
}

function userInput () {
  $('main').on('submit', '.quiz', function (event){
    event.preventDefault();
    let selectedAnswer = $('input:checked').val();
    let correctAnswer = `${STORE[currentQCount].correctAnswer}`;
    if (selectedAnswer === correctAnswer){
      correctFeedback();
      updateScore();
    }
    else {
      wrongFeedback();
    }
    renderNextQuestion();
  });
}


function correctFeedback(){
  $('main').html(`
        <div class="correctFeedback">
            <div>
                <p>You got it!</p>
                <img src="${STORE[currentQCount].correctImg}" alt="Happy Gif">
            </div>
        </div> 
        <button type="button" class="nextButton">Next</button>   
    `);
}
function wrongFeedback(){
  $('main').html(`
    <div class="wrongFeedback">
        <div>
            <p>Sorry! The correct answer is <span>${STORE[currentQCount].correctAnswer}</span></p>
            <img src="${wrongImg}" alt="sad Gif">
        </div>
    </div> 
    <button type="button" class="nextButton">Next</button>   
`);  
}


function updateScore(){
  changeScore();
  $('.score').text(score);
}

/////////////////// added 8/29/19 ////////////////////////////////
function endResult(){
  $('.status').css('display', 'none');

  if(score >= 3){
    console.log('Not bad');
    $('main').html(`  
    <p>THE END</p>
    <p>You got ${score}/5</p>
    <p>'Not bad'</p>
    <button class="restart">Restart</button>
    
  `);
  } 
  if(score < 3){
    console.log('you might want to rewatch some episodes');
    $('main').html(`  
    <p>THE END</p>
    <p>You got ${score}/5</p>
    <p>you might want to rewatch some episodes</p>
    <button class="restart">Restart</button>
   
  `);
  } 
  if (score === 5) {
    console.log('You are legen - wait for it - dary');
    $('main').html(`  
    <p>THE END</p> 
    <p>You got ${score}/5</p>
    <p>You are legen - wait for it - dary</p>
    <button class="restart">Restart</button>
  `);
  }
  currentQCount = 0; 
  score = 0;
  
}
///////////////////////////////////////////////////////////////////////

function restart(){
  $('main').on('click', '.restart', function() {
    console.log('restart clicked');

    $('.status').css('display', 'block');
    renderQuestion();
    

  });
}


function renderNextQuestion(){
  $('.nextButton').on('click', function () {
    changeCurrentQCount();
    renderQuestion();

  });
}

function createQuiz(){
  startQuiz();
  userInput (); 
  restart();
    
}

$(createQuiz);