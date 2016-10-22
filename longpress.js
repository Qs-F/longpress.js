'use strict';

class LongPress {
  constructor() {
    this.interval = 500
    this.callback = function(){}
  }
  SetInterval(s) {
    this.interval = s
  }
  SetCallback(f) {
    this.callback = f
  }
  SetElement(d) {
    var self = this
      this.elem = d
      this.elem.addEventListener("touchstart", this.startTimer.bind(this), false)
      this.elem.addEventListener("mousedown", this.startTimer.bind(this), false)
      this.elem.addEventListener("touchleave", this.clearTimer.bind(this), false)
      this.elem.addEventListener("mouseout", this.clearTimer.bind(this), false)
      this.elem.addEventListener("touchend", this.clearTimer.bind(this), false)
      this.elem.addEventListener("mouseup", this.clearTimer.bind(this), false)
      this.elem.addEventListener("touchcancel", this.clearTimer.bind(this), false)
  }
  startTimer(e) {
    (function() {
      console.log("start")
      this.elem.classList.remove("pressed")
      this.elem.classList.add("pressing")
      this.timer = window.setTimeout(function(){
        this.callback()
        this.elem.classList.add("pressed")
        this.elem.classList.remove("pressing")
      }.bind(this), this.interval)
    }.bind(this))()
    e.preventDefault()
  }
  clearTimer() {
    if(this.timer != undefined) {
      this.elem.classList.remove("pressing")
      window.clearTimeout((function() {
        return this.timer
      }.bind(this))())
    }
  }
}
