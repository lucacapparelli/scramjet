import { Codec } from "./codecs";

declare global {
    interface Window {
        __scramjet$config: {
            prefix: string;
            bareServer: string;
            codec: Codec
            scramjet: {
                config: string;
                bundle: string;
                worker: string;
                client: string;
                codecs: string;
            }
        }
    }
}

self.__scramjet$config = {
    prefix: "/scramjet/",
    bareServer: "/bare/",
    codec: self.__scramjet$codecs.plain,
    scramjet: {
        config: "/scramjet.config.js",
        bundle: "/scramjet.bundle.js",
        worker: "/scramjet.worker.js",
        client: "/scramjet.client.js",
        codecs: "/scramjet.codecs.js"
    }
}