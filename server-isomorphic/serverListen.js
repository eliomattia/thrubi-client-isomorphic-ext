const NODE_ENV = require("../src/env/env").NODE_ENV;

exports.serverListen = (httpServer,httpsServer,IP,HTTP_PORT,HTTPS_PORT) => {
    if (NODE_ENV === "production") {
        httpServer.listen(HTTP_PORT);
        //httpsServer.listen(HTTPS_PORT);

        console.log("HTTP server listening on port "+HTTP_PORT);
        //console.log("HTTPS server listening on port "+HTTPS_PORT);
    } else {
        //httpServer.listen(HTTP_PORT,IP);
        httpsServer.listen(HTTPS_PORT,IP);

        //console.log("HTTP server listening at http://"+IP+":"+HTTP_PORT);
        console.log("HTTPS server listening at https://"+IP+":"+HTTPS_PORT);
    }
};
