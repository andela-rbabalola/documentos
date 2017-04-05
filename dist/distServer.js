/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {import express from 'express';
	import path from 'path';
	import open from 'open';
	import parser from 'body-parser';
	import compression from 'compression';
	import userRoute from '../server/routes/users.routes';
	import roleRoute from '../server/routes/roles.routes';
	import documentRoute from '../server/routes/documents.routes';
	import searchRoute from '../server/routes/search.routes';
	import paginationRoute from '../server/routes/pagination.routes';
	
	// import app from '../server';
	
	
	/* eslint-disable no-console */
	
	const port = 5000;
	const app = express();
	app.use(parser.urlencoded({ extended: true }));
	app.use(parser.json());
	app.use(compression());
	app.use(express.static('dist'));
	
	app.use('/users', userRoute);
	app.use('/roles', roleRoute);
	app.use('/documents', documentRoute);
	app.use('/search', searchRoute);
	app.use('/pagination', paginationRoute);
	
	app.get('/*', function (req, res) {
	  res.sendFile(path.join(__dirname, '../dist/index.html'));
	});
	
	app.listen(port, function (err) {
	  if (err) {
	    console.log(err);
	  } else {
	    console.log(`Server listening on port ${port}`);
	    open(`http://localhost:${port}`);
	  }
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }
/******/ ]);
//# sourceMappingURL=distServer.js.map