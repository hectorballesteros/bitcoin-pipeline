# Consumir topico bitcoin de kafka
import asyncio
import json
from datetime import time, datetime
from kafka import KafkaConsumer

# Definir consumer
consumer = KafkaConsumer(
    'bitcoin',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='latest',
    enable_auto_commit=True,
    group_id='my-group',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

for message in consumer:
    data = message.value
    print("Precio recibido: " + str(data))

