(function(scope){
	function Cargador(){
		this.initialize();
	}
	
	var cargadas = Cargador.prototype;
	var totales = Cargador.prototype;
	var oncomplete = Cargador.prototype;

	Cargador.prototype.initialize = function(){
		this.cargadas = 0;
		this.totales = 0;
	};
	
	Cargador.prototype.loadImagen = function(lista){
		this.cargadas = 0;
		this.totales = lista.length;
		
		for(var i = 0; i < this.totales; i++){
			this.cargarImagen(lista[i]);
		}
		
	};
	
	Cargador.prototype.cargarImagen = function(ruta){
		var self = this;
		var image = new Image();
		this[ruta] = image;
		image.src = image.url = ruta;
		image.onload = function(e){
			self.imagenCargada();
		}
	};
	
	Cargador.prototype.imagenCargada = function(){
		this.cargadas++;
		if(this.cargadas == this.totales){
			if(this.oncomplete){
				this.oncomplete();
			}else{
				//console.log("oncomplete no esta difinido")
			}
		}
	};
//Con esta linea se puede acceder al objeto desde el archivo app.js
	scope.Cargador = Cargador;
}(window));