(function(app) {
    app.AppCallService = ng.core.
    Injectable().Class({
        constructor: [ng.http.Http, app.LoadingServiceComponent, function(http, loading) {
            this._url =getApi();
            this.http = http;
            this.loading = loading;
			this.timeout="120000";
			this.enlace=getEnlaceAuth();
			this.enlace1=getEnlaceApi();
			this.enlace2=getEnlaceApiv2();
        }]
	});
	app.AppCallService.prototype.callServices=function(path, method, parameters, head, auth, format_out,format_in,show,time){
		let url=this._url;
		let headers=new Headers();
		if(!(head==null || head==undefined || head=="")){
			headers=head;
		}
		var parametros="";
		if (path == undefined || path == '' || path == null) {
            url = '';
        } else {
            url = url+path;
        }
		if(!(format_in==null || format_in==undefined || format_in=="")){
			headers['Content-Type']=format_in.trim().toLowerCase();
		}
		if(auth){
			headers['Authorization']='bearer '+this.getAccessToken();
		}
		if(format_in==null && !auth){
			headers=null;
		}
		if(format_in=="multipart/form-data"){
			delete headers['Content-Type'];
			parametros=parameters;
		}else{
			if (!(parameters == undefined || parameters == null || parameters == '')) {
				if (jQuery.isEmptyObject(parameters)) {
					parametros = parameters;
				}else {
					if(format_in=="application/json"){
						parametros = JSON.stringify(parameters);
					}else{
						parametros = parameters;
					}
				}
			}
		}
		if(show){
			this.loading.showPleaseWait();
		}
		let peticion=null;
        switch (method) {
            case 'GET':{
                if(headers!=null){
					peticion = this.http.get(url,{headers});
				}else{
					peticion = this.http.get(url);
				}
            }break;
            case 'POST':{
				if(headers==null){
					 peticion = this.http.post(url, parametros,null);
				}else{
					 peticion = this.http.post(url, parametros,{headers});
				}
            }break;
            case 'PUT':{
                peticion = this.http.put(url, parametros,{headers});
            }break;
            case 'DELETE':{
				if(headers!=null){
					peticion = this.http.delete(url,{headers});
				}else{
					peticion = this.http.delete(url);
				}
            }break;
            default:{
                return null;
            }
        }
		if(time==null){
			time=this.timeout;
		}
		let resultado = peticion.timeout(time, new Error('TIMEOUT'))
		.map(res => {
            this.loading.hidePleaseWait();
			return this.processResponse(format_out,res);
        });
		return resultado;
	}
	app.AppCallService.prototype.processResponse=function(format,res){
		var status=null;
		if(res.hasOwnProperty('status')){
           status=res.status;
			if(status==202 || status=="202" || status=="403" || status==403){
				var aux = res.json();
				if(aux.hasOwnProperty("message")){
					if(!(aux.message==undefined || aux.message==null || aux.message=="")){
						if(aux.message=="UNAUTHORIZED_SESSION" || aux.message=="SESSION_CLOSED" 
						|| aux.message=="SESSION_EXPIRED" || aux.message=="SESSION_NOT_FOUND" || aux.message=="INVALID_AUTHORIZATION" ){
							doLogout();
							alert(_(aux.message).toUpperCase());
							window.location.href=redirectUri();
						}
					}
				}	
			}else{
				if(status==401 || status==403){
						window.location.href=getLoginUri();
				}
			}
        }
		if (format == "JSON") {
            try {
				var status=null;
				if(res.hasOwnProperty('status')){
                    status=res.status;
                }
                res = res.json();
				try{
                    var valor=Array.isArray(res);
					if(valor){
                        var aux=res;
                        res={
                            body:aux,
                            status_http:status
                        };
                    }else{
                        res.status_http=status; 
                    }
                }catch(err1){
                    console.log('Error al procesar',err1);
                }
                res.status_http=status;
				return res;
			} catch (err) {
                res = {
					status_http:500,
					message:"ERROR",
                    typeSys: 'ERROR',
                    value: 'NOT_JSON'
                };
                return res;
            }
        }else {
			if(format=="CSV"){
				 try {
					res = res._body;
					return res.toString();
				} catch (err) {
					res = "Error";
					return res;
				}
			}else{
				console.log('res',res);
				res=res._body.blob();
				return res
			}
           
        }
	}
	app.AppCallService.prototype.callServicesHttp=function(ser,querys,param){
		let request=null;
		var headers=new Headers();
			headers['X-Paguetodo-ID']=getPaguetodoId();
			headers['app-id']=getClient();

		var headers2 = new Headers();
		headers2["X-Paguetodo-ID"]=getPaguetodoId();
		headers2['app-id']=getAppId();

		switch(ser){
			case 'logout':{
				request=this.callServices(this.enlace+'/close_session',"PUT",null,headers2,true,"JSON",null,true,null);
				return request;
			}break;
			case 'limits-post':{
				request=this.callServices(this.enlace1+'/device_attestation_parameters?realm='+this.getRealm()+"&business_id="+this.getBusinessId()+"&user_id="+this.getUserId()+"&user_email="+this.getEmail()+querys,"POST",param,null,true,"JSON","application/json",true,null);
				return request;
			}break;
			
					default:{
			}
		}
	}
	app.AppCallService.prototype.removeKey=function(key){
		try{
			localStorage.removeItem(key);
			sessionStorage.removeItem(key);
		}catch(Er){
		}
	}
	app.AppCallService.prototype.setInit=function(data){
		data=JSON.stringify(data);
		localStorage.setItem('init',data);
	}
	app.AppCallService.prototype.getInit=function(){
		var aux=localStorage.getItem('init');
		if(aux==null){
			return null;
		}else{
			try{
				return JSON.parse(aux);
			}catch(e){
				return null;
			}
		}
	}
	app.AppCallService.prototype.getAccessToken=function(){
		return localStorage.getItem('access_token');
	}
	app.AppCallService.prototype.getRealm=function(){
		if(this.getRole()==null){
			return null;
		}else{
			if(this.getRole().hasOwnProperty("realm")){

				return this.getRole().realm;
			}else{
				return null;
			}
		}
	}
	app.AppCallService.prototype.getBusinessIdDoc=function(){
		aux=this.getRole();
		if(aux==null){
			return null;
		}else{
			try{
				aux=aux.business_id_doc;
				return aux;
			}catch(er){
				return null;
			}				
		}			
	}
	app.AppCallService.prototype.getCurrency=function(){
		var aux=localStorage.getItem('init');
		if(aux!=null){
			try{
				aux=JSON.parse(aux);
				aux=aux.country.currency;
			}catch(er){
				console.log("er",er);
				aux=null;
			}
			return aux;
		}else{
			return aux;
		}
	}
	app.AppCallService.prototype.getCountry=function(){
		var aux=localStorage.getItem('init');
		if(aux!=null){
			try{
				aux=JSON.parse(aux);
				aux=aux.country.alpha2;
			}catch(er){
				console.log("er",er);
				aux=null;
			}
			return aux;
		}else{
			return aux;
		}
	}
	app.AppCallService.prototype.getUserId=function(){
		if(this.getRole()==null){
			return null;
		}else{
			if(this.getRole().hasOwnProperty("user_id")){
				return this.getRole().user_id;
			}else{
				return null;
			}
		}
	}
	app.AppCallService.prototype.getUserName=function(){
		if(this.getRole()==null){
			return null;
		}else{
			if(this.getRole().hasOwnProperty("user_name")){
				return this.getRole().user_name;
			}else{
				return null;
			}
		}
	}
	app.AppCallService.prototype.setRole=function(data){
		data=JSON.stringify(data);
		localStorage.setItem('role',data);
	}
	app.AppCallService.prototype.getRole=function(){
		var aux=localStorage.getItem('role');
		if(aux==null){
			return null;
		}else{
			try{
				return JSON.parse(aux);
			}catch(er1){
				return null;
			}
		}
	}
	app.AppCallService.prototype.getBusinessId=function(){
		aux=this.getRole();
		if(aux==null){
			return null;
		}else{
			try{
				aux=aux.business_id;
				return aux;
			}catch(er){
				return null;
			}				
		}			
	}
	app.AppCallService.prototype.getBusinessName=function(){
		aux=this.getRole();
		if(aux==null){
			return null;
		}else{
			try{
				aux=aux.owner_name;
				return aux;
			}catch(er){
				console.log("er",er);
				return null;
			}				
		}	
	}
	app.AppCallService.prototype.getEmail=function(){
		aux=this.getRole();
		if(aux==null){
			return null;
		}else{
			try{
				aux=aux.user_email;
				return aux;
			}catch(er){
				return null;
			}				
		}	
	}
	app.AppCallService.prototype.getBusinessEmail=function(){
		aux=this.getRole();
		if(aux==null){
			return null;
		}else{
			try{
				aux=aux.owner_email;
				return aux;
			}catch(er){
				return null;
			}				
		}	
	}
	app.AppCallService.prototype.processError=function(err,msg){
		let mensaje=msg;
		this.loading.hidePleaseWait();
		try {
			var status = "";
			if (err.hasOwnProperty('status')) {
				var contexto=this;
				status = err.status + ', ';
				if(err.status==401){
					mensaje="Sesión cerrada";
					setTimeout(function() {
						doLogout();
						window.location.href=getLoginUri();
					}, 2000);
				}else{
					if(err.status==403){
						mensaje="Sesión expirada";
						setTimeout(function() {
						doLogout();
						window.location.href=getLoginUri();
					}, 2000);
					}else{
						if (err.hasOwnProperty('_body')) {
							var aux = JSON.parse(err._body);
							if (aux.hasOwnProperty('message')) {
								if(aux.message==null || aux.message==undefined || aux.message==""){
									mensaje=msg;
								}else{
									if(aux.message.toUpperCase()=="FAILED_REQUEST"){
										mensaje=msg;
									}else{
										mensaje= status + translate(aux.message, 'ES').toUpperCase();
									}
								}
							} else {
								if (err.hasOwnProperty('statusText')) {
									mensaje = status + err.statusText;
								} else {
									mensaje = msg;
								}
							}
						} else {
							mensaje = msg;
						}
					}
				}
			}else{
				mensaje=msg;
			}
		} catch (err1) {
			mensaje = msg;
		}
		return mensaje;
	}
	app.AppCallService.prototype.processMessageError=function(data,mensaje){
		if (data.hasOwnProperty('message')) {
			var auxMsg = "";
			var titleMsg = "";
			if (data.message == null || data.message == undefined || data.message == "") {
				titleMsg =mensaje;
			} else {
				data.message=data.message.toLowerCase();
				titleMsg = _(data.message);
			}
			if (data.hasOwnProperty('cause')) {
				if (!(data.cause == null || data.cause == undefined || data.cause == "" || data.cause.length == 0)) {
					for (var i = 0; i < data.cause.length; i++) {
						if(data.cause[i]!=null){
							data.cause[i]=data.cause[i].toLowerCase();
							auxMsg = auxMsg+ " "+ _(data.cause[i]);
						}
					}
					if (auxMsg != "") {
						titleMsg = titleMsg+ ": " + auxMsg;
					}
				}
			}
			mensaje = titleMsg;
			return mensaje;
		} else {
			return mensaje;
		}
	}
})(window.app || (window.app = {}));