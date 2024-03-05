(function (app) {
    'use strict';
    app.LimitsComponent = ng.core 
    .Component({
        selector: 'limits-create',
        templateUrl: 'views/limits-create.html'
    })
    .Class({
        constructor: [ng.router.Router,app.LoadingServiceComponent,app.AppCallService, app.MsgComponent,
        function(router, loading, servicio, msg) {
			this.router=router;
			this.loading = loading;
            this.service = servicio;
            this.msg=msg;
        }]
     });
    app.LimitsComponent.prototype.ngOnInit = function () {
        this.name=null;
		this.tnx=null;
		this.timeTransaction=null;
        this.geoDistance=null;
        this.getData();
	}
	app.LimitsComponent.prototype.getData=function(){
		
	}
	app.LimitsComponent.prototype.signOut=function(){
		
	}
	app.LimitsComponent.prototype.goApps=function(){
        //window.location.href=redirectUri();
	}
    app.LimitsComponent.prototype.clean=function(){
		this.name=null;
		this.tnx=null;
		this.timeTransaction=null;
        this.geoDistance=null;
	}
	app.LimitsComponent.prototype.getValueMsg = function () {
		var link = ['/limit-report'];
		this.router.navigate(link);
	}
	app.LimitsComponent.prototype.back=function(){
		window.history.back();
	}
	app.LimitsComponent.prototype.done=function(){
		var parametros={};
        if(this.name==null || this.name==undefined || this.name==""){
			parametros.name = " ";
		}else{
			this.name=(this.name+"").toUpperCase();
			if(validarLetrasNumerosSimplesGuionesPiso(this.name)){
				parametros.name = this.name.toUpperCase();
			}else{
				this.mensaje="El nombre del  tiene un formato incorrecto, permite números letras y guiones, pero no espacios en blanco;"
				this.msg.warning();
				return;
			}
		}
		if(this.tnx==null || this.tnx==undefined || this.tnx==""){
			this.mensaje="Debe ingresar el Límite de Recuento de Tnx";
			this.msg.warning();
			return;
		}else{
				
			parametros.tnx_count_limit = this.tnx.toString();	
		}
		if(this.timeTransaction==null || this.timeTransaction==undefined || this.timeTransaction==""){
			this.mensaje="Debe ingresar el Límite de Tiempo de Transacción";
			this.msg.warning();
			return;
		}else{
			if(this.timeTransaction.toString().length < 4){
				this.mensaje="El Límite de Tiempo de Transacción debe ser mayor a 4";
				this.msg.warning();
				return;
			}else{
				
				parametros.tnx_time_limit = this.timeTransaction.toString();	
			}
				
		}
        if(this.geoDistance==null || this.geoDistance==undefined || this.geoDistance==""){
			this.mensaje="Debe ingresar el Límite de Geo Distancia";
			this.msg.warning();
			return;
		}else{
	
			parametros.geo_distance_limits = this.geoDistance.toString();	
		}
	
     
		let mensajeAll = "Error al crear";
		let request=this.service.callServicesHttp("limits-post", null, parametros);
    
		request.subscribe(data => {
			if (data == null || data == undefined || data == "") {
				this.mensaje = mensajeAll;
				this.msg.error();
                return;
			} else {
				if (data.status_http == 200) {
					delete data['status_http'];
					this.mensaje="Límite de tiempo guardado con éxito";
					this.msg.info();
					this.clean();
                    return;
				} else {
					this.mensaje = this.service.processMessageError(data, mensajeAll);
					this.msg.error();
                    return;
				}
			}
		}, err => {
			this.mensaje = this.service.processError(err, mensajeAll);
			this.msg.error();
            return;
		});
	}
})(window.app || (window.app = {}));