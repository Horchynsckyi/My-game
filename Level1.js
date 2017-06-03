game.newLoopFromConstructor('startGame', function(){
game.setFPS(60);
//Audio Fone
var foneMusick = pjs.audio.newAudio("audio/fone/foneMusick.mp3", 0.1),
    foneForestSong = pjs.audio.newAudio("audio/fone/foneForestSong.mp3", 0.2);

foneMusick.play();
foneForestSong.play();

setInterval(function() {
    foneMusick.replay();
}, 68 * 1000);
setInterval(function() {
    foneForestSong.replay();
}, 600 * 1000);

//setBackGround
var randomBackgroundDecoration = 0;
var sizeBackground=256,x,y, backGorund=[];
var backgroundDecoration = [];
var randomPosition = 0;
for(x = 0; x<15; x++){
    for(y = 0; y<5; y++){
        randomBackgroundDecoration = Math.floor(Math.random() * 3);
        randomPosition = Math.floor(Math.random() * 100);
        if(randomBackgroundDecoration == 1) {
            backgroundDecoration.push(
                game.newImageObject({
                    file : 'Textures/Other/Cats Eyes.png', 
                      x : x * sizeBackground + randomPosition, 
                      y : y * sizeBackground + randomPosition, 
                      w : sizeBackground - 232, 
                      h : sizeBackground - 232
                })
            )
        } else if(randomBackgroundDecoration == 2) {
            backgroundDecoration.push(
                game.newImageObject({
                    file : 'Textures/Other/Flare.png', 
                      x : x * sizeBackground + randomPosition, 
                      y : y * sizeBackground + randomPosition, 
                      w : sizeBackground - 232, 
                      h : sizeBackground - 232
                })
            )
        }
        backGorund.push(
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
//Player
var player = game.newAnimationObject({
    animation: tiles.newImage('img/player.png').getAnimation(192, 63, 32, 35, 1),
    x : 300,
    y : 400,
    w : 31,
    h : 33,
    userData : {
        health: 100,
        speedX: 0,
        speedY: 0,
        inGround: false,
        inLadder: false,
        hide: false,
        move: false,
        energy: 100,
        energyRegeneration: false,
        energyTimer: 0,
        levelComplite: 0,
    },
    visible: true
}),
    playerMove = game.newAnimationObject({
    animation: tiles.newImage('img/player.png').getAnimation(192, 63, 32, 35, 3),
    x: player.x,
    y: player.y,
    w: 31,
    h: 33,
    visible: true
});
var fog = game.newImageObject({
    x: player.x,
    y: player.y,
    w: 1600,
    h: 1200,
    file: 'img/blackFog.png'
});
var fogFull = game.newImageObject({
    x: player.x,
    y: player.y,
    w: 1600,
    h: 1200,
    file: 'img/blackFull.png',
    visible: false,
});
    
var walls = [],
    ground = [],
    ladders = [],
    decorations = [],
    hidingObjects = [],
    stars = [],
    eWolf = [],
    eWolfWalls =[],
    hideMod = false,
    informationValue = 0,
    levelComplitedAnimation,
    starsToCompliteLevel = 0,
    enemyWorm = game.newAnimationObject({
        animation: tiles.newImage('img/enemies/worm.png').getAnimation(0, 0, 32, 35, 1),
        x: 0,
        y: 0,
        w: 45,
        h: 10,
        userData: {
            inLevel: false,
            timeBlink: 0,
            timeCrawsOutAnimation: 0,
            timeHideAnimation: 0,
            randomHideTime: 0,
            setRandomHideTime: true,
            playCounter: 0,
        }
    }),
    enemyWormCrawsOutAnimation = tiles.newImage('img/enemies/worm.png').getAnimation(0, 0, 32, 35, 8),
    enemyWormStandAnimation = tiles.newImage('img/enemies/worm.png').getAnimation(4, 32, 32, 35, 6),
    enemyWormHideAnimation = tiles.newImage('img/enemies/worm.png').getAnimation(4, 64, 32, 35, 8),
    enemyWormUnderGroundAnimation = tiles.newImage('img/enemies/worm.png').getAnimation(0, 0, 32, 35, 1);

//Touchpad controlls
var goRight = game.newImageObject({
    file: 'img/controll/right.png',
    w: 50,
    h: 50,
    x: player.x - 300,
    y: player.y + 200,
}),
    goLeft = game.newImageObject({
    file: 'img/controll/left.png',
    w: 50,
    h: 50,
    x: player.x - 400,
    y: player.y + 200,
}),jumpAndUp = game.newImageObject({
    file: 'img/controll/left.png',
    w: 50,
    h: 50,
    x: player.x + 250,
    y: player.y + 300,
}),goDown = game.newImageObject({
    file: 'img/controll/left.png',
    w: 50,
    h: 50,
    x: player.x + 250,
    y: player.y + 300,
}),doIt = game.newCircleObject({
    radius: 40,
    fillColor: 'white',
    strokeColor: 'grey',
    strokeWidth: 3,
    x: player.x + 300,
    y: player.y + 250,
        
}),quickSave = game.newTextObject({
    text: 'Быстрое сохрание',
    size: 15,
    color: 'grey',
    x: player.x + 300,
    y: player.y - 250,
});
jumpAndUp.turn(90);
goDown.turn(270);
//GlobalGameLoop
this.update = function() { 
//
//LevelNumber
function levelSet() {
if(functionIsReady == true) return;
//Обнуляем всё переменныё
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
//Не разрешаем цыклу запускаться постоянно
functionIsReady = true;
//Объявляем карту уровня:
if(StartWithCheckPoint == true) {
    levelNumber = checkPoint.levelNumber;
}
if(levelNumber == 1) {
    player.x = 300;
    player.y = 400;
    var mapLevel =  [
        '      ',
        'nnnnnnnnnnnnnnnnnnnnnnnnnn2nnnnnwnnnnnn',
        '00nnnnnv_ndnnnnnnnnnnnnnn1111w11111n000',
        '00nvnd111111vww_11111dnnnn0011111111000',
        '00111110000111111000111nnwnnnwn11111000',
        '0000000000000000000000111111111nnn11000',
        '00000000000000001nnnnn00000000111110000',
        '000000000000000111100111nnnnnnn11100000',
        '000000000000111111111111111111110000000',
        '000000000000000000000000000000000000000',
    ],
        hideObjectLevel =  [
        '      ',
        'nnnnnnnnnnnnnnnnnnnnnnnnnn2nnnnnwnnnnnn',
        '00nnnnnv_ndnnnnnnnnnnnnnn1111w11111n000',
        '00nvnd111111vww_11111dnnnn0011111111000',
        '00111110000111111000111nnunnnwn11111000',
        '0000000000000000000000111111111nnn11000',
        '000000000000000ww1/nnn00000000111110000',
        '000000000000|u01w1/0011|nwnnunn/1100000',
        '000000000000111111111111111111110000000',
        '000000000000000000000000000000000000000',
    ],
        starsMapLevel =  [
        '      ',
        'nnnnnnnnnnnnnnnnnnnnnnnnnn2nnnnnwsnnnnn',
        '00nnnnnv_ndnnnnnnnnnnnnnn1111ws1111n000',
        '00nvnd111111vww_11111dnnnn0011111111000',
        '00111110000111111000111nnwnnnwn111s1000',
        '0000000000000000s00000111111111nnn11000',
        '00000000000000001nnnnns0000000111s10000',
        '000000000000s001111001s1nnnnnnn11100000',
        '000000000000111111111111111111110000000',
        '000000000000000000000000000000000000000',
    ],
        ladderLevel = [
        '      ',
        'nnnnnnnnnnnnnnnnnnnnnnnnnn2nnnnnnnnnnnn',
        '00nnnnnv_ndnnnnnnnnnnnnnn111rnlnnnrn000',
        '00nvndl1111rvww_l111rdnnnn00111rnnrn000',
        '0011111000011111100011rnnwnnnwn1111r000',
        '000000000000000000000011111111rnnnl1000',
        '0000000000000000r000000000000011l110000',
        '000000000000000l1r100l1rnnnnnnnl1100000',
        '000000000000111111111111111111110000000',
        '000000000000000000000000000000000000000',
    ],
        decorationLevel = [
        '      ',
        'nnnnnnnnnnnnnnnnnnnnnnnnnmv|nn|vtmtnnn',
        'nnnnnnnv_tdnnnnnn|tv_nnnnn11mv_mnvnv000',
        'nntvmdv1111mvm|_t111ltdnnn00111vv_tm000',
        'nn11111000011111100011n_v_mmt|v1111_000',
        '000000000000000000000011111111|m_vm1000',
        '000000000000000v_|v00v_00000001v1v10000',
        '000000000000t_m1111t_111vtm_||tm1100000',
        '000000000000111111111111111111110000000',
        '000000000000000000000000000000000000000',
    ],
        enemiesMapLevel =  [
        '      ',
        'nnnnnnnnnnnnnnnnnnnnnnnnnnnnnn|wnn/nnnn',
        '00nnnnnnnnnnnnnnnnnnnnnnnn11|nwnwnw/000',
        '00nnnnn1111|nnwn/111lnnnnn00111|nwn/000',
        '0011111000011111100011|nnwnwnn/1111l000',
        '000000000000000000000011111111lnnnr1000',
        '000000000000000|w1/nnn00000000111110000',
        '000000000000|001w1/0011|nwnnnnn/1100000',
        '000000000000111111111111111111110000000',
        '000000000000000000000000000000000000000',
    ];  
} else if(levelNumber == 2) {
    player.x = 2100;
    player.y = 500;
    enemyWorm.inLevel = true;
    var mapLevel =  [
        '      ',
        '                         2            ',
        '                       1111         00',
        '     1111111           1111   11111 00',
        '    110111111 1111       0111110000 00',
        '    10001111111 01111111  110111111100',
        '   11111 11     111111     00     1100',
        '  11111111111111100101111111   1111100',
        '           111011111100111100111100100',
        '        111111111111111111111100111100',
    ],
        hideObjectLevel =  [
        '      ',
        '                         2            ',
        '         u             1111     wu  00',
        '     1111111           1111 w 11111 00',
        '    110111w11 1111       0111110u00 00',
        '    1u0 1111111001w11111  110111111100',
        '   1w111 11 u   111111     000   u1100',
        '  111111111111111w01011111110  1111100',
        '         u 1w1011u111w0111100111100100',
        '        111111111111111111111100111100',
    ],
        starsMapLevel =  [
        '      ',
        '                         2            ',
        '                       1s11       s 00',
        '     1111s11           1111   11111 00',
        '    1101s1111 1111    s  0s11110000s00',
        '   s100s1s11111 0s11s111  110111111100',
        '  s11111 11   s 111s11s  s 00     1100',
        '  111111111111111001s1111111   1111100',
        '        s  1110111s110011s1001111ss100',
        '        111111111111111111111100111100',
    ],
        ladderLevel = [
        '      ',
        '                         2            ',
        '                       r11r         00',
        '     l11111r           111r   l1111 00',
        '    l1011111r l11r       01l1r10000 00',
        '    r00 11111110011l1111  11011111r100',
        '   111l1 lr     l11111     000    1l00',
        '  11111111111l11100l0111r1110  l111l00',
        '           r1l01r111100l11100l11r00l00',
        '        111111111111111111111100111100',
    ],
        decorationLevel = [
        '      ',
        '                       v_t            ',
        '     mm  _t            |v_1   v_ttm 00',
        '     |1_vm|v   _t      111v_tm11111 00',
        '    v101|t1v1m1111v   v  0v11||mv_t 00',
        '   v1_0011t1111 01|_vt11  11011111|100',
        '  tvm_|vmv|vtv_m_11t1_v  v_0   t v|100',
        '  111111111_v|11v00v0m1t|v11 t_|m_m100',
        '          vm|v_||mv_|00m_tvvvm11|v_100',
        '        111111111111111111111100111100',
    ],
        enemiesMapLevel =  [
        '      ',
        '                         2            ',
        '     |  w  /           |1w/   |w  / 00',
        '     |11111/           111| w /111  00',
        '    110/ 1w11 /111       0111|10w00/00',
        '   |1w0/1111111/  w11/11  110111111100',
        '  |1w111 11 w   /1111|  w /00  | w1/00',
        '  111111111111/11w01/11|1w/00  1111100',
        '        |w 111011w111|w111/00/11|w0/00',
        '        111111111111111111111100111100',
    ];  
}
//Указываем все главные переменные уровня и добавляем объекты в массивы
//Map
var map = {
    width : 100,
    height : 100,
    image: pjs.tiles.newImage('img/Tiles.png'),
    level: mapLevel,
    tile : {
        //Ground objects
        '1': point(121, 128),//Graund + wall
        '0': point(288, 288),//Graund
        '2': point(67, 80),//Level end
    }
};
levelComplitedAnimation = map.image.getAnimation(67, 50, 25, 30, 1);
//Objects for hide
var hideObjs = {
    width: 100,
    height: 100,
    image: pjs.tiles.newImage('img/Tiles.png'),
    level: hideObjectLevel,
    tile : {
        'w': point(240, 112),//Hide in shrab
        'u': point(100, 80),//Hide in Colums
    }
}
var starsMap = {
    width: 10,
    height: 10,
    level: starsMapLevel,
};
//Ladders
var ladder = {
    width : 100,
    height : 100,
    image: pjs.tiles.newImage('img/Tiles.png'),
    level: ladderLevel,
    tile : {
        //Ladders objects
        'r': point(24, 113),//Ladder1 right
        'l': point(24, 113),//ladder1 left
    }
};
//Decorations
var decoration = {
    width: 100,
    height: 100,
    level: decorationLevel,
    tile: {
        //Decoration Objects
        'd': point(201, 104),//Decoration 1 'Information onject'
        'v': point(288, 247),//Decoration 2 'grass'
        '_': point(163, 100),//Decoration 3 'colum in ground'
        't': point(272, 97),//Decoration 4 'fir-tree'
        'm': point(415, 104),//Decoration 5 'boletuses'
        '|': point(128, 88),//Decoration 6 'Colum1'
    }
}
//Enemies
var enemiesMap = {
    w: 40,
    h: 20,
    level: enemiesMapLevel,
}

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
if(StartWithCheckPoint == true) {
    StartWithCheckPoint = false;
    player.x = checkPoint.x;
    player.y = checkPoint.y;
    starsToCompliteLevel = checkPoint.starsToCompliteLevel;
    stars = checkPoint.stars.slice();
    player.energy = checkPoint.energy;
    player.levelComplite = checkPoint.levelComplite;
    informationCounter = checkPoint.informationCounter;
}
starsToCompliteLevel = stars.length;
}
//Запускаем нужный уровень
levelSet();

//EnemyWorm
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
    
//
camera.setPositionC(point(player.x, player.y));
game.clear();
fog.setPositionC(point(player.x + 10, player.y + 50));
fogFull.setPositionC(point(player.x + 10, player.y + 50));
//Controll
//CheckPoint
if(key.isPress('F1') || (touch.isDown() && touch.isInObject(quickSave))) {
    checkPoint.x = player.x;
    checkPoint.y = player.y;
    checkPoint.starsToCompliteLevel = starsToCompliteLevel;
    checkPoint.stars = stars.slice();
    checkPoint.energy = player.energy;
    checkPoint.levelNumber = levelNumber;
    checkPoint.levelComplite = player.levelComplite;
    checkPoint.informationCounter = informationCounter;
    checkPoint.playerSavedCheckPoint = true;
    checkPoint.startCounterCheckPointSaved = true;
}
if(checkPoint.startCounterCheckPointSaved) {
    checkPoint.counterCheckPointSaved++;
    quickSave.text = 'Игра сохранена';
    quickSave.color = 'green';
    if(checkPoint.counterCheckPointSaved >= 50) {
        checkPoint.counterCheckPointSaved = 0;
        quickSave.text = 'Быстрое сохранение';
        quickSave.color = 'grey';
        checkPoint.startCounterCheckPointSaved = false;
    }
}

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

//Столкновения
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
for(var i = 0; i < decorations.length; i++) {
    //Information
    if(decorations[i].isStaticIntersect(player) && decorations[i].isInformationObject == true && player.x + 5 >= decorations[i].x) {
            decorations[i].isInformationObject = false;
            informationCounter += 1;
            return(game.setLoop('Information'));
    } 
}
    
//Hide
for(var i = 0; i < hidingObjects.length; i++) {
        if(hidingObjects[i].isStaticIntersect(player)) {
            if((key.isDown('E') || (touch.isDown() && touch.isInObject(doIt))) && (player.x + 3 > hidingObjects[i].x && player.x - 18 < hidingObjects[i].x) && player.speedX == 0) {
            fogFull.visible = true;
            player.hide = true;
            player.inGround = true;
            player.speedY = 0;
            player.speedX = 0;
            hideMod = true;
        } else {
            hideMod = false;
            player.hide = false;
            fogFull.visible = false;
        }
    }
}
//Stars
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

//LevelEnding
for(var i = 0; i < ground.length; i++) {
    if(player.isStaticIntersect(ground[i]) && ground[i].isLevelEnd == true) {
        if(levelNumber == 1) {
            levelNumber++;
            functionIsReady = false;
            game.startLoop('startGame');
        }
}
}


//Gravyty
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

if(player.inGround == false) {
    player.speedY += 0.2;
}
//Enemies wolfs
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
    //Audio
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

//Player move
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
    
if(player.speedX == 0 && player.energy < 100) {
    player.energyTimer += 1;
}
if(player.speedX != 0) {
    player.energyTimer = 0;
}
if(player.energyTimer > 200 && player.energy < 100) {
    player.energy += 0.5;
}
    
//Draw
//Hide Mode
OOP.drawArr(backGorund);
OOP.drawArr(backgroundDecoration);

//OOP.drawArr(walls);
OOP.drawArr(ground);
OOP.drawArr(decorations);
OOP.drawArr(ladders);
OOP.drawArr(stars);
if(!hideMod) {
OOP.drawArr(hidingObjects);
player.draw();
} else {
player.draw();
OOP.drawArr(hidingObjects);
}
OOP.drawArr(eWolf);
enemyWorm.draw();
playerMove.draw();

//Fog
fog.draw();
fogFull.draw();


//Energy
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
//Controll elements
goRight.x = player.x - 300;
goLeft.x = player.x - 400;
jumpAndUp.x = player.x + 220;
goDown.x = player.x - 200;
doIt.x = player.x + 350,
quickSave.x = player.x + 320,
goRight.y = player.y + 150;
goLeft.y = player.y + 150;
jumpAndUp.y = player.y + 150;
goDown.y = player.y + 150;
doIt.y = player.y + 130;
quickSave.y = player.y - 200;
goRight.draw();
goLeft.draw();
jumpAndUp.draw();
goDown.draw();
doIt.draw();
quickSave.draw();
}
});


game.newLoopFromConstructor('Information', function() {
    gameInPouse = true;
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
            game.setLoop('startGame');
        }
    }
});
