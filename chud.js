
var myGamePiece;
var chuds = [];
var buds = [];
var bullets = [];
var highscores = [];
var name = "";
KEY_CODES = {
    13: 'enter',
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
    'right': false,
    'one-touch': {touching: false, x: null, y:null},
    'two-touch': {touching1: false, x1: null, y1:null, touching2: false, x2: null, y2:null}
}
var bud_imgs = [new Image(),new Image(),new Image(),
    new Image(),new Image(),new Image(),new Image(),
    new Image(),new Image(),new Image(),new Image(),
    new Image(),new Image(),new Image(),new Image(),
    new Image(),new Image(),new Image()]
var chud_imgs = [new Image(),new Image(),new Image(),new Image()]
var life_img = new Image;
var score = new component("20px", "Consolas", "white", 20, 40, "text");
var lives = new component("30px", "Consolas", "pink", 20, 40, "lives");
lives.score = 1;
var config = {
    apiKey: "AIzaSyBpzjsY7lyiSVe_9JhBABnqFEm3CWYWkzU",
    authDomain: "chud-7a1ab.firebaseapp.com",
    databaseURL: "https://chud-7a1ab.firebaseio.com",
    projectId: "chud-7a1ab",
    storageBucket: "chud-7a1ab.appspot.com",
    messagingSenderId: "605699326249"
  };
firebase.initializeApp(config);
var db = firebase.firestore();
function startGame() {
    myGamePiece = new component(30, 30, "white", 350, 350);
    myGamePiece.ttl = 500;
    myGameArea.start();
}


function typeName(e) {
    if (((e.keyCode>=48 && e.keyCode<=57) || (e.keyCode>=65 && e.keyCode <=122)) && name.length<20) {
        name += String.fromCharCode(e.keyCode);
    }
    else if(e.keyCode == 8 || e.keyCode == 127) {
        name = name.substring(0, name.length - 2)
    }
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
        case 'enter':
            KEYS_STATUS['enter'] = bool;
            break;       
        default:
            // if(!bool) {
            //     typeName(e);
            // }
            break;
    }
}
function handle_one_touch(ev, bool) {
    KEYS_STATUS['two-touch'] = false;
    if (bool) {
        KEYS_STATUS['one-touch'] = { 'touching': bool, 'x':ev.touches[0].clientX, 'y': ev.touches[0].clientY, 'dragActive':KEYS_STATUS['one-touch'].dragActive };
        myGamePiece.speed=8;
    }
    else {
        KEYS_STATUS['one-touch'] = { 'touching': bool, 'dragActive': false };
        myGamePiece.speed=0;
    }
}
function handle_two_touches(ev, bool) {
    KEYS_STATUS['one-touch'] = { 'touching': bool, 'x':ev.touches[0].clientX, 'y': ev.touches[0].clientY };
    KEYS_STATUS['two-touch'] = bool;
    myGamePiece.speed=8;
    var bullet = new component(5,5, "white", myGamePiece.x, myGamePiece.y, "bullet");
    if (KEYS_STATUS['one-touch'].x-myGamePiece.x <0) {
        bullet.angle = 0.5*Math.PI+Math.atan2(myGamePiece.x-ev.touches[1].clientX, ev.touches[1].clientY-myGamePiece.y)
    }
    else {
        bullet.angle = 1.5*Math.PI+Math.atan2(ev.touches[1].clientX-myGamePiece.x, myGamePiece.y-ev.touches[1].clientY)
    }
    bullet.speed = Math.abs(myGamePiece.speed);
    bullets.push(bullet);
}

function process_touch(ev, bool) {
    switch (ev.touches.length) {
      case 0: handle_one_touch(ev,false);
        break;
      case 1: handle_one_touch(ev,bool);
        break;
      case 2: handle_two_touches(ev,bool);
        break;
      default: break;
    }
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {

        document.onkeydown = function (e) { keyHandler(e, true); };
        document.onkeyup = function (e) { keyHandler(e, false); };
        this.canvas.ontouchstart = function(e){ e.preventDefault(); process_touch(e, true)};
        this.canvas.ontouchmove = function(e){ e.preventDefault(); process_touch(e, true)};
        this.canvas.ontouchcancel = function(e){ e.preventDefault(); process_touch(e, false)};
        this.canvas.ontouchend = function(e){ e.preventDefault(); process_touch(e, false)};
        this.canvas.width = window.innerWidth - 20;
        this.canvas.height = window.innerHeight- 20;
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
    this.upsix = 0;
    this.downsix = 0;
    this.upfour = 0;
    this.downfour= 0;
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
        else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
            // ctx.font = "12px Consolas";
            // ctx.fillStyle = "gray";
            // ctx.fillText("Arrow keys to move, Space to shoot.", 10, myGameArea.canvas.height-20);                
        }
        else if (this.type == "chud") {
            this.drawPolygon(this.x, this.y, 5, 25, 1, "black", "chud", this.angle)
        }        
        else if (this.type == "bud") {
            this.drawPolygon(this.x, this.y, 6, 25, 1, "black", "bud", this.angle)
        }
        else if (this.type == "lives") {
            if (myGameArea.canvas.width < 600) {
                for (i=0; i < lives.score; i++) {
                    this.drawHeart(ctx, 20+(i*50), 50);
                }
            }
            else {
                for (i=0; i < lives.score; i++) {
                    this.drawHeart(ctx, 400+(i*50), 20);
                }
            }
        }
        else {
            this.angle = this.angle % (2 * Math.PI)    
            this.drawPolygon(this.x, this.y, 3, 20, 2, "red", "hero", this.angle);
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
function touchEffect() {
        if(KEYS_STATUS['one-touch'].touching==true) {
        var absDist = Math.sqrt(Math.pow(KEYS_STATUS['one-touch'].x - myGamePiece.x, 2)+Math.pow(KEYS_STATUS['one-touch'].y - myGamePiece.y, 2));
        if((absDist>5 && (absDist <=40 || KEYS_STATUS['one-touch'].dragActive==true)) || (absDist>5 && KEYS_STATUS['two-touch']==true)){
            KEYS_STATUS['one-touch'].dragActive = true;
            myGamePiece.speed = 8 + (absDist/30);
            if (KEYS_STATUS['one-touch'].x-myGamePiece.x <0) {
                myGamePiece.angle = 0.5*Math.PI+Math.atan2(myGamePiece.x-KEYS_STATUS['one-touch'].x, KEYS_STATUS['one-touch'].y-myGamePiece.y)
            }
            else {
                myGamePiece.angle = 1.5*Math.PI+Math.atan2(KEYS_STATUS['one-touch'].x-myGamePiece.x, myGamePiece.y-KEYS_STATUS['one-touch'].y)
            }
        }
        else if(absDist>40) {
            myGamePiece.speed=0;

            var bullet = new component(5,5, "white", myGamePiece.x, myGamePiece.y, "bullet");
            if (KEYS_STATUS['one-touch'].x-myGamePiece.x <0) {
                bullet.angle = 0.5*Math.PI+Math.atan2(myGamePiece.x-KEYS_STATUS['one-touch'].x, KEYS_STATUS['one-touch'].y-myGamePiece.y)
            }
            else {
                bullet.angle = 1.5*Math.PI+Math.atan2(KEYS_STATUS['one-touch'].x-myGamePiece.x, myGamePiece.y-KEYS_STATUS['one-touch'].y)
            }
            bullet.speed = Math.abs(myGamePiece.speed);
            bullets.push(bullet);
        }
        else {
            myGamePiece.speed=0;
        }
    }
}
function drawHighScores() {
    ctx.fillText("Press return to enter your score and start a new game ", 10, 100);
    name = document.getElementById("name").value;
    ctx.fillText("Enter Name: "+name, 10, 140);

    ctx.fillText("High Scores", 100, 200);
    for (i=0; i<highscores.length; i++) {
        ctx.fillText(highscores[i].name+":  "+highscores[i].score, 50, 240+(40*i));
    }
}
function updateGameArea() {
    if (lives.score == 0 ) {
        myGameArea.clear();
        score.update();
        lives.update();
        myGamePiece.update();
        drawHighScores();
        if (KEYS_STATUS['enter']) {
            resetGame();
        }               
        return;           
    }
    keyPressEffect();
    touchEffect();
    myGameArea.clear();
    myGameArea.frameNo += 1;
    myGameArea.frameNo = myGameArea.frameNo % 10000;
    if(myGameArea.frameNo == 1 || everyinterval(myGamePiece.ttl)) {
        if (myGamePiece.ttl > 60) {
            myGamePiece.ttl-=20;
        }
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
        var removeBullet = false;
        for (j = chuds.length-1; j >=0; j-=1) {
            if (bullets[i].crashWith(chuds[j])) {
                chuds.splice(j, 1);
                removeBullet = true;
                score.score += 69;
                score.upsix+=1;
                console.log("+69");
                console.log(score.score);
            }
        }
        for (j = buds.length-1; j >=0; j-=1) {
            if (bullets[i].crashWith(buds[j])) {
                buds.splice(j, 1);
                score.score -= 420;
                score.downfour+=1;
                console.log("-420");
                console.log(score.score);
                removeBullet = true;
            }
        }
        bullets[i].newPos();
        bullets[i].update();
        if (bullets[i].ttl <=0 || removeBullet) {
            bullets.splice(i, 1);
        }
    }

    // Update Chuds and decrement score for losing buds
    for (i = chuds.length-1; i >=0 ; i -= 1) {
        chuds[i].newPos();
        chuds[i].update();
        if (myGamePiece.crashWith(chuds[i])) {
            score.score -= 69;
            score.downsix+=1;
            console.log("-69");
            console.log(score.score);
            lives.score -=1;
            if (lives.score == 0 ) {
                var nameField = document.getElementById("name");
                nameField.focus();
                nameField.click();
                highscores=[];
                db.collection("highscores").orderBy("score", "desc").limit(5).get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        var docData = doc.data();
                        highscores.push({"name":docData.name, "score": docData.score})
                    });
                })
                .catch(function(error) {
                    console.error("Error getting documents: ", error);
                });
                name="";
            }
            chuds.splice(i, 1);
            break;
        }
        for (j = buds.length-1; j >=0 ; j -= 1) {
            if (chuds[i].crashWith(buds[j])) {
                buds.splice(j,1);
                score.score -= 69;
                score.downsix +=1;
                
            console.log("-69");
            console.log(score.score);
            }    
        }

    }
    // Update Buds and Increment Score for collect buds
    for (i = buds.length-1; i >=0 ; i -= 1) {
        buds[i].newPos();
        buds[i].update();
        if (myGamePiece.crashWith(buds[i])) {
            buds.splice(i,1);
            score.upfour +=1;            
            score.score += 420;

            console.log("+420");
            console.log(score.score);
        }

    }
    score.text = "SCORE: "+score.score;
    score.update();
    lives.update();
    myGamePiece.newPos();
    myGamePiece.update();
}
function resetGame() {
    db.collection("highscores").add({
        name: name,
        score: score.score,
        upsix: score.upsix,
        downsix: score.downsix,
        upfour: score.upfour,
        downfour: score.downfour
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    score.score = 0;
    score.upfour = 0;
    score.upsix = 0;
    score.downfour = 0;
    score.downsix = 0;
    lives.score = 3;
    chuds = [];
    bullets = [];
    buds = [];
    myGamePiece.x = 350;
    myGamePiece.y = 350;
    myGamePiece.speed = 0;
    myGamePiece.angle = 0;
    myGameArea.frameNo = 0;
    myGameArea.clear();
}
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}