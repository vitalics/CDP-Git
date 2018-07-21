export enum Milliseconds {
    _100 = 100,
    _250 = 250,
    _500 = 500,
    _1000 = 1000,
    _2000 = 2000,
    _3000 = 3000,
    _5000 = 5000,
    _15000 = 15000,
}

export const enum Seconds {
    _1 = Milliseconds._1000,
    _2 = Milliseconds._2000,
    _3 = Milliseconds._3000,
    _5 = Milliseconds._5000,
    _15 = Milliseconds._15000,
}

export const TIMEOUTS = {
    GMAIL: 10000,
    MILLISECONDS: Milliseconds,
    VISIBILITY: process.env.MOBILE ? 45000 : 25000,
    VISIBILITY_LONG: 45000,
    WAIT_FOR_VISIBLE: process.env.MOBILE ? 45000 : 25000,
};
