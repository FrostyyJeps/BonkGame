export default class Ball {

    constructor(game) {
        this.image = document.getElementById("img_ball");

        this.gameWidth = game.gameWidth
        this.gameHeight = game.gameHeight

        this.position = {x: 10, y: 10};
        this.speed = {x: 3, y: 3};
        this.size = 16;
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size,
            this.siz
        );
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if(this.position.x > this.gameWidth || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }

        if(this.position.y + this.size > this.gameHeight || this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }
    }

}