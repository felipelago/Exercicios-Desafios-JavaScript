import { config } from 'dotenv'
import axios from 'axios'
import Period from './enums/Period'
import Candle from './models/Candles'
import { createMessageChannel } from './messages/messageChannel'

config() //vai configurar as variáveis de ambiente do dotenv

//Função para leitura do preço do BTC
const readMarketPrice = async (): Promise<number> => {
    const result = await axios.get(process.env.PRICES_API) //Para poder utilizar o dotenv foi necessário criar o tsconfig
    const data = result.data
    const price = data.bitcoin.usd
    return price;
}

//Função para gerar os candles
const generateCandles = async () => {
    const messageChannel = await createMessageChannel()
    if (messageChannel) { //Se não tiver o messaChannel não inicia a função
        while (true) {
            const loopTimes = Period.ONE_MINUTE / Period.TEN_SECONDS //Vai fazer a divisão para saber quantas interações é necessário para um candle de 5 minutos
            const candle = new Candle('BTC', new Date())

            console.log('---------------------------')
            console.log('Generating candle')

            for (let i = 0; i < loopTimes; i++) {
                const price = await readMarketPrice()
                candle.addValue(price) //vai alimentar o método addValue em Candle.ts
                console.log(`Market Price ${i + 1} of ${loopTimes}`)
                await new Promise(r => setTimeout(r, Period.TEN_SECONDS))
            }

            candle.closeCandle()
            console.log('Candle close')
            const candleObj = candle.toSimpleObject()
            console.log(candleObj)
            const candleJson = JSON.stringify(candleObj) //para inserir na fila precisa converter para JSON
            messageChannel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(candleJson)) //Enviando para fila
            //sendToQueue vai enfilerar esse objeto na fila do rabbitMQ, estando la ele vai poder ser consumido pela API
            console.log('Candle sent to queue')
        }
    }
}

generateCandles();