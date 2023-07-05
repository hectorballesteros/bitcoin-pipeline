import asyncio
from datetime import datetime
from json import dumps
from ably import AblyRealtime


async def listener(message):
    print(message.data)


# Creación de cliente de la API Bitcoin Pricing de Ably
async def main():
    client = AblyRealtime('wjMKFw.LR2wOw:QCSJ26IYlxg1CtxU9KuI-1TSPi9lMxI7q1vlL2Sk5BQ')
    channel = client.channels.get('[product:ably-coindesk/bitcoin]bitcoin:usd')

    await channel.subscribe(listener)


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
loop.run_forever()
