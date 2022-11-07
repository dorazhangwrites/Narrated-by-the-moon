AFRAME.registerComponent("shift-camera",{
    init:function(){
      let el = this.el; // camera
      this.returnCall = function(){
        let camPos = el.getAttribute('position');
        el.emit('switchCamera',{returnPoint: camPos});
      }
      this.el.addEventListener('click', this.returnCall);
    },
    remove: function(){
      this.el.removeEventListener('click', this.returnCall);
    }
  });