const movieList = [
    "dilwale dulhania le jayenge", "sholay", "lagaan", "krrish", "dangal", "chak de india", "bahubali", "raees","gully boy", "kabir singh", "pathaan", "zindagi na milegi dobara", "andhadhun", "queen", "taare zameen par", "3 idiots", "pk", "swades", "barfi", "haider", "rockstar", "highway", "tumbbad", "ms dhoni", "kai po che", "airlift", "drishyam", "hindi medium", "badhaai ho", "super 30", "article 15", "stree", "bhool bhulaiyaa","gangubai kathiawadi", "rrr", "baahubali the beginning", "baahubali the conclusion", "mirzya", "sanju", "bajrangi bhaijaan", "sultan", "ek tha tiger", "tiger zinda hai", "kick", "bodyguard", "dabangg", "dabangg 2", "ready", "wanted", "veer zaara", "kabhi khushi kabhie gham", "kabhi alvida naa kehna", "kal ho naa ho", "my name is khan", "student of the year", "yeh jawaani hai deewani", "tamasha", "ajab prem ki ghazab kahani", "rajneeti", "rock on", "wake up sid", "aashiqui 2", "ek villain", "baaghi", "heropanti", "war", "shershaah", "uri", "major", "baby", "holiday", "aankhen", "deewaar", "don", "don 2", "kaabil", "krishh 3", "kaho naa pyaar hai", "dil chahta hai", "hum tum", "fanaa", "rang de basanti", "black", "guzaarish", "taal", "hum dil de chuke sanam", "saawariya", "devdas", "ram leela", "padmaavat", "bajirao mastani", "rocky handsome", "force", "madras cafe", "parmanu", "batla house", "attack", "gadar", "gadar 2", "satyameva jayate", "bhaag milkha bhaag", "panipat", "kesari", "zero", "lal singh chaddha", "thappad", "piku", "pink", "shubh mangal saavdhan", "bulbbul", "qala", "darlings", "anand", "chupke chupke", "golmaal", "bawarchi", "angoor", "padosan", "jewel thief", "karz", "guide", "sangam", "mughal e azam", "dev d", "manorama six feet under", "satya", "company", "omkara", "maqbool", "shahid", "citylights", "trapped", "aankhon dekhi", "masaan", "titli", "dhobi ghat", "karwaan", "the lunchbox", "photograph", "lootera", "barah aana", "love sex aur dhoka", "hunterrr", "gulaal", "paheli", "iqbal", "dor", "chakravyuh", "a wednesday", "special 26", "jolly llb", "jolly llb 2", "raazi", "hichki", "nil battey sannata", "tanu weds manu", "tanu weds manu returns", "r rajkumar", "singham", "singham returns", "simmba", "sooryavanshi", "golmaal again", "golmaal 3", "bhool bhulaiyaa 2", "drishyam 2", "kaithi", "vikram vedha", "commando", "commando 2", "aankhen 2", "heropanti 2", "rowdy rathore", "gabbar is back", "om shanti om", "main hoon na", "happy new year", "baazigar", "darr", "anjaam", "fan", "ra one", "chennai express", "jab tak hai jaan", "raabta", "katti batti", "teri meri kahaani", "badlapur", "johar", "kapoor and sons", "ek main aur ekk tu", "ishaqzaade", "shuddh desi romance", "meri pyaari bindu", "hawaizaada", "parineeta", "hazaaron khwaishein aisi", "wake up india", "no one killed jessica", "teri kahaani", "cheeni kum", "shamitabh", "wazir", "amitabh bachchan", "kaun", "bhool bhulaiyaa original", "hello brother"
];


const wordDisplay = document.getElementById('wordDisplay');
const lettersContainer = document.getElementById('letters');
const resultDisplay = document.getElementById('result');
const newGameBtn = document.getElementById('newGameBtn');
const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');

let currentMovie = '';
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 10;


function initGame() {
    currentMovie = movieList[Math.floor(Math.random() * movieList.length)];
    guessedLetters = [];
    wrongGuesses = 0;

    wordDisplay.innerHTML = '';
    lettersContainer.innerHTML = '';
    resultDisplay.textContent = '';
    resultDisplay.className = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    currentMovie.split('').forEach(char => {
    const span = document.createElement('span');
    if (char === ' ') {
        span.textContent = '\u00A0';
        span.className = 'letter-box space';
    } else {
        span.textContent = '_';
        span.className = 'letter-box';
        span.dataset.letter = char.toLowerCase();
    }
    wordDisplay.appendChild(span);
    });

    for (let i = 97; i <= 122; i++) {
    const letter = String.fromCharCode(i);
    const btn = document.createElement('button');
    btn.textContent = letter;
    btn.addEventListener('click', () => handleGuess(letter, btn));
    lettersContainer.appendChild(btn);
    }
}

function handleGuess(letter, button) {
    button.disabled = true;
    
    if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    
    if (currentMovie.toLowerCase().includes(letter)) {
        button.classList.add('correct-guess');
        updateWordDisplay();
        
        if (checkWin()) {
        resultDisplay.textContent = 'Congratulations!🎉 You guessed the movie!';
        resultDisplay.className = 'success';
        disableAllButtons();
        }
    } else {
        button.classList.add('wrong-guess');
        wrongGuesses++;
        drawHangman();

        if (wrongGuesses >= maxWrongGuesses) {
        resultDisplay.textContent = `Game Over! The movie was: ${currentMovie.toUpperCase()}`;
        resultDisplay.className = 'error';
        revealMovie();
        disableAllButtons();
        }
    }
    }
}

function updateWordDisplay() {
    const letterBoxes = document.querySelectorAll('.letter-box:not(.space)');
    letterBoxes.forEach(box => {
    if (box.dataset.letter && guessedLetters.includes(box.dataset.letter)) {
        box.textContent = box.dataset.letter.toUpperCase();
        box.classList.add('correct-guess');
    }
    });
}

function revealMovie() {
    const letterBoxes = document.querySelectorAll('.letter-box:not(.space)');
    letterBoxes.forEach(box => {
    box.textContent = box.dataset.letter.toUpperCase();
    });
}

function checkWin() {
    const letterBoxes = document.querySelectorAll('.letter-box:not(.space)');
    return Array.from(letterBoxes).every(box => 
    guessedLetters.includes(box.dataset.letter)
    );
}

function disableAllButtons() {
    const buttons = lettersContainer.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);
}

function drawHangman() {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    
    if (wrongGuesses > 0) {
    ctx.beginPath(); ctx.moveTo(20, 280); ctx.lineTo(120, 280); ctx.stroke(); // base
    }
    if (wrongGuesses > 1) {
    ctx.beginPath(); ctx.moveTo(70, 280); ctx.lineTo(70, 40); ctx.stroke(); // pole
    }
    if (wrongGuesses > 2) {
    ctx.beginPath(); ctx.moveTo(70, 40); ctx.lineTo(170, 40); ctx.stroke(); // top bar
    }
    if (wrongGuesses > 3) {
    ctx.beginPath(); ctx.moveTo(170, 40); ctx.lineTo(170, 70); ctx.stroke(); // rope
    }
    if (wrongGuesses > 4) {
    ctx.beginPath(); ctx.arc(170, 90, 20, 0, Math.PI * 2); ctx.stroke(); // head
    }
    if (wrongGuesses > 5) {
    ctx.beginPath(); ctx.moveTo(170, 110); ctx.lineTo(170, 180); ctx.stroke(); // body
    }
    if (wrongGuesses > 6) {
    ctx.beginPath(); ctx.moveTo(170, 130); ctx.lineTo(140, 150); ctx.stroke(); // left arm
    }
    if (wrongGuesses > 7) {
    ctx.beginPath(); ctx.moveTo(170, 130); ctx.lineTo(200, 150); ctx.stroke(); // right arm
    }
    if (wrongGuesses > 8) {
    ctx.beginPath(); ctx.moveTo(170, 180); ctx.lineTo(140, 220); ctx.stroke(); // left leg
    }
    if (wrongGuesses > 9) {
    ctx.beginPath(); ctx.moveTo(170, 180); ctx.lineTo(200, 220); ctx.stroke(); // right leg
    }
}

newGameBtn.addEventListener('click', initGame);
initGame();