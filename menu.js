function Menu() {
mouse.initMouseControl();

var startNew = game.newTextObject({
    text: 'Начать новую игру',
    size: 30,
    color: '#ffffff',
    positionC: camera.getPositionC(100, 0),
});
var startWithCheckPoint = game.newTextObject({
    text: 'Начать с точки быстрого сохранения',
    size: 25,
    color: 'red',
    x: 0,
    y: screenHeight / 2 + 50,
});

startWithCheckPoint.x = screenWidth / 2 - OOP.getTextWidth(startWithCheckPoint) / 2;
    this.draw = function() {
        game.clear();
        startNew.draw();
        startWithCheckPoint.draw();
    };
    this.update = function() {
        if(checkPoint.playerSavedCheckPoint) startWithCheckPoint.color = 'green';
        if(mouse.isPeekObject('LEFT', startNew) || (touch.isDown() && touch.isInObject(startNew))){
            functionIsReady = false;
            levelNumber = 1;
            game.startLoop('startGame');
        }
        if(checkPoint.playerSavedCheckPoint == true && (mouse.isPeekObject('LEFT', startWithCheckPoint) || (touch.isDown() && touch.isInObject(startWithCheckPoint)))){
            game.startLoop('startGame');
            StartWithCheckPoint = true;
            functionIsReady = false;
        }
    }
};
var menu = new Menu();


game.newLoop('menu', function() {

    
menu.draw();
menu.update();
    
});