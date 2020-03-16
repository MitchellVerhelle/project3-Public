class Phrase{
    constructor(phrase){
        this.phrase=phrase.toLowerCase();
        this.spaces=0;
    }
    addPhraseToDisplay(){//Add Randomly Chosen Phrase to Game Display as Hidden Letter(s).
        for(let letter of this.phrase){
            let l=document.createElement('li');
            l.textContent=letter;
            if(letter===' '){
                l.className='space';
                this.spaces+=1;
            } else {
                l.className='hide letter '+letter;
            }
            $('#phrase ul').append(l);
        }
    }
    reset(){//Reset Phrase.
        while($('#phrase ul')[0].children.length>0){
            $('#phrase ul')[0].removeChild($('#phrase ul')[0].children[0]);
        }
    }
}