import "antd/es/modal/style";
import _Modal from "antd/es/modal";
import "antd/es/upload/style";
import _Upload from "antd/es/upload";
import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/message/style";
import _message from "antd/es/message";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState, useEffect } from 'react';
import { PlusOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import PdfPreview from '../PdfPreview';
import { setThumbUrl, getBase64, getFileType } from './utils';
import './index.less';

var pdfPreviewImg = require('./pdfPre/pdfPreview.svg');

var uploadPrefix = '/api/v1/web/upload';
var tokenInfo = localStorage.tokenInfo && localStorage.tokenInfo !== 'undefined' && localStorage.tokenInfo !== 'null' ? JSON.parse(localStorage.tokenInfo) : {};

var KBUpload = function KBUpload(props) {
  var _props$listType = props.listType,
      listType = _props$listType === void 0 ? 'picture-card' : _props$listType,
      _props$fileNumberLimi = props.fileNumberLimit,
      fileNumberLimit = _props$fileNumberLimi === void 0 ? 5 : _props$fileNumberLimi,
      _props$buttonText = props.buttonText,
      buttonText = _props$buttonText === void 0 ? '上传' : _props$buttonText,
      _props$action = props.action,
      action = _props$action === void 0 ? "".concat(uploadPrefix, "/file") : _props$action,
      _props$name = props.name,
      name = _props$name === void 0 ? 'file' : _props$name,
      _props$fileType = props.fileType,
      fileType = _props$fileType === void 0 ? ['jpg', 'png', 'bmp', 'pdf'] : _props$fileType,
      _props$defaultFileLis = props.defaultFileList,
      defaultFileList = _props$defaultFileLis === void 0 ? [] : _props$defaultFileLis,
      onChange = props.onChange,
      showUploadList = props.showUploadList;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      previewVisible = _useState2[0],
      setPreviewVisible = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      previewImage = _useState4[0],
      setPreviewImage = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  var _useState7 = useState([]),
      _useState8 = _slicedToArray(_useState7, 2),
      fileList = _useState8[0],
      setFileList = _useState8[1];

  var _useState9 = useState(''),
      _useState10 = _slicedToArray(_useState9, 2),
      previewPDFUrl = _useState10[0],
      setPreviewPDFUrl = _useState10[1];

  var _useState11 = useState(false),
      _useState12 = _slicedToArray(_useState11, 2),
      previewPDFVisible = _useState12[0],
      setPreviewPDFVisible = _useState12[1];

  useEffect(function () {
    setFileList(setThumbUrl(defaultFileList));
  }, []);
  useEffect(function () {
    // 纯展示的上传组件，会根据外部传入的 fileList 渲染 图片列表
    if (!onChange && showUploadList && !showUploadList.showRemoveIcon) {
      setFileList(setThumbUrl(defaultFileList));
    }
  }, [showUploadList, defaultFileList, onChange]);

  var handlePreview = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
      var url;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!file.url && !file.preview && file.originFileObj)) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return getBase64(file.originFileObj);

            case 3:
              file.preview = _context.sent;

            case 4:
              url = file.url || file.preview || file.response.data; //

              if (file.type === 'application/pdf' || getFileType(file.name, 'pdf') || getFileType(file.url, 'pdf')) {
                setPreviewPDFUrl(url || file.response.data);
                setPreviewPDFVisible(true);
              } else {
                setPreviewImage(url);
                setPreviewVisible(true);
              }

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handlePreview(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var beforeUpload = function beforeUpload(file) {
    // 文件后缀名
    var typeSuffix = file.name.split('.');
    var isCorrectType = fileType.includes(typeSuffix[typeSuffix.length - 1]);

    if (!isCorrectType) {
      _message.error("\u652F\u6301\u6269\u5C55\u540D: ".concat(fileType.join('、'), "\u6700\u591A\u53EF\u4E0A\u4F20").concat(fileNumberLimit, "\u4E2A\u6587\u4EF6"));

      return false;
    }

    var isLt10M = file.size / 1024 / 1024 < 10;

    if (!isLt10M) {
      _message.error('文件不能大于10M!');

      return false;
    }

    return isCorrectType && isLt10M;
  };

  var handleChange = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(info) {
      var newFileList, fileForString;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              newFileList = info.fileList.map(function (item) {
                var bool = item.type === 'application/pdf';

                if (bool) {
                  return _objectSpread(_objectSpread({}, item), {}, {
                    url: item.url || (item.response && item.response.data ? item.response.data : null),
                    thumbUrl: pdfPreviewImg
                  });
                }

                return item;
              }).filter(function (item) {
                /*
                beforeUpload 只能验证文件 是否符合要求，但不能限制文件上传，
                因此 还需要在这里  过滤 不符合要求的 文件
                */
                var typeSuffix = item.name.split('.');
                var isCorrectType = fileType.includes(typeSuffix[typeSuffix.length - 1]);
                return isCorrectType;
              });

              if (info.file.status === 'uploading') {
                setLoading(true);
              }

              if (['removed', 'done'].includes(info.file.status)) {
                newFileList = newFileList.map(function (item) {
                  return {
                    uid: item.uid,
                    name: item.name,
                    status: item.status,
                    url: item.url || (item.response && item.response.data ? item.response.data : null),
                    thumbUrl: item.thumbUrl
                  };
                });
                setLoading(false);
              }

              if (!['error'].includes(info.file.status)) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return");

            case 5:
              fileForString = newFileList.map(function (item) {
                if (item && typeof item === 'string') {
                  return item;
                }

                if (item.url) {
                  return item.url;
                }

                if (item.response && item.response.data) {
                  return item.response.data;
                }

                return null;
              }).filter(function (item) {
                return item;
              });

              if (onChange) {
                onChange(fileForString);
              }

              setFileList(newFileList);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function handleChange(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var uploadButton = listType === 'picture-card' ? /*#__PURE__*/React.createElement("div", null, loading ? /*#__PURE__*/React.createElement(LoadingOutlined, null) : /*#__PURE__*/React.createElement(PlusOutlined, null), /*#__PURE__*/React.createElement("div", {
    className: "ant-upload-text"
  }, buttonText)) : /*#__PURE__*/React.createElement(_Button, null, /*#__PURE__*/React.createElement(UploadOutlined, null), buttonText);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Upload, {
    className: showUploadList && !showUploadList.showRemoveIcon ? 'uploadContainer' : 'uploadContainerNormal',
    name: name,
    action: action,
    listType: listType,
    fileList: fileList,
    headers: {
      Authorization: "Bearer ".concat(tokenInfo.accessToken)
    },
    onPreview: handlePreview,
    onChange: handleChange,
    beforeUpload: beforeUpload,
    showUploadList: _objectSpread({
      showPreviewIcon: true,
      showRemoveIcon: true
    }, showUploadList)
  }, fileList.length >= fileNumberLimit || showUploadList && !showUploadList.showRemoveIcon ? null : uploadButton), showUploadList && !showUploadList.showRemoveIcon ? null : /*#__PURE__*/React.createElement("span", {
    className: "uploadLimitDesc"
  }, "\u652F\u6301\u6269\u5C55\u540D: ".concat(fileType.join('、'), "\u6700\u591A\u53EF\u4E0A\u4F20").concat(fileNumberLimit, "\u4E2A\u6587\u4EF6")), /*#__PURE__*/React.createElement(_Modal, {
    destroyOnClose: true,
    visible: previewVisible,
    footer: null,
    title: "\u9644\u4EF6\u9884\u89C8",
    onCancel: function onCancel() {
      setPreviewVisible(false);
    }
  }, /*#__PURE__*/React.createElement("img", {
    alt: "example",
    style: {
      width: '100%'
    },
    src: previewImage
  })), /*#__PURE__*/React.createElement(PdfPreview, {
    path: previewPDFUrl,
    visible: previewPDFVisible,
    onVisibleChange: function onVisibleChange() {
      return setPreviewPDFVisible(false);
    }
  }));
};

export default KBUpload;