"use strict";
class canvas {
  constructor(canvasId) {
    this.id = canvasId || "canvas";
    this.context = document.querySelector(this.id).getContext("2d");
    this.element=document.querySelector(this.id);
    this.width=this.element.width;
    this.height=this.element.height;
  };
  unique() {
    this.context.beginPath();
    return this;
  };
  close() {
    this.context.closePath();
    return this;
  };
  set(str,val){
    let ptr=str.toLowerCase();
    switch(ptr){
      case "width":
      this.element.setAttribute("width",val);
      this.width=val;
      break;
      case "height":
      this.element.setAttribute("height",val);
      this.height=val;
      break;
      default:
      throw new TypeError(`${str} is not a valid value to set`);
      break;
    };
    return this;
  };
  stroke(c,w) {
    let color=c||"black",lineWidth=w||1;
    this.context.strokeStyle=color;
    this.context.lineWidth=lineWidth;
    this.context.stroke();
    return this;
  };
  penTo(a){//[x,y]
    this.context.beginPath();
    this.context.moveTo(a[0],a[1]);
    return this;
  }
  line(a) {//[x,y]
    this.context.lineTo(a[0],a[1]);
    return this;
  };
  rect(a){//{a,y,w,h}
    this
    .penTo([a.x,a.y])
    .line([a.x,a.y+a.h])
    .line([a.x+a.w,a.y+a.h])
    .line([a.x+a.w,a.y])
    .close();
    return this;
  };
  fill(c){
    let color=c||"black";
    this.context.fillStyle=color;
    this.context.fill();
    return this;
  }
  shape(){
    let arg=[].slice.call(arguments),
    that=this,count=0,
    len=arg[0].length,lastIndex;//rest params not yet supported
    this.unique();
    while(len--){
      count===0
      ?that.penTo([arg[0][len][0],arg[0][len][1]])
      :that.line([arg[0][len][0],arg[0][len][1]]);
      // debugger;
      ++count;
    }
    return this;
  }
  squared(rw,rh,c){//rectwidth,rectheight,color
    let color=c||"rgba(93, 89, 92,.5)",
    w=this.width,
    h=this.height,
    sqw=rw||10,
    sqh=rh||10;
    for(let i=0;i<=w;i+=sqw){
  d.unique()
  .penTo(i,0)
  .line(i,h)
  .stroke(color);
}
for(let i=0;i<=h;i+=sqh){
d.unique()
.penTo(0,i)
.line(w,i)
.stroke(color);
}
  }
};
