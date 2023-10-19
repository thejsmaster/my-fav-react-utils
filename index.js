"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateArray = exports.useObject = exports.xFloat = exports.xInt = exports.useFloat = exports.useString = exports.useArray = void 0;
var react_1 = require("react");
function useArray(initialList) {
    if (initialList === void 0) { initialList = []; }
    var _a = (0, react_1.useState)(initialList), list = _a[0], setList = _a[1];
    // Function to add an item to the list at a specific index or at the end if no index is provided
    var updateItem = function (item, index) {
        if (index === void 0) { index = list.length; }
        if (index < 0 || index > list.length) {
            throw new Error("Invalid index");
        }
        var updatedList = __spreadArray([], list, true);
        updatedList.splice(index, 0, item);
        setList(updatedList);
    };
    // Function to remove an item from the list at a specific index
    var removeItem = function (index) {
        if (index < 0 || index >= list.length) {
            throw new Error("Invalid index");
        }
        var updatedList = __spreadArray([], list, true);
        updatedList.splice(index, 1);
        setList(updatedList);
    };
    return {
        addItem: updateItem,
        updateItem: updateItem,
        removeItem: removeItem,
        list: __spreadArray([], list, true), // Return a copy of the list to ensure immutability
    };
}
exports.useArray = useArray;
function useString(initialValue) {
    if (initialValue === void 0) { initialValue = ""; }
    var _a = (0, react_1.useState)(initialValue), val = _a[0], setVal = _a[1];
    var isEmpty = function () {
        return val !== "" && val !== null && val !== undefined;
    };
    var isNull = function () {
        return val === null;
    };
    var isUndefined = function () {
        return val === undefined;
    };
    var toInt = function () {
        return parseInt(val);
    };
    var toFloat = function (precision) {
        if (precision === void 0) { precision = 2; }
        return parseFloat(val).toFixed(precision);
    };
    var toIntOrZero = function () {
        return isNaN(parseInt(val)) ? 0 : parseInt(val);
    };
    var toFloatOrZero = function (precision) {
        if (precision === void 0) { precision = 2; }
        return isNaN(parseFloat(val))
            ? parseFloat("0").toFixed(precision)
            : parseFloat(val).toFixed(precision);
    };
    return {
        val: val,
        setVal: setVal,
        isEmpty: isEmpty,
        isNull: isNull,
        isUndefined: isUndefined,
        toInt: toInt,
        toFloat: toFloat,
        isNaN: isNaN,
        toIntOrZero: toIntOrZero,
        toFloatOrZero: toFloatOrZero,
    };
}
exports.useString = useString;
function useFloat(initialValue, precision) {
    if (initialValue === void 0) { initialValue = 0; }
    if (precision === void 0) { precision = 2; }
    var _a = (0, react_1.useState)(parseFloat(initialValue.toString()).toFixed(precision)), val = _a[0], setValInternal = _a[1];
    var setVal = function (newValue) {
        var parsedValue = parseFloat(newValue);
        if (isNaN(parsedValue)) {
            setValInternal(parseFloat("0").toFixed(precision));
        }
        else {
            setValInternal(parsedValue.toFixed(precision));
        }
    };
    var sum = (0, react_1.useCallback)(function (value) {
        setVal((parseFloat(val) + parseFloat(value)).toFixed(precision));
    }, [val, precision]);
    var subtract = (0, react_1.useCallback)(function (value) {
        setVal((parseFloat(val) - parseFloat(value)).toFixed(precision));
    }, [val, precision]);
    var multiply = (0, react_1.useCallback)(function (value) {
        setVal((parseFloat(val) * parseFloat(value)).toFixed(precision));
    }, [val, precision]);
    var divide = (0, react_1.useCallback)(function (value) {
        if (parseFloat(value) === 0) {
            setVal(parseFloat("0").toFixed(precision));
        }
        else {
            setVal((parseFloat(val) / parseFloat(value)).toFixed(precision));
        }
    }, [val, precision]);
    var toInt = function () {
        return parseInt(val);
    };
    var toIntFloor = function () {
        return Math.floor(parseFloat(val));
    };
    var toIntCeil = function () {
        return Math.ceil(parseFloat(val));
    };
    var toIntRound = function () {
        return Math.round(parseFloat(val));
    };
    return {
        val: val,
        sum: sum,
        subtract: subtract,
        multiply: multiply,
        divide: divide,
        setVal: setVal,
        toInt: toInt,
        toIntFloor: toIntFloor,
        toIntCeil: toIntCeil,
        toIntRound: toIntRound,
    };
}
exports.useFloat = useFloat;
function xInt(num) {
    return {
        sum: function (other) { return num + other; },
        subtract: function (other) { return num - other; },
        multiply: function (other) { return num * other; },
    };
}
exports.xInt = xInt;
function xFloat(num, precision) {
    if (precision === void 0) { precision = 2; }
    var roundedNum = parseFloat(num.toFixed(precision));
    return {
        sum: function (other) {
            var result = roundedNum + other;
            return parseFloat(result.toFixed(precision));
        },
        subtract: function (other) {
            var result = roundedNum - other;
            return parseFloat(result.toFixed(precision));
        },
        multiply: function (other) {
            var result = roundedNum * other;
            return parseFloat(result.toFixed(precision));
        },
    };
}
exports.xFloat = xFloat;
function useObject(initialObject) {
    if (initialObject === void 0) { initialObject = {}; }
    var _a = (0, react_1.useState)(initialObject), object = _a[0], setObject = _a[1];
    var setItem = function (key, value) {
        setObject(function (prevObject) {
            var _a;
            return (__assign(__assign({}, prevObject), (_a = {}, _a[key] = value, _a)));
        });
    };
    var getItem = function (key) {
        return object[key];
    };
    var removeItem = function (key) {
        setObject(function (prevObject) {
            var updatedObject = __assign({}, prevObject);
            delete updatedObject[key];
            return updatedObject;
        });
    };
    var hasKey = function (key) {
        return key in object;
    };
    var keys = Object.keys(object);
    return {
        setItem: setItem,
        getItem: getItem,
        removeItem: removeItem,
        hasKey: hasKey,
        object: object,
        keys: keys,
    };
}
exports.useObject = useObject;
function paginateArray(array, currentPage, itemsPerPage) {
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
}
exports.paginateArray = paginateArray;
