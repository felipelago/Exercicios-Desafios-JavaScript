"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var axios_1 = __importDefault(require("axios"));
var Period_1 = __importDefault(require("./enums/Period"));
var Candles_1 = __importDefault(require("./models/Candles"));
var messageChannel_1 = require("./messages/messageChannel");
(0, dotenv_1.config)(); //vai configurar as variáveis de ambiente do dotenv
//Função para leitura do preço do BTC
var readMarketPrice = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, data, price;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.get(process.env.PRICES_API)]; //Para poder utilizar o dotenv foi necessário criar o tsconfig
            case 1:
                result = _a.sent() //Para poder utilizar o dotenv foi necessário criar o tsconfig
                ;
                data = result.data;
                price = data.bitcoin.usd;
                return [2 /*return*/, price];
        }
    });
}); };
//Função para gerar os candles
var generateCandles = function () { return __awaiter(void 0, void 0, void 0, function () {
    var messageChannel, loopTimes, candle, i, price, candleObj, candleJson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, messageChannel_1.createMessageChannel)()];
            case 1:
                messageChannel = _a.sent();
                if (!messageChannel) return [3 /*break*/, 8];
                _a.label = 2;
            case 2:
                if (!true) return [3 /*break*/, 8];
                loopTimes = Period_1.default.ONE_MINUTE / Period_1.default.TEN_SECONDS //Vai fazer a divisão para saber quantas interações é necessário para um candle de 5 minutos
                ;
                candle = new Candles_1.default('BTC', new Date());
                console.log('---------------------------');
                console.log('Generating candle');
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < loopTimes)) return [3 /*break*/, 7];
                return [4 /*yield*/, readMarketPrice()];
            case 4:
                price = _a.sent();
                candle.addValue(price); //vai alimentar o método addValue em Candle.ts
                console.log("Market Price ".concat(i + 1, " of ").concat(loopTimes));
                return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, Period_1.default.TEN_SECONDS); })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 3];
            case 7:
                candle.closeCandle();
                console.log('Candle close');
                candleObj = candle.toSimpleObject();
                console.log(candleObj);
                candleJson = JSON.stringify(candleObj) //para inserir na fila precisa converter para JSON
                ;
                messageChannel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(candleJson)); //Enviando para fila
                //sendToQueue vai enfilerar esse objeto na fila do rabbitMQ, estando la ele vai poder ser consumido pela API
                console.log('Candle sent to queue');
                return [3 /*break*/, 2];
            case 8: return [2 /*return*/];
        }
    });
}); };
generateCandles();
