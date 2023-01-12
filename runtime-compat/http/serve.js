import {createServer} from "https";
import {Writable} from "stream";
import Request from "./Request.js";

export default (handler, conf) => {
  const server = createServer(conf, async (req, res) => {
    // handler gets a WHATWG Request, and returns a WHATWG Response
    //
    // 1. wrap a node request in a WHATWG request
    const request = new Request(req, {headers: req.headers});

    const response = await handler(request);

    for (const [name, value] of response.headers.entries()) {
      res.setHeader(name, value);
    }
    res.writeHead(response.status);

    // 2. copy from a WHATWG response into a node response
    await response.body.pipeTo(Writable.toWeb(res));
  });
  server.listen(conf?.port ?? 9999, conf?.host ?? "localhost");
};
