/**
*The JavaScript implementation of the 1-player game in 
*"Bounce the Ball." The player's objective is to bounce 
*the ball as many times as they can without letting it 
*hit the ground. '
*/
var ball = null;//the moving ball (png)
var pony1 = null;//the player, with ability to move left and right 
var time = 0;//time variable 
var delayTime = 20;//delay time variable of 20 ms 
var topBall = 0;
var leftBall = 0; 
var vx = 200;//x velocity of the ball
var vy = 130;//y velocity of the ball
var ax = 40;//x acceleration
var ay = 250;//y acceleration
var vxt = 0;
var vyt = 0;
var pony1left = 0;
var scorep1 = 0;
var randomvx = 0;

//iniitiate the ball's movement '
function init() {
    ball = document.getElementById('ball');

    window.setInterval(moveBall, delayTime);
    score();

}

//move the png image of the ball
function moveBall() {
    time = time + delayTime;
    topBall = parseInt(ball.style.top);
    leftBall = parseInt(ball.style.left);

    vx = bounceX();
    vy = bounceY();

    vxt = Math.floor(vx*delayTime/1000);
    vyt = Math.floor(vy*delayTime/1000);

    ball.style.top = topBall + vyt + 'px';
    ball.style.left = leftBall + vxt + 'px';

    vx = (ax*delayTime/1000) + vx;
    vy = (ay*delayTime/1000) + vy;

    score();
}

//change the y position of the ball according to where the ball was hit 
function bounceY() {
    pony1left = parseInt(document.getElementById('pony1').style.left, 10);

    if(topBall > 450 && topBall < 500 && leftBall > (pony1left - 40) && leftBall < (pony1left + 100) && vy > 0) {
        vy = -vy;
        scorep1 = scorep1 + 1;
    } else if(topBall < 45 && vy < 0){
		vy = -vy;
	}
	return vy;
}

//change the x position of the ball according to where the ball was hit 
function bounceX() {
    if(topBall > 450 && topBall < 500 && leftBall > (pony1left - 40) && leftBall < (pony1left + 100) && vy > 0 ) {
        vx = (Math.random()*500);
		randomvx = Math.random();
		if(randomvx > 0.5){
			vx = -vx;
		}
    } else if(leftBall > 800 && vx > 0){
        vx = -vx;
    } else if(leftBall < 0 && vx < 0) {
	    vx = -vx;
	}
    return vx;
}

//return the score once the ball hits the ground
function score() {
    document.getElementById("score1").innerHTML = scorep1;

	//resulting messages for various scores 
    if(topBall > 499) {
        if(scorep1 < 8) {
			alert("You bounced the ball " + scorep1 + " time(s). Try harder next time!");
			if(confirm("Press OK to play again, or Cancel to return to the main menu.")) {
			} else {   
				window.location.assign("homepage.html");
			}
		} else if(scorep1 > 7 && scorep1 < 20) {
			alert("You bounced the ball " + scorep1 + " time(s). Good job! You are better than average!");
			if(confirm("Press OK to play again, or Cancel to return to the main menu.")) {
			} else {   
				window.location.assign("homepage.html");
			}
		} else if(scorep1 > 19) {
			alert("You bounced the ball " + scorep1 + " time(s). You are amazing! Are you a pro?");
			if(confirm("Press OK to play again, or Cancel to return to the main menu.")) {
			} else {   
				window.location.assign("homepage.html");
			}
		}
		
        ball.style.top = '50px';
        ball.style.left = (Math.random()*550 + 25) + 'px';
        vx = 200;
	    vy = 130;
	    ax = 40;
	    ay = 250;
	    scorep1 =0;
    }
}

//move player to the left if left key is pressed. If the player reaches the leftmost border of the div block, stop the player from moving further 
function left() {
    var current = parseInt(document.getElementById('pony1').style.left, 10);
    
    if(pony1left > 30) {
        document.getElementById('pony1').style.left = current - 25 + 'px';
    }
}
//move player to the right if left key is pressed. If the player reaches the rightmost border of the div block, stop the player from moving further
function right() {
    var current = parseInt(document.getElementById('pony1').style.left, 10);

    if(pony1left < 750){
        document.getElementById('pony1').style.left = current + 25 + 'px';
    }
}

document.onkeydown = KeyCheck;
//calls left() and right() when "<-" or "->" are pressed 
function KeyCheck() {
    var KeyID = event.keyCode;

    switch(KeyID) {

        case 37:
	left('pony1');
	break;

        case 39:
        right('pony1');
        break;

    }
}