import {ReadableStream} from "runtime-compat/streams";
import {File} from "runtime-compat/filesystem";
import {is} from "../dyndef/exports.js";

const from = {
  string(body) {
    is(body).string();
    return new ReadableStream({
      start(controller) {
        controller.enqueue(body);
        controller.close();
      },
    });
  },
};

export default class Response {
  #body;
  #status;
  #headers = new Headers();

  constructor(body, {status, headers = {}}) {
    if (typeof body === "string") {
      this.#body = from.string(body);
    }
    if (body instanceof ReadableStream) {
      this.#body = body;
    }
    if (body instanceof File) {
      this.#body = body.readable;
    }
    if (headers !== undefined) {
      Object.entries(headers).forEach(header => {
        this.#headers.set(...header);
      });
    }
    this.#status = status;
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
