!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=0)}([function(t,e){const n=document.getElementById("canvas"),r=n.getContext("2d"),o=new Image,s=new Image,a=new Image,c=new Image,h=new Image,u=new Image;o.src="https://images.vexels.com/media/users/3/143061/isolated/lists/aaf71ed4e387a6838e1c521fbecde77a-banana-icon-fruit.png",s.src="./blue-bin.png",a.src="./black-bin.png",c.src="./green-bin.png",h.src="./pop-can.png",u.src="./paper.png";const p=(n.width=window.innerWidth-50)>500?500:p,f=n.height=window.innerHeight-100,l={BANANA:0,POPCAN:1,PAPER:2};var d=[];function g(t,e){return Math.floor(Math.random()*(e-t+1))+t}const y=0,b=1,w=2;function m(){this.x=g(0,p-80),this.y=f-50,this.type=y}m.prototype.setType=function(t){this.type=t},m.prototype.draw=function(){let t=s;switch(this.type){case b:t=a;break;case w:t=c}r.drawImage(t,this.x,this.y,80,50)},m.prototype.goRight=function(){this.vel=5},m.prototype.goLeft=function(){this.vel=-5},m.prototype.stop=function(){this.vel=0},m.prototype.update=function(){const t=this.x+this.vel;t>=0&&t<=p-80&&(this.x=t),d.forEach(t=>{this.caughtItem(t)&&(t.caught=!0)})},m.prototype.caughtItem=function(t){return t.x>=v.x&&t.x+t.width<=v.x+80&&t.y+t.height>v.y+8&&t.y+t.height<v.y+1+16};var v=new m;function x(){switch(this.caught=!1,this.type=g(0,Object.keys(l).length-1),this.type){case l.BANANA:this.width=50,this.height=50;break;case l.POPCAN:this.width=20,this.height=35;break;case l.PAPER:this.width=35,this.height=35}this.x=g(0,p-this.width),this.y=0,this.velY=g(3,8)}x.prototype.draw=function(){let t=o;switch(this.type){case l.POPCAN:t=h;break;case l.PAPER:t=u}r.drawImage(t,this.x,this.y,this.width,this.height)},x.prototype.update=function(){this.y=this.y+this.velY},document.addEventListener("keydown",t=>{switch(t.keyCode){case 39:v.goRight();break;case 37:v.goLeft();break;case 40:v.stop();break;case 49:v.setType(y);break;case 50:v.setType(b);break;case 51:v.setType(w)}}),function t(){for(0,r.clearRect(0,0,p,f),r.fillStyle="rgba(0, 0, 0, 1)",r.fillRect(0,0,p,f);d.length<2;){var e=new x;d.push(e)}for(v.draw(),v.update(),d=d.filter(t=>t.y<f+50).filter(t=>!t.caught),i=0;i<d.length;i++)d[i].draw(),d[i].update();requestAnimationFrame(t)}()}]);