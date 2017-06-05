//Аудио для фана
function levelSet(value) {
    if(value == 1){
    map.level = mapLevel1;
    hideObjs.level = hideObjectLevel1;
    starsMap.level = starsMapLevel1;
    ladder.level = ladderLevel1;
    decoration.level = decorationLevel1;
    enemiesMap.level = enemiesMapLevel1;
    OOP.forArr(map.level, function (string, y){
    OOP.forArr(string, function (el, x){
        var randomDecorationX = Math.ceil(Math.random() * 50)
        if(!el || el == ' ' || el == 'n') return;
        //Ground
        if(el == '1') {
        walls.push(game.newRectObject({
                x : x * map.width,
                y : y * map.height,
                w : map.width,
                h : map.height - 99,
                fillColor: 'red',
            }));
        ground.push(game.newAnimationObject( { 
                animation: map.image.getAnimation(map.tile[el].x, map.tile[el].y, 32, 32, 1),
                x : x * map.width,
                y : y * map.height,
                w : map.width,
                h : map.height, 
                userData: {
                    isGround: true,
                }
            }));
        }
        if(el == '0') {
        ground.push(game.newAnimationObject( { 
                animation: map.image.getAnimation(map.tile[el].x, map.tile[el].y, 32, 32, 1),
                x : x * map.width,
                y : y * map.height,
                w : map.width,
                h : map.height, 
                userData: {
                    isGround: true,
                }
            }));
        }
        if(el == '2') {
        ground.push(game.newAnimationObject( { 
                animation: map.image.getAnimation(map.tile[el].x, map.tile[el].y, 25, 30, 1),
                x : x * map.width,
                y : y * map.height,
                w : map.width,
                h : map.height, 
                userData: {
                    isLevelEnd: false,
                }
            }));
        }
    });
});
OOP.forArr(hideObjs.level, function (string, y){
    OOP.forArr(string, function (el, x){
        var randomDecorationX = Math.ceil(Math.random() * 100)
        if(!el || el == ' ' || el == 'n') return;
        //Decoration
        if(el == 'w') {
        hidingObjects.push(game.newAnimationObject( { 
            animation: map.image.getAnimation(hideObjs.tile[el].x, hideObjs.tile[el].y, 16, 25, 1),
            x : x * map.width + randomDecorationX,
            y : y * map.height + 60,
            w : map.width - 60,
            h : map.height - 60, 
            }));
        hidingObjects[hidingObjects.length - 1].setFlip(Math.floor(Math.random() * 2), 0);
        }
        if(el == 'u') {
        hidingObjects.push(game.newAnimationObject( { 
            animation: map.image.getAnimation(hideObjs.tile[el].x, hideObjs.tile[el].y, 25, 30, 1),
            x : x * map.width + randomDecorationX,
            y : y * map.height + 50,
            w : 45,
            h : 50, 
            }));
        hidingObjects[hidingObjects.length - 1].setFlip(Math.floor(Math.random() * 2), 0);
        }
    });
});
OOP.forArr(starsMap.level, function (string, y){
    OOP.forArr(string, function (el, x){
        if(!el || el == ' ' || el == 'n') return;
        //Decoration
        if(el == 's') {
        stars.push(game.newImageObject( { 
            file: "Textures/Stars/starGold.png",
            x : x * map.width + 25,
            y : y * map.height + 70,
            w : 20,
            h : 20, 
            }));
        }
    });
});
OOP.forArr(ladder.level, function (string, y){
    OOP.forArr(string, function (el, x){
        if(!el || el == ' ' || el == 'n') return;
        if(el == 'l') {
        ladders.push(game.newAnimationObject( { 
            animation: map.image.getAnimation(ladder.tile[el].x, ladder.tile[el].y, 16, 32, 1),
            x : x * map.width,
            y : y * map.height,
            w : map.width - 60,
            h : map.height, 
            userData: {
                isLadder: true,
                }
            }));
        }
        if(el == 'r') {
        ladders.push(game.newAnimationObject( { 
            animation: map.image.getAnimation(ladder.tile[el].x, ladder.tile[el].y, 16, 32, 1),
            x : x * map.width + 60,
            y : y * map.height,
            w : map.width - 60,
            h : map.height, 
            userData: {
                isLadder: true,
                }
            }));
        };
    });
});
OOP.forArr(decoration.level, function (string, y){
    OOP.forArr(string, function (el, x){
        var randomDecorationX = Math.ceil(Math.random() * 50)
        if(!el || el == ' ' || el == 'n') return;
        //Decoration
        if(el == 'd') {
        decorations.push(game.newAnimationObject( { 
            animation: map.image.getAnimation(decoration.tile[el].x, decoration.tile[el].y, 16, 25, 1),
            x : x * decoration.width,
            y : y * decoration.height + 60,
            w : map.width - 60,
            h : map.height - 60, 
            userData: {
                isInformationObject: true,
                informationNumber: informationValue,
            }
            }));
        decorations[decorations.length - 1].setFlip(Math.floor(Math.random() * 2), 0);
        informationValue++;
        }
        if(el == 'v') {
        decorations.push(game.newAnimationObject( { 
            animation: map.image.getAnimation(decoration.tile[el].x, decoration.tile[el].y, 16, 8, 1),
            x : x * decoration.width + randomDecorationX,
            y : y * decoration.height + 60,
            w : map.width - 60,
            h : map.height - 60, 
            }));
        decorations[decorations.length - 1].setFlip(Math.floor(Math.random() * 2), 0);
        }
        if(el == '_') {
        decorations.push(game.newAnimationObject( { 
            animation: map.image.getAnimation(decoration.tile[el].x, decoration.tile[el].y, 25, 13, 1),
            x : x * decoration.width + randomDecorationX - 50,
            y : y * decoration.height + 65,
            w : map.width - 20,
            h : map.height - 60, 
            }));
        decorations[decorations.length - 1].setFlip(Math.floor(Math.random() * 2), 0);
        }
        if(el == 't') {
        decorations.push(game.newAnimationObject( { 
            animation: map.image.getAnimation(decoration.tile[el].x, decoration.tile[el].y, 16, 31, 1),
            x : x * decoration.width + randomDecorationX - 20,
            y : y * decoration.height - 20,
            w : map.width - 60,
            h : map.height - 40, 
            scale: 2,
            }));
        decorations[decorations.length - 1].setFlip(Math.floor(Math.random() * 2), 0);
        }
        if(el == 'm') {
        decorations.push(game.newAnimationObject( { 
            animation: map.image.getAnimation(decoration.tile[el].x, decoration.tile[el].y, 16, 10, 1),
            x : x * decoration.width + randomDecorationX - 20,
            y : y * decoration.height + 85,
            w : 16,
            h : 10, 
            scale: 2,
            }));
        decorations[decorations.length - 1].setFlip(Math.floor(Math.random() * 2), 0);
        }
        if(el == '|') {
        decorations.push(game.newAnimationObject( { 
            animation: map.image.getAnimation(decoration.tile[el].x, decoration.tile[el].y, 10, 15, 1),
            x : x * decoration.width + randomDecorationX - 20,
            y : y * decoration.height + 95,
            w : 10,
            h : 5, 
            scale: 2,
            }));
        decorations[decorations.length - 1].setFlip(Math.floor(Math.random() * 2), 0);
        }
    });
});
var eWolfAnimationMove = tiles.newImage("img/enemies/wolf.png").getAnimation(320, 96, 64, 30, 5),
    eWolfAanimationSleep = tiles.newImage("img/enemies/wolf.png").getAnimation(320, 0, 64, 30, 4);
OOP.forArr(enemiesMap.level, function (string, y){
    OOP.forArr(string, function (el, x){
        //Звуки волков
    var eWolfMoveRightHide = pjs.audio.newAudio("audio/eWolf/wolfMoveRight.mp3", 0.5),
        eWolfMoveLeftHide = pjs.audio.newAudio("audio/eWolf/wolfMoveLeft.mp3", 0.5),
        eWolfHuntingMode = pjs.audio.newAudio("audio/eWolf/wolfHuntingMode.mp3", 0.7),
        eWolfMoveRightBaysick = {
            "eWolfMoveRightBaysick1": pjs.audio.newAudio("audio/eWolf/wolfMoveRightBaysick1.mp3", 0),
            "eWolfMoveRightBaysick2": pjs.audio.newAudio("audio/eWolf/wolfMoveRightBaysick2.mp3", 0),
            "eWolfMoveRightBaysick3": pjs.audio.newAudio("audio/eWolf/wolfMoveRightBaysick3.mp3", 0),
        }
        eWolfMoveLeftBaysick = {
            "eWolfMoveLeftBaysick1": pjs.audio.newAudio("audio/eWolf/wolfMoveLeftBaysick1.mp3", 0),
            "eWolfMoveLeftBaysick2": pjs.audio.newAudio("audio/eWolf/wolfMoveLeftBaysick2.mp3", 0),
            "eWolfMoveLeftBaysick3": pjs.audio.newAudio("audio/eWolf/wolfMoveLeftBaysick3.mp3", 0),
        }
        if(!el || el == ' ') return;
        if(el == 'w'){
        eWolf.push(game.newAnimationObject({
              animation : tiles.newImage("img/enemies/wolf.png").getAnimation(320, 96, 64, 30, 5),
              x : x * map.width,
              y : y * map.height + 70,
              w : 70, 
              h : 30, 
              delay: 10,
              visible : true,
              userData: {
                  speedX: 0,
                  huntingMode: false,
                  moveR: true,
                  playWolfMoveRight: false,
                  playWolfMoveLeft: false,
                  playCounter: 0,
                  audioMoveRightHide: eWolfMoveRightHide,
                  audioMoveLeftHide: eWolfMoveLeftHide,
                  audioHuntingMode: eWolfHuntingMode,
                  audioMoveLeftBaysick: eWolfMoveLeftBaysick,
                  audioMoveRightBaysick: eWolfMoveRightBaysick,
                  playCounterBaysick: 0,
                  volumeForMoveBaysick: 0,
                  volumeFixerHide: 1,
              }
            }));
        }
        if(el == '|'){
        eWolfWalls.push(game.newRectObject({
            x : x * map.width,
            y : y * map.height,
            w : 1,
            h : map.height,
            fillColor: 'red',
            userData: {
                isWall: true,
            }
            }));
        }
        if(el == '/'){
        eWolfWalls.push(game.newRectObject({
            x : x * map.width + 99,
            y : y * map.height,
            w : 1,
            h : map.height,
            fillColor: 'red',
            userData: {
                isWall: true,
            }
            }));
            
        }
    });
});
starsToCompliteLevel = stars.length;
    }
}
function playAudioFoneFunc() {
    var foneMusick = pjs.audio.newAudio("audio/fone/foneMusick.mp3", 0.1),
    foneForestSong = pjs.audio.newAudio("audio/fone/foneForestSong.mp3", 0.2);
    foneMusick.play();
    foneForestSong.play();
    setInterval(function() {
    //Аудио проигрывается опять через определенное время
    foneMusick.replay();
    }, 68 * 1000);
    setInterval(function() {
        foneForestSong.replay();
    }, 600 * 1000);
}
//
////Задаём задний фон
function setBackGroundFunc(){
var backGround = [];
var randomBackgroundDecoration = 0;
var sizeBackground=256,x,y;
var randomPosition = 0;
for(x = 0; x<15; x++){
    for(y = 0; y<5; y++){
        randomBackgroundDecoration = Math.floor(Math.random() * 3);
        randomPosition = Math.floor(Math.random() * 100);
        if(randomBackgroundDecoration == 1) {
            backGroundDecoration.push(
                game.newImageObject({
                    file : 'Textures/Other/Cats Eyes.png', 
                      x : x * sizeBackground + randomPosition, 
                      y : y * sizeBackground + randomPosition, 
                      w : sizeBackground - 232, 
                      h : sizeBackground - 232
                })
            )
        } 
        else if(randomBackgroundDecoration == 2) {
            backGroundDecoration.push(
                game.newImageObject({
                    file : 'Textures/Other/Flare.png', 
                      x : x * sizeBackground + randomPosition, 
                      y : y * sizeBackground + randomPosition, 
                      w : sizeBackground - 232, 
                      h : sizeBackground - 232
                })
            )
        }
        backGround.push(
            game.newImageObject( { 
              file : 'Textures/Other/Far Background.png', 
              x : x * sizeBackground, 
              y : y * sizeBackground, 
              w : sizeBackground, 
              h : sizeBackground
            })
            )
        }
};
return backGround;
}
//Назначаем игру его позицыю в зависмости от уровня
function setPlayerPositionFunc() {
    if(levelNumber == 1) {
        player.x = 300;
        player.y = 350;
    }
    if(levelNumber == 2) {
        player.x = 2100;
        player.y = 500;
    }
}
function clearAllVarsFunc() {
    player.energy = 100;
    player.levelComplite = 0;
    walls = [];
    ground = [];
    ladders = [];
    decorations = [];
    hidingObjects = [];
    stars = [];
    eWolf = [];
    eWolfWalls =[];
    hideMod = false;
    informationCounter = 0;
    starsToCompliteLevel = 0; 
}
//Функции быстрого сохранения (старт и сохранение);
function startWithCheckPointFunc() {
    StartWithCheckPoint = true;
    levelNumber = checkPoint.levelNumber;
    player.x = checkPoint.x;
    player.y = checkPoint.y;
    starsToCompliteLevel = checkPoint.starsToCompliteLevel;
    stars = checkPoint.stars.slice();
    player.energy = checkPoint.energy;
    player.levelComplite = checkPoint.levelComplite;
    informationCounter = checkPoint.informationCounter;
    game.startLoop('Level' + levelNumber);
}
function saveCheckPointFunc() {
    if(checkPoint.playerSavedCheckPoint) {
    checkPoint.x = player.x;
    checkPoint.y = player.y;
    checkPoint.starsToCompliteLevel = starsToCompliteLevel;
    checkPoint.stars = stars.slice();
    checkPoint.energy = player.energy;
    checkPoint.levelNumber = levelNumber;
    checkPoint.levelComplite = player.levelComplite;
    checkPoint.informationCounter = informationCounter;
    checkPoint.playerSavedCheckPoint = false;
    checkPoint.startCounterCheckPointSaved = true;
    }
    if(checkPoint.startCounterCheckPointSaved) {
        log(checkPoint.counterCheckPointSaved);
        quickSave.text = 'Игра сохранена';
        quickSave.color = 'green';
        checkPoint.counterCheckPointSaved++;
        if(checkPoint.counterCheckPointSaved >= 50) {
            checkPoint.counterCheckPointSaved = 0;
            quickSave.text = 'Быстрое сохранение';
            quickSave.color = 'grey';
            checkPoint.startCounterCheckPointSaved = false;
        }
    }
}
//
//Управление
function controllFunc() {
    if(key.isPress('F1') || (touch.isDown() && touch.isInObject(quickSave))) {
        checkPoint.playerSavedCheckPoint = true;
        saveCheckPoint();
    }
    //
    if((key.isDown('D') || key.isDown('RIGHT')) || (touch.isDown() && touch.isInObject(goRight)) && player.hide == false) {
    player.setFlip(0, 0);
    playerMove.setFlip(0, 0);
        if((key.isDown('SHIFT') || (touch.isDown() && touch.isInObject(doIt))) && player.energy > 0) {
            player.speedX = 1.5;
            player.energy -= 1;
        } else player.speedX = 1;
    } else if((key.isDown('A') || key.isDown('LEFT') || (touch.isDown() && touch.isInObject(goLeft)) && player.hide == false)) {
    player.setFlip(1, 0);
    playerMove.setFlip(1, 0);
        if((key.isDown('SHIFT') || (touch.isDown() && touch.isInObject(doIt))) && player.energy > 0) {
            player.speedX = -1.5;
            player.energy -= 1;
        } else player.speedX = -1;
    } else {
        player.speedX = 0;
    }
}
function eWormFunc() {
if(enemyWorm.inLevel == true) {
    if(enemyWorm.setRandomHideTime == true){
        enemyWorm.randomHideTime = 100 + Math.ceil(Math.random() * 1000);
        enemyWorm.setRandomHideTime = false;
    }
    enemyWorm.timeBlink++;
    if(enemyWorm.timeBlink >= 100) {
        if(enemyWorm.timeBlink == 100) {
            var randomPosition = Math.floor(Math.random() * (walls.length));
            enemyWorm.x = walls[randomPosition].x + 20;
            enemyWorm.y = walls[randomPosition].y - 50;
        }
        enemyWorm.timeCrawsOutAnimation++;
        if(enemyWorm.timeCrawsOutAnimation == 40 + enemyWorm.randomHideTime){
            enemyWorm.setAnimation(enemyWormCrawsOutAnimation);
            enemyWorm.h = 40;
        }
        if(enemyWorm.timeCrawsOutAnimation == 100 + enemyWorm.randomHideTime){
            enemyWorm.setAnimation(enemyWormStandAnimation);
        }
        enemyWorm.timeHideAnimation++;
        if(enemyWorm.timeHideAnimation == 500 + enemyWorm.randomHideTime){
            enemyWorm.setAnimation(enemyWormHideAnimation);
        }
        if(enemyWorm.timeHideAnimation == 560 + enemyWorm.randomHideTime){
            enemyWorm.h = 10;
            enemyWorm.timeBlink = 0;
            enemyWorm.timeCrawsOutAnimation = 0;
            enemyWorm.timeHideAnimation = 0;
            enemyWorm.setAnimation(enemyWormUnderGroundAnimation)
            enemyWorm.setRandomHideTime = true;
        }
        if(enemyWorm.isStaticIntersect(player) && player.hide == false) {
            game.startLoop('menu');
        }
    }
}
}
function setCameraPosirionFunc() {
camera.setPositionC(point(player.x, player.y));
}
function laddersFunc() {
for(var i = 0; i < ladders.length; i++) {
    if(ladders[i].isStaticIntersect(player)) {
    player.inLadder = true;
    player.inGround = true;
        if((key.isDown('W') || key.isDown('UP') || (touch.isDown() && touch.isInObject(jumpAndUp))) && (player.y + player.h - 1 > ladders[i].y) && (player.x > ladders[i].x && player.x - 10 < ladders[i].x)) {
            player.speedY = -1;
        } else if((key.isDown('S') || key.isDown('DOWN') || (touch.isDown() && touch.isInObject(goDown))) && (player.y - 10 < ladders[i].y) && (player.x > ladders[i].x && player.x - 10 < ladders[i].x)) {
            player.speedY = 1;
        } else if((key.isDown('E') || (touch.isDown() && touch.isInObject(doIt))) && (player.x > ladders[i].x && player.x - 10 < ladders[i].x)) {
            player.speedY = 0;
        }else {
        player.inLadder = false;
        }
    } 
}
}
function informationFunc() {
for(var i = 0; i < decorations.length; i++) {
    if(decorations[i].isStaticIntersect(player) && decorations[i].isInformationObject == true && player.x + 5 >= decorations[i].x) {
            decorations[i].isInformationObject = false;
            informationCounter += 1;
            return(game.setLoop('Information'));
    } 
}
}
function hideFunc() {
    for(var i = 0; i < hidingObjects.length; i++) {
        if(hidingObjects[i].isStaticIntersect(player)) {
            if((key.isDown('E') || (touch.isDown() && touch.isInObject(doIt))) && (player.x + 3 > hidingObjects[i].x && player.x - 18 < hidingObjects[i].x) && player.speedX == 0) {
            player.hide = true;
            player.inGround = true;
            player.speedY = 0;
            player.speedX = 0;
            //Мод при котором игрок отрысовывается раньше чем объект в котором прячемся
            hideMod = true;
        } else {
            hideMod = false;
            player.hide = false;
        }
    }
}
}
function starsFunc() {
for(var i = 0; i < stars.length; i++) {
    if(stars[i].isStaticIntersect(player)) {
        player.levelComplite += 100 / starsToCompliteLevel;
        stars.splice(i, 1);
        if(stars.length == 0) {
            for(var i = 0; i < ground.length; i++) {
                if(ground[i].isLevelEnd == false) {
                    ground[i].setAnimation(levelComplitedAnimation);
                    ground[i].isLevelEnd = true;
                }
            }
        }
    }
}
}
function levelEndFunc() {
for(var i = 0; i < ground.length; i++) {
    if(player.isStaticIntersect(ground[i]) && ground[i].isLevelEnd == true) {
        if(levelNumber == 1) {
            levelNumber++;
            functionIsReady = false;
            game.startLoop('startGame');
        }
}
}
}
function gravitiFunc() {
    if(player.inLadder == false && player.hide == false) {
    for(var i = 0; i < walls.length; i++) {
        if(!walls[i].isStaticIntersect(player)){
            player.inGround = false;
        } else if ((walls[i].isStaticIntersect(player))){
            if(player.speedY >= 5) game.startLoop('menu');
                if(key.isPress('W') || key.isPress('UP') || (touch.isPress() && touch.isInObject(jumpAndUp))) {
                    player.speedY = -3;
                } else {            
            player.inGround = true;
            player.speedY = 0;
            player.y = walls[i].y - player.h;
            }
        }
    }
}
if(player.inGround == false && player.inLadder == false) {
    player.speedY += 0.2;
}
}
function wolfsFunc() {
for(var i = 0; i < eWolf.length; i++) {
    eWolf[i].x += eWolf[i].speedX;
    if(eWolf[i].speedX > 0) {
        eWolf[i].setFlip(0, 0);
    }
    else if(eWolf[i].speedX < 0) {
        eWolf[i].setFlip(1, 0);
    }
    if(eWolf[i].huntingMode == false) {
        if(eWolf[i].moveR == true) {
            eWolf[i].speedX = 1.2;
        }
        else if(eWolf[i].moveR == false) eWolf[i].speedX = -1.2;
    }
    if(eWolf[i].huntingMode == true) {
        eWolf[i].audioHuntingMode.play(0.7);
        if(eWolf[i].flip.x == 0) eWolf[i].speedX = 3;
        else if(eWolf[i].flip.x == 1) eWolf[i].speedX = -3;
    } else {
        eWolf[i].audioHuntingMode.stop();
    }
    if(eWolf[i].isStaticIntersect(player) && player.hide == false) {
        eWolf[i].audioHuntingMode.stop();
        game.startLoop('menu');
    }
    for(var j = 0; j < eWolfWalls.length; j++) {
        if(eWolf[i].speedX > 0 && eWolfWalls[j].isStaticIntersect(eWolf[i]) && eWolfWalls[j].x > eWolf[i].x) {
            eWolf[i].x -= 20;
            eWolf[i].moveR = false;
    }
        if(eWolf[i].speedX < 0 && eWolfWalls[j].isStaticIntersect(eWolf[i]) && eWolfWalls[j].x < eWolf[i].x) {
            eWolf[i].x += 20;
            eWolf[i].moveR = true;
        }
    }
        if(((eWolf[i].moveR == true && player.x < eWolf[i].x && player.x >= eWolf[i].x - 80) || ((eWolf[i].moveR == true && player.x > eWolf[i].x && player.x <= eWolf[i].x + 150)) || (eWolf[i].moveR == false && player.x > eWolf[i].x && player.x <= eWolf[i].x + 80) || (eWolf[i].moveR == false && player.x < eWolf[i].x && player.x >= eWolf[i].x - 120)) && (player.hide == false && player.y >= eWolf[i].y - 30 && player.y <= eWolf[i].y + 30)) {
            
        if(player.x > eWolf[i].x) eWolf[i].moveR = true;
        else if (player.x < eWolf[i].x) eWolf[i].moveR = false;
            
        eWolf[i].huntingMode = true;
        } else {
            eWolf[i].huntingMode = false;
        }
    //Волк проходит когда прячемся
    if(player.x <= eWolf[i].x + 50 && player.x > eWolf[i].x && eWolf[i].playWolfMoveRight == false && eWolf[i].speedX > 0 && player.hide == true && (player.y >= eWolf[i].y - 30 && player.y <= eWolf[i].y + 30)) {
        eWolf[i].audioMoveRightHide.play(0.3);
        eWolf[i].playWolfMoveRight = true;
    }
    if(player.x >= eWolf[i].x - 50 && player.x < eWolf[i].x && eWolf[i].playWolfMoveLeft == false && eWolf[i].speedX < 0 && player.hide == true && (player.y >= eWolf[i].y - 30 && player.y <= eWolf[i].y + 30)) {
        eWolf[i].audioMoveLeftHide.play(0.3);
        eWolf[i].playWolfMoveLeft = true;
    }
    if(eWolf[i].playWolfMoveLeft || eWolf[i].playWolfMoveRight) {
        eWolf[i].playCounter++;
        if(eWolf[i].playCounter >= 300) {
            eWolf[i].playWolfMoveLeft = false;
            eWolf[i].playWolfMoveRight = false;
            eWolf[i].playCounter = 0;
        }
        if(player.hide == false) {
            eWolf[i].audioMoveLeftHide.stop();
            eWolf[i].audioMoveRightHide.stop();
        }
    }
    //Ситывает насколько далеко игрок и в зависимости от этого задает громкость волку (по вертикали и горизонтали)
    eWolf[i].volumeForMoveBaysick = (eWolf[i].x - player.x);
    eWolf[i].playCounterBaysick++
    function randomAudioMovePlay() {
        return Math.ceil(Math.random() * 3);
    }
    if(eWolf[i].playCounterBaysick >= 10 && (player.hide == false || ((player.hide == true && (player.x <= eWolf[i].x - 20 && player.x < eWolf[i].x || player.x >= eWolf[i].x + 20 && player.x > eWolf[i].x))))) {
        if(((player.hide == true && (player.x <= eWolf[i].x - 20 && player.x < eWolf[i].x || player.x >= eWolf[i].x + 20 && player.x > eWolf[i].x)))) {
            eWolf[i].volumeFixerHide = 2;
        } else {
            eWolf[i].volumeFixerHide = 1;
        }
        if(eWolf[i].volumeForMoveBaysick > 0) {
        eWolf[i].audioMoveLeftBaysick.vol = 0;
            if(player.y > eWolf[i].y) eWolf[i].volumeForMoveBaysick += (player.y - eWolf[i].y) * 3;
            else if(player.y < eWolf[i].y) eWolf[i].volumeForMoveBaysick += (eWolf[i].y - player.y) * 3;
            
            if(eWolf[i].volumeForMoveBaysick < 500 && eWolf[i].volumeForMoveBaysick > 450) {}
                else if(eWolf[i].volumeForMoveBaysick <= 450 && eWolf[i].volumeForMoveBaysick >= 400) 
                eWolf[i].audioMoveRightBaysick["eWolfMoveRightBaysick" + randomAudioMovePlay()].play(0.1 / eWolf[i].volumeFixerHide);
                else if(eWolf[i].volumeForMoveBaysick <= 400 && eWolf[i].volumeForMoveBaysick >= 350)
                eWolf[i].audioMoveRightBaysick["eWolfMoveRightBaysick" + randomAudioMovePlay()].play(0.2 / eWolf[i].volumeFixerHide);
                else if(eWolf[i].volumeForMoveBaysick <= 350 && eWolf[i].volumeForMoveBaysick >= 300)
                eWolf[i].audioMoveRightBaysick["eWolfMoveRightBaysick" + randomAudioMovePlay()].play(0.3 / eWolf[i].volumeFixerHide);
                else if(eWolf[i].volumeForMoveBaysick <= 300 && eWolf[i].volumeForMoveBaysick >= 250)
                eWolf[i].audioMoveRightBaysick["eWolfMoveRightBaysick" + randomAudioMovePlay()].play(0.4 / eWolf[i].volumeFixerHide);
                else if(eWolf[i].volumeForMoveBaysick <= 250 && eWolf[i].volumeForMoveBaysick >= 200)
                eWolf[i].audioMoveRightBaysick["eWolfMoveRightBaysick" + randomAudioMovePlay()].play(0.5 / eWolf[i].volumeFixerHide);
                else if(eWolf[i].volumeForMoveBaysick <= 200 && eWolf[i].volumeForMoveBaysick >= 150)
                eWolf[i].audioMoveRightBaysick["eWolfMoveRightBaysick" + randomAudioMovePlay()].play(0.6 / eWolf[i].volumeFixerHide);
                else if(eWolf[i].volumeForMoveBaysick <= 150 && eWolf[i].volumeForMoveBaysick >= 100)
                eWolf[i].audioMoveRightBaysick["eWolfMoveRightBaysick" + randomAudioMovePlay()].play(0.7 / eWolf[i].volumeFixerHide);
                else if(eWolf[i].volumeForMoveBaysick <= 100 && eWolf[i].volumeForMoveBaysick >= 50)
                eWolf[i].audioMoveRightBaysick["eWolfMoveRightBaysick" + randomAudioMovePlay()].play(0.8 / eWolf[i].volumeFixerHide);
                else if(eWolf[i].volumeForMoveBaysick <= 50 && eWolf[i].volumeForMoveBaysick >= 0)
                eWolf[i].audioMoveRightBaysick["eWolfMoveRightBaysick" + randomAudioMovePlay()].play(0.9 / eWolf[i].volumeFixerHide);
            eWolf[i].playCounterBaysick = 0;
        } else if (eWolf[i].volumeForMoveBaysick < 0) {
        eWolf[i].audioMoveRightBaysick.vol = 0;
            if(player.y > eWolf[i].y) eWolf[i].volumeForMoveBaysick -= (player.y - eWolf[i].y) * 3;
            else if(player.y < eWolf[i].y) eWolf[i].volumeForMoveBaysick -= (eWolf[i].y - player.y) * 3;
            
            if(eWolf[i].volumeForMoveBaysick < -500 && eWolf[i].volumeForMoveBaysick > -450) {}
                else if(eWolf[i].volumeForMoveBaysick >= -450 && eWolf[i].volumeForMoveBaysick <= -400) 
                eWolf[i].audioMoveLeftBaysick["eWolfMoveLeftBaysick" + randomAudioMovePlay()].play(0.1 / eWolf[i].volumeFixerHide);
                else if(eWolf[i].volumeForMoveBaysick >= -400 && eWolf[i].volumeForMoveBaysick <= -350)
                eWolf[i].audioMoveLeftBaysick["eWolfMoveLeftBaysick" + randomAudioMovePlay()].play(0.2 / eWolf[i].volumeFixerHide);
                else if(eWolf[i].volumeForMoveBaysick >= -350 && eWolf[i].volumeForMoveBaysick <= -300)
                eWolf[i].audioMoveLeftBaysick["eWolfMoveLeftBaysick" + randomAudioMovePlay()].play(0.2 / eWolf[i].volumeFixerHide);
                else if(eWolf[i].volumeForMoveBaysick >= -300 && eWolf[i].volumeForMoveBaysick <= -250)
                eWolf[i].audioMoveLeftBaysick["eWolfMoveLeftBaysick" + randomAudioMovePlay()].play(0.3 / eWolf[i].volumeFixerHide);
                else if(eWolf[i].volumeForMoveBaysick >= -250 && eWolf[i].volumeForMoveBaysick <= -200)
                eWolf[i].audioMoveLeftBaysick["eWolfMoveLeftBaysick" + randomAudioMovePlay()].play(0.4 / eWolf[i].volumeFixerHide);
                else if(eWolf[i].volumeForMoveBaysick >= -200 && eWolf[i].volumeForMoveBaysick <= -150)
                eWolf[i].audioMoveLeftBaysick["eWolfMoveLeftBaysick" + randomAudioMovePlay()].play(0.5 / eWolf[i].volumeFixerHide);
                else if(eWolf[i].volumeForMoveBaysick >= -150 && eWolf[i].volumeForMoveBaysick <= -100)
                eWolf[i].audioMoveLeftBaysick["eWolfMoveLeftBaysick" + randomAudioMovePlay()].play(0.6 / eWolf[i].volumeFixerHide);
                else if(eWolf[i].volumeForMoveBaysick >= -100 && eWolf[i].volumeForMoveBaysick <= -50)
                eWolf[i].audioMoveLeftBaysick["eWolfMoveLeftBaysick" + randomAudioMovePlay()].play(0.7 / eWolf[i].volumeFixerHide);
                else if(eWolf[i].volumeForMoveBaysick >= -50 && eWolf[i].volumeForMoveBaysick <= 0)
                eWolf[i].audioMoveLeftBaysick["eWolfMoveLeftBaysick" + randomAudioMovePlay()].play(0.8 / eWolf[i].volumeFixerHide);
            eWolf[i].playCounterBaysick = 0;
        }
    }
    
}
}
function playerMoveFunc() {
playerMove.x = player.x;
playerMove.y = player.y;
player.x += player.speedX;
player.y += player.speedY;
    if(player.speedX == 0) {
    playerMove.visible = false;
    player.visible = true;
    } else {
        playerMove.visible = true;
        player.visible = false;
    }
}
function energyRegenerationFunc() {
if(player.speedX == 0 && player.energy < 100) {
    player.energyTimer += 1;
}
if(player.speedX != 0) {
    player.energyTimer = 0;
}
if(player.energyTimer > 200 && player.energy < 100) {
    player.energy += 0.5;
}
}
function brushObjectsFunc() {
brush.drawTextS({
    x : 50,
    y : 25,
    text : 'Енергия: ',
    size : 20,
    color : 'green'
});
brush.drawRectS({
    x: 50,
    y: 50,
    w: 102,
    h: 30,
    strokeColor : "white",
    strokeWidth : 2,
});
brush.drawRectS({
    x: 52,
    y: 52,
    w: player.energy,
    h: 28,
    fillColor: 'green'
});
//LevelComplite?
brush.drawRectS({
    x: 50,
    y: 100,
    w: 100,
    h: 30,
    strokeColor : "white",
    strokeWidth : 2,
});
brush.drawRectS({
    x: 50,
    y: 100,
    w: player.levelComplite,
    h: 30,
    fillColor: 'white'
});
brush.drawTextS({
    x : 50,
    y : 80,
    text : 'Уровень пройден на:',
    size : 20,
    color : 'white'
});
}
function tuchScreenFunc() {
goLeft.setPositionCS(point (100, screenHeight - 100));
goRight.setPositionCS(point (200, screenHeight - 100));
goDown.setPositionCS(point (300, screenHeight - 100));
jumpAndUp.setPositionCS(point (screenWidth - 200, screenHeight - 100));
doIt.setPositionCS(point (screenWidth - 100, screenHeight - 100));
quickSave.setPositionCS(point (screenWidth - 100, 50));
goRight.draw();
goLeft.draw();
jumpAndUp.draw();
goDown.draw();
doIt.draw();
quickSave.draw();
}
//
game.newLoopFromConstructor('Information', function() {
    var informationText = '';
    var screenWidth = game.getWH().w,
        screenHeight = game.getWH().h;
    var ok = game.newTextObject({
        x: screenWidth - 200,
        y: screenHeight - 70,
        size: 25,
        color: 'green',
        text: 'Продолжить',
    });
    this.update = function() {
    let informationTitle = game.newTextObject({
        x: screenWidth / 2 - 150,
        y: screenHeight / 2 - 100,
        size: 25,
        color: 'white',
        text: 'Информация по игре №' + informationCounter,
    });
        if(informationCounter == 1) {
            informationText = 'Это обучающий уровень, в котором вы узнаете об основной механике игры, управлении и т.п.\nЧтобы спустится по леснице используйте стрелку "ВНИЗ" в левом нижнем углу экрана.\nЧтобы удержаться на лестнице зажмите кнопку "ДЕЙСТВИЕ" в правом нижнем углу экрана.';
        } else if(informationCounter == 2) {
            informationText = 'Внимание! Ваш персонаж может только бегать и прятаться, вы должны прислушываться\nк звукам чтобы выжить. Удержитесь на лестнице и отследите движения врага.\nЧтобы спрятаться используйте клавишу "ДЕЙСТВИЕ" находять у объекта\nв котором можно спрататься.\nЧтобы ускориться - зажмите клавишу "ДЕЙСТВИЕ" когда передвигаетесь в лево, или в правою.\nЭто требует энергии, она восстановится сама если вы не двигаетесь';
        } else if(informationCounter == 3) {
            informationText = 'Дальше ждет много врагов. Прачьтесь и используйте энергию с умом.\nЧтобы закончить уровень вы должны собрать все звезды на карте.\nСколько осталось собрать отображается в левом верхнем углу экрана, под энергией.\nУдачи! и не забывайте об быстром сохранении в верхнем правом углу экрана.';
        }
        game.clear();
        informationTitle.draw();
        ok.draw();
        brush.drawMultiTextS({
            x: screenWidth / 2 - 450,
            y: screenHeight / 2 - 50,
            size: 20,
            color: 'white',
            aling: 'center',
            text: informationText,
        });
        if(informationCounter == 1) {
        brush.drawImageS({
            file: 'img/information/information' + informationCounter + 'image1.png',
            w: 150,
            h: 150,
            x: screenWidth / 2 - 450,
            y: screenHeight / 2 + 100,
        });
        brush.drawImageS({
            file: 'img/information/information' + informationCounter + 'image2.png',
            w: 250,
            h: 150,
            x: screenWidth / 2 - 250,
            y: screenHeight / 2 + 100,
        });
        } else if(informationCounter == 2) {
        brush.drawImageS({
            file: 'img/information/information' + informationCounter + 'image1.png',
            w: 300,
            h: 150,
            x: screenWidth / 2 - 450,
            y: screenHeight / 2 + 100,
        });
        brush.drawImageS({
            file: 'img/information/information' + informationCounter + 'image2.png',
            w: 300,
            h: 150,
            x: screenWidth / 2 - 100,
            y: screenHeight / 2 + 100,
        }); 
        } else if(informationCounter == 3) {
        brush.drawImageS({
            file: 'img/information/information' + informationCounter + 'image1.png',
            w: 150,
            h: 150,
            x: screenWidth / 2 - 450,
            y: screenHeight / 2 + 100,
        });
        brush.drawImageS({
            file: 'img/information/information' + informationCounter + 'image2.png',
            w: 150,
            h: 150,
            x: screenWidth / 2 - 250,
            y: screenHeight / 2 + 100,
        }); 
        }
        if(mouse.isPeekObject('LEFT', ok) || (touch.isDown() && touch.isInObject(ok))) {
            gameInPouse = true;
            game.setLoop('Level1');
        }
    }
});