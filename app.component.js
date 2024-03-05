(function(app) {
	app.AppComponent =
		ng.core.Component({
		  selector: 'admin-app',
		  templateUrl: 'views/app.component.html'
		})
		.Class({
		  constructor: [function() {

		  }]
		});
})(window.app || (window.app = {}));