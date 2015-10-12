"use strict";
class canvas {
  constructor(canvasId) {
    this.id = canvasId || "canvas";
    this.ctx = document.querySelector(this.id).getContext("2d");
  }
  stroke() {
    this.ctx.stroke();
    return this;
  };
  unique() {
    this.ctx.beginPath();
    return this;
  };
  line(x, y, x1, y1) {
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x1, y1);
    return this;
  };
  lwidth(nm) {
    this.ctx.lineWidth = nm;
    return this;
  };
close(){
  this.ctx.closePath();
}
}
