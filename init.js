var pjs = new PointJS('2D', 1000, 200);
pjs.system.initFullPage();
//
var log = pjs.system.log,
    game = pjs.game,
    point = pjs.vector.point,
    camera = pjs.camera,
    brush = pjs.brush,
    OOP = pjs.OOP,
    math = pjs.math,
    tiles = pjs.tiles;
pjs.system.setTitle('Dark forest');
game.setFPS(60);
//
var mouse = pjs.mouseControl.initMouseControl(),
    key = pjs.keyControl.initKeyControl(),
    touch = pjs.touchControl.initTouchControl();
//
//Узнаем ширину и высотку экрана пользователя
var screenWidth = game.getWH().w,
    screenHeight = game.getWH().h;
//
//Глобальные переменные игры
var gameInPouse = false,
    gameNewGame = true,
    //Проверка начинает ли игрок с быстрого сохранения
    StartWithCheckPoint = false,
    levelNumber = 1,
    //Переменная для счета отображения информации
    informationCounter = 0,
    //Проверка чтобы функция которая вибирает нужный уровень игры запускалась только 1 раз
    functionIsReady = false,
    //Объект в котором записываются все значения при быстром сохранении
    checkPoint = {
        x: 0,
        y: 0,
        starsToCompliteLevel: 0,
        stars: [],
        energy: 0,
        levelNumber: 1,
        levelComplite: 0,
        informationCounter: 0,
        playerSavedCheckPoint: false,
        startCounterCheckPointSaved: false,
        counterCheckPointSaved: 0,
    },
    //Игровые переменные
    backGorund = [],
    backGroundDecoration = [];
//
//Игрок
var player = game.newAnimationObject({
    animation: tiles.newImage('img/player.png').getAnimation(192, 63, 32, 35, 1),
    x : 0,
    y : 0,
    w : 31,
    h : 33,
    userData : {
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
//
//Массивы объектов игры и некоторые другие переменные
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
    //Объект врага черьвя
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
    //Анимации черьвя
    enemyWormCrawsOutAnimation = tiles.newImage('img/enemies/worm.png').getAnimation(0, 0, 32, 35, 8),
    enemyWormStandAnimation = tiles.newImage('img/enemies/worm.png').getAnimation(4, 32, 32, 35, 6),
    enemyWormHideAnimation = tiles.newImage('img/enemies/worm.png').getAnimation(4, 64, 32, 35, 8),
    enemyWormUnderGroundAnimation = tiles.newImage('img/enemies/worm.png').getAnimation(0, 0, 32, 35, 1);
//
//Объекты для сенсорного экрана
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
//Уровни игры
//
//var mapLevel1 =  [
//    '      ',
//    'nnnnnnnnnnnnnnnnnnnnnnnnnn2nnnnnwnnnnnn',
//    '00nnnnnv_ndnnnnnnnnnnnnnn1111w11111n000',
//    '00nvnd111111vww_11111dnnnn0011111111000',
//    '00111110000111111000111nnwnnnwn11111000',
//    '0000000000000000000000111111111nnn11000',
//    '00000000000000001nnnnn00000000111110000',
//    '000000000000000111100111nnnnnnn11100000',
//    '000000000000111111111111111111110000000',
//    '000000000000000000000000000000000000000',
//],
//    hideObjectLevel1 =  [
//    '      ',
//    'nnnnnnnnnnnnnnnnnnnnnnnnnn2nnnnnwnnnnnn',
//    '00nnnnnv_ndnnnnnnnnnnnnnn1111w11111n000',
//    '00nvnd111111vww_11111dnnnn0011111111000',
//    '00111110000111111000111nnunnnwn11111000',
//    '0000000000000000000000111111111nnn11000',
//    '000000000000000ww1/nnn00000000111110000',
//    '000000000000|u01w1/0011|nwnnunn/1100000',
//    '000000000000111111111111111111110000000',
//    '000000000000000000000000000000000000000',
//],
//    starsMapLevel1 =  [
//    '      ',
//    'nnnnnnnnnnnnnnnnnnnnnnnnnn2nnnnnwsnnnnn',
//    '00nnnnnv_ndnnnnnnnnnnnnnn1111ws1111n000',
//    '00nvnd111111vww_11111dnnnn0011111111000',
//    '00111110000111111000111nnwnnnwn111s1000',
//    '0000000000000000s00000111111111nnn11000',
//    '00000000000000001nnnnns0000000111s10000',
//    '000000000000s001111001s1nnnnnnn11100000',
//    '000000000000111111111111111111110000000',
//    '000000000000000000000000000000000000000',
//],
//    ladderLevel1 = [
//    '      ',
//    'nnnnnnnnnnnnnnnnnnnnnnnnnn2nnnnnnnnnnnn',
//    '00nnnnnv_ndnnnnnnnnnnnnnn111rnlnnnrn000',
//    '00nvndl1111rvww_l111rdnnnn00111rnnrn000',
//    '0011111000011111100011rnnwnnnwn1111r000',
//    '000000000000000000000011111111rnnnl1000',
//    '0000000000000000r000000000000011l110000',
//    '000000000000000l1r100l1rnnnnnnnl1100000',
//    '000000000000111111111111111111110000000',
//    '000000000000000000000000000000000000000',
//],
//    decorationLevel1 = [
//    '      ',
//    'nnnnnnnnnnnnnnnnnnnnnnnnnmv|nn|vtmtnnn',
//    'nnnnnnnv_tdnnnnnn|tv_nnnnn11mv_mnvnv000',
//    'nntvmdv1111mvm|_t111ltdnnn00111vv_tm000',
//    'nn11111000011111100011n_v_mmt|v1111_000',
//    '000000000000000000000011111111|m_vm1000',
//    '000000000000000v_|v00v_00000001v1v10000',
//    '000000000000t_m1111t_111vtm_||tm1100000',
//    '000000000000111111111111111111110000000',
//    '000000000000000000000000000000000000000',
//],
//    enemiesMapLevel1 =  [
//    '      ',
//    'nnnnnnnnnnnnnnnnnnnnnnnnnnnnnn|wnn/nnnn',
//    '00nnnnnnnnnnnnnnnnnnnnnnnn11|nwnwnw/000',
//    '00nnnnn1111|nnwn/111lnnnnn00111|nwn/000',
//    '0011111000011111100011|nnwnwnn/1111l000',
//    '000000000000000000000011111111lnnnr1000',
//    '000000000000000|w1/nnn00000000111110000',
//    '000000000000|001w1/0011|nwnnnnn/1100000',
//    '000000000000111111111111111111110000000',
//    '000000000000000000000000000000000000000',
//],
////Level2
//    mapLevel2 =  [
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
//    hideObjectLevel2 =  [
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
//    starsMapLevel2 =  [
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
//    ladderLevel2 = [
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
//    decorationLevel2 = [
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
//    enemiesMapLevel2 =  [
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
////
//var map = {
//    width : 100,
//    height : 100,
//    image: pjs.tiles.newImage('img/Tiles.png'),
//    level: null,
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
//    level: null,
//    tile : {
//        'w': point(240, 112),//Hide in shrab
//        'u': point(100, 80),//Hide in Colums
//    }
//}
//var starsMap = {
//    width: 10,
//    height: 10,
//    level: null,
//};
////Ladders
//var ladder = {
//    width : 100,
//    height : 100,
//    image: pjs.tiles.newImage('img/Tiles.png'),
//    level: null,
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
//    level: null,
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
//    level: null,
//}



