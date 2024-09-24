# Implementacion de Tomas Alba

Se utilizo NestJs para implementar una API que sirva los Enpoint requeridos por los test, debido a incompatibilidad de nestJs con HAPPI el index.test.ts fue migrado a una version compatible manteniendo la misma logia exacta para los test de todas formas se dejo el back up index.test.ts.old con la version original.

### Requisitos
Se debe tener instalado docker la version utilizada para el desarrollo fue 27.2.0 y docker compose la vesion utilizada fue v2.29.2. Para levantar el proyecto local.

Para ejecutar los test se requiere node version 18


### Configurar proyecto y ejecutar test
1 - Se recomienda primero correr el proyecto local con el comando:
    
    docker-compose -f .devcontainer/docker-compose.app.yml up
    
Esto generara la base de datos en postgress estsa base se utiliza tanto por la app como por los test, por lo que si se crea algo con la app al ejecutar los test estos limpian la base previo a la corrida.

Para configurar el puerto de la base datos, se encuentra en el services de docker compose llamado postgress en ports esta configuraro 5050.

Para configurar el puerto de la app, se encuentra en el docker compose en la app en ports esta configuraro 3000.

2 - Utilizar el curl para validar el correcto levantamiento del proyecto: 
        
    curl -X GET http://localhost:3000/ping  

Deberia recibirse este resultado
   
    {"ok": true}

3 - Utilizar npm i para instalar los paquetes y luego npm run test para ejecutar index.test.ts y correr los test e2e


### Endpoints para probar

#### /Crear un item

    curl -X POST http://localhost:3000/items \
    -H "Content-Type: application/json" \
    -d '{
      "nombre": "Nuevo Item",
      "descripcion": "Descripción del nuevo ítem"
    }'

#### /Obtener un item por id
    curl -X GET http://localhost:3000/items/1

#### /Obtener todos los items
    curl -X GET http://localhost:3000/items

#### /Eliminar item por id
    curl -X DELETE http://localhost:3000/items/1

#### /Actualizar item por id
    curl -X PUT http://localhost:3000/items/1 \
    -H "Content-Type: application/json" \
    -d '{
      "nombre": "Item Actualizado",
      "descripcion": "Descripción actualizada"
    }'


# Bienvenido al coding-interview-backend-level-3

## Descripción
Este proyecto es una API REST que permite realizar operaciones CRUD sobre una entidad de tipo `Item`.

La entidad tiene 3 campos: `id`, `name` y `price`.

Tu tarea es completar la implementación de toda la funcionalidad de forma tal de que los tests e2e pasen exitosamente.

### Que puedes hacer: 
- ✅ Modificar el código fuente y agregar nuevas clases, métodos, campos, etc.
- ✅ Cambiar dependencias, agregar nuevas, etc.
- ✅ Modificar la estructura del proyecto (/src/** es todo tuyo)
- ✅ Elegir una base de datos
- ✅ Elegir un framework web
- ✅ Cambiar la definición del .devContainer


### Que **no** puedes hacer:
- ❌ No puedes modificar el archivo original /e2e/index.test.ts (pero puedes crear otros e2e test si lo deseas)
- ❌ El proyecto debe usar Typescript 
- ❌ Estresarte 🤗


## Pasos para comenzar
1. Haz un fork usando este repositorio como template
2. Clona el repositorio en tu máquina
3. Realiza los cambios necesarios para que los tests pasen
4. Sube tus cambios a tu repositorio
5. Avísanos que has terminado
6. ???
7. PROFIT

### Cualquier duda contactarme a https://www.linkedin.com/in/andreujuan/
