"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DeepAssignService = (function () {
    function DeepAssignService() {
        var _this = this;
        this.isObj = function (x) {
            var type = typeof x;
            return x !== null && (type === 'object' || type === 'function');
        };
        this.toObject = function (val) {
            if (val === null || val === undefined) {
                throw new TypeError('Sources cannot be null or undefined');
            }
            return Object(val);
        };
        this.deepAssign = function (target) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            target = _this.toObject(target);
            for (var s = 0; s < args.length; s++) {
                _this.assign(target, args[s]);
            }
            return target;
        };
        this.assign = function (to, from) {
            if (to === from) {
                return to;
            }
            from = Object(from);
            for (var key in from) {
                if (Object.prototype.hasOwnProperty.call(from, key)) {
                    _this.assignKey(to, from, key);
                }
            }
            return to;
        };
        this.assignKey = function (to, from, key) {
            var val = from[key];
            if (val === undefined || val === null) {
                return;
            }
            if (Object.prototype.hasOwnProperty.call(to, key)) {
                if (to[key] === undefined || to[key] === null) {
                    throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
                }
            }
            if (!Object.prototype.hasOwnProperty.call(to, key) || !_this.isObj(val)) {
                to[key] = val;
            }
            else {
                to[key] = _this.assign(Object(to[key]), from[key]);
            }
        };
    }
    DeepAssignService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], DeepAssignService);
    return DeepAssignService;
}());
exports.DeepAssignService = DeepAssignService;
//# sourceMappingURL=deep-assign.service.js.map