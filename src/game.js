import Paddle from './paddle.js';
import InputHandler from './input.js';
import Ball from './ball.js';
import Brick from './brick.js';

import { buildLevel, level1} from './levels.js';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3, 
};


export default class Game{

    constructor(gameWidth, gameHeight){

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.gamestate = GAMESTATE.MENU;
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);

        this.gameObjects = [];

        new InputHandler(paddle, this);
    }

    start() {
        if(this.gamestate !== GAMESTATE.MENU) return;

        let brick = buildLevel(this, level1);
    
        this.gameObjects = [this.ball, this.paddle, ...brick];

        this.gamestate = GAMESTATE.RUNNING;
    }

    update(deltaTime) {
        if (
            this.gamestate == GAMESTATE.PAUSED ||
            this.gamestate === GAMESTATE.MENU
        )
            return;

        this.gameObjects.forEach((object) => object.update(deltaTime));

        this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion);
    }
    
    draw(ctx) {
        // this.paddle.draw(ctx);
        // this.ball.draw(ctx);

        this.gameObjects.forEach((object) => object.draw(ctx));
        
        if(this.gamestate === GAMESTATE.PAUSED){
           ctx.rect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill(); 

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAllign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }

        if(this.gamestate === GAMESTATE.MENU){
            ctx.rect(0,0,this.gameWidth,this.gameHeight);
             ctx.fillStyle = "rgba(0,0,0,0.1)";
             ctx.fill(); 
 
             ctx.font = "30px Arial";
             ctx.fillStyle = "white";
             ctx.textAllign = "center";
             ctx.fillText("Press SPACEBAR To Start", this.gameWidth / 2, this.gameHeight / 2);
         }
    }
    

    togglePause() {
        if(this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } 

        else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }

}