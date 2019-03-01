
var myGamePiece;
var myObstacles = [];
var myScore;
KEY_CODES = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    70: 'f',
    71: 'g',
    72: 'h',
    77: 'm',
    80: 'p'
  }
  
function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}
function keyHandler(e) {
    switch (KEY_CODES[e.keyCode]) {
        case 'space': 
            console.log("space!");
            break;
        case 'up': 
            myGamePiece.speedY-=0.01;
            break;
        case 'down': 
            myGamePiece.speedY+=0.01;
            break;
        case 'left':
            myGamePiece.speedX-=0.01;
            myGamePiece.rotateLeft();
            break;                
        case 'right': 
            myGamePiece.speedX+=0.01;
            myGamePiece.rotateRight();
            break;
    }
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        document.onkeydown = function (e) { keyHandler(e); };
        this.canvas.width = window.innerWidth - 100;
        this.canvas.height = window.innerHeight- 100;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.angle = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            this.angle = this.angle % (2 * Math.PI)    
            ctx = myGameArea.context;
            ctx.save();
            ctx.translate(this.x, this.y);        
            ctx.rotate(this.angle);
            ctx.fillStyle = color;
            ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);        
            ctx.restore();   
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.hitSides();
    }
    this.hitSides = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        var rightSide = myGameArea.canvas.width - this.width;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
        if(this.y<0) {
            this.y = 0;
            this.gravitySpeed = 0;
        }
        if(this.x<0) {
            this.x = 0;
            this.gravitySpeed = 0; 
        }
        if(this.x>rightSide) {
            this.x = rightSide;
            this.gravitySpeed = 0; 
        }
    }
    this.rotateRight = function() {
        this.angle += 1 * Math.PI / 180;    
    }
    this.rotateLeft = function() {
        this.angle -= 1 * Math.PI / 180;
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    // for (i = 0; i < myObstacles.length; i += 1) {
    //     if (myGamePiece.crashWith(myObstacles[i])) {
    //         return;
    //     } 
    // }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    // if (myGameArea.frameNo == 1 || everyinterval(150)) {
    //     x = myGameArea.canvas.width;
    //     minHeight = 20;
    //     maxHeight = 200;
    //     height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
    //     minGap = 50;
    //     maxGap = 200;
    //     gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
    //     myObstacles.push(new component(10, height, "green", x, 0));
    //     myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    // }
    // for (i = 0; i < myObstacles.length; i += 1) {
    //     myObstacles[i].x += -1;
    //     myObstacles[i].update();
    // }
    // myScore.text="SCORE: " + myGameArea.frameNo;
    // myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}