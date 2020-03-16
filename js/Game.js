class Game{
    constructor(){
        //Old Phrases: 'hello there bud', 'a zeugma is a lit device', 'what is that', 'i declare bankrupcy', 'winners only'
        this.phrases=['onopatopoeia', 'sack of large paws'];
        this.missed=0;
        this.activePhrase=null;
        this.count=0;
        //this.lastRand=-1;
    }
    startGame(){
        $('#overlay').animate({//squish screen to the left.
            width: "0%",
            opacity: 0
          }, 1000, ()=>{
            $('#overlay').hide();
          });
        $('#overlay').animate({//Reset screen dimentions so when it is shown again, allows Game to continue.
            width: "100%",
            opacity: 100
          },0,()=>{
            this.compilePhrases();
          });
    }
    compilePhrases(){//create the activePhrase randomly without being the same as last time.
        let rand = Math.floor(Math.random()*this.phrases.length);
        // while(rand===this.lastRand){//Not let rand repeat from the previous game.
        //     rand=Math.floor(Math.random()*this.phrases.length);
        // }
        //this.lastRand=rand;//set the parents lastRand to this.
        this.activePhrase = new Phrase(this.phrases[rand]);
        this.activePhrase.addPhraseToDisplay();
        this.count=this.activePhrase.spaces;//Add spaces to the count to check if the game is over. This ensures we can actually reach the length of the word.
    }
    checkLetter(key){//retrun true if phrase on board has key, otherwise false.
        if(this.activePhrase.phrase.includes(key)){
            return true;
        } else {
            return false;
        }
    }
    showMatchLetter(key){//check for match letter.
        if(this.activePhrase===null){
            return null;
        }
        let found=false;
        let index=0;//location of qwerty column.
        let x=-1;//location of qwerty row.
        for(x=0;x<3;x++){
            for(let child of $('#qwerty')[0].children[x].children){//gets each key on the keyboard
                if(child.textContent===key){
                    if(child.className==='key'){
                        found=true;
                        break;
                    } else {
                        return null;
                    }
                }else{
                    index+=1;
                }
            }
            if(found){
                break;
            }
            index-=$('#qwerty')[0].children[x].children.length;
        }
        if(!found){
            return null;
        }
        if(this.checkLetter(key)){//Sets color to 'chosen' and returns true.
            $('#qwerty')[0].children[x].children[index].className='chosen';
            return true;
        } else {//Sets color to 'wrong' and returns false.
            $('#qwerty')[0].children[x].children[index].className='wrong';
            return false;

        }
    }
    flash(x, flickers){//Flicker lives. (Life animation.)
            if(flickers===0){//Recursion to flash 'flickers' amount of times.
                return;
            }
            $('#scoreboard ol').animate({
                opacity: 80
            },100,()=>{
                if($('#scoreboard ol')[0].children[x].children[0].getAttribute('src')==='images/lostHeart.png'){//Set the state of the heart.
                    $('#scoreboard ol')[0].children[x].children[0].setAttribute('src', 'images/liveHeart.png');
                } else {
                    $('#scoreboard ol')[0].children[x].children[0].setAttribute('src', 'images/lostHeart.png');
                }
                this.flash(x, flickers-1);
            });
    }
    die(){//Check if game lose.
        $('#scoreboard ol')[0].children[this.missed].children[0].setAttribute('src', 'images/lostHeart.png');
        this.flash(this.missed, 4);
        this.missed+=1;
        if(this.missed>=5){
            this.gameOver(false);
        }
    }
    win(){//Check if game win.
        if(this.count===$('#phrase ul')[0].children.length){
            this.gameOver(true);
        }
    }
    gameOver(status){//Display the correct overlay for win or loss.
        if(status){//If Win
            $('#game-over-message')[0].textContent='You win!';
            $('#game-over-message')[0].className='win';
            $('#overlay')[0].className='win';
            console.log('winner!');
        } else {//If Lose
            $('#game-over-message')[0].textContent='You lose!';
            $('#game-over-message')[0].className='lose';
            $('#overlay')[0].className='lose';
            console.log('lost!');
        }
        $('#overlay').animate({//Previous Animation.
            width: "0%",
            opacity: 0
          }, 0, ()=>{
            $('#game-over-message').show();
            $('#overlay').show();
          });
        $('#overlay').animate({//Reset screen dimentions so when it is shown again, it actually appears as Animation.
            width: "100%",
            opacity: 100
          },1000,()=>{
            this.compilePhrases();
          });
    }
    reset(){//Reset board.
        for(let x=0;x<3;x++){//Reset keys.
            for(let child of $('#qwerty')[0].children[x].children){
                child.className='key';
            }
        }
        for(i=0;i<5;i++){//Reset lives.
            $('#scoreboard ol')[0].children[i].children[0].setAttribute('src', 'images/liveHeart.png');
        }
        this.activePhrase.reset();//Reset Phrase.
    }
    // get getLastRand(){
    //     return this.lastRand;
    // }
    // set setLastRand(r){
    //     this.lastRand=r;
    // }
}