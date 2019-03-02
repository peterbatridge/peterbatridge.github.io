
var myGamePiece;
var chuds = [];
var buds = [];
var bullets = [];
KEY_CODES = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  }
var KEYS_STATUS = {
    'space': false,
    'up': false,
    'left': false,
    'down': false,
    'right': false    
}
var bud_imgs = [new Image(),new Image(),new Image(),
    new Image(),new Image(),new Image(),new Image(),
    new Image(),new Image(),new Image(),new Image(),
    new Image(),new Image(),new Image(),new Image(),
    new Image(),new Image(),new Image()]
var chud_imgs = [new Image(),new Image(),new Image(),new Image()]
var life_img = new Image;
var score = new component("30px", "Consolas", "white", 20, 40, "text");
var lives = new component("30px", "Consolas", "pink", 20, 40, "lives");
lives.score = 3;

function startGame() {
    myGamePiece = new component(30, 30, "white", 350, 350);
    myGamePiece.ttl = 500;
    myGameArea.start();
}


function keyHandler(e, bool) {
    switch (KEY_CODES[e.keyCode]) {
        case 'space': 
            KEYS_STATUS['space'] = bool;
            break;
        case 'up': 
            KEYS_STATUS['up'] = bool;
            break;
        case 'down': 
            KEYS_STATUS['down'] = bool;
            break;
        case 'left':
            KEYS_STATUS['left'] = bool;
            break;                
        case 'right': 
            KEYS_STATUS['right'] = bool;
            break;
    }
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {

        document.onkeydown = function (e) { keyHandler(e, true); };
        document.onkeyup = function (e) { keyHandler(e, false); };
        this.canvas.width = window.innerWidth - 50;
        this.canvas.height = window.innerHeight- 50;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        chud_imgs[0].src = 'chud_img1.jpg';
        chud_imgs[1].src = 'chud_img2.jpg';
        chud_imgs[2].src = 'chud_img3.jpg';
        chud_imgs[3].src = 'chud_img4.png';
        bud_imgs[0].src = 'bud1.png';
        bud_imgs[1].src = 'bud2.png';
        bud_imgs[2].src = 'bud3.png';
        bud_imgs[3].src = 'bud4.png';
        bud_imgs[4].src = 'bud5.png';
        bud_imgs[5].src = 'bud6.png';
        bud_imgs[6].src = 'bud7.png';
        bud_imgs[7].src = 'bud8.png';
        bud_imgs[8].src = 'bud9.png';
        bud_imgs[9].src = 'bud10.png';
        bud_imgs[10].src = 'bud11.png';
        bud_imgs[11].src = 'bud12.png';
        bud_imgs[12].src = 'bud13.png';
        bud_imgs[13].src = 'bud14.png';
        bud_imgs[14].src = 'bud15.png';
        bud_imgs[15].src = 'bud16.png';
        bud_imgs[16].src = 'bud17.png';
        bud_imgs[17].src = 'bud18.png';
        life_img.src = 'life.png';

    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.pattern = 0;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.fillStyle = "red"
    this.angle = 0;
    this.ttl = 200;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "bullet") {
            this.drawPolygon(this.x, this.y, 8, 5, 1, "blue", "bullet", this.angle)
        }
        else if (this.type == "chud") {
            this.drawPolygon(this.x, this.y, 5, 25, 1, "black", "chud", this.angle)
        }        
        else if (this.type == "bud") {
            this.drawPolygon(this.x, this.y, 6, 25, 1, "black", "bud", this.angle)
        }
        else if (this.type == "lives") {
            for (i=0; i < lives.score; i++) {
                this.drawHeart(ctx, 400+(i*50), 20);
            }
            
        }
        else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);        
        } else {
            this.angle = this.angle % (2 * Math.PI)    
            this.drawPolygon(this.x, this.y, 3, 20, 2, "red", "hero", this.angle)
        }
    }
    this.drawHeart = function(ctx, x, y) {
        ctx.drawImage(life_img, x,y);
    }
    this.clippedBackgroundImage = function( ctx, img, w, h ){
        ctx.save(); // Save the context before clipping
        ctx.clip(); // Clip to whatever path is on the context
      
        var imgHeight = w / img.width * img.height;
        if (imgHeight < h){
          ctx.fillStyle = '#000';
          ctx.fill();
        }
        ctx.drawImage(img,-(w/2),-(h/2),w,imgHeight);
      
        ctx.restore(); // Get rid of the clipping region
    }
    this.drawPolygon = function(centerX,centerY,sideCount,size,strokeWidth,strokeColor,type,rotationRadians){
        var radians=rotationRadians
        ctx.translate(centerX,centerY);
        ctx.rotate(radians);
        ctx.beginPath();
        ctx.moveTo (size * Math.cos(0), size * Math.sin(0));          
        for (var i = 1; i <= sideCount;i += 1) {
            ctx.lineTo (size * Math.cos(i * 2 * Math.PI / sideCount), size * Math.sin(i * 2 * Math.PI / sideCount));
        }
        ctx.closePath();
        var grd = ctx.createLinearGradient(0, 0, 60, 0);
        grd.addColorStop(0, "black");
        grd.addColorStop(0.2, "red");
        grd.addColorStop(1, "white");
        if(type=="chud") {
            this.clippedBackgroundImage(ctx, chud_imgs[this.pattern], chud_imgs[this.pattern].width, chud_imgs[this.pattern].height);
        }
        else if(type=="bud") {
            this.clippedBackgroundImage(ctx, bud_imgs[this.pattern], bud_imgs[this.pattern].width, bud_imgs[this.pattern].height);
        }
        else {
            ctx.fillStyle=grd;
            ctx.fill();
        }
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.stroke();
        ctx.rotate(-radians);
        ctx.translate(-centerX,-centerY);    
    }

    this.newPos = function() {
        if (this.type=="bullet") {
            var vecX = Math.cos(this.angle);
            var vecY = Math.sin(this.angle);
            this.x += (5+this.speed) * vecX;
            this.y += (5+this.speed) * vecY;
            this.ttl -= 1;
        }
        else {
            var vecX = Math.cos(this.angle);
            var vecY = Math.sin(this.angle);
            this.x += this.speed * vecX;
            this.y += this.speed * vecY;
            this.handleSides();
        }
    }
    this.handleSides = function() {
        var bottom = myGameArea.canvas.height - this.height;
        var right = myGameArea.canvas.width - this.width;
        if (this.y > bottom) {
            this.y = (this.y - bottom);
        }
        if(this.y<0) {
            this.y = bottom;
        }
        if(this.x<0) {
            this.x = right;
        }
        if(this.x>right) {
            this.x = (this.x - right);
        }
    }
    this.rotateRight = function() {
        this.angle += 10 * Math.PI / 180;    
    }
    this.rotateLeft = function() {
        this.angle -= 10 * Math.PI / 180;
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

function keyPressEffect() {
    if(KEYS_STATUS['space']) {
        var bullet = new component(5,5, "white", myGamePiece.x, myGamePiece.y, "bullet");
        bullet.angle = myGamePiece.angle;
        bullet.speed = Math.abs(myGamePiece.speed);
        bullets.push(bullet);
    } 
    if(KEYS_STATUS['up']) {
        myGamePiece.speed+=0.2;
    }
    if(KEYS_STATUS['down']) {
        myGamePiece.speed-=0.2;

    }
    if(KEYS_STATUS['left']) {
        myGamePiece.rotateLeft();

    }
    if(KEYS_STATUS['right']) {
        myGamePiece.rotateRight();
    }
}
function updateGameArea() {
    if (lives.score == 0 ) {
        return;           
    }
    keyPressEffect();
    myGameArea.clear();
    myGameArea.frameNo += 1;
    myGameArea.frameNo = myGameArea.frameNo % 10000;
    if(myGameArea.frameNo == 1 || everyinterval(myGamePiece.ttl)) {
        if (myGamePiece.ttl > 50) {
            myGamePiece.ttl-=50;
        }
        console.log('add chuds!');
        var chud = new component(25,25, "white", 5, 5, "chud");
        chud.angle = Math.floor(Math.random() * 360)+1  
        chud.speed = Math.floor(Math.random() * 5)+1
        chud.pattern = Math.floor(Math.random() * 4)

        chuds.push(chud);

        var bud = new component(20,20, "white", Math.floor(Math.random() * myGameArea.canvas.width), Math.floor(Math.random() * myGameArea.canvas.height), "bud");
        bud.angle = Math.floor(Math.random() * 360)+1  
        bud.speed = Math.floor(Math.random() * 6)+1
        bud.pattern = Math.floor(Math.random() * 18)
        buds.push(bud);
    }
    for (i = bullets.length-1; i >=0 ; i -= 1) {
        for (j = chuds.length-1; j >=0; j-=1) {
            if (bullets[i].crashWith(chuds[j])) {
                chuds.splice(j, 1);
                score.score += 69;
            }
        }
        for (j = buds.length-1; j >=0; j-=1) {
            if (bullets[i].crashWith(buds[j])) {
                buds.splice(j, 1);
                score.score -= 420;
            }
        }
        bullets[i].newPos();
        bullets[i].update();
        if (bullets[i].ttl <=0) {
            bullets.splice(i, 1);
        }
    }

    // Update Chuds and decrement score for losing buds
    for (i = chuds.length-1; i >=0 ; i -= 1) {
        chuds[i].newPos();
        chuds[i].update();
        if (myGamePiece.crashWith(chuds[i])) {
            score.score -= 69;
            lives.score -=1;
            chuds.splice(i, 1);
            break;
        }
        for (j = buds.length-1; j >=0 ; j -= 1) {
            if (chuds[i].crashWith(buds[j])) {
                buds.splice(j,1);
                score.score -= 69;
            }    
        }

    }
    // Update Buds and Increment Score for collect buds
    for (i = buds.length-1; i >=0 ; i -= 1) {
        buds[i].newPos();
        buds[i].update();
        if (myGamePiece.crashWith(buds[i])) {
            buds.splice(i,1);
            score.score += 420;
        }

    }
    score.text = "SCORE: "+score.score;
    score.update();
    lives.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}