(function (app) {
    'use strict';
    app.SidebarComponent = ng.core 
    .Component({
        selector: 'sidebar-component',
        templateUrl: 'views/sidebar.html'
    })
    .Class({
        constructor: [ng.router.Router,app.LoadingServiceComponent, app.AppCallService, app.MsgComponent,
        function(router, loading, servicio, msg) {
			this.router=router;
			this.loading = loading;
            this.service = servicio;
            this.msg=msg;
        }]
     });
    app.SidebarComponent.prototype.ngOnInit = function () {
		this.getData();
        
	}
    app.SidebarComponent.prototype.menuToggle=function(){

		menu();

	}
	
	app.SidebarComponent.prototype.getData=function(){
		
	}
	app.SidebarComponent.prototype.signOut=function(){
		let request=this.service.callServicesHttp('logout',null,null);
		request.subscribe(data=>{
			doLogout();
			window.location.href=redirectUri();
		},err=>{
			doLogout();
			window.location.href=redirectUri();
		});
	}
	app.SidebarComponent.prototype.goApps=function(){
        window.location.href=redirectUri();
	}




})(window.app || (window.app = {}));