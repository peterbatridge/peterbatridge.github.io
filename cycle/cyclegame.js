let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let backgroundCanvas = document.getElementById('backgroundCanvas');
let bgCtx = backgroundCanvas.getContext('2d');

const internalWidth = 800;
const minInternalHeight = 600;
let scale = window.innerWidth / internalWidth; // Scale based on width to maintain aspect ratio
let isCriticalMass = false;
// Calculate scaled height to see if it's less than the minimum internal height
let scaledHeight = window.innerHeight / scale;
if (scaledHeight < minInternalHeight) {
    // If the scaled height is less than the minimum, adjust scale to fit the height instead
    scale = window.innerHeight / minInternalHeight;
}

// Set internal canvas dimensions
canvas.width = internalWidth;
canvas.height = Math.max(scaledHeight, minInternalHeight); // Ensure canvas is at least 600px high internally

// Apply uniform scaling and center the canvas
canvas.style.transform = `scale(${scale})`;
canvas.style.transformOrigin = 'top left';
canvas.style.left = `${(window.innerWidth - internalWidth * scale) / 2}px`;
canvas.style.top = `${(window.innerHeight - canvas.height * scale) / 2}px`;
canvas.style.position = 'absolute';

backgroundCanvas.width = internalWidth;
backgroundCanvas.height = Math.max(scaledHeight, minInternalHeight); // Ensure canvas is at least 600px high internally

// Apply uniform scaling and center the canvas
backgroundCanvas.style.transform = `scale(${scale})`;
backgroundCanvas.style.transformOrigin = 'top left';
backgroundCanvas.style.left = `${(window.innerWidth - internalWidth * scale) / 2}px`;
backgroundCanvas.style.top = `${(window.innerHeight - backgroundCanvas.height * scale) / 2}px`;
backgroundCanvas.style.position = 'absolute';

const firebaseConfig = {
    apiKey: "AIzaSyBdQItPpf6j4NmdNEwW5qo88U45vsxe0DA",
    authDomain: "cycling-a4321.firebaseapp.com",
    projectId: "cycling-a4321",
    storageBucket: "cycling-a4321.appspot.com",
    messagingSenderId: "354059931430",
    appId: "1:354059931430:web:1023085513feb94e91fbe7",
    measurementId: "G-JPYHDWHMXB"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
  
let gameStarted = false;
let gotPermission = false;
let hitDirection = 'right';
let score = 0;
let totalObstaclesHit = 0;
let totalRatHolePilgrimages = 0;
let totalTreesHit = 0;
let totalMirrorsHit = 0;
let totalDamageTaken = 0;
let totalLengthOfTrip = 0;

let speed = 5;
let player = { 
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 43, 
    height: 100,
    speed: 5,
    fatAss: 0,
    ratholePilgrimages: 0,
    mirrorsLiberated: 0,
    image: new Image(),
    imageLeft: new Image(),
    imageRight: new Image(),
    imageFatAssLeft: new Image(),
    imageFatAssRight: new Image(),
    imageFatAss: new Image(),
    imageExplosion: new Image(),
    health: 1000,
    invincible: -1
};
var sheWolf = new Audio('swolf.mp3');
sheWolf.addEventListener('ended', function() {
    console.log("Critical Mass is Over :(");
    player.fatAss = 300;
    player.health = 1100;
    isCriticalMass = false;
});

let moon = new Image();
let explosion = new Image();

let cyclistImages = {
    tealMan: {
        image: new Image(),
        w: 43,
        h: 100
    },
    blueUnicycle: {
        image: new Image(),
        w: 48,
        h: 83
    },
    tealPannier: {
        image: new Image(),
        w: 43,
        h: 100
    },
    orangeUnicycle: {
        image: new Image(),
        w: 52,
        h: 83
    },
    greenMan: {
        image: new Image(),
        w: 43,
        h: 100
    },
    purpleWoman: {
        image: new Image(),
        w: 43,
        h: 100
    },
    blueWoman: {
        image: new Image(),
        w: 43,
        h: 100
    },
    pinkWoman: {
        image: new Image(),
        w: 43,
        h: 100
    },
    pintPeddler: {
        image: new Image(),
        w:57,
        h:141
    }
}
let vehicleImages = {
    redTruck: {
        main: new Image(),
        noLeftMirror: new Image(),
        noRightMirror: new Image()
    },
    primeTruck: {
        main: new Image(),
        noLeftMirror: new Image(),
        noRightMirror: new Image()
    },
    liveryTruck: {
        main: new Image(),
        noLeftMirror: new Image(),
        noRightMirror: new Image()
    },
    policeCar: {
        main: new Image(),
        noLeftMirror: new Image(),
        noRightMirror: new Image()
    },
    rivianTruck: {
        main: new Image(),
        noLeftMirror: new Image(),
        noRightMirror: new Image()
    },
    blueCar: {
        main: new Image(),
        noLeftMirror: new Image(),
        noRightMirror: new Image()
    },
    cyberTruck: {
        main: new Image(),
        noLeftMirror: new Image(),
        noRightMirror: new Image()
    }

}

let rideshareSigns = {
    lyft: {
        image: new Image(),
        width: 192,
        height: 146,
        xOffset: 30,
        yOffset: 25
    },
    uber: {
        image: new Image(),
        width: 272,
        height: 270,
        xOffset: 25,
        yOffset: 5
    },
    doordash: {
        image: new Image(),
        width: 297,
        height: 298,
        xOffset: 20,
        yOffset: 5
    },
}

let obstacleImages = {
    patrickCone: new Image(),
    trafficCone: new Image(),
    valetSign: new Image(),
    tree: new Image(),
    rathole: new Image()
}


obstacleImages.patrickCone.src = 'patrickCone.png';
obstacleImages.trafficCone.src = 'trafficCone.png';
obstacleImages.valetSign.src = 'valetSign.png';
obstacleImages.tree.src = 'tree.png';
obstacleImages.rathole.src = 'rathole.png';

vehicleImages.redTruck.main.src = 'redTruck.png';
vehicleImages.redTruck.noLeftMirror.src = 'redTruckNoLeft.png';
vehicleImages.redTruck.noRightMirror.src = 'redTruckNoRight.png';

vehicleImages.primeTruck.main.src = 'primeTruck.png';
vehicleImages.primeTruck.noLeftMirror.src = 'primeTruckNoLeft.png';
vehicleImages.primeTruck.noRightMirror.src = 'primeTruckNoRight.png';

vehicleImages.liveryTruck.main.src = 'liveryTruck.png';
vehicleImages.liveryTruck.noLeftMirror.src = 'liveryTruckNoLeft.png';
vehicleImages.liveryTruck.noRightMirror.src = 'liveryTruckNoRight.png';

vehicleImages.policeCar.main.src = 'policeCar.png';
vehicleImages.policeCar.noLeftMirror.src = 'policeCarNoLeft.png';
vehicleImages.policeCar.noRightMirror.src = 'policeCarNoRight.png';

vehicleImages.rivianTruck.main.src = 'rivianTruck.png';
vehicleImages.rivianTruck.noLeftMirror.src = 'rivianTruckNoLeft.png';
vehicleImages.rivianTruck.noRightMirror.src = 'rivianTruckNoRight.png';

vehicleImages.blueCar.main.src = 'blueCar.png';
vehicleImages.blueCar.noLeftMirror.src = 'blueCarNoLeft.png';
vehicleImages.blueCar.noRightMirror.src = 'blueCarNoRight.png';

vehicleImages.cyberTruck.main.src = 'cyberTruck.png';
vehicleImages.cyberTruck.noLeftMirror.src = 'cyberTruckNoLeft.png';
vehicleImages.cyberTruck.noRightMirror.src = 'cyberTruckNoRight.png';

rideshareSigns.lyft.image.src = 'lyftSign.png';
rideshareSigns.uber.image.src = 'uberSign.png';
rideshareSigns.doordash.image.src = 'ddSign.png';

player.image.src = 'bike.png'
player.imageFatAss.src = 'bikeFatAss.png'
player.imageLeft.src = 'bikeLeftFist.png';
player.imageRight.src = 'bikeRightFist.png';
player.imageFatAssLeft.src = 'bikeFatAssLeftFist.png';
player.imageFatAssRight.src = 'bikeFatAssRightFist.png';
player.imageExplosion.src = 'hit.png';

moon.src = 'moon.png';
explosion.src = 'explosion.png';

cyclistImages.tealMan.image.src = 'tealMan.png';
cyclistImages.blueUnicycle.image.src = 'blueUnicycle.png';
cyclistImages.tealPannier.image.src = 'tealPannier.png';
cyclistImages.orangeUnicycle.image.src = 'orangeUnicycle.png';
cyclistImages.greenMan.image.src = 'greenMan.png';
cyclistImages.purpleWoman.image.src = 'purpleWoman.png';
cyclistImages.blueWoman.image.src ='blueWoman.png';
cyclistImages.pinkWoman.image.src = 'pinkWoman.png';
cyclistImages.pintPeddler.image.src = 'pintPeddler.png';


let roadY = 0; // Vertical offset for the moving road
let movingLeft = false;
let movingRight = false;
let movingUp = false;
let movingDown = false; // Not used for slowing down but kept for symmetry
let hitting = false;
let numTrees = 2;
let obstaclesArray = Object.keys(obstacleImages);
let obstacles = [];
let rideshareOptions = Object.keys(rideshareSigns);

let obstacleSpawns = [125, canvas.width /2, canvas.width - 150];
class Obstacle {
    constructor(width, height, image) {
        this.variance = Math.floor(Math.random() * 51) - 25;
        this.x = obstacleSpawns[Math.floor(Math.random() * obstacleSpawns.length)] + this.variance;
        this.y = -200;
        this.width = image == 'rathole' ? 21 :  width;
        this.height = image == 'rathole' ? 20 :  height;
        this.imageName = image;
        this.image = obstacleImages[image];
        this.hit = false;
        this.hasHitPlayer = false;
        this.hasBeenHit = false;
        this.immovable = (this.imageName == 'tree' || this.imageName=='rathole') ? true : false;
        this.exploding = -1;
    }

    draw() {
        if (this.imageName == 'tree') return;
        if (this.exploding > 0) {
            ctx.drawImage(explosion, this.x, this.y, 50, 50);
            this.exploding--;
            return;
        }
        if (this.exploding == 0) return;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update() {
        if (this.imageName == 'tree') return;
        if (this.hit == 'right' && !this.immovable) {
            this.y -= 5;
            this.x += 5;
        } else if (this.hit == 'left' && !this.immovable) {
            this.y -= 5;
            this.x -= 5;
        } else if (this.hit == 'player' && !this.immovable) {
            this.y -= player.speed+3;
        } else {
            this.y += player.speed;
        }
    }
}

class Cyclist {
    constructor(image) {
        this.variance = Math.floor(Math.random() * 51);
        this.yVariance = Math.floor(Math.random() * 300) - 150;
        this.spin = Math.random() * 2 - 1;
        this.initialX = (Math.random() * 400 + 200);
        this.x = this.initialX;
        this.y = canvas.height+500;
        this.width = cyclistImages[image].w;
        this.height = cyclistImages[image].h;
        this.imageName = image;
        this.image = cyclistImages[image].image;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    update() {
        this.y -= 1;
        this.x += this.spin;
        if (this.y < -this.height) {
            this.y = canvas.height + 300;
            this.x = (Math.random() * 400 + 200);
        }
        if (this.x < this.initialX - this.variance || this.x > this.initialX + this.variance) {
            this.spin = -this.spin;
        }
    }
}
let trees = [
    new Obstacle(100, 100, 'tree'), new Obstacle(100, 100, 'tree'),
    new Obstacle(100, 100, 'tree'), new Obstacle(100, 100, 'tree'),
    new Obstacle(100, 100, 'tree'), new Obstacle(100, 100, 'tree'),
    new Obstacle(100, 100, 'tree'), new Obstacle(100, 100, 'tree')
];
function getClosestObject() {
    if (traffic.length == 0 && obstacles.length == 0) { return [null, null]; }
    let closestObject = traffic[0] ? traffic[0] : obstacles[0];
    let closestDistance = Math.sqrt(Math.pow(closestObject.x - player.x, 2) + Math.pow(closestObject.y - player.y, 2));
    for (let i = 1; i < traffic.length; i++) {
        let distance = Math.sqrt(Math.pow(traffic[i].x - player.x, 2) + Math.pow(traffic[i].y - player.y, 2));
        if (distance < closestDistance) {
            closestObject = traffic[i];
            closestDistance = distance;
        }
    }
    for(let i = 0; i < obstacles.length; i++) {
        let distance = Math.sqrt(Math.pow(obstacles[i].x - player.x, 2) + Math.pow(obstacles[i].y - player.y, 2));
        if (distance < closestDistance) {
            closestObject = obstacles[i];
            closestDistance = distance;
        }
    }
    if (closestObject.x < player.x) {
        hitDirection = 'left';
    } else {
        hitDirection = 'right';
    }
    return [closestObject, closestDistance];
}

class Vehicle {
    constructor(x, y, width, height, speed, image, side) {
        this.parked = Math.random() > 0.5;
        this.side = side;
        this.initialX = x;
        this.x = x;
        this.y = this.parked ? -height : y;
        this.spin = Math.random() * 2 - 1;
        this.parkingOffset = Math.random() * 20;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.swerveVariance = (image == 'policeCar') ? Math.random() * 200 : Math.random() * 120; // Random swerve amount between 0 and 100
        this.parking = false;
        this.pullingOut = false;
        this.timer = Math.floor(Math.random() * 500); // Random parking time between 0 and 100
        this.images = vehicleImages[image];
        this.image = this.images.main;
        this.hasBeenHit = false;
        this.hasMirrorBeenHit = false;
        this.hasHitPlayer = false;
        this.rideshareSign = rideshareSigns[rideshareOptions[Math.floor(Math.random() * rideshareOptions.length)]];
        this.isRideshare = (Math.random() > 0.5 && (image != 'policeCar' && image!='primeTruck')) ? true : false;
        this.exploding = -1;
    }

    draw() {
        if (this.exploding > 0) {
            ctx.drawImage(explosion, this.x, this.y, 100, 100);
            this.exploding--;
            return;
        }
        if (this.exploding == 0) return;
        if (this.side === 'left') {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(Math.PI);
            ctx.drawImage(this.image, -this.width, -this.height, this.width, this.height);
            if (this.isRideshare) {
                ctx.drawImage(this.rideshareSign.image, -this.width+this.rideshareSign.xOffset, -this.height+this.rideshareSign.yOffset, this.rideshareSign.width/3, this.rideshareSign.height/3);
            }
            ctx.restore();
        } else {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            if (this.isRideshare) {
                ctx.drawImage(this.rideshareSign.image, this.x+this.rideshareSign.xOffset, this.y+this.rideshareSign.yOffset, this.rideshareSign.width/3, this.rideshareSign.height/3);
            }
        }
    };

    update() {
        if (this.exploding > 0) {
            this.y += player.speed;
            return;
        }
        if (!this.parked) {
            if (this.side === 'left') {
                this.y += this.speed+player.speed;
            } else {
                this.y -= this.speed;
            }
            if (this.parking) {
                if (this.side === 'left') {
                    this.x -= this.speed/2;
                } else {
                    this.x += this.speed/2;
                }
                if (this.x < 30 + this.parkingOffset || this.x > 660 - this.parkingOffset) {
                    this.parking = false;
                    this.parked = true;
                }
            } else {
                this.x += this.spin;
                if (this.x < this.initialX - this.swerveVariance || 
                    this.x > this.initialX + this.swerveVariance
                    ) {
                    this.spin = -this.spin;
                }   
            }
        } else {
            if (this.pullingOut) {
                if (this.side == 'left') {
                    this.x += this.speed/2;
                } else {
                    this.x -= this.speed/2;
                }
                if (Math.abs(this.x - this.initialX) <= 10) {
                    this.pullingOut = false;
                    this.parked = false;
                }
            } else {
                if (this.side == 'left') {
                    this.x = 30 + this.parkingOffset;
                } else {
                    this.x = 660 - this.parkingOffset;
                }
            }

            this.y += player.speed;
        }

        if (this.timer > 0) {
            this.timer--;
        }
        if (this.timer == 0) {
            this.timer = -1;
            if (this.parked) {
                this.pullingOut = true;
            } else {
                this.parking = true;
            }
        } 
    };
}

function addHealth() {
    player.health = Math.min(player.health + 50, 1000);
}
function removeHealth(amount = 100) {  
    player.health -= amount;
    totalDamageTaken += amount;
    score -= amount;
}

let currentLayout = {
    left: {
        sidewalkWidth: 50,
        trafficFrequency: 0.995
    },
    right: {
        sidewalkWidth: 50,
        trafficFrequency: 0.995
    }
}
let traffic = [];

function addHealthAndAssIfMirrorHitForFirstTime(vehicle) {
    if (vehicle.hasMirrorBeenHit) { return; }
    player.fatAss = 300;
    addHealth();
    score += 420;
    vehicle.hasMirrorBeenHit = true;
    player.mirrorsLiberated++;
    totalMirrorsHit++;
}

function checkCollisions() {
    for (let i = 0; i < traffic.length; i++) {
        if (/*!traffic[i].hasHitPlayer &&*/ rectIntersect(player.x, player.y+(player.height/3)+10, player.width, player.height-((player.height/3)+20),
            traffic[i].x+5, traffic[i].y, traffic[i].width-10, traffic[i].height)) {

            // ctx.fillStyle = 'purple';
            // ctx.fillRect(traffic[i].x+5, traffic[i].y, traffic[i].width-10, traffic[i].height);
            
            // ctx.fillStyle = 'red';
            // ctx.fillRect(player.x, player.y+(player.height/3)+10, player.width, player.height-((player.height/3)+20));
            if (player.invincible > 0) {
                traffic[i].exploding = 1000;
                addHealth()
                if (!traffic[i].hasHitPlayer) {
                    totalObstaclesHit++;
                    score += 69
                }
            } else if (traffic[i].side === 'left') {
                removeHealth(Math.max(player.speed, 2));
            } else {
                removeHealth(Math.max(player.speed, 3));
            }
            traffic[i].hasHitPlayer = true;

        }
    }
    checkObstacleCollisions();
    if (hitting){   
        let [closestVehicle, closestDistance] = getClosestObject()
        if (closestVehicle == null) { return; }
        // let rightPlayerFist = Rect(player.x+50, player.y+(player.height/3)+10, 20, 5);
        // let leftPlayerFist = Rect(player.x-20, player.y+(player.height/3)+10, 20, 5);
        if (hitDirection == 'right' && rectIntersect(player.x+50, player.y+(player.height/3)+10, 20, 5, closestVehicle.x, closestVehicle.y, closestVehicle.width, closestVehicle.height) ||
            hitDirection == 'left' && rectIntersect(player.x-20, player.y+(player.height/3)+10, 20, 5, closestVehicle.x, closestVehicle.y, closestVehicle.width, closestVehicle.height)) {
            if (hitDirection == 'left' && closestVehicle.exploding == -1) {
                ctx.drawImage(player.imageExplosion, player.x-35, player.y+(player.height/3), 50, 50);
            } else if(closestVehicle.exploding == -1) {
                ctx.drawImage(player.imageExplosion, player.x+35, player.y+(player.height/3), 50, 50);
            }
            if (!closestVehicle.hasBeenHit) { 
                totalObstaclesHit++;
                addHealth();
                score += 69;
            }
            closestVehicle.hasBeenHit = true;
            closestVehicle.timer = -1;
            closestVehicle.pullingOut = false;
            closestVehicle.parking = false;
            closestVehicle.swerveVariance = 100;
            if (hitDirection == 'left') {
                if (closestVehicle.side == 'right' && rectIntersect(player.x-20, player.y+(player.height/3)+10, 20, 5,closestVehicle.x+ closestVehicle.width -10, closestVehicle.y+40, 10,20)) { // take off right mirror of right side vehicle
                    closestVehicle.image = closestVehicle.images.noRightMirror;
                    addHealthAndAssIfMirrorHitForFirstTime(closestVehicle);
                } else if (closestVehicle.side == 'left' && rectIntersect(player.x-20, player.y+(player.height/3)+10, 20, 5,closestVehicle.x+ closestVehicle.width -10, closestVehicle.y+150, 10,20)) { // take off left mirror of left side vehicle
                    closestVehicle.image = closestVehicle.images.noLeftMirror;
                    addHealthAndAssIfMirrorHitForFirstTime(closestVehicle);
                }
                closestVehicle.spin = -1;             
            } else {
                if (closestVehicle.side == 'right' && rectIntersect(player.x+50, player.y+(player.height/3)+10, 20, 5,closestVehicle.x, closestVehicle.y+40, 10,20)) { // take of left mirror of right side vehicle
                    closestVehicle.image = closestVehicle.images.noLeftMirror;
                    addHealthAndAssIfMirrorHitForFirstTime(closestVehicle);
                }
                else if (closestVehicle.side == 'left' && rectIntersect(player.x+50, player.y+(player.height/3)+10, 20, 5,closestVehicle.x, closestVehicle.y+140, 10,20)) { // take off right mirror of left side vehicle
                    closestVehicle.image = closestVehicle.images.noRightMirror;
                    addHealthAndAssIfMirrorHitForFirstTime(closestVehicle);
                }
                closestVehicle.spin = 1;
            }
        }
    }
    // Similarly, add collision checks for following traffic and parked cars with open doors
}

function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(x2 > x1 + w1 || 
             x2 + w2 < x1 || 
             y2 > y1 + h1 ||
             y2 + h2 < y1);
}

const markingSpacing = 200; // Space between the start of one marking to the next
const markingLength = 100; // Length of each road marking
const totalMarking = markingLength + markingSpacing; 
const numMarkings = Math.ceil(canvas.height / markingSpacing); 
const yRoadReset = numMarkings * markingSpacing; 

function drawStaticRoad() {
        // Road background
        bgCtx.fillStyle = 'grey';
        bgCtx.fillRect(0, roadY - canvas.height, canvas.width, canvas.height);
        bgCtx.fillRect(0, roadY, canvas.width, canvas.height);
      
        // Sidewalks
        bgCtx.fillStyle = 'lightgrey';
        bgCtx.fillRect(0, roadY - canvas.height, currentLayout.left.sidewalkWidth, canvas.height * 2); // Left sidewalk
        bgCtx.fillRect(canvas.width - currentLayout.right.sidewalkWidth, roadY - canvas.height, currentLayout.right.sidewalkWidth, canvas.height * 2); // Right sidewalk
        bgCtx.fillStyle = 'darkgrey';
        bgCtx.fillRect(currentLayout.left.sidewalkWidth, roadY - canvas.height, 5, canvas.height * 2); // Left sidewalk
        bgCtx.fillRect(canvas.width - currentLayout.right.sidewalkWidth, roadY - canvas.height, 5, canvas.height * 2); // Right sidewalk
        
        // Bike lanes
        bgCtx.fillStyle = 'lightgreen';
        bgCtx.fillRect(130, 0, 50, canvas.height); // Left bike lane (next to parked cars)
        bgCtx.fillRect(canvas.width - 180, 0, currentLayout.right.sidewalkWidth, canvas.height); // Right bike lane (next to parked cars)
    
        // Bike Lane White Lines
        bgCtx.fillStyle = 'white';
        bgCtx.fillRect(130, 0, 5, canvas.height);
        bgCtx.fillRect(180, 0, 5, canvas.height); 
        
        bgCtx.fillRect(canvas.width - 130, 0, 5, canvas.height);
        bgCtx.fillRect(canvas.width - 180, 0, 5, canvas.height);
}
function drawRoad() {
    // Sidewalk markings
    ctx.fillStyle = 'darkgrey';
    for (let i = 0; i < canvas.height * 2; i += 100) {
        ctx.fillRect(0, i + roadY - canvas.height, 50, 1); // Middle lane marking
        ctx.fillRect(canvas.width - 50, i + roadY - canvas.height, 50, 1); // Middle lane marking
    }

    let yOffset = roadY % markingSpacing;

    for (let i = yOffset - markingSpacing; i < canvas.height; i += markingSpacing) {
        // Draw the centerline marking
        ctx.fillStyle = 'yellow';
        ctx.fillRect(canvas.width / 2 - 5, i, 10, markingLength);
    }
}
const treeSpacing = yRoadReset / numTrees;
function drawTrees() {
    // Draw evenly spaced trees
    let treeI = 0;
    for (let i = 0; i < yRoadReset*2; i+= treeSpacing) {
        const treeY = i + roadY - canvas.height;
        trees[treeI].y = treeY;
        trees[treeI].x = -25;
        trees[treeI+1].y = treeY
        trees[treeI+1].x = canvas.width - currentLayout.right.sidewalkWidth-25;
        ctx.drawImage(obstacleImages.tree, -25, treeY, 100, 100);
        ctx.drawImage(obstacleImages.tree, canvas.width - currentLayout.right.sidewalkWidth-25, treeY, 100, 100);
        treeI+=2;
    }
}

  function drawPlayer() {
    if (player.fatAss > 0) {
        if (hitting && hitDirection == 'left') {
            ctx.drawImage(player.imageFatAssLeft, player.x-20, player.y, 63, player.height);

        } else if(hitting && hitDirection == 'right') {
            ctx.drawImage(player.imageFatAssRight, player.x, player.y, 63, player.height);
        }
        else {
            ctx.drawImage(player.imageFatAss, player.x, player.y, player.width, player.height);
        }
    } else {
        if (hitting && hitDirection == 'left') {
            ctx.drawImage(player.imageLeft, player.x-20, player.y, 63, player.height);

        } else if(hitting && hitDirection == 'right') {
            ctx.drawImage(player.imageRight, player.x, player.y, 63, player.height);
        }
        else {
            ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
        }    
    }
  }

function drawTraffic() {
    traffic.forEach(car => {
        car.draw()
    });
}

function vehiclesOverlap(vehicle1, vehicle2) {
    return rectIntersect(vehicle1.x, vehicle1.y, vehicle1.width, vehicle1.height, vehicle2.x, vehicle2.y, vehicle2.width, vehicle2.height);
}

function initObstacles() {
    if (isCriticalMass) return;
    if (Math.random() > 0.99) {
        let obstacle = new Obstacle(
            37,
            63,
            obstaclesArray[Math.floor(Math.random() * obstaclesArray.length)]
            );
        obstacles.push(obstacle);
    }
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.draw();
    });
}

function checkObstacleCollisions() {
    obstacles.forEach(obstacle => {
        if (hitting && !obstacle.hasBeenHit && (hitDirection == 'right' && rectIntersect(player.x+50, player.y+(player.height/3)+10, 20, 5, obstacle.x, obstacle.y, obstacle.width, obstacle.height) ||
        hitDirection == 'left' && rectIntersect(player.x-20, player.y+(player.height/3)+10, 20, 5, obstacle.x, obstacle.y, obstacle.width, obstacle.height))) {
            player.health = Math.min(player.health + 50, 1000);
            if (obstacle.imageName == 'rathole') {
                player.ratholePilgrimages++;
                totalRatHolePilgrimages++;
                player.health = Math.min(player.health + 100, 1000)
            }
            obstacle.hit = hitDirection;
            player.fatAss = 500;
            score += 69;
            totalObstaclesHit++;
        }
        else if (!obstacle.hasHitPlayer && rectIntersect(player.x, player.y+(player.height/3)+10, player.width, player.height-((player.height/3)+20), obstacle.x, obstacle.y, obstacle.width, obstacle.height)) {
            obstacle.hit = 'player';
            obstacle.hasHitPlayer = true;
            if (player.invincible > 0) return;
            removeHealth();
        }
    });
    trees.forEach(tree => {
        if (!tree.hasHitPlayer && rectIntersect(player.x, player.y+(player.height/3)+10, player.width, player.height-((player.height/3)+20), tree.x, tree.y, tree.width, tree.height)) {
            if (player.invincible > 0) return;
            removeHealth(2);
        }
    });
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].update();
        if (obstacles[i].y > canvas.height || obstacles[i].y < -canvas.height-300) {
            obstacles.splice(i, 1);
        }
    }
}

function initTraffic() {
    if (isCriticalMass) return;
    // Generate incoming traffic
    let vehicleImagesArray = Object.keys(vehicleImages);
    let potentialIncomingVehicle = new Vehicle(
        canvas.width / 2 - 225,
        -200, // y position
        100, // width
        200, // height
        Math.random() * 2 + 3, // speed
        vehicleImagesArray[Math.floor(Math.random() * vehicleImagesArray.length)],
        'left'
    );
    let potentialOutgoingVehicle = new Vehicle(
        canvas.width / 2 + 75,
        canvas.height, // y position
        100, // width
        200, // height
        Math.random() * 2 + 3, // speed
        vehicleImagesArray[Math.floor(Math.random() * vehicleImagesArray.length)],
        'right'
    );

    if (Math.random() > currentLayout.left.trafficFrequency) {
        let overlap = traffic.some(vehicle => vehiclesOverlap(vehicle, potentialIncomingVehicle));
        if (!overlap) {
            traffic.push(potentialIncomingVehicle);
        }
    }

    // Generate following traffic
    if (Math.random() >  currentLayout.right.trafficFrequency) {
        let overlap = traffic.some(vehicle => vehiclesOverlap(vehicle, potentialOutgoingVehicle));
        if (!overlap) {
            traffic.push(potentialOutgoingVehicle);
        }    
    }
}


function updateTraffic() {
    for (let i = traffic.length - 1; i >= 0; i--) {
        traffic[i].update();
        // Remove cars that have moved past the bottom or top of the canvas
        if (traffic[i].side == 'left' && traffic[i].y > canvas.height) {
            traffic.splice(i, 1);
            continue;
        }
        if (traffic[i].side == 'right' && traffic[i].y < -traffic[i].height) {
            traffic.splice(i, 1);
        }

    }
}

function updatePlayer() {
      
  // Player speed adjustment for smoother acceleration
  if (movingUp && player.speed < 8) { // Max speed
    player.speed += 5; // Gradual acceleration
  } else if (!movingUp && player.speed > 5) { // Base speed
    player.speed -= 5; // Gradual deceleration
  }

  if (movingDown && player.speed > 1) { // Slow down
    player.speed -= 1;
  }
  if (!movingDown && player.speed < 5) { // Speed up    
    player.speed += 1;
  }

  // Smooth horizontal movement
  if (movingLeft && player.x > 0) {
    player.x -= 3;
  }
  if (movingRight && player.x < canvas.width - player.width) {
    player.x += 3;
  }

  if (player.ratholePilgrimages > 2) {
    player.ratholePilgrimages = 0;
    player.health = 1000;
    player.fatAss = 9999999;
    sheWolf.play();
    randomizeCyclistLocations();
    isCriticalMass = true;
    
    
    obstacles.forEach(obstacle => {
        obstacle.exploding = Math.floor(Math.random() * 500) + 50;
    });

    traffic.forEach(vehicle => {
        vehicle.exploding = Math.floor(Math.random() * 500) + 50;
    });
  }

  if (player.mirrorsLiberated > 9) {
    player.mirrorsLiberated = 0;
    player.health = 1000;
    player.invincible = 1000;
  }

  roadY += player.speed;
  if (roadY >= markingSpacing * Math.ceil(canvas.height/markingSpacing)) {
    roadY = 0;
    score += 69; // Scoring for each cycle of road movement
    totalLengthOfTrip += 69;
  }

  // Adjust player vertical position based on speed
  if (player.speed > 5) {
    player.y -= 2; // Move up
    if (player.y < 0) player.y = 0; // Prevent going off screen (top)
  } else {
    player.y += 2; // Move down
    if (player.y > canvas.height/2 - player.height/2) player.y = canvas.height/2 - player.height/2; // Prevent going off screen (bottom)
  }
  if(player.fatAss > 0) {
    player.fatAss--;
  }
  if(player.invincible > 0) {
    player.invincible--;
  }

}

let cyclists = Object.keys(cyclistImages).map(cyclist => new Cyclist(cyclist));

function randomizeCyclistLocations() {
    cyclists.forEach(cyclist => {
        cyclist.x = (Math.random() * 400 + 200);
        cyclist.y = canvas.height + 300 - cyclist.yVariance;
    });
}

function drawCriticalMass() {
    if (!isCriticalMass) return;
    player.health = 1000;

    cyclists.forEach(cyclist => {
        cyclist.update();
        cyclist.draw();
    });

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(moon, canvas.width/2 - moon.width/2, 0);
}

function update() {
  initTraffic();
  initObstacles();
  updatePlayer();
  updateTraffic();
  updateObstacles();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRoad();
    drawObstacles();
    drawPlayer();
    drawTraffic();
    drawTrees();
    drawCriticalMass();
    checkCollisions();

    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    let scoreText = `Score: ${score}`;
    let txtWidth = ctx.measureText(scoreText).width
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(5, 10, txtWidth+10, 30);
    ctx.fillStyle = 'white';
    ctx.fillText(scoreText, 10, 30);

    // Draw the health bar
    if (isCriticalMass) return;
    const healthWidth = (player.health / 1000) * 200; // Max width of 200 pixels
    const healthHeight = 20;
    ctx.fillStyle = 'red';
    ctx.fillRect((canvas.width - 200) / 2, 10, 200, healthHeight);
    ctx.fillStyle = 'green';
    if(player.invincible > 0) ctx.fillStyle = 'gold';
    ctx.fillRect((canvas.width - 200) / 2, 10, healthWidth, healthHeight);
}


function checkScoreAndRequestName() {
    let y = 250;
    db.collection("highscores").orderBy("score", "desc").limit(5).get().then(function(querySnapshot) {
        let lowestHighScore = 0;
        if (!querySnapshot.empty && querySnapshot.docs.length >= 5) {
            lowestHighScore = querySnapshot.docs[querySnapshot.docs.length - 1].data().score;
          }
          if (score > lowestHighScore) {
            displayScoreSubmissionForm();
          }
        querySnapshot.forEach(function(doc) {
            const highscore = doc.data();
            const scoreText = `${highscore.name}: ${highscore.score}`;

            ctx.fillText(highscore.name.substring(0, 26), (canvas.width - 240) / 2, y);
            ctx.fillText(highscore.score, (canvas.width + 240) / 2, y);
            y += 20; // increment y position for the next high score
        });
    })
    .catch(function(error) {
        console.error("Error getting documents: ", error);
    });
  }

function displayScoreSubmissionForm() {
    // Display the form for submitting high scores

  // Remove existing form if any to avoid duplicates
  const existingForm = document.getElementById('scoreSubmissionForm');
  if (existingForm) {
    existingForm.remove();
  }

  // Create the form container
  const formContainer = document.createElement('div');
  formContainer.id = 'scoreSubmissionForm';
  formContainer.style.cssText = `
    position: fixed; /* Use fixed positioning */
    top: 66%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 3;
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: add some shadow for better visibility */
  `;

  // Add inner HTML content for the form
  formContainer.innerHTML = `
    <p>Enter your name for the high score:</p>
    <input type="text" id="playerName" style="margin-bottom: 10px;" /><br/>
    <button onclick="submitHighScore()">Submit</button>
  `;
    document.body.appendChild(formContainer);
    const playerNameInput = document.getElementById('playerName');
    playerNameInput.focus();
  }

function submitHighScore() {
    const playerNameInput = document.getElementById('playerName');
    const playerName = playerNameInput.value.trim();


    if (playerName) {
      db.collection("highscores").add({
        name: playerName,
        score: score,
        damageTaken: totalDamageTaken,
        objectsSmacked: totalObstaclesHit,
        mirrorsLiberated: totalMirrorsHit,
        ratHolePilgrimages: totalRatHolePilgrimages,
        distanceTraveled: totalLengthOfTrip
      }).then(() => {
        console.log("Score submitted successfully.");
        const formElement = document.getElementById('scoreSubmissionForm');
        if (formElement) { formElement.style.display = 'none';
        playerNameInput.value = '';
        formElement.style.zIndex = -1;
        }
        
      }).catch(error => {
        console.error("Error submitting score: ", error);
      });
    }
  }


function gameLoop() {
    initTraffic();
    update();
    draw();
    if (player.health <= 0 || !gameStarted) {
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        if (!gameStarted) {
            drawStaticRoad();
    
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect((canvas.width - 200) / 2, 30, 200, 30);
            ctx.fillStyle = 'white';
            ctx.fillText("Click to start game", (canvas.width - 160) / 2, 50);
        } else {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect((canvas.width- 200) / 2, 30, 200, 30);
            ctx.fillStyle = 'white';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            
            let clickMessage = "Click to play again";
            ctx.fillText(clickMessage, (canvas.width - ctx.measureText(clickMessage).width) / 2, 50);
            const textValues = [
                { text: "Distance Traveled: ", value: totalLengthOfTrip },
                { text: "Loving Touches: ", value: totalObstaclesHit },
                { text: "Mirrors Liberated: ", value: totalMirrorsHit },
                { text: "Rat Hole Pilgrimages: ", value: totalRatHolePilgrimages },
                { text: "Damage Taken: ", value: totalDamageTaken },
                { text: "Total Score: ", value: score }
            ];

            const textX = (canvas.width - 240) / 2;
            const textY = 80;
            const lineHeight = 20;

            textValues.forEach((item, index) => {
                const text = item.text;
                const value = item.value;
                const textWidth = ctx.measureText(text).width;
                const valueWidth = ctx.measureText(value).width;
                const totalWidth = textWidth + valueWidth;

                const textXPos = textX;
                const valueXPos = (canvas.width + 240) / 2

                ctx.fillText(text, textXPos, textY + index * lineHeight);
                ctx.fillText(value, valueXPos, textY + index * lineHeight);
            });
            let highscores=[];
            ctx.font = '20px Arial';
            ctx.fillStyle = 'lightgreen';
            let highscoreText = 'High Scores';
            ctx.fillText(highscoreText, (canvas.width - ctx.measureText(highscoreText).width) / 2, 220);
            checkScoreAndRequestName();
        }
        canvas.onclick = restartGame;
    } else {
        requestAnimationFrame(gameLoop);
    }
}

function restartGame() {
    player.health = 1000;
    player.invincible = - 1;
    totalDamageTaken = 0;
    totalObstaclesHit = 0;
    totalMirrorsHit = 0;
    totalRatHolePilgrimages = 0;
    totalLengthOfTrip = 0;
    score = 0;
    player.speed = 5;
    roadY = 0;
    traffic = [];
    obstacles = []; 
    player.x = canvas.width / 2 - 25; // Reset player position
    player.y = canvas.height - 100;
    gameStarted = true;
    canvas.onclick = null; // Remove click event to avoid multiple restarts
    requestAnimationFrame(gameLoop); // Restart animation
    drawStaticRoad();
    sheWolf.src = 'swolf.mp3';
}

gameLoop();


document.addEventListener('keydown', function(event) {
    switch (event.key) {
      case 'ArrowLeft':
      case 'a':
        movingLeft = true;
        break;
      case 'ArrowRight':
      case 'd':
        movingRight = true;
        break;
      case 'ArrowUp':
      case 'w':
        movingUp = true;
        break;
      case 'ArrowDown':
      case 's': // Not needed but can be used for features like braking
        movingDown = true;
        break;
      case 'Space':
      case ' ':
        hitting = true;
        break;
    }
  });
  
  document.addEventListener('keyup', function(event) {
    switch (event.key) {
      case 'ArrowLeft':
      case 'a':
        movingLeft = false;
        break;
      case 'ArrowRight':
      case 'd':
        movingRight = false;
        break;
      case 'ArrowUp':
      case 'w':
        movingUp = false;
        break;
      case 'ArrowDown':
      case 's':
        movingDown = false;
        break;
      case 'Space':
      case ' ':
        hitting = false;
        break;
    }
  });

  function handleOrientation(event) {
    const gamma = event.gamma; // Left-to-right tilt in degrees, where left is negative, right is positive
    const beta = event.beta; // Front-to-back tilt in degrees, where front is negative, back is positive

    if (gamma < -15) {
        // Tilted left
        if (beta < 90 && beta > -90) {
            movingLeft = true;
            movingRight = false;
        } else {
            movingLeft = false;
            movingRight = true;
        }
    } else if (gamma > 15) {
        // Tilted right
        if (beta < 90 && beta > -90) {
            movingLeft = false;
            movingRight = true;
        } else {
            movingLeft = true;
            movingRight = false;
        }

    } else {
        // Neutral position
        movingLeft = false;
        movingRight = false;
    }
    
    if (beta < 30) {
        // Tilted forward
        movingUp = true;
    } else if (beta > 80) {
        // Tilted backward
        movingDown = true;
    } else {
        // Neutral position
        movingUp = false;
        movingDown = false;
    }
}

canvas.addEventListener('click', function(event) {
    if (gameStarted == false) {
        restartGame();
    }
    if (player.health <= 0) {
        restartGame();
    }
});

canvas.addEventListener('touchstart', function(event) {
    event.preventDefault(); // Prevent default action to avoid scrolling or zooming
    hitting = true; // Simulate spacebar being pressed
    if (gameStarted == false) {
        if(gotPermission == false) {
            firstClickPermission();
        }
        requestAnimationFrame(gameLoop);
    }
    if (player.health <= 0) {
        restartGame();
    }
});

canvas.addEventListener('touchend', function(event) {
    event.preventDefault();
    hitting = false; // Stop hitting when the touch ends
});

// Function to check if the device is iOS 13 or newer
function isIOS13OrNewer() {
    return typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function';
}

function firstClickPermission() {
    if (isIOS13OrNewer()) {
        // Show the consent button for iOS 13+ devices
        const consentButton = document.getElementById('requestPermissionButton');
        consentButton.style.display = 'block'; // Make the button visible

        consentButton.addEventListener('click', function() {
            DeviceOrientationEvent.requestPermission()
                .then(response => {
                    if (response == 'granted') {
                        // Permission granted
                        consentButton.style.display = 'none'; // Make the button visible
                        window.addEventListener('deviceorientation', handleOrientation);
                        gameStarted = true;
                        gotPermission = true;
                        requestAnimationFrame(gameLoop);
                    }
                })
                .catch(console.error);
        });
    } else {
        // Non-iOS 13+ devices
        window.addEventListener('deviceorientation', handleOrientation);
        gameStarted = true;
        gotPermission = true;
    }
}

