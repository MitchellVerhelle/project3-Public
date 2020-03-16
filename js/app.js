let game=null;
//let lastRand=-1;//Prevent usng same phrase
$('#btn__reset').on('click', function(){
    if(game===null){//if there was no previous game, then there is no old game to clear, so we do not run game.reset();
        game=new Game();
        game.startGame();
        return;
    }//otherwise we need to clear the board, so we run game.reset();
    //lastRand=game.getLastRand();
    game.reset();
    game=new Game();
    //game.setLastRand(lastRand);
    game.startGame();
});
$('#qwerty').on('click', function(e){
    selectedKey(e.target.textContent);
});
$(window).keydown(function(e){
    selectedKey(e.key);
});
function selectedKey(key){//Checks info about the Key that was selected (clicked or typed).
    let check=game.showMatchLetter(key);
    if(check===null){//Only null when a key return is not qwerty, the game hasnt started, or some other error occured.
        return;
    }
    if(check){
        for(i in $('#phrase ul')[0].children){
            if($('#phrase ul')[0].children[i].textContent===key){
                game.count+=1;//adds one to the count variable inside of game. This is used to check if every key on the board has been pressed.
                $('#phrase ul')[0].children[i].className='show letter '+key;
            }
        }
        game.win();//check for win and process the correct coloring
    } else {
        game.die();//check for loss and process the correct coloring
    }
}