import { Channel, connect } from "amqplib"
import { config } from "dotenv"
import { Server } from "socket.io"
import * as http from 'http'
import CandleController from "../controllers/CandleController"
import { Candle } from "../models/CandleModel"

config();


/*A função dessa classe vai ser abrir conexão com a fila no rabbitmq, consumir as mensagens e quando consumir as mensagens vai gravar a mensagem no
banco de dados e mandar via websocket a mensagem para o client (front-end)*/
export default class CandleMessageChannel {

    private _channel: Channel
    private _candleCtrl: CandleController
    private _io: Server

    constructor(server: http.Server) { //Vai receber uma mensagem do tipo server
        this._candleCtrl = new CandleController();
        this._io = new Server(server, { //vai receber 2 parametros 1 é o servidor que está recebendo no construtor e um objeto de config
            cors: {
                origin: process.env.SOCKET_CLIENT_SERVER,
                methods: ["GET", "POST"]
            }
        })
        this._io.on('connection', () => console.log('Web Socket connection created'));

    }

    private async _createMessageChannel() {
        try {
            const connection = await connect(process.env.AMQP_SERVER)
            this._channel = await connection.createChannel()
            this._channel.assertQueue(process.env.QUEUE_NAME)
        } catch (error) {
            console.log('Connection to RabbitMQ failed')
            console.log(error)
        }
    }

    async consumeMessages() {
        await this._createMessageChannel() //cria primeiro a messagechannel e depois consome
        if (this._channel) {
            this._channel.consume(process.env.QUEUE_NAME, async msg => {
                const candleObj = JSON.parse(msg.content.toString())
                console.log('Message received')
                console.log(candleObj)
                this._channel.ack(msg)

                const candle: Candle = candleObj
                await this._candleCtrl.save(candle)
                console.log('Candle saved to database')
                this._io.emit(process.env.SOCKET_EVENT_NAME, candle)
                console.log('New candle emited by web socket')
            })

            console.log('Candle consumer started')
        }
    }
}