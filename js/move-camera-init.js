// credit UW-Reality Lab
AFRAME.registerComponent("move-camera",{
  init:function(){
    let el = this.el;
    this.returnMove = function(e){
      // keep track of the steps clicked 
      this.counter = 0;
      // message
      this.msg = ['msg1','msg2'];
      this.finalMsg = document.querySelector('#msg3');
      this.endMusic = document.querySelector('#alone');
      this.color = "#4F43CB";
      this.gameEnd = false;
      // get camera position
      let camPos = e.detail.returnPoint;
      // DOM references here 
      let head = document.querySelector('#head');
      let body = document.querySelector('#body');
      let moon = document.querySelector('#moon');
      let boxes = document.querySelectorAll('a-box');
      let messages = document.querySelector('#messages');
      let cam_params = {
        property: "position",
        to:{
          x: camPos.x,
          y: camPos.y+3,
          z: camPos.z 
        },
        dur: 3000,
        easing:'easeInOutQuad'
      };
      el.setAttribute('animation',cam_params);  
      let head_params = {
        property: "position",
        to:{
          x: camPos.x,
          y: camPos.y+2.8,
          z: camPos.z     
        },
        dur: 3000,
        easing:'easeInOutQuad'
      };
      head.setAttribute('animation',head_params);
      let body_params = {
        property: "position",
        to:{
          x: camPos.x,
          y: camPos.y+1.3,
          z: camPos.z     
        },
        dur: 3000,
        easing:'easeInOutQuad'
      };
      body.setAttribute('animation',body_params);

      for(let i = 0; i < boxes.length; i++){
        if(boxes[i].getAttribute('color') == this.color){
          this.counter ++;
        }else {
          if(camPos.y > moon.getAttribute('position').y-15){
            boxes[i].setAttribute('visible',false);
          }
        }
      }

      if(camPos.y > moon.getAttribute('position').y-15){
        console.log("you've reached the moon");
        this.gameEnd = true;
      }

      if(this.gameEnd){
        if(this.counter == 1){
          console.log('one step');
          this.msgDisplay = this.msg[0];
          // link to a separate page 
          let link = document.createElement('a-link');
          link.setAttribute('href','solo.html');
          link.setAttribute('title','find moon');
          link.setAttribute('position',{
            x: camPos.x-9.5,
            y: camPos.y+1.3,
            z: camPos.z-1.5
          });
          link.setAttribute('scale','.5 .5 .5');
          document.querySelector('#moonBox').appendChild(link);
          this.gameEnd = false;
        }else if(this.counter > 1 && this.counter <= 30){
          console.log(this.gameEnd);
          this.msgDisplay = this.msg[1];
          //change information panel below
          document.querySelector('#intro2').setAttribute("src",this.finalMsg.src);
          document.querySelector('#snow').setAttribute("visible","true");  
          document.querySelector('#charc_final').setAttribute("visible","true");  
          document.querySelector('#scene').setAttribute("sound",{
            src: this.endMusic.src
          });  
          moon.setAttribute('visible','true');
          moon.setAttribute('position',{
            x: 3,
            y: 2,
            z: -1
          });
          moon.setAttribute('scale','2 2 2');
          this.gameEnd = false;
        }
        // add message
        let msgBox = document.createElement('a-image');
        msgBox.setAttribute("src",'#' + this.msgDisplay);
        msgBox.setAttribute("width",'12');
        msgBox.setAttribute("height",'6');
        msgBox.setAttribute("position",{
          x: camPos.x-5,
          y: camPos.y+3,
          z: camPos.z-4
        });
        messages.appendChild(msgBox);
      }
     }
    this.el.sceneEl.addEventListener('switchCamera',this.returnMove);
  },
  remove: function(){
    this.el.sceneEl.removeEventListener('switchCamera',this.returnMove);
  }
});