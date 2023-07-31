// application {{{
export const APPLICATION_FORM_URLENCODED = "application/x-www-form-urlencoded";
export const APPLICATION_JSON = "application/json";
export const APPLICATION_OCTET_STREAM = "application/octet-stream";
// }}}
// text {{{
export const TEXT_HTML = "text/html";
export const TEXT_PLAIN = "text/plain";
export const TEXT_CSS = "text/css";
export const TEXT_JAVASCRIPT = "text/javascript";
// }}}
// images {{{
export const IMAGE_JPEG = "image/jpeg";
export const IMAGE_PNG = "image/png";
export const IMAGE_SVG = "image/svg+xml";
export const IMAGE_WEBP = "image/webp";
// }}}
// fonts {{{
export const FONT_WOFF2 = "font/woff2";
// }}}

const extensions = {
  binary: APPLICATION_OCTET_STREAM,
  json: APPLICATION_JSON,

  html: TEXT_HTML,
  text: TEXT_PLAIN,
  txt: TEXT_PLAIN,
  css: TEXT_CSS,
  js: TEXT_JAVASCRIPT,
  mjs: TEXT_JAVASCRIPT,

  jpg: IMAGE_JPEG,
  jpeg: IMAGE_JPEG,
  png: IMAGE_PNG,
  svg: IMAGE_SVG,
  webp: IMAGE_WEBP,

  woff2: FONT_WOFF2,
};

const regex = /\.(?<extension>[a-z1-9]*)$/u;
const match = filename => filename.match(regex)?.groups.extension;

export const resolve = name => extensions[match(name)] ?? extensions.binary;