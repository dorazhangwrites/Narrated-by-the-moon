AFRAME.registerComponent("marker", {
    init: function(){
      let el = this.el; // refer to the steps
      this.markSteps = function(){
       
        let stepLoc = {
          x: Math.round(el.getAttribute('position').x),
          y: Math.round(el.getAttribute('position').y),
          z: Math.round(el.getAttribute('position').z)
        };
        this.color = "#4F43CB";   
        el.setAttribute('visible','false');
       
        let platformsEl = document.querySelector('#platforms');
        let stepS = document.createElement('a-box');
        stepS.setAttribute('color',this.color);
        stepS.setAttribute('width','3');
        stepS.setAttribute('height','0.5');
        stepS.setAttribute('depth','2'); 
        stepS.setAttribute('opacity','.7');
        stepS.setAttribute('position',{
          x: stepLoc.x,
          y: stepLoc.y,
          z: stepLoc.z
        });
        platformsEl.appendChild(stepS);

      }
      this.el.addEventListener('click', this.markSteps);
    },
    
    remove: function(){
      this.el.removeEventListener('click', this.markSteps);
    }
    
  });