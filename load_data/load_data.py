# Cunsumir topico bitcoin de kafka
import asyncio
import json
from datetime import time, datetime

import cassandra
from cassandra.cluster import Cluster
from cassandra.query import SimpleStatement
from kafka import KafkaConsumer

contact_points = ['127.0.0.1']  # Dirección IP del nodo Cassandra
port = 9042
keyspace_name = 'bitcoin_keyspace'
table_name = 'bitcoin'

# Crear objeto Cluster
cluster = Cluster(contact_points=contact_points, port=port)

# Conectar al cluster y establecer el keyspace
session = cluster.connect()

# Crear un keyspace
session.execute(f"CREATE KEYSPACE IF NOT EXISTS {keyspace_name} WITH REPLICATION = {{'class': 'SimpleStrategy', "
                f"'replication_factor': 1}}")

# Utilizar el keyspace creado
session.set_keyspace(keyspace_name)

# Crear una tabla

session.execute(f"CREATE TABLE IF NOT EXISTS {table_name} (price_time TIMESTAMP PRIMARY KEY, price DECIMAL)")

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
    price = data['value']
    date_send = data['timestamp']
    # Borrar microsegundos
    date_send = "'"+date_send[:16]+"+0000'"
    # Insertar datos en la tabla
    session.execute(f"INSERT INTO {table_name} (price_time, price) VALUES ({date_send},{price})")
    print(date_send)

