# Estructura del Proyecto:

Documentación sobre la organización del sistema de archivos con el código fuente de este sistema.

## ./database

Contiene un archivo local con la base de datos *sqlite3* propia de este sistema. Esta carpeta no se utilizará en sistemas que se conecten a servidores de bases de datos remotos (por ejemplo si se usa *PostgreSQL*).

## src/server.js

Aquí se inicializa *express* y se define qué puerto estará a la escucha de las *request HTTP* entrantes. También se inicializa *sequelize*.

## ./src/controllers/

Contiene los métodos que controlan las *requests* realizadas y envían la respuesta al cliente. Los métodos *controller* llamarán al método *service* que corresponda.

## ./src/models

Las clases modelo representan entidades de la base de datos. Definen los objetos que *mapean* cada tabla de la base de datos.

## ./src/models/index.js

Configuración de la conexión del ORM *sequelize* con la base de datos.

## ./src/routes/

Define los *endpoints* de cada *web service REST* que puede ser consumido mediante *requests HTTP* para cada modelo. Los métodos de las clases *routes* llaman al método *controller* correspondiente.

## ./src/services/

Contiene una clase para cada modelo que implementa la lógica para conectarse con la base de datos y obtener/guardar/modificar instancias de dicho modelo.

## ./src/util/

Otras clases con métodos adicionales que pueden ser de utilidad.

# Principales paquetes instalados:

## Express

Permite crear métodos para escuchar las *request HTTP* enviadas por los clientes. También contiene *middlewares* (intermediarios que son llamados cuando se recibe cierta *request*) y métodos para configurar el servidor de forma fácil y rápida.

## Sequelize

Es un ORM (Object–relational mapping). Permite representar las tablas de una BD con objetos de Javascript y acceder a métodos de Javascript para realizar consultas o persistir datos en la BD.

# Acerca de

Creado por [Leonel Poletti](https://leonelpoletti.glitch.me/) (HopFr0g 🐸)