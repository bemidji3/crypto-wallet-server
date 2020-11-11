const ccxt = require("ccxt");

/*

const orderStructure = {
        'id':                '12345-67890:09876/54321', // string
        'clientOrderId':     'abcdef-ghijklmnop-qrstuvwxyz', // a user-defined clientOrderId, if any
        'timestamp':          1502962946216, // order placing/opening Unix timestamp in milliseconds
        'status':     'open',         // 'open', 'closed', 'canceled'
        'symbol':     'ETH/BTC',      // symbol
        'type':       'limit',        // 'market', 'limit'
        'side':       'buy',          // 'buy', 'sell'
        'price':       0.06917684,    // float price in quote currency (may be empty for market orders)
        'average':     0.06917684,    // float average filling price
        'amount':      1.5,           // ordered amount of base currency
        'filled':      1.1,           // filled amount of base currency
        'remaining':   0.4,           // remaining amount to fill
        'cost':        0.076094524,   // 'filled' * 'price' (filling price used where available)
        'trades':      [],            // a list of order trades/executions
        'fee': {                      // fee info, if available
            'currency': 'BTC',        // which currency the fee is (usually quote)
            'cost': 0.0009,           // the fee amount in that currency
            'rate': 0.002,            // the fee rate (if available)
        },
    };

*/

function createId() {
    const length = 15;
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function createBuyOrder(symbol, amount, price, type) {


    const orderId = createId();

    const myOrder = {
        id: orderId,
        timestamp: Date.now(),
        symbol,
        amount,
        price,
        type,
        side: "buy",
    };


    return myOrder;
}

function createSellOrder(symbol, amount, price) {
    const exchange = new ccxt.binance();

    //const order = await exchange.createOrder(symbol, "market", "sell", amount, price);

    return order;
}

module.exports = {
    createBuyOrder,
    createSellOrder,
};