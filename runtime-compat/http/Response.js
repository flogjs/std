import {ReadableStream} from "../streams/exports.js";
import {File} from "../filesystem/exports.js";
import {is, defined} from "../dyndef/exports.js";

const constructors = [...new Map()
  .set(v => typeof v === "string", body => new ReadableStream({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    },
  }))
  .set(v => v instanceof ReadableStream, body => body)
  .set(v => v instanceof File, body => body.readable)
  .set(v => v === null, () => new ReadableStream({
    start(controller) {
      controller.close();
    },
  }))
  .set(() => true, () => {
    throw new Error("unparsable body");
  })
  .entries()]
;

export default class Response {
  #body;
  #status;
  #headers = new Headers();

  constructor(body, {status, headers = {}}) {
    defined(body);

    const [, setBody] = constructors.find(([constructor]) => constructor(body));
    this.#body = setBody(body);

    is(status).number();
    this.#status = status;

    is(headers).object();
    Object.entries(headers).forEach(header => this.#headers.set(...header));
  }

  get body() {
    return this.#body;
  }

  get status() {
    return this.#status;
  }

  get headers() {
    return this.#headers;
  }
}
