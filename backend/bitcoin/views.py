import os
from datetime import datetime, timedelta
from django.http import JsonResponse
from django.shortcuts import render
from pyspark.sql import SparkSession
from pyspark.sql.functions import avg, col
from .models import Bitcoin, Spark

os.environ['PYSPARK_SUBMIT_ARGS'] = '--packages com.datastax.spark:spark-cassandra-connector_2.12:3.1.0 pyspark-shell'


# Create your views here.
def get_all_bitcoin_prices(request):
    prices = Bitcoin.objects.all()
    data = [{"price_time": price.price_time, "price": price.price} for price in prices]
    data.sort(key=lambda x: x["price_time"])
    return JsonResponse(data, safe=False)


def get_bitcoin_prices_range(request):
    start_date = request.GET.get('start_date', datetime.strptime("1990-01-01", "%Y-%m-%d"))
    end_date = request.GET.get('end_date', datetime.now())
    print(start_date, end_date)

    # Obtener precios entre fechas
    prices = Spark().get_prices_between_dates(start_date, end_date)
    # Convertir a lista de diccionarios
    data = [{"price_time": price.price_time, "price": price.price} for price in prices.collect()]
    # Ordenar por fecha
    data.sort(key=lambda x: x["price_time"])
    return JsonResponse(data, safe=False)


def get_mean_between_dates(request):
    start_date = request.GET.get('start_date', datetime.strptime("1990-01-01", "%Y-%m-%d"))
    end_date = request.GET.get('end_date', datetime.now())

    mean = Spark().get_mean_between_dates(start_date, end_date)
    data = {"mean": mean, "start_date": start_date, "end_date": end_date}
    return JsonResponse(data, safe=False)


def get_last_prices(request):
    last = request.GET.get('last', 'week')

    # Obtener la fecha actual
    current_date = datetime.now().date()
    # Establecer la fecha de inicio según la magnitud de tiempo
    if last == 'hour':
        start_date = datetime.now() - timedelta(hours=1)
    elif last == 'day':
        start_date = datetime.now() - timedelta(days=1)
    elif last == 'week':
        start_date = datetime.now() - timedelta(weeks=1)
    elif last == 'month':
        start_date = datetime.now() - timedelta(days=30)
    else:
        return JsonResponse({'error': 'Magnitud de tiempo no válida'})

    # Obtener precios entre fechas
    prices = Spark().get_prices_between_dates(start_date, current_date)
    # Convertir a lista de diccionarios
    data = [{"price_time": price.price_time, "price": price.price} for price in prices.collect()]
    # Ordenar por fecha
    data.sort(key=lambda x: x["price_time"])
    return JsonResponse(data, safe=False)


def bitcoin_prices_query(request):
    # Obtener parametros del rango de fechas
    start_date = request.GET.get('start_date', datetime.strptime("1990-01-01", "%Y-%m-%d"))
    end_date = request.GET.get('end_date', datetime.now())

    # Si el parametro last es pasado, se ignora el rango de fechas
    last = request.GET.get('last', None)
    if last:
        current_date = datetime.now().date()
        # Establecer la fecha de inicio según la magnitud de tiempo
        if last == 'hour':
            print('hour')
            start_date = datetime.now() - timedelta(hours=1)
        elif last == 'day':
            print('day')
            start_date = datetime.now() - timedelta(days=1)
        elif last == 'week':
            print('week')
            start_date = datetime.now() - timedelta(weeks=1)
        elif last == 'month':
            print('month')
            start_date = datetime.now() - timedelta(days=30)
        else:
            print('else')
            start_date = datetime.now() - timedelta(weeks=1)

    spark = Spark()
    # Obtener precios entre fechas
    spark.df = spark.get_prices_between_dates(start_date, end_date)

    # Obtener parametros de la unidad de tiempo agrupada
    time_unit = request.GET.get('time_unit', 'minute')
    # Obtener el promedio de precios agrupados por unidad de tiempo
    prices = spark.get_prices_grouped_by(time_unit)

    # Convertir a lista de diccionarios
    data = [{"price_time": price.price_time, "price": round(price.price, 2)} for price in prices.collect()]

    # Ordenar por fecha
    data.sort(key=lambda x: x["price_time"])
    return JsonResponse(data, safe=False)


def bitcon_price_query_last(request):
    last = request.GET.get('last', 'week')
    # Obtener la fecha actual
    current_date = datetime.now().date()
    # Establecer la fecha de inicio según la magnitud de tiempo
    if last == 'hour':
        start_date = datetime.now() - timedelta(hours=1)
    elif last == 'day':
        start_date = datetime.now() - timedelta(days=1)
    elif last == 'week':
        start_date = datetime.now() - timedelta(weeks=1)
    elif last == 'month':
        start_date = datetime.now() - timedelta(days=30)
    else:
        return JsonResponse({'error': 'Magnitud de tiempo no válida'})

    spark = Spark()
    # Obtener precios entre fechas
    spark.df = spark.get_prices_between_dates(start_date, current_date)

    # Obtener parametros de la unidad de tiempo agrupada
    time_unit = request.GET.get('time_unit', 'minute')
    # Obtener el promedio de precios agrupados por unidad de tiempo
    prices = spark.get_prices_grouped_by(time_unit)
    # Convertir a lista de diccionarios
    data = [{"price_time": price.price_time, "price": round(price.price, 2)} for price in prices.collect()]
    # Ordenar por fecha
    data.sort(key=lambda x: x["price_time"])
    return JsonResponse(data, safe=False)
