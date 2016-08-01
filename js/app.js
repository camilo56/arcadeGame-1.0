(function(scope){
	function app(){
		this.initialize();
	}
//Se declara asi para que sea accesible desde cualquier funcion del objeto app
	var canvas = app.prototype;
	var stage = app.prototype;
	var cargador = app.prototype;
	var fondo = app.prototype;
	var nave = app.prototype;
//Rutas de imagenes que se envian a la clase Cargador (Estaticas)
	var rutaMoster = "assets/Monster.PNG";
	var rutaMalos = "assets/malos.GIF";
	var rutaFondo = "assets/fondo.JPG";
	
	app.prototype.initialize = function(){
		var self = this;
		this.canvas = document.createElement("canvas");
		this.canvas.width = 1000;
		this.canvas.height = 500;
		var contenedor = document.getElementById("juego");
		contenedor.appendChild(this.canvas);
		
		this.stage = new createjs.Stage(this.canvas);
		console.log("Funcion inicial App");
		this.cargador = new Cargador();
		this.cargador.loadImagen([rutaMoster, rutaMalos, rutaFondo]);
		this.cargador.oncomplete = function(){
			self.assetCargado();
		}
	};
	
	app.prototype.assetCargado = function(){
		var self = this;
		console.log("Imagenes cargadas");
		var bmp = this.cargador[rutaFondo];
		this.fondo = new createjs.Bitmap(bmp);
		this.fondo.alpha = 0.8;
		this.stage.addChild(this.fondo);
		//Incuye la Sprite de la nave(Mounstro)
		var spriteSheet = new createjs.SpriteSheet({
			images: [this.cargador[rutaMoster]], 
			// width, height & registration point of each sprite
			frames: {width: 64, height: 64, regX: 32, regY: 32}, 
			animations: {    
				live: [0, 9, "live", 11]
			}
		});
		this.nave = new Nave(spriteSheet);
		this.stage.addChild(this.nave);
		//Interactividad con Mouse
		console.log(this.stage);
		this.stage.addEventListener("stagemousedown", function(e){ self.nave.moverNave(e) });

		createjs.Ticker.setFPS(15);
		//Ejecuta al mentodo stage.update() automaticamente al enviar a stage como segundo paramentro
		createjs.Ticker.addEventListener("tick", this.stage);
	};

	scope.app = app;
}(window));

window.onload = function(){
	this.app = new app();
}