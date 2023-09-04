"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataStreamer = /** @class */ (function () {
    function DataStreamer() {
    }
    /**
     * Send request to the datafeed server and executes callback function on success
     * @param callback callback function that takes JSON object as its argument
     */
    DataStreamer.getData = function (callback) {
        var request = new XMLHttpRequest();
        request.open('GET', DataStreamer.API_URL, false);
        request.onload = function () {
            if (request.status === 200) {
                callback(JSON.parse(request.responseText));
            }
            else {
                alert('Request failed');
            }
        };
        request.send();
    };
    // The url where datafeed server is listening
    DataStreamer.API_URL = 'http://localhost:8080/query?id=1';
    return DataStreamer;
}());
exports.default = DataStreamer;
