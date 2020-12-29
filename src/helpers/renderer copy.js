import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import App from '../client/App.jsx';
import Routes from '../client/routes';

export default (req, store, context) => {
  const content = renderToString(
    <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
  );
  const helmet = Helmet.renderStatic();
  return `<!DOCTYPE html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                <style>
                  html, body {
                    font-size: .16rem;
                  }
                </style>
               <script>
               var win = window;
               var regex1 = "/Android[\S\s]+AppleWebkit\/(\d{3})/i";
               var regex2 = "/U3\/((\d+|\.){5,})/i";
               function vw (baseFontSize, psdWidth) {
                 var _baseFontSize = baseFontSize || 100;
                 var _psdWidth = psdWidth || 750;
           
                 var doc = win.document;
                 var ua = navigator.userAgent;
                 var matches = ua.match(new RegExp(regex1));
                 var UCversion = ua.match(new RegExp(regex2));
                 var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
                 var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
                 var dpr = win.devicePixelRatio || 1;
                 var docEl = doc.documentElement;
                 // 为了消除安卓dpr乱标的比例
                 var rate = 1;
                 var scale = 1 / dpr;
                 if (isIos) {
                   // iOS下不用做什么
                 } else if (matches && matches[1] > 534 || isUCHd) {
                   // 有些兼容环境下, fontSize为100px的时候, 结果1rem=86px; 需要纠正viewport;
                   docEl.style.fontSize = _baseFontSize + 'px';
                   var div = doc.createElement('div');
                   div.setAttribute('style', 'width: 1rem;display:none');
                   docEl.appendChild(div);
                   var trueWidth = win.getComputedStyle(div).width;
                   docEl.removeChild(div);
                   // 如果1rem的真实px跟html.fontSize不符. 那么就要加一个rate缩放了;
                   if (trueWidth !== docEl.style.fontSize) {
                     var trueWidthVal = parseInt(trueWidth, 10);
                     rate = _baseFontSize / trueWidthVal;
                     scale = scale * rate;
                   }
                 } else {
                   // 如果是在PC或者安卓4.3(会闪屏)以下, 则正常展现.
                   scale = 1;
                 }
           
                 var metaEl = doc.querySelector('meta[name="viewport"]');
                 if (!metaEl) {
                   metaEl = doc.createElement('meta');
                   metaEl.setAttribute('name', 'viewport');
                   doc.head.appendChild(metaEl);
                 }
                 metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
           
                 // width/750*100, 为了统一rem为0.01rem = 1px
                 var setFontSize = function setFontSize() {
                   docEl.style.fontSize = _baseFontSize / _psdWidth * docEl.clientWidth * rate + 'px';
                 };
                 setFontSize();
                 win.addEventListener('resize', setFontSize);
               };
           
               vw(100, 375)
               </script>
            </head>
            <body>
                <div id="root">${content}</div>
                <script src="/bundle.js"></script>
            </body>
    </html>`;
};
