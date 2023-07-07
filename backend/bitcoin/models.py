from django.db import models
from django_cassandra_engine.models import DjangoCassandraModel
from cassandra.cqlengine import columns
from pyspark.sql import SparkSession
from pyspark.sql.functions import avg, lpad, weekofyear, year, concat, concat_ws, date_trunc


class Bitcoin(DjangoCassandraModel):
    price_time = columns.DateTime(primary_key=True)
    price = columns.Decimal()

    class Meta:
        get_pk_field = 'price_time'
        db_table = 'bitcoin'


# Definir clase spark, contendra la configuracion de spark y los metodos para obtener los datos
class Spark:
    def __init__(self):
        spark = SparkSession.builder.getOrCreate()
        # Enable hadoop s3a settings
        spark._jsc.hadoopConfiguration().set("com.amazonaws.services.s3.enableV4", "true")
        spark._jsc.hadoopConfiguration().set("fs.s3a.impl", "org.apache.hadoop.fs.s3a.S3AFileSystem")
        spark._jsc.hadoopConfiguration().set("fs.s3a.aws.credentials.provider",
                                             "com.amazonaws.auth.InstanceProfileCredentialsProvider,com.amazonaws.auth.DefaultAWSCredentialsProviderChain")
        spark._jsc.hadoopConfiguration().set("fs.AbstractFileSystem.s3a.impl", "org.apache.hadoop.fs.s3a.S3A")

        df = spark.read \
            .format("org.apache.spark.sql.cassandra") \
            .option('spark.cassandra.connection.host', "127.0.0.1") \
            .option('spark.cassandra.connection.port', "9042") \
            .options(table="bitcoin", keyspace="bitcoin_keyspace") \
            .load()
        self.df = df
        self.spark = spark

    def get_df(self):
        return self.df

    def get_prices_between_dates(self, start_date, end_date):
        df_filtrado = self.df.filter((self.df.price_time >= start_date) & (self.df.price_time <= end_date))
        return df_filtrado

    def get_mean_between_dates(self, start_date, end_date):
        df_filtrado = self.df.filter((self.df.price_time >= start_date) & (self.df.price_time <= end_date))
        mean = round(df_filtrado.select(avg("price")).first()[0], 2)
        return mean

    def get_max_between_dates(self, start_date, end_date):
        df_filtrado = self.df.filter((self.df.price_time >= start_date) & (self.df.price_time <= end_date))
        max = round(df_filtrado.select(max("price")).first()[0], 2)
        return max

    def get_min_between_dates(self, start_date, end_date):
        df_filtrado = self.df.filter((self.df.price_time >= start_date) & (self.df.price_time <= end_date))
        min = round(df_filtrado.select(min("price")).first()[0], 2)
        return min

    def get_prices_until_date(self, date):
        df_filtrado = self.df.filter(self.df.price_time <= date)
        return df_filtrado

    # Metodo que permite agrupar los precios por, minuto, hora, día, semana o mes
    def get_prices_grouped_by(self, group_by):
        if group_by == 'minute':
            df_agrupado = self.df

        elif group_by == 'hour':
            # Truncar la columna price_time a la hora
            df_hour = self.df.withColumn('price_time', date_trunc('hour', self.df.price_time))
            df_agrupado = df_hour.groupBy('price_time').avg('price')
            # Renombrar la columa avg(price) a price
            df_agrupado = df_agrupado.withColumnRenamed('avg(price)', 'price')
            # Dar formato a la columna price_time de timestamp
            df_agrupado = df_agrupado.withColumn('price_time', lpad(df_agrupado.price_time, 13, '0'))
            # Convertir la columna price_time a timestamp
            df_agrupado = df_agrupado.withColumn('price_time', df_agrupado.price_time.cast('timestamp'))
        elif group_by == 'day':
            # Truncar la columna price_time al dia
            df_day = self.df.withColumn('price_time', date_trunc('day', self.df.price_time))
            # Agrupar por la columna price_time y calcular la media de la columna price
            df_agrupado = df_day.groupBy('price_time').avg('price')
            # Renombrar la columa avg(price) a price
            df_agrupado = df_agrupado.withColumnRenamed('avg(price)', 'price')
            # Dar formato a la columna price_time de timestamp
            df_agrupado = df_agrupado.withColumn('price_time', lpad(df_agrupado.price_time, 10, '0'))
            # Convertir la columna price_time a timestamp
            df_agrupado = df_agrupado.withColumn('price_time', df_agrupado.price_time.cast('timestamp'))
        elif group_by == 'week':
            # Obtener la semana de la columna price_time
            df_week = self.df.withColumn('week', weekofyear(self.df.price_time))
            # Obtener el año de la columna price_time
            df_week = df_week.withColumn('year', year(self.df.price_time))
            # Combinar las columnas week y year en un timestamp
            df_week = df_week.withColumn('price_time',
                                         concat_ws("-", df_week.week.cast('string'), df_week.year.cast('string')))
            df_week.show()
            # Agrupar por la columna price_time y calcular la media de la columna price
            df_agrupado = df_week.groupBy('price_time').avg('price')
            # Renombrar la columa avg(price) a price
            df_agrupado = df_agrupado.withColumnRenamed('avg(price)', 'price')


        elif group_by == 'month':
            # Obtener el numero de mes unico de la columna price_time y el año de la columna price_time
            df_month = self.df.withColumn('price_time', date_trunc('month', self.df.price_time))
            # Agrupar por la columna price_time y calcular la media de la columna price
            df_agrupado = df_month.groupBy('price_time').avg('price')
            # Renombrar la columa avg(price) a price
            df_agrupado = df_agrupado.withColumnRenamed('avg(price)', 'price')
        else:
            return None
        return df_agrupado
