class Foreground {
    x;
    y;
    width;
    height;
    img;
    imageCache = {};
    currentImage = 0;

    constructor() {

    }

    drawObject(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadRandomImg(arr) {
        this.img = new Image();
        this.img.src = arr[Math.floor((Math.random() * arr.length))];
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }
}