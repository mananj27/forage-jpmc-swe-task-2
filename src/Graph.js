//"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
require("./Graph.css");
/**
 * React component that renders Perspective based on data
 * parsed from its parent through data property.
 */
var Graph = /** @class */ (function (_super) {
    __extends(Graph, _super);
    function Graph() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Graph.prototype.render = function () {
        return react_1.default.createElement('perspective-viewer');
    };
    Graph.prototype.componentDidMount = function () {
        // Get element to attach the table from the DOM.
        var elem = document.getElementsByTagName('perspective-viewer')[0];
        var schema = {
            stock: 'string',
            top_ask_price: 'float',
            top_bid_price: 'float',
            timestamp: 'date',
        };
        if (window.perspective && window.perspective.worker()) {
            this.table = window.perspective.worker().table(schema);
        }
        if (this.table) {
            // Load the `table` in the `<perspective-viewer>` DOM reference.
            elem.setAttribute('view', 'y_line');
            elem.setAttribute('column-pivots', '["stock"]');
            elem.setAttribute('row-pivots', '["timestamps"]');
            elem.setAttribute('columns', '["top_ask_price"]');
            elem.setAttribute('aggregates', '{"stock":"distinct count","top_ask_price":"avg","top_bid_price":"avg","timestamp":"distinct count"}');
            // Add more Perspective configurations here.
            elem.load(this.table);
        }
    };
    Graph.prototype.componentDidUpdate = function () {
        // Everytime the data props is updated, insert the data into Perspective table
        if (this.table) {
            // As part of the task, you need to fix the way we update the data props to
            // avoid inserting duplicated entries into Perspective table again.
            this.table.update(this.props.data.map(function (el) {
                // Format the data from ServerRespond to the schema
                return {
                    stock: el.stock,
                    top_ask_price: el.top_ask && el.top_ask.price || 0,
                    top_bid_price: el.top_bid && el.top_bid.price || 0,
                    timestamp: el.timestamp,
                };
            }));
        }
    };
    return Graph;
}(react_1.Component));
exports.default = Graph;
