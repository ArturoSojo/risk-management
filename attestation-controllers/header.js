(function (app) {
    'use strict';
    app.HeaderComponent = ng.core 
    .Component({
        selector: 'header-component',
        templateUrl: 'views/header.html'
    })
    .Class({
        constructor: [ng.router.Router,app.LoadingServiceComponent,
        function(router, loading) {
			this.router=router;
			this.loading = loading;
        }]
     });
    app.HeaderComponent.prototype.ngOnInit = function () {
		this.getData();
	}
	app.HeaderComponent.prototype.getData=function(){
		
	}
	app.HeaderComponent.prototype.signOut=function(){
		
	}
	app.HeaderComponent.prototype.goApps=function(){
        //window.location.href=redirectUri();
	}
})(window.app || (window.app = {}));