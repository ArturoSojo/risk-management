(function (app) {
    'use strict';
    app.LoadingServiceComponent = ng.core
        .Component({
            selector: 'loading-service',
			template: '<div class="modal" data-backdrop="static" data-bs-backdrop="static" tabindex="-1" role="dialog" style="text-align:center;margin-top:180px;" scroll="no" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false">'+
						'<div class="modal-dialog" role="document" style="text-align:center;">'+
							'<img style="width:70px;height:70px;"src="assets/images/loading.gif">'+
						'</div>'+
					'</div>',
			inputs: ['mensaje_cargando']

        })
        .Class({
           constructor: [
                function () {
                  
                }            
            ]
        });
    app.LoadingServiceComponent.prototype.showPleaseWait=function(){
        $("#pleaseWaitDialog").modal('show');
    }  
    app.LoadingServiceComponent.prototype.hidePleaseWait=function () {
        $("#pleaseWaitDialog").modal('hide');
    }
})(window.app || (window.app = {}));
