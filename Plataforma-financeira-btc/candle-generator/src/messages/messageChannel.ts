import {config} from 'dotenv'
import { Channel, connect } from 'amqplib'

//Vai conectar no rabbitmq e criar a fila de canais
export const createMessageChannel = async (): Promise<Channel> => {
    config()
    
    try {
        const connection = await connect(process.env.AMQP_SERVER)
        const channel = await connection.createChannel()
        await channel.assertQueue(process.env.QUEUE_NAME) //fila das candles
        console.log('Connected to RabbitMQ')

        return channel
    } catch (error) {
        console.log('Error while trying to connect to RabbitMQ')
        console.log(error)
        return null;
    }
}