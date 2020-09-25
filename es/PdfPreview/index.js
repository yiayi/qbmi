import "antd/es/modal/style";
import _Modal from "antd/es/modal";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useEffect, useRef, useState, useCallback } from 'react';
import pdfjsLib from 'pdfjs-dist';
import IconFont from '../IconFont';
import './index.less'; // The workerSrc property shall be specified.

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.bootcss.com/pdf.js/2.4.456/pdf.worker.min.js';
var pdfDoc = null;
var pageNumPending = null;
var pageRendering = false; // interface Iprops {
//   path: string;
//   onVisibleChange: Function;
//   visible: boolean;
// }

var Mypdf1 = function Mypdf1(props) {
  var path = props.path,
      onVisibleChange = props.onVisibleChange,
      visibleProps = props.visible;
  var canvasRef = useRef(null);

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      totalPage = _useState2[0],
      setTotalPage = _useState2[1];

  var _useState3 = useState(1),
      _useState4 = _slicedToArray(_useState3, 2),
      currentPage = _useState4[0],
      setCurrentPage = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      visible = _useState6[0],
      setVisible = _useState6[1];

  var _useState7 = useState(1),
      _useState8 = _slicedToArray(_useState7, 2),
      scale = _useState8[0],
      setScale = _useState8[1];

  useEffect(function () {
    setVisible(visibleProps);
  }, [onVisibleChange]);
  var renderPage = useCallback(function (num) {
    if (!(pdfDoc && canvasRef.current)) return;
    var canvasElement = canvasRef.current;
    pageRendering = true;
    pdfDoc.getPage(num).then(function (page) {
      var viewport = page.getViewport({
        scale: scale
      });
      canvasElement.height = viewport.height;
      canvasElement.width = viewport.width;
      var renderContext = {
        canvasContext: canvasElement.getContext('2d'),
        viewport: viewport
      };
      var renderTask = page.render(renderContext); // Wait for rendering to finish

      renderTask.promise.then(function () {
        pageRendering = false;

        if (pageNumPending !== null) {
          // New page rendering is pending
          renderPage(pageNumPending);
          pageNumPending = null;
        }
      });
    }); // Update page counters

    setCurrentPage(num);
  }, [pdfDoc, canvasRef, pageNumPending, scale]);
  /**
   * If another page rendering in progress, waits until the rendering is
   * finised. Otherwise, executes rendering immediately.
   */

  var queueRenderPage = useCallback(function (num) {
    if (pageRendering) {
      pageNumPending = num;
    } else {
      renderPage(num);
    }
  }, [pageRendering]);
  /**
   * Displays previous page.
   */

  var onPrevPage = useCallback(function () {
    var newcurrentPage = currentPage;

    if (newcurrentPage <= 1) {
      return;
    }

    newcurrentPage -= 1;
    setCurrentPage(newcurrentPage);
    queueRenderPage(newcurrentPage);
  }, [currentPage]);
  /**
   * Displays next page.
   */

  var onNextPage = useCallback(function () {
    var newcurrentPage = currentPage;

    if (pdfDoc !== null && newcurrentPage >= pdfDoc.numPages) {
      return;
    }

    newcurrentPage += 1;
    queueRenderPage(newcurrentPage);
  }, [pdfDoc, currentPage]);
  useEffect(function () {
    if (!path) {
      return;
    }

    var renderPdf = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                /**
                 * Asynchronously downloads PDF.
                 */
                pdfjsLib.getDocument(path).promise.then(function (pdfDocRes) {
                  pdfDoc = pdfDocRes;
                  setTotalPage(pdfDocRes.numPages); // Initial/first page rendering

                  renderPage(currentPage);
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function renderPdf() {
        return _ref.apply(this, arguments);
      };
    }();

    renderPdf();
  }, [path]);
  /* <a href={pdfPath} target='_blank' >
  <p>Click to open PDF file in a new tab</p>
  </a> */

  var zoomout = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var newScale;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            newScale = scale;

            if (!(newScale >= 2)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return");

          case 3:
            newScale += 0.1;
            _context2.next = 6;
            return setScale(newScale);

          case 6:
            _context2.next = 8;
            return queueRenderPage(currentPage);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })), [scale, currentPage]);
  var zoomin = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var newScale;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            newScale = scale;

            if (!(newScale <= 0.2)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return");

          case 3:
            newScale -= 0.1;
            _context3.next = 6;
            return setScale(newScale);

          case 6:
            _context3.next = 8;
            return queueRenderPage(currentPage);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })), [scale, currentPage]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Modal, {
    title: "\u9644\u4EF6\u9884\u89C8",
    visible: visible,
    onOk: function onOk() {
      if (onVisibleChange) {
        onVisibleChange(false);
      } else {
        setVisible(false);
      }
    },
    onCancel: function onCancel() {
      if (onVisibleChange) {
        onVisibleChange(false);
      } else {
        setVisible(false);
      }
    },
    className: "modalBodyStyle",
    footer: null // maskClosable={false}
    ,
    width: 700
  }, /*#__PURE__*/React.createElement("canvas", {
    id: "theCanvas",
    ref: canvasRef,
    className: "theCanvas"
  }, "\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301canvas"), /*#__PURE__*/React.createElement("div", {
    className: "pageNumber"
  }, ' ', currentPage, " / ", totalPage), /*#__PURE__*/React.createElement("div", {
    onClick: onPrevPage,
    className: "preBtn"
  }, /*#__PURE__*/React.createElement(IconFont, {
    type: "iconleft_6",
    style: {
      fontSize: 32,
      color: '#B1AFB0'
    }
  })), /*#__PURE__*/React.createElement("div", {
    onClick: onNextPage,
    className: "nextBtn"
  }, /*#__PURE__*/React.createElement(IconFont, {
    type: "iconright_6",
    style: {
      fontSize: 32,
      color: '#B1AFB0'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "scaleContainer"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: zoomout
  }, /*#__PURE__*/React.createElement(IconFont, {
    type: "iconic_preview_zoomout2x",
    style: {
      fontSize: 32
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "scaleNumber"
  }, "".concat((scale * 100).toFixed(0), "/100")), /*#__PURE__*/React.createElement("div", {
    onClick: zoomin
  }, /*#__PURE__*/React.createElement(IconFont, {
    type: "iconic_preview_enlarge2x",
    style: {
      fontSize: 32
    }
  })))));
};

export default Mypdf1;