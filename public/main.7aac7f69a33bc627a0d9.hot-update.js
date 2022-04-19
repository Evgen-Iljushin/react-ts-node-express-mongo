"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatereact_ts_node_express_mongo"]("main",{

/***/ "./src/client/store/actions.ts":
/*!*************************************!*\
  !*** ./src/client/store/actions.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.clearMessage = exports.setMessage = exports.logout = exports.loginUser = exports.registrationUser = exports.deleteCompany = exports.addCompany = void 0;\r\nconst auth_services_1 = __importDefault(__webpack_require__(/*! ../services/auth.services */ \"./src/client/services/auth.services.ts\"));\r\nconst addCompany = (company) => {\r\n    return {\r\n        type: 'ADD_COMPANY',\r\n        company\r\n    };\r\n};\r\nexports.addCompany = addCompany;\r\nconst deleteCompany = (company) => {\r\n    return {\r\n        type: 'DELETE_COMPANY',\r\n        company\r\n    };\r\n};\r\nexports.deleteCompany = deleteCompany;\r\nconst registrationUser = (data, dispatch) => {\r\n    dispatch({\r\n        type: 'SET_MESSAGE',\r\n        message: 'User successfully registered'\r\n    });\r\n    return {\r\n        type: 'REGISTRATION_USER',\r\n        user: data\r\n    };\r\n};\r\nexports.registrationUser = registrationUser;\r\nconst loginUser = (data, dispatch) => {\r\n    dispatch({\r\n        type: 'SET_MESSAGE',\r\n        message: 'User successfully login'\r\n    });\r\n    return {\r\n        type: 'LOGIN_USER',\r\n        user: data\r\n    };\r\n};\r\nexports.loginUser = loginUser;\r\nconst logout = () => (dispatch) => {\r\n    auth_services_1.default.logout();\r\n    dispatch({\r\n        type: 'LOGOUT_USER'\r\n    });\r\n};\r\nexports.logout = logout;\r\nconst setMessage = (message) => ({\r\n    type: 'SET_MESSAGE',\r\n    message\r\n});\r\nexports.setMessage = setMessage;\r\nconst clearMessage = () => ({\r\n    type: 'CLEAR_MESSAGE'\r\n});\r\nexports.clearMessage = clearMessage;\r\n\n\n//# sourceURL=webpack://react-ts-node-express-mongo/./src/client/store/actions.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ad84c6e620efe33308d1")
/******/ })();
/******/ 
/******/ }
);