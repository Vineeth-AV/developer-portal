---
title: gRPC-REST Transcoding, RPC - REST coexistence
---


VDC API consumers can choose between gRPC or REST APIs for integration. Consider the following points when making this choice:

| Sl. No. | gRPC                                                                                       | REST                                                                                             |
|---------|--------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| 1       | Generates cross-platform client bindings for a [limited set of languages](https://grpc.io/docs/languages/) only. Although most languages in use today are supported, if you are not developing using one of these languages, REST API is the only option available to you. | REST APIs are more widely used than gRPC APIs. Tools and frameworks are available for all platforms to consume REST services. |
| 2       | Better performance due to the use of protobuf encoding and HTTP/2 transport protocol. Note that NDC messages are large and expose a lot of information. Shopping responses, in particular, contain large quantities of data. | Text-based JSON encoding requires non-trivial computing resources to decode the text stream into data structures in memory for processing. |
| 3       | Supports streaming responses and asynchronous (non-blocking) calls natively. | Streaming responses are returned in [ndjson](http://ndjson.org/) format. Asynchronous calls, if required, need to be implemented separately on the underlying platform. |
| 4       | Protocol Buffers encoded messages are in binary format and are not directly readable. Specialized tools like [BloomRPC](https://github.com/bloomrpc/bloomrpc) or [grpcurl](https://github.com/fullstorydev/grpcurl) may be required to try out gRPC API services. | REST APIs work with ubiquitous HTTP/1.1 and are therefore much easier to explore and start working on. Commonly available tools and utilities like cURL command or browser developer tools may be used to explore REST APIs. |
