(function(app) {
  app.AppModule =
    ng.core.NgModule({
      imports: [
        ng.platformBrowser.BrowserModule,
        ng.forms.FormsModule,
        ng.router.RouterModule,
        ng.http.HttpModule,
        app.routing
      ],
      declarations: [
		    app.LoadingServiceComponent,
		    app.MsgComponent,
		    app.CustomTableComponent,
        app.LogsComponent,
        app.LimitsComponent,
        app.AlertsComponent,
        app.SidebarComponent,
		    app.InitComponent,
        app.AppComponent
      ],
      providers: [ 
		    app.LoadingServiceComponent,
		    app.MsgComponent,
        app.AppCallService
       
	    ],
      bootstrap: [app.AppComponent]
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));