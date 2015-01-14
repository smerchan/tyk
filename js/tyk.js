// ----- Tyk Middleware JS definition: this should be in the global context -----

var TykJS = {
        TykMiddleware: {
            MiddlewareComponentMeta: function(configuration) {
                this.configuration = configuration;
            }
        }
};

TykJS.TykMiddleware.MiddlewareComponentMeta.prototype.ProcessRequest = function(request, session) {
    log("Process Request Not Implemented");
    return request;
};

TykJS.TykMiddleware.MiddlewareComponentMeta.prototype.DoProcessRequest = function(request, session) {
    var processed_request = this.ProcessRequest(request, session);

    if (!processed_request) {
        log("Middleware didn't return request object!");
        return;
    }
    
    // Reset the headers object
    processed_request.Request.Headers = {}

    return JSON.stringify(processed_request)
};

// The user-level middleware component
TykJS.TykMiddleware.NewMiddleware = function(configuration) {
    TykJS.TykMiddleware.MiddlewareComponentMeta.call(this, configuration);
};

// Set up object inheritance
TykJS.TykMiddleware.NewMiddleware.prototype = Object.create(TykJS.TykMiddleware.MiddlewareComponentMeta.prototype);
TykJS.TykMiddleware.NewMiddleware.prototype.constructor = TykJS.TykMiddleware.NewMiddleware;

TykJS.TykMiddleware.NewMiddleware.prototype.NewProcessRequest = function(callback) {
    this.ProcessRequest = callback;
};

TykJS.TykMiddleware.NewMiddleware.prototype.ReturnData = function(request, session) {
    return {Request: request, SessionMeta: session}
};

// ---- End middleware implementation for global context ----
