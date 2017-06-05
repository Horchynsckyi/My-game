game.newLoopFromConstructor('Level1', function(){  
this.entry = function() {
    if(gameInPouse == false) {
//    clearAllVarsFunc();
    playAudioFoneFunc();
    setPlayerPositionFunc();
//    levelSet(1);
    }
    StartWithCheckPoint = false;
    gameInPouse = false;
}
backGorund = setBackGroundFunc();
//
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
//this.draw = function() {
//
//}
this.update = function() {
    game.clear();
    setCameraPosirionFunc();
    controllFunc();
    saveCheckPointFunc();
    laddersFunc();
    informationFunc();
    hideFunc();
    starsFunc();
    gravitiFunc();
    levelEndFunc();
    wolfsFunc();
    playerMoveFunc();
    energyRegenerationFunc();
    //Draw
    OOP.drawArr(backGorund);
    OOP.drawArr(backGroundDecoration);
    OOP.drawArr(ground);
    OOP.drawArr(decorations);
    OOP.drawArr(ladders);
    OOP.drawArr(stars);
    //Hide Mode
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
    brushObjectsFunc();
    tuchScreenFunc();
}
});