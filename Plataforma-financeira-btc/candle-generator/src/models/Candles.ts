import CandleColor from '../enums/CandleColor'

//Terminologias dos candles
export default class Candle {

    low: number
    high: number
    open: number
    close: number
    color: CandleColor
    initialDateTime: Date
    finalDateTime: Date
    values: number[]
    currency: string

    constructor(currency: string, initialDateTime: Date) {
        this.currency = currency
        this.initialDateTime = initialDateTime
        this.low = Infinity //para pegar qualquer valor abaixo de infinito(por meio de comparação)
        this.high = 0 //qualquer valor acima de 0
        this.close = 0
        this.open = 0
        this.values = []
        this.color = CandleColor.UNDETERMINED //undertermined pois ainda não se sabe o valor (se o candle vai ser green ou red)
    }

    //Para calcular os valores
    addValue(value: number) {
        this.values.push(value)

        if (this.values.length = 1) {
            this.open = value
        }
        if (this.low > value) {
            this.low = value
        }
        if (this.high < value) {
            this.high = value
        }
    }

    //Para fechamento do candle e identificar a cor do candle
    closeCandle() {
        if (this.values.length > 0) {  //Caso tenha algum valor em values
            this.close = this.values[this.values.length - 1]
            this.finalDateTime = new Date()

            if (this.open > this.close) { //Se o preço de abertura for maior do que o preço de fechamento o preço caiu
                this.color = CandleColor.RED
            } else if (this.close > this.open) {
                this.color = CandleColor.GREEN
            }
        }
    }

    toSimpleObject() {
        const { values, ...obj } = this //Terá um objeto com tudo menos os values
        return obj
    }

}