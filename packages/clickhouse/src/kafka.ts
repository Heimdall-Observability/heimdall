import type { Producer, RecordMetadata } from 'kafkajs'
import { Kafka, logLevel } from 'kafkajs'

import { env } from '../env'

let kafka: Kafka
let producer: Producer
// const enabled = Boolean(process.env.KAFKA_USERNAME && process.env.KAFKA_BROKER)
const enabled = Boolean(process.env.KAFKA_BROKER)

function getClient() {
  const _username = env.KAFKA_USERNAME
  const _password = env.KAFKA_PASSWORD
  const brokers = env.KAFKA_BROKER ? env.KAFKA_BROKER.split(',') : []

  // const sasl =
  // 	username && password
  // 		? {
  // 				username,
  // 				password,
  // 				mechanism: 'plain',
  // 			}
  // 		: null

  // const ssl = process.env.CA_CERT
  // 	? {
  // 			ca: process.env.CA_CERT,
  // 			key: process.env.CLIENT_KEY,
  // 			cert: process.env.CLIENT_CERT,
  // 		}
  // 	: null

  // const kafka = new Kafka({
  // 	clientId: 'mxl-console',
  // 	brokers,
  // 	ssl: {
  // 		servername: 'localhost',
  // 		rejectUnauthorized: false,
  // 		ca: [
  // 			fs.readFileSync(
  // 				'/Users/francismasha/Documents/Projects/OpenSourced/kafkajs/testHelpers/certs/cert-signed',
  // 				'utf-8'
  // 			),
  // 		],
  // 	},
  // 	sasl: {
  // 		mechanism: 'plain',
  // 		username: 'test',
  // 		password: 'testtest',
  // 	},
  // 	logLevel: logLevel.ERROR,
  // })

  // if (process.env.NODE_ENV !== 'production') {
  //   global[KAFKA] = kafka
  // }

  return new Kafka({
    brokers,
    ssl: false,
    // sasl: {
    // 	mechanism: 'scram-sha-256',
    // 	username,
    // 	password,
    // },
    logLevel: logLevel.ERROR,
  })
}

async function sendMessage(
  message: Record<string, string | number>,
  topic: string,
): Promise<RecordMetadata[]> {
  await connect()
  return producer.send({
    topic,
    messages: [
      {
        value: JSON.stringify(message),
      },
    ],
    acks: -1,
  })
}

async function sendMessages(
  messages: Record<string, string | number>[],
  topic: string,
) {
  await connect()
  await producer.send({
    topic,
    messages: messages.map((a) => {
      return { value: JSON.stringify(a) }
    }),
    acks: 1,
  })
}

async function getProducer(): Promise<Producer> {
  const producer = kafka.producer()
  await producer.connect()
  console.log('Kafka producer initialized')
  return producer
}

async function connect(): Promise<Kafka> {
  if (!kafka) {
    kafka = getClient()
    if (kafka) {
      producer = await getProducer()
    }
  }
  return kafka
}

export default {
  // TODO: Remove !enabled once Kafka is fully configured
  enabled: !enabled,
  // enabled: !enabled,
  // @ts-expect-error
  client: kafka,
  // @ts-expect-error
  producer,
  connect,
  sendMessage,
  sendMessages,
}
