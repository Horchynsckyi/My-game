game.newLoopFromConstructor('Level2', function(){  
this.entry = function() {
    if(gameInPouse == false) {
    enemyWorm.inLevel = true;
//    levelSet(2);
//    clearAllVarsFunc();
    playAudioFoneFunc();
    backGorund = setBackGroundFunc();
    setPlayerPositionFunc();
    }
    StartWithCheckPoint = false;
    gameInPouse = false;
}
//
//var mapLevel =  [
//    '      ',
//    '                         2            ',
//    '                       1111         00',
//    '     1111111           1111   11111 00',
//    '    110111111 1111       0111110000 00',
//    '    10001111111 01111111  110111111100',
//    '   11111 11     111111     00     1100',
//    '  11111111111111100101111111   1111100',
//    '           111011111100111100111100100',
//    '        111111111111111111111100111100',
//],
//    hideObjectLevel =  [
//    '      ',
//    '                         2            ',
//    '         u             1111     wu  00',
//    '     1111111           1111 w 11111 00',
//    '    110111w11 1111       0111110u00 00',
//    '    1u0 1111111001w11111  110111111100',
//    '   1w111 11 u   111111     000   u1100',
//    '  111111111111111w01011111110  1111100',
//    '         u 1w1011u111w0111100111100100',
//    '        111111111111111111111100111100',
//],
//    starsMapLevel =  [
//    '      ',
//    '                         2            ',
//    '                       1s11       s 00',
//    '     1111s11           1111   11111 00',
//    '    1101s1111 1111    s  0s11110000s00',
//    '   s100s1s11111 0s11s111  110111111100',
//    '  s11111 11   s 111s11s  s 00     1100',
//    '  111111111111111001s1111111   1111100',
//    '        s  1110111s110011s1001111ss100',
//    '        111111111111111111111100111100',
//],
//    ladderLevel = [
//    '      ',
//    '                         2            ',
//    '                       r11r         00',
//    '     l11111r           111r   l1111 00',
//    '    l1011111r l11r       01l1r10000 00',
//    '    r00 11111110011l1111  11011111r100',
//    '   111l1 lr     l11111     000    1l00',
//    '  11111111111l11100l0111r1110  l111l00',
//    '           r1l01r111100l11100l11r00l00',
//    '        111111111111111111111100111100',
//],
//    decorationLevel = [
//    '      ',
//    '                       v_t            ',
//    '     mm  _t            |v_1   v_ttm 00',
//    '     |1_vm|v   _t      111v_tm11111 00',
//    '    v101|t1v1m1111v   v  0v11||mv_t 00',
//    '   v1_0011t1111 01|_vt11  11011111|100',
//    '  tvm_|vmv|vtv_m_11t1_v  v_0   t v|100',
//    '  111111111_v|11v00v0m1t|v11 t_|m_m100',
//    '          vm|v_||mv_|00m_tvvvm11|v_100',
//    '        111111111111111111111100111100',
//],
//    enemiesMapLevel =  [
//    '      ',
//    '                         2            ',
//    '     |  w  /           |1w/   |w  / 00',
//    '     |11111/           111| w /111  00',
//    '    110/ 1w11 /111       0111|10w00/00',
//    '   |1w0/1111111/  w11/11  110111111100',
//    '  |1w111 11 w   /1111|  w /00  | w1/00',
//    '  111111111111/11w01/11|1w/00  1111100',
//    '        |w 111011w111|w111/00/11|w0/00',
//    '        111111111111111111111100111100',
//];  
//var map = {
//    width : 100,
//    height : 100,
//    image: pjs.tiles.newImage('img/Tiles.png'),
//    level: mapLevel,
//    tile : {
//        //Ground objects
//        '1': point(121, 128),//Graund + wall
//        '0': point(288, 288),//Graund
//        '2': point(67, 80),//Level end
//    }
//};
//levelComplitedAnimation = map.image.getAnimation(67, 50, 25, 30, 1);
////Objects for hide
//var hideObjs = {
//    width: 100,
//    height: 100,
//    image: pjs.tiles.newImage('img/Tiles.png'),
//    level: hideObjectLevel,
//    tile : {
//        'w': point(240, 112),//Hide in shrab
//        'u': point(100, 80),//Hide in Colums
//    }
//}
//var starsMap = {
//    width: 10,
//    height: 10,
//    level: starsMapLevel,
//};
////Ladders
//var ladder = {
//    width : 100,
//    height : 100,
//    image: pjs.tiles.newImage('img/Tiles.png'),
//    level: ladderLevel,
//    tile : {
//        //Ladders objects
//        'r': point(24, 113),//Ladder1 right
//        'l': point(24, 113),//ladder1 left
//    }
//};
////Decorations
//var decoration = {
//    width: 100,
//    height: 100,
//    level: decorationLevel,
//    tile: {
//        //Decoration Objects
//        'd': point(201, 104),//Decoration 1 'Information onject'
//        'v': point(288, 247),//Decoration 2 'grass'
//        '_': point(163, 100),//Decoration 3 'colum in ground'
//        't': point(272, 97),//Decoration 4 'fir-tree'
//        'm': point(415, 104),//Decoration 5 'boletuses'
//        '|': point(128, 88),//Decoration 6 'Colum1'
//    }
//}
////Enemies
//var enemiesMap = {
//    w: 40,
//    h: 20,
//    level: enemiesMapLevel,
//}
//
////
//OOP.forArr(map.level, function (string, y){
//    OOP.forArr(string, function (el, x){
//        var randomDecorationX = Math.ceil(Math.random() * 50)
//        if(!el || el == ' ' || el == 'n') return;
//        //Ground
//        if(el == '1') {
//        walls.push(game.newRectObject({
//                x : x * map.width,
//                y : y * map.height,
//                w : map.width,
//                h : map.height - 99,
//                fillColor: 'red',
//            }));
//        ground.push(game.newAnimationObject( { 
//                animation: map.image.getAnimation(map.tile[el].x, map.tile[el].y, 32, 32, 1),
//                x : x * map.width,
//                y : y * map.height,
//                w : map.width,
//                h : map.height, 
//                userData: {
//                    isGround: true,
//                }
//            }));
//        }
//        if(el == '0') {
//        ground.push(game.newAnimationObject( { 
//                animation: map.image.getAnimation(map.tile[el].x, map.tile[el].y, 32, 32, 1),
//                x : x * map.width,
//                y : y * map.height,
//                w : map.width,
//                h : map.height, 
//                userData: {
//                    isGround: true,
//                }
//            }));
//        }
//        if(el == '2') {
//        ground.push(game.newAnimationObject( { 
//                animation: map.image.getAnimation(map.tile[el].x, map.tile[el].y, 25, 30, 1),
//                x : x * map.width,
//                y : y * map.height,
//                w : map.width,
//                h : map.height, 
//                userData: {
//                    isLevelEnd: false,
//                }
//            }));
//        }
//    });
//});
//OOP.forArr(hideObjs.level, function (string, y){
//    OOP.forArr(string, function (el, x){
//        var randomDecorationX = Math.ceil(Math.random() * 100)
//        if(!el || el == ' ' || el == 'n') return;
//        //Decoration
//        if(el == 'w') {
//        hidingObjects.push(game.newAnimationObject( { 
//            animation: map.image.getAnimation(hideObjs.tile[el].x, hideObjs.tile[el].y, 16, 25, 1),
//            x : x * map.width + randomDecorationX,
//            y : y * map.height + 60,
//            w : map.width - 60,
//            h : map.height - 60, 
//            }));
//        hidingObjects[hidingObjects.length - 1].setFlip(Math.floor(Math.random() * 2), 0);
//        }
//        if(el == 'u') {
//        hidingObjects.push(game.newAnimationObject( { 
//            animation: map.image.getAnimation(hideObjs.tile[el].x, hideObjs.tile[el].y, 25, 30, 1),
//            x : x * map.width + randomDecorationX,
//            y : y * map.height + 50,
//            w : 45,
//            h : 50, 
//            }));
//        hidingObjects[hidingObjects.length - 1].setFlip(Math.floor(Math.random() * 2), 0);
//        }
//    });
//});
//OOP.forArr(starsMap.level, function (string, y){
//    OOP.forArr(string, function (el, x){
//        if(!el || el == ' ' || el == 'n') return;
//        //Decoration
//        if(el == 's') {
//        stars.push(game.newImageObject( { 
//            file: "Textures/Stars/starGold.png",
//            x : x * map.width + 25,
//            y : y * map.height + 70,
//            w : 20,
//            h : 20, 
//            }));
//        }
//    });
//});
//OOP.forArr(ladder.level, function (string, y){
//    OOP.forArr(string, function (el, x){
//        if(!el || el == ' ' || el == 'n') return;
//        if(el == 'l') {
//        ladders.push(game.newAnimationObject( { 
//            animation: map.image.getAnimation(ladder.tile[el].x, ladder.tile[el].y, 16, 32, 1),
//            x : x * map.width,
//            y : y * map.height,
//            w : map.width - 60,
//            h : map.height, 
//            userData: {
//                isLadder: true,
//                }
//            }));
//        }
//        if(el == 'r') {
//        ladders.push(game.newAnimationObject( { 
//            animation: map.image.getAnimation(ladder.tile[el].x, ladder.tile[el].y, 16, 32, 1),
//            x : x * map.width + 60,
//            y : y * map.height,
//            w : map.width - 60,
//            h : map.height, 
//            userData: {
//                isLadder: true,
//                }
//            }));
//        };
//    });
//});
//OOP.forArr(decoration.level, function (string, y){
//    OOP.forArr(string, function (el, x){
//        var randomDecorationX = Math.ceil(Math.random() * 50)
//        if(!el || el == ' ' || el == 'n') return;
//        //Decoration
//        if(el == 'd') {
//        decorations.push(game.newAnimationObject( { 
//            animation: map.image.getAnimation(decoration.tile[el].x, decoration.tile[el].y, 16, 25, 1),
//            x : x * decoration.width,
//            y : y * decoration.height + 60,
//            w : map.width - 60,
//            h : map.height - 60, 
//            userData: {
//                isInformationObject: true,
//                informationNumber: informationValue,
//            }
//            }));
//        decorations[decorations.length - 1].setFlip(Math.floor(Math.random() * 2), 0);
//        informationValue++;
//        }
//        if(el == 'v') {
//        decorations.push(game.newAnimationObject( { 
//            animation: map.image.getAnimation(decoration.tile[el].x, decoration.tile[el].y, 16, 8, 1),
//            x : x * decoration.width + randomDecorationX,
//            y : y * decoration.height + 60,
//            w : map.width - 60,
//            h : map.height - 60, 
//            }));
//        decorations[decorations.length - 1].setFlip(Math.floor(Math.random() * 2), 0);
//        }
//        if(el == '_') {
//        decorations.push(game.newAnimationObject( { 
//            animation: map.image.getAnimation(decoration.tile[el].x, decoration.tile[el].y, 25, 13, 1),
//            x : x * decoration.width + randomDecorationX - 50,
//            y : y * decoration.height + 65,
//            w : map.width - 20,
//            h : map.height - 60, 
//            }));
//        decorations[decorations.length - 1].setFlip(Math.floor(Math.random() * 2), 0);
//        }
//        if(el == 't') {
//        decorations.push(game.newAnimationObject( { 
//            animation: map.image.getAnimation(decoration.tile[el].x, decoration.tile[el].y, 16, 31, 1),
//            x : x * decoration.width + randomDecorationX - 20,
//            y : y * decoration.height - 20,
//            w : map.width - 60,
//            h : map.height - 40, 
//            scale: 2,
//            }));
//        decorations[decorations.length - 1].setFlip(Math.floor(Math.random() * 2), 0);
//        }
//        if(el == 'm') {
//        decorations.push(game.newAnimationObject( { 
//            animation: map.image.getAnimation(decoration.tile[el].x, decoration.tile[el].y, 16, 10, 1),
//            x : x * decoration.width + randomDecorationX - 20,
//            y : y * decoration.height + 85,
//            w : 16,
//            h : 10, 
//            scale: 2,
//            }));
//        decorations[decorations.length - 1].setFlip(Math.floor(Math.random() * 2), 0);
//        }
//        if(el == '|') {
//        decorations.push(game.newAnimationObject( { 
//            animation: map.image.getAnimation(decoration.tile[el].x, decoration.tile[el].y, 10, 15, 1),
//            x : x * decoration.width + randomDecorationX - 20,
//            y : y * decoration.height + 95,
//            w : 10,
//            h : 5, 
//            scale: 2,
//            }));
//        decorations[decorations.length - 1].setFlip(Math.floor(Math.random() * 2), 0);
//        }
//    });
//});
//var eWolfAnimationMove = tiles.newImage("img/enemies/wolf.png").getAnimation(320, 96, 64, 30, 5),
//    eWolfAanimationSleep = tiles.newImage("img/enemies/wolf.png").getAnimation(320, 0, 64, 30, 4);
//OOP.forArr(enemiesMap.level, function (string, y){
//    OOP.forArr(string, function (el, x){
//        //Звуки волков
//    var eWolfMoveRightHide = pjs.audio.newAudio("audio/eWolf/wolfMoveRight.mp3", 0.5),
//        eWolfMoveLeftHide = pjs.audio.newAudio("audio/eWolf/wolfMoveLeft.mp3", 0.5),
//        eWolfHuntingMode = pjs.audio.newAudio("audio/eWolf/wolfHuntingMode.mp3", 0.7),
//        eWolfMoveRightBaysick = {
//            "eWolfMoveRightBaysick1": pjs.audio.newAudio("audio/eWolf/wolfMoveRightBaysick1.mp3", 0),
//            "eWolfMoveRightBaysick2": pjs.audio.newAudio("audio/eWolf/wolfMoveRightBaysick2.mp3", 0),
//            "eWolfMoveRightBaysick3": pjs.audio.newAudio("audio/eWolf/wolfMoveRightBaysick3.mp3", 0),
//        }
//        eWolfMoveLeftBaysick = {
//            "eWolfMoveLeftBaysick1": pjs.audio.newAudio("audio/eWolf/wolfMoveLeftBaysick1.mp3", 0),
//            "eWolfMoveLeftBaysick2": pjs.audio.newAudio("audio/eWolf/wolfMoveLeftBaysick2.mp3", 0),
//            "eWolfMoveLeftBaysick3": pjs.audio.newAudio("audio/eWolf/wolfMoveLeftBaysick3.mp3", 0),
//        }
//        if(!el || el == ' ') return;
//        if(el == 'w'){
//        eWolf.push(game.newAnimationObject({
//              animation : tiles.newImage("img/enemies/wolf.png").getAnimation(320, 96, 64, 30, 5),
//              x : x * map.width,
//              y : y * map.height + 70,
//              w : 70, 
//              h : 30, 
//              delay: 10,
//              visible : true,
//              userData: {
//                  speedX: 0,
//                  huntingMode: false,
//                  moveR: true,
//                  playWolfMoveRight: false,
//                  playWolfMoveLeft: false,
//                  playCounter: 0,
//                  audioMoveRightHide: eWolfMoveRightHide,
//                  audioMoveLeftHide: eWolfMoveLeftHide,
//                  audioHuntingMode: eWolfHuntingMode,
//                  audioMoveLeftBaysick: eWolfMoveLeftBaysick,
//                  audioMoveRightBaysick: eWolfMoveRightBaysick,
//                  playCounterBaysick: 0,
//                  volumeForMoveBaysick: 0,
//                  volumeFixerHide: 1,
//              }
//            }));
//        }
//        if(el == '|'){
//        eWolfWalls.push(game.newRectObject({
//            x : x * map.width,
//            y : y * map.height,
//            w : 1,
//            h : map.height,
//            fillColor: 'red',
//            userData: {
//                isWall: true,
//            }
//            }));
//        }
//        if(el == '/'){
//        eWolfWalls.push(game.newRectObject({
//            x : x * map.width + 99,
//            y : y * map.height,
//            w : 1,
//            h : map.height,
//            fillColor: 'red',
//            userData: {
//                isWall: true,
//            }
//            }));
//            
//        }
//    });
//});
//starsToCompliteLevel = stars.length;
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