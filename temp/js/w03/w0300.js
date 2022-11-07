/*	Carlos N Reina
  cnreina@gmail.com
*/
const quiz = [
  { name: "Superman",realName: "Clark Kent" },
  { name: "Wonderwoman",realName: "Dianna Prince" },
  { name: "Batman",realName: "Bruce Wayne" },
];

// View Object
const view = {
  score: document.querySelector('#score'),
  question: document.querySelector('#question'),
  result: document.querySelector('#result'),
  info: document.querySelector('#info'),
  start: document.querySelector('#start'),
  render(target,content,attributes) {
    for(const key in attributes) {
    target.setAttribute(key, attributes[key]);
    }
    target.innerHTML = content;
  },
  show(element){
    element.style.display = 'block';
  },
  hide(element){
    element.style.display = 'none';
  }
}

// Game Object
const game = {
start(quiz){
this.score = 0;
this.questions = [...quiz];
view.hide(view.start);
// main game loop
for(const question of this.questions){
this.question = question;
this.ask();
}
// end of main game loop
this.gameOver();
},
ask(){
const question = `What is ${this.question.name}'s real name?`;
view.render(view.question,question);
const response =  window.prompt(question);
this.check(response);
},
check(response){
const answer = this.question.realName;
if(response === answer){
view.render(view.result,'Correct!',{'class':'correct'});
alert('Correct!');
this.score++;
view.render(view.score,this.score);
} else {
view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
alert(`Wrong! The correct answer was ${answer}`);
}
},
gameOver(){
view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
view.show(view.start);
}
}

view.start.addEventListener('click', () => game.start(quiz), false);

/*
  function allowModals(){
  for (const i of document.getElementsByTagName('iframe')) {
    if (!i.sandbox.supports('allow-modals')) {
      console.warn("Your browser doesn't support the 'allow-modals' attribute :(");
      break;
    }
    if (i.sandbox.contains('allow-modals')) continue;
    console.info(i, "doesn't allow modals");
    i.sandbox.add('allow-modals');
    console.info(i, 'now allows modals');
  }
}

<button onclick='allowModals()' style='display: block'>Allow modals</button>
<iframe src="//example.com"></iframe>

*/