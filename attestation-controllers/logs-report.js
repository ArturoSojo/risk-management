(function (app) {
    'use strict';
    app.LogsComponent = ng.core 
    .Component({
        selector: 'logs-report',
        templateUrl: 'views/logs-report.html'
    })
    .Class({
        constructor: [ng.router.Router,app.LoadingServiceComponent,
        function(router, loading) {
			this.router=router;
			this.loading = loading;
        }]
     });
    app.LogsComponent.prototype.ngOnInit = function () {
		this.getData();
	}
	app.LogsComponent.prototype.getData=function(){
		
	}
	app.LogsComponent.prototype.signOut=function(){
		
	}
	app.LogsComponent.prototype.goApps=function(){
        //window.location.href=redirectUri();
	}
})(window.app || (window.app = {}));