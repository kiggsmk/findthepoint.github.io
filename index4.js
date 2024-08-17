
const colorbox = document.getElementById('statuscolor');
const point = document.getElementById("pointcont");
const playarea = document.getElementById("playarea");

let d, x1, y1;
let distArray = [];
let lastTemp = '';  

window.alert("🔥 Hot or Cold? The Ultimate Hunt Game! 🔥 Your mission: Find the hidden red dot in the play area! Move your cursor around and listen closely to the clues—getting warmer? You’re on the right track! Feeling cold? You’re drifting away! Keep hunting until you find it. Think you found it? Click the dot to win! But beware, it’s harder than it looks. Ready, set, go find the point! 🕵️‍♂️🎯")

let x2 = Math.floor((Math.random() * 1400)); 
let y2 = Math.floor((Math.random() * 580));
point.style.marginLeft = `${x2}px`;
point.style.marginTop = `${y2-100}px`;

function cursorLocX(event) {
    return event.clientX;
}

function cursorLocY(event) {
    return event.clientY;
}

function dist(x1, x2, y1, y2) {
    let a = Math.pow((x2 - x1), 2);
    let b = Math.pow((y1 - y2), 2);
    return Math.sqrt(a + b);
}

function coordinate(event) {
    x1 = cursorLocX(event);
    y1 = cursorLocY(event);
    d = dist(x1, x2, y1, y2);
    combine(distArray, d);
}

function updateDistArray(a, d) {
    a.push(d);
    if (a.length > 2) {
        a.shift();
    }
}

function checkTemp(a) {
    if (a.length < 2) {
        return ''; 
    }

    const diff = a[1] - a[0];
    const threshold = 2;

    if (Math.abs(diff) < threshold) {
        return 'stable'; 
    } else if (diff > 0) {
        return 'Cold!';
    } else {
        return 'Hot!';
    }
}

function combine(a, d) {
    updateDistArray(a, d);
    let temp = checkTemp(a);

    if (temp !== 'stable') {
        lastTemp = temp; 
    }


    colorbox.classList.remove('hot', 'cold');

  
    if (lastTemp === 'Hot!') {
        colorbox.classList.add('hot');
        colorbox.innerHTML = 'Hot!';
    } else if (lastTemp === 'Cold!') {
        colorbox.classList.add('cold');
        colorbox.innerHTML = 'Cold!';
    }
}

playarea.addEventListener("mousemove", coordinate);
