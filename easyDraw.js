"use strict";
class canvas {
  constructor(canvasId) {
    this.id = canvasId || "canvas";
    this.context = document.querySelector(this.id).getContext("2d");
    this.element = document.querySelector(this.id);
    this.width = this.element.width;
    this.height = this.element.height;
  };
  unique() {
    this.context.beginPath();
    return this;
  };
  close() {
    this.context.closePath();
    return this;
  };
  set(str, val) {
    let ptr = str.toLowerCase();
    switch (ptr) {
      case "width":
        this.element.setAttribute("width", val);
        this.width = val;
        break;
      case "height":
        this.element.setAttribute("height", val);
        this.height = val;
        break;
      default:
        throw new TypeError(`${str} is not a valid value to set`);
        break;
    };
    return this;
  };
  stroke(c, w) {
    let color = c || "black",
      lineWidth = w || 1;
    this.context.strokeStyle = color;
    this.context.lineWidth = lineWidth;
    this.context.stroke();
    return this;
  };
  penTo(coords) { //[x,y]
    this.context.beginPath();
    this.context.moveTo(coords[0], coords[1]);
    return this;
  }
  line(coords) { //[x,y]
    this.context.lineTo(coords[0], coords[1]);
    return this;
  };
  rect(props) { //{x,y,w,h}
    this
      .penTo([props.x, props.y])
      .line([props.x, props.y + props.h])
      .line([props.x + props.w, props.y + props.h])
      .line([props.x + props.w, props.y])
      .close();
    return this;
  };
  fill(c) {
    let color = c || "black";
    this.context.fillStyle = color;
    this.context.fill();
    return this;
  }
  shape() {
    let arg = [].slice.call(arguments),
      that = this,
      count = 0,
      len = arg[0].length,
      lastIndex; //rest params not yet supported
    this.unique();
    while (len--) {
      count === 0 ?
        that.penTo([arg[0][len][0], arg[0][len][1]]) : that.line([arg[0][len][0], arg[0][len][1]]);
      // debugger;
      ++count;
    }
    return this;
  }
  squared(rw, rh, c) { //rectwidth,rectheight,color
    let color = c || "rgba(93, 89, 92,.5)",
      w = this.width,
      h = this.height,
      sqw = rw || 10,
      sqh = rh || 10;
    for (let i = 0; i <= w; i += sqw) {
      d.unique()
        .penTo([i, 0])
        .line([i, h])
        .stroke(color);
    }
    for (let i = 0; i <= h; i += sqh) {
      d.unique()
        .penTo([0, i])
        .line([w, i])
        .stroke(color);
    }
    return this;
  }
  text(text, coords, props) { //coords=[x,y]
    //props are an  optional object in order to override defaults
    let that = this,
      txt = "", //text to write
      p = { //defaults
        fsize:"15px",
        font: "sans-serif",
        align: "start",
        base: "alphabetic",
        direction: "ltr"
      };
    if (props) {
      props.hasOwnProperty("fsize") ? p.fsize = props.fsize : false;
      props.hasOwnProperty("font") ? p.font = props.font : false;
      props.hasOwnProperty("align") ? p.align = props.align : false;
      props.hasOwnProperty("base") ? p.base = props.base : false;
      props.hasOwnProperty("direction") ? p.direction = props.direction : false;
    }
    let fnt=`${p.fsize} ${p.font}`;
    that.context.font=fnt;
    that.context.textAlign=p.align;
    that.context.textBaseline=p.base;
    that.context.direction=p.direction;
    if(text)txt = text;
      else throw new SyntaxError("Text argument cannot be empty while using canvas#text");
    if(!coords && !(coords.length > 1))throw new SyntaxError("canvas#text requires an array containing coordinates of the text no given");
    return {
      fill: function(col) {
        let color = col || "black";
        that.context.fillStyle = col;
        that.context.fillText(txt, coords[0], coords[1]);
        that.fill(color);
        return that;
      },
      stroke(c, w) {
        let color = c || "black",
          lineWidth = w || 1;
        that.context.strokeStyle = color;
        that.context.lineWidth = lineWidth;
        that.context.strokeText(txt,coords[0],coords[1]);
        that.stroke(color, lineWidth);
        return that;
      }
    }
  }
};
