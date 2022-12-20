import { Candle, CandleModel } from '../models/CandleModel'

export default class CandleController {

    //Metodo para salvar as candles
    async save(candle: Candle): Promise<Candle> { //save vai receber uma candle do tipo Candle, retornando uma promise do novo objeto de Candle
        const newCandle = await CandleModel.create(candle)
        return newCandle;
    }

    //Metodo para recuperar as ultimas candles
    async findLastCandles(quantity: number): Promise<Candle[]> {
        const n = quantity > 0 ? quantity : 10
        const lastCandles: Candle[] = await CandleModel.find().sort({ _id: -1 }).limit(n) //-1 significa a ordem inversa (pegar os ultimos), limitando pela quantidade (n)
        return lastCandles; 
    }
}