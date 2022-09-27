/*	Carlos N Reina
  cnreina@gmail.com
*/

const quiz = [
  ["What is Superman's real name?","Clark Kent"],
  ["What is Wonder Woman's real name?","Diana Prince"],
  ["What is Batman's real name?","Bruce Wayne"]
];

const game = {
  start(quiz){
      this.questions = [...quiz];
      this.score = 0;
      // main game loop
      for(const question of this.questions){
      this.question = question;
      this.ask(quiz);
      }
      // end of main game loop
      this.gameOver();
  },
  ask(){
      const question = `What is ${this.question.name}'s real name?`;
      const response =  prompt(question);
      this.check(response);
  },
  check(response){
      const answer = this.question.realName;
      if(response === answer){
      alert('Correct!');
      this.score++;
      } else {
      alert(`Wrong! The correct answer was ${answer}`);
      }
  },
  gameOver(){
      alert(`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
  }
}

game.start(quiz);
