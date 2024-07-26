var character = document.getElementById("character");
var block = document.getElementById("block");
var scoreboard = document.getElementById("scoreboard");
var isJumping = false;
var jumpTimeout;
var jumpDuration = 500; // 500ms for jump duration
var score = 0;
var scoreInterval;

function jump() {
    if (!isJumping) {
        isJumping = true;
        character.classList.add("animate");
        jumpTimeout = setTimeout(function () {
            character.classList.remove("animate");
            isJumping = false;
        }, jumpDuration);
    }
}

function landQuickly() {
    if (isJumping) {
        clearTimeout(jumpTimeout);
        character.classList.remove("animate");
        character.classList.add("fast-landing");
        setTimeout(function () {
            character.classList.remove("fast-landing");
            isJumping = false;
        }, 300);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowUp' || event.code === 'Space') {
        jump();
    } else if (event.code === 'ArrowDown') {
        landQuickly();
    }
});

function updateScore() {
    score++;
    scoreboard.textContent = "Score: " + score;
}

function stopScore() {
    clearInterval(scoreInterval);
}

var checkDead = setInterval(function() {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    
    if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
        block.style.animation = "none";
        block.style.display = "none";
        clearInterval(checkDead); // Stop checking for collisions
        stopScore(); // Stop the scoreboard
        alert("GAME OVER\nFinal Score: " + score);
    }
}, 10);

// Start the score increment interval
scoreInterval = setInterval(updateScore, 120);
