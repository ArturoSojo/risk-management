(function(app) {
	app.routing = ng.router.RouterModule.forRoot([
	{path: '', redirectTo: 'init', pathMatch: 'full'},
	{path: 'init', component:app.InitComponent},
	{path: 'limits-create', component:app.LimitsComponent},
	{path: 'logs-report', component:app.LogsComponent},
	{path: 'alerts-report', component:app.AlertsComponent}
	],{useHash: true});
  })(window.app || (window.app = {}));