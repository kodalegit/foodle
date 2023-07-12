document.addEventListener("DOMContentLoaded", () =>{
    createBoxes();
    const keys = document.querySelectorAll('.keyboard-row button');
    let tiles = [[]];
    let space = 1;
    let guessedWordCount = 0;

    function createBoxes(){
        const wordles = document.getElementById('board');
        for(let i=0; i<30; i++){
            let box = document.createElement('div');
            box.classList.add('square');
            box.classList.add('animate__animated');
            box.setAttribute('id', i+1);
            wordles.appendChild(box);
        }
    }

    function currentTile(){
        numGuessedWords = tiles.length;
        return tiles[numGuessedWords - 1];
    }


    function updateTile(letter){
        let currentile = currentTile();
        if (currentile && currentile.length < 5){
            currentile.push(letter);
            const availableSpace = document.getElementById(String(space));
            space += 1;
            availableSpace.textContent = letter;
        }


    }

    function getTileColor(letter, index){
        const isCorrect = word.includes(letter);

        if(!isCorrect){
            return "rgb(58, 58, 60)";
        }
        const letterPosition = word.charAt(index);
        const isCorrectPosition = (letter === letterPosition);

        if (isCorrectPosition){
            return "rgb(83, 141, 78)";
        }
        return "rgb(181, 159, 59)";
    }

    function submitWord(){
        let currentWordArr = currentTile();
        if (currentWordArr.length !== 5){
            window.alert('Word must be 5 letters');
            return;
        }

        const currentWord = currentWordArr.join('');

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`)
        .then((response) => {
            if(!response.ok && !foods.includes(currentWord)){
                throw Error();
            }
            const interval = 200;
            const firstLetterId = guessedWordCount * 5 + 1;

            currentWordArr.forEach((letter, index) => {
            setTimeout(()=>{
                const tileColor = getTileColor(letter, index);

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);

            });
            guessedWordCount ++;


            if (currentWord === word){
            url = '/recipe?food=' + encodeURIComponent(word);
            setTimeout(() => (window.location.href = url), 1500);

            }

            if (tiles.length === 6 && currentWord !== word){
            window.alert(`You've reached maximum guesses. Word is ${word}`);
            }

            tiles.push([]);

        })
        .catch(() => {

            window.alert('Word not in list');

        });



    }

    function deleteWord(){
        let currentWordArr = currentTile();
        const removedLetter = currentWordArr.pop();

        tiles[tiles.length - 1] = currentWordArr;
        let firstLetId = guessedWordCount * 5 + 1;
        if (space >= firstLetId + 1){
            const lastLetter = document.getElementById(String(space - 1));
            lastLetter.textContent = '';
            space -=1;
        }

    }

    keys.forEach(key =>{
        key.addEventListener('click', function(){
            const letter = key.getAttribute('data-key');

            if (letter === 'enter'){
                submitWord();
                return;
            }
            if (letter === 'del'){
                deleteWord();
                return;
            }

            updateTile(letter);

        });
    });

});