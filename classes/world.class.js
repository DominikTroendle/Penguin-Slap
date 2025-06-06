class World {
    ctx;
    canvas;
    keyboard;
    camera_x = 0;

    character = new Character();
    statusbar = new Statusbar();
    level = level1;
    
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.life);
                };
            });
        }, 200)
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.addObjectsToCanvas(this.level.staticBackground);
        this.addLoopingObjectsToCanvas(this.level.movingBackground);
        this.addToCanvas(this.statusbar);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToCanvas(this.level.enemies);
        this.addToCanvas(this.character);
        this.ctx.translate(-this.camera_x, 0);
        
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToCanvas(objects) {
        objects.forEach(o => {
            this.addToCanvas(o);
        });
    }

    addToCanvas(object) {
        if (object.otherDirection) this.mirrorCtx(object);
        object.drawObject(this.ctx);
        if (object instanceof Character || object instanceof Enemy || object instanceof Endboss) object.drawBorder(this.ctx);
        if (object.otherDirection) this.resetCtx(object);
    }

    addLoopingObjectsToCanvas(objects) {
        objects.forEach(o => {
            let scrollFactor = o.scrollFactor;
            let relCamera_x = this.camera_x * scrollFactor;
            let startX = Math.floor(-relCamera_x / o.width) * o.width;
            let endX = -relCamera_x + this.canvas.width;
            for (let x = startX; x < endX + o.width; x += o.width) {
                let drawX = x + relCamera_x;
                this.ctx.drawImage(o.img, drawX, o.y, o.width, o.height);
        }
        })
    }

    mirrorCtx(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    resetCtx(object) {
        this.ctx.restore();
        object.x = object.x * -1;
    }
}