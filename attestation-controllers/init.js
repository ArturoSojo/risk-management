(function(app) {
	app.InitComponent =
		ng.core.Component({
		selector: 'init-app',
		templateUrl: 'views/init.html'
		})
		.Class({
		  constructor: [app.MsgComponent,ng.router.Router,ng.router.ActivatedRoute,
		  function(msg,router,active) {
	          this.msg=msg;
	          this.mensaje="";
	          this.router=router;  
	          this.active=active;
		  }]
		});
	app.InitComponent.prototype.ngOnChanges=function(){
		this.formatedName=null;
		this.listMenu=null;
		this.listMenuSearch=null;
		this.msg_is_active=false;
		this.search_word=null;
		this.view_msg=null;
		//this.name_user=this.ser.getUserName()==null?"":"BIENVENIDO: "+this.ser.getUserName();
		//this.formattedMenu();
	}
	app.InitComponent.prototype.ngOnInit=function(){
		this.formatedName=null;
		this.listMenu=null;
		this.listMenuSearch=null;
		this.msg_is_active=false;
		this.search_word=null;
		this.view_msg=null;
		//this.name_user=this.ser.getUserName()==null?"":"BIENVENIDO: "+this.ser.getUserName();
		//this.formattedMenu();
	}
	app.InitComponent.prototype.formattedMenu=function(data){
		if(data!=null){
			data=data.toLowerCase();
		}
		this.texto = "BILLING-ADMIN";
		if (this.active.url.hasOwnProperty('_value')) {
			switch (this.active.url._value[0].path) {
				case 'menu':
					this.title = "MÓDULO COBRANZAS";
					this.texto = "BILLING-ADMIN";
				break;
				default:
					this.title = "MÓDULO COBRANZAS";
					this.texto = "BILLING-ADMIN";
			}
		}
		this.listMenu=this.getMenu(this.texto);
		if(this.listMenu==null){
			this.router.navigate(['/not-user']);
		}
		this.listMenuSearch = this.listMenu;
	}
	app.InitComponent.prototype.clearList = function () {
		this.listMenuSearch=null;
		this.msg_is_active = false;
	}
	app.InitComponent.prototype.setList = function (results) {
		this.clearList()
		if (results.length === 0){
			this.noResults()
		}else{
			this.listMenuSearch = results;
		}
	}
	app.InitComponent.prototype.noResults = function () {
		this.listMenuSearch = null;
		this.msg_is_active = true;
		this.view_msg = `No hay resultados para la la busqueda "${this.search_word}"`;
	}
	app.InitComponent.prototype.searchApp = function () {
		if (this.search_word != null && this.search_word != undefined && this.search_word != "" ) {
			let value = this.search_word
			if (value && value.trim().length > 0){
				value = value.trim().toLowerCase()
				this.setList(this.listMenu.filter(app => {
					return app.functionality.toLowerCase().includes(value)
				}))
			} else {
				this.clearList()
			}
		}else{
			this.msg_is_active = false;
			this.listMenuSearch = this.listMenu;
		}
		
	}
	app.InitComponent.prototype.keyupsearch=function(event, name){
		try{
			if (event.keyCode == 13) {
				switch (name) {
					case "S_APP":
						this.searchApp();
						return;
						break;
					 default:
						 break;
				 }
			}
		   }catch(err){
			   
		   }
	}
	app.InitComponent.prototype.formattedData=function(data){
		if(data==null || data==undefined || data==""){
			return null;
		}else{
			data.icon1=null;
			if(data.hasOwnProperty("icon")){
				data.icon1=Boolean(data.icon)==false?getStatic()+"images/menu/movistar/sim.svg":getStatic()+data.icon;
			}else{
				data.icon1=getStatic()+"images/menu/movistar/sim.svg"
			}
			return data;
		}
	}
	app.InitComponent.prototype.getMenu=function(vista){
		var lista=[];
		var lista2=[];
		if(this.ser.getRole()!=null){
			if(this.ser.getRole().hasOwnProperty("views")){
				if(!(this.ser.getRole().views==null || this.ser.getRole().views==undefined || this.ser.getRole().views=="")){
					var tabla=orderList(this.ser.getRole().views);
					for(var i=0;i<tabla.length;i++){
						if(tabla[i]!=null){
							if(tabla[i].name==vista){
								if(tabla[i].hasOwnProperty("actions")){
									if(!(tabla[i].actions==null || tabla[i].actions.length==0)){
										lista.push(this.formattedData(tabla[i]));
									}
								}
							}else{
								if(tabla[i].tag==vista){
									lista2.push(this.formattedData(tabla[i]));
								}
							}
						}
					}
					lista=lista.concat(lista2);
					return lista;
				}
			}else{
				return null;
			}
		}else{
			return null;
		}
	}
	app.InitComponent.prototype.redirect=function(item){
		if(item.hasOwnProperty("name")){
			if(item.hasOwnProperty('url')){
				if(!(item.url==null || item.url==undefined || item.url=="")){
					var array= null;
					try{
						array=item.url.split('?');
					}catch(er5){
						array=null;
					}
					if(array!=null){
						var url_redirect=null;
						if(array[0]=="/section"){
							if(array.length>1){
								try{
									var array2=[];
									array2=array[1].split('&');
									array3=[];
									for(var i=0; i<array2.length;i++){
										array3=[];
										array3=array2[i].split('=');
										if(array3.length>1){
											if(array3[0]=='name'){
												url_redirect=array3[1];
												break;
											}
										}
									}
								}catch(err20){
								}
							}
							if(url_redirect!=null){
								this.formattedMenu(url_redirect);
								this.router.navigate(['/section'], { queryParams: { name: url_redirect} });
							}
						}else{
							if(item.url!=null){
								item.url=item.url.toLowerCase();
							}
							this.router.navigate([item.url]);
						}
					}
				}
			}	
		}
	}
})(window.app || (window.app = {}));