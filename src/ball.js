export default class Ball {

    constructor() {
        this.image = document.getElementById("img_ball");
    }

    draw(ctx) {
        ctx.drawImage(this.image, 16, 10, 16, 16);
    }

    update(){

    }

}