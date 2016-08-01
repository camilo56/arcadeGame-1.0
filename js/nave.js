(function(scope){
	function Nave(spriteSheet){
		this.initialize(spriteSheet);
	}
	
	var ancho = Nave.prototype;
	var alto = Nave.prototype;
	var velocity = Nave.prototype;

	//se asigna al protitpo del objeto nave todos los metodos de la clase createjs.Sprite
	Nave.prototype = new createjs.Sprite();
	Nave.prototype.Sprite_ini = Nave.prototype.initialize;
	
	Nave.prototype.initialize = function(spriteSheet){
		var self = this;
		this.Sprite_ini(spriteSheet, "live");
		this.gotoAndPlay("live");
		this.x = 450;
		this.y = 100;
		this.velocity = {x:0, y:3};
		
		this.currentFrame = 0;
		this.snapToPixel = true;
		this.ancho = spriteSheet.getFrame(0).rect.width;
		this.alto = spriteSheet.getFrame(0).rect.height;
		this.addEventListener("tick", function(e){self.ontick(e);});
		//this.addEventListener("animationend", function(e){ console.log("La animación Termino"); });
	};
	
	Nave.prototype.moverNave = function(e){
		console.log("Nave Mouse Down");
		console.log(this.velocity);
		console.log("Stage X: "+e.stageX +" Y: "+e.stageY);
		console.log("X: "+this.x+" Y "+this.y);
		console.log("Ancho: "+this.ancho);
		
		if(e.stageX >= this.x && (e.stageX < (this.x + this.ancho))){
		}else if(e.stageX > this.x){
			this.velocity.x = + 10;
		}else if(e.stageX < this.x){
			this.velocity.x = - 10;
		}
		
		if(e.stageY <= this.y - 20){
			this.velocity.y = - 15;
		}else if(e.stageY > this.y - 20 && e.stageY < this.Y + this.alto){
			this.velocity.y =  +0;
		}else{
			this.velocity.y = +15;
		}
		
		//Metodo que reproduce un fotograma dependiendo
	};
	
	//Metodo que controla el evento tick del objeto Nave, util para manejar animaciones iniciales y cambios por eventos del usuario
	Nave.prototype.ontick = function(e){
		this.velocity.y += 1;
		if(this.velocity.y < 0 || this.y < 440)
		{
			this.y += this.velocity.y;
		}
		
		if(this.velocity.x != 0){
			if(this.velocity.x > 0){
				this.velocity.x -= 1;
			}else{
				this.velocity.x += 1;
			}
			this.x += this.velocity.x;
		}
		
	}
//Con esta linea se puede acceder al objeto desde el archivo app.js
	scope.Nave = Nave;
}(window));