*This API is a stub and not implemented yet.*

# HTTP API

```js
import {serve, Response} from "std/http";

// uses a default host and port if no `options` is given as second parameter
serve(request => new Response(null, {status: 404}));
```

## Spec

This standard library module implements a *superset* of the WHATWG
[Fetch API][spec].

Specifically, in addition to `fetch`, `Headers`, `Request` and `Response` of
the Fetch API, this module will implement at least a `serve` function as a
companion to `fetch`.

## License

MIT

[spec]: https://fetch.spec.whatwg.org
