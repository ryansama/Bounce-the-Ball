/**
*The JavaScript implementation of the 2-player game in 
*"Bounce the Ball." Each player's objective is to land the 
*ball on the opposite side of the court (similar to volleyball).
*/
var ball = null;
var time = 0;
var delayTime = 20;
var topBall = 0;//the coordinate of the top edge of the ball
var leftBall = 0;//the coordinate of the left edge of the ball
var vx = 530;//the initial x velocity of the ball
var vy = 150;//the initial y velocity fo the ball
var ax = 0;//the initial x acceleration of the ball
var ay = 350;//the initial y acceleration of the ball
var vxt = 0;
var vyt = 0;
var pony1left = 0;
var pony2left = 0;
var scorep1 = 0;//player 1 score
var scorep2 = 0;//player 2 score

//call functions
function init() {
    ball = document.getElementById('ball');
    ball.style.top = '50px';
    ball.style.left = '0px';
    window.setInterval(moveBall, delayTime);
    score();
}

//moves the ball by adjusting velocity and direction
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

//changes the ball's y direction 
function bounceY() {
    pony1left = parseInt(document.getElementById('pony1').style.left, 10);
    pony2left = parseInt(document.getElementById('pony2').style.left, 10);

    if(topBall > 550 && vy > 0) {
        vy = -vy;
        vy = vy*0.8;
    } else if(topBall < 45 && vy < 0) {
        vy = -vy;
        vy = vy*0.8;	
	} else if(topBall > 450 && topBall < 500 && leftBall > (pony1left + 50) && leftBall < (pony1left + 95) && vy > 0) {
        vy = -vy;
        vy = vy*0.8;
		
            if(vx < 0) {
                vx = -vx*1.15;
                vy = vy*1.2;
            }
			
    } else if(topBall > 450 && topBall < 500 && leftBall > (pony1left - 35) && leftBall < (pony1left + 70) && vy > 0) {
        vy = -vy;
        vy = vy*0.8;
    } else if(topBall > 450 && topBall < 500 && leftBall > (pony2left - 30) && leftBall < (pony2left - 10) && vy > 0) {
        vy = -vy;
        vy = vy*0.8;
		
        if (vx > 0) {
            vx = -vx*1.15;
            vy = vy*1.2;
        }
		
    }else if(topBall > 450 && topBall < 500 && leftBall > (pony2left - 10) && leftBall < (pony2left + 120) && vy > 0) {
        vy = -vy;
        vy = vy*0.8;
    }
    return vy;
}

//changes the ball's x direction
function bounceX() {
    if(leftBall > 750 && vx > 0) {
        vx = -vx*0.7;
    } else if(leftBall < 0 && vx < 0) {
        vx = -vx*0.7;
    }
    return vx;
}

//updates a player's score if the ball reaches the ground of the opposing player's side of the court
function score() {
    
	document.getElementById("score1").innerHTML = scorep1;
	document.getElementById("score2").innerHTML = scorep2;
    if(topBall >= 550 && leftBall > 375) {
        scorep1 = scorep1 + 1;
	    ball.style.left = '0px';
	    ball.style.top = '50px';
	    vx = 430;
	    vy = 150;
	
		if(scorep1 == 7) {
			if(confirm("Player 1 wins! Press OK to play again, or Cancel to return to the main menu.")) {
				window.location.reload(true);	
			} else {
				window.location.assign("homepage.html");
			}
		}
		
		if(scorep1 < 7) {
			if(confirm("Player 1 scored! You have " + (7 - scorep1) + " point(s) left to win! Click okay to continue, or Cancel to quit.")){
			} else {   
				window.location.assign("homepage.html");
			}
		}
	}
	
    if(topBall >= 550 && leftBall < 375) {
        scorep2 = scorep2 + 1;
        ball.style.left = '750px';
        ball.style.top = '50px';
       	vx = -430;
       	vy = 150;
    
		if(scorep2 == 7) {
			if(confirm("Player 2 wins! Press OK to play again, or Cancel to return to the main menu.")) {
				window.location.reload(true);	
			} else {
				window.location.assign("homepage.html");
			}
		}		
			
		if(scorep2 < 7) {
			if(confirm("Player 2 scored! You have " + (7 - scorep2) + " point(s) left to win! Click okay to continue, or Cancel to quit.")){
			} else {   
				window.location.assign("homepage.html");
			}
		}
    }	
}

//moves the player to the left when A or "<-" key is pressed. If the player reaches a border, stop it the player from moving any further to the left.
function left(id) {
    var current = parseInt(document.getElementById(id).style.left, 10);

    if(id == 'pony1') {
        if (current < 10) {
	    document.getElementById(id).style.left = current - 0 + 'px';
	} else {
	    document.getElementById(id).style.left = current - 25 + 'px';
	}
    } else if(id == 'pony2') {
        if (current < 410) {
	    document.getElementById(id).style.left = current - 0 + 'px';
	} else {
	    document.getElementById(id).style.left = current - 25 + 'px';
	}
    }
}

//moves the player to the right when D or "->"  key is pressed. If the player reaches a border, stop it the player from moving any further to the right.
function right(id) {
    var current = parseInt(document.getElementById(id).style.left, 10);

    if (id == 'pony1') {
        if (current > 250) {
	    document.getElementById(id).style.left = current + 0 + 'px';
	} else {
	    document.getElementById(id).style.left = current + 25 + 'px';
	}
    } else if (id == 'pony2') {
        if (current > 690) {
	    document.getElementById(id).style.left = current + 0 + 'px';
	} else {
	    document.getElementById(id).style.left = current + 25 + 'px';
	}
    }
}

document.onkeyup = KeyCheck;
//call left() and right() based on key commands. Player 1 moves with "A" and "D", while player 2 moves with "<-" and "->"
function KeyCheck() {
    var KeyID = event.keyCode;

    switch(KeyID) {

	case 68:
	case 100:
	right('pony1');
	break;

	case 65:
	case 97:
	left('pony1');
	break;	
        
        case 37:
	left('pony2');
	break;

        case 39:
        right('pony2');
        break;

    }
}