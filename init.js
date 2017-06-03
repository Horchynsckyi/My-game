var pjs = new PointJS('2D', 1000, 200);
pjs.system.initFullPage();

var log = pjs.system.log,
    game = pjs.game,
    point = pjs.vector.point,
    camera = pjs.camera,
    brush = pjs.brush,
    OOP = pjs.OOP,
    math = pjs.math;

var mouse = pjs.mouseControl.initMouseControl();

var key = pjs.keyControl.initKeyControl();
//Global vars
var screenWidth = game.getWH().w,
    screenHeight = game.getWH().h;
var touch = pjs.touchControl;
touch.initTouchControl();
var informationCounter = 0;
var gameInPouse = false,
    gameNewGame = true,
    levelNumber = 1,
    functionIsReady = false,
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
    StartWithCheckPoint = false;

var tiles = pjs.tiles;
pjs.system.setTitle('Dark forest');
