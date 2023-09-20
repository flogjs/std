import {Writable} from "stream";
import Request from "./Request.js";
import is_bun from "../../is_bun.js";

const secure = ({ssl}) => ssl?.key !== undefined && ssl.cert !== undefined;
const dedouble = url => url.replaceAll(/\/{1,}/ug, () => "/");

const get_options = async conf => secure(conf)
  ? {
    key: await conf.ssl.key.file.read(),
    cert: await conf.ssl.cert.file.read(),
  } : {};

const bun_serve = async (handler, conf) => {
  return Bun.serve({
    port: conf.port,
    hostname: conf.host,
    fetch: request => handler(request),
    tls: await get_options(conf),
  });
}

const node_serve = async(handler, conf) =>
  import(secure(conf) ? "https" : "http").then(async ({createServer}) =>
    createServer(await get_options(conf), async (req, res) => {
      // handler gets a WHATWG Request, and returns a WHATWG Response
      //
      // 1. wrap a node request in a WHATWG request
      const url = new URL(dedouble(req.url), `http://${req.headers.host}`);
      const request = new Request(`${url}`, {
        headers: req.headers,
        method: req.method,
        body: req,
      });

      const response = await handler(request);

      [...response.headers.entries()].forEach(([name, value]) => {
        res.setHeader(name, value);
      });

      res.writeHead(response.status);

      // 2. copy from a WHATWG response into a node response
      const {body} = response;
      try {
        await body.pipeTo(Writable.toWeb(res));
      } catch (error) {
        await body.cancel();
      }
    }).listen(conf.port, conf.host));

export default is_bun ? bun_serve : node_serve;
