import asyncio
from datetime import datetime
from json import dumps
from ably import AblyRealtime
from kafka import KafkaProducer

# Definir producer
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda x: dumps(x).encode('utf-8')
)

async def listener(message):
    data = {"value": message.data, "timestamp": datetime.now().isoformat()}
    # Enviar elemento mediante Kafka al consumer
    producer.send('bitcoin', value=data)
    print("Message sent: " + str(message.data) + " at " + str(datetime.now().isoformat()))


# Creación de cliente de la API Bitcoin Pricing de Ably
async def main():
    client = AblyRealtime('wjMKFw.LR2wOw:QCSJ26IYlxg1CtxU9KuI-1TSPi9lMxI7q1vlL2Sk5BQ')
    channel = client.channels.get('[product:ably-coindesk/bitcoin]bitcoin:usd')

    await channel.subscribe(listener)


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
loop.run_forever()
