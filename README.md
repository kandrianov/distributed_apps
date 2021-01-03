# Задание

AWS: реализовать загрузку таблицы данных из JSON файла, загруженного на S3,  при помощи Lambda функции (которая триггерится событием загрузки файла и вычитывает содержимое этого файла и кладет данные в базу).  

Используемые технологии: NodeJs, DynamoDB	

## Последовательность действий:  
- S3: Создание S3 bucket (name: exam2021)
- DynamoDB: Создание таблицы DynamoDB (name: examDB, key: id)
- IAM: создание новой роли (name: lambda-s3-dynamodb)
- IAM: добавление трех policy к роли:   
a) Доступ к Dynamodb c правом добавления новых Items (файл: dynamoDb-access-policy.json)   
b) Доступ к S3 с правом чтения файлов (файл: s3-access-policy.json)  
c) Добавление policy AWSLambdaBasicExecutionRole для логирования    
- Lambda:  
a) Добавить код функции (файл: lambda.js)  
b) Добавить специально созданную роль lambda-s3-dynamodb   
c) Добавить триггер функции: S3/All object create events
