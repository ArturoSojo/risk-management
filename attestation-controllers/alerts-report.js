(function (app) {
    'use strict';
    app.AlertsComponent = ng.core 
    .Component({
        selector: 'alerts-report',
        templateUrl: 'views/alerts-report.html'
    })
    .Class({
        constructor: [ng.router.Router,app.LoadingServiceComponent,
        function(router, loading) {
			this.router=router;
			this.loading = loading;
        }]
     });
    app.AlertsComponent.prototype.ngOnInit = function () {
		this.getData();
	}
	app.AlertsComponent.prototype.getData=function(){
		
	}
	app.AlertsComponent.prototype.signOut=function(){
		
	}
	app.AlertsComponent.prototype.goApps=function(){
        //window.location.href=redirectUri();
	}
})(window.app || (window.app = {}));