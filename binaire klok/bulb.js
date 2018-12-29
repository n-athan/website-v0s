class Bulb {
    constructor(col, row) {
        this.row = row;
        this.col = col;
        this.center = createVector(col*w + 50, row*w + 50);
        this.active = false;
        this.n = pow(2, 5 - this.col);
        this.hue = 60 + this.row*50;
    }

    show() {
        if (this.active) {
            fill(this.hue, 70, 80);
        } else {
            fill(this.hue, 70, 15);
        }
        noStroke();
        ellipse(this.center.x, this.center.y, r, r);
    }

    isActive(m) {
        if (m >= this.n) {
            m = m-this.n;
            this.active = true;
        } else {
            this.active = false;
        }
        return m;
    }

}