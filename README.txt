Aplicación de manejo de solicitudes CRUD.

Esta Aplicación se utiliza para poder realizar solicitudes básicas, como CREAR un usuario,
LEER y ACTUALIZAR sus datos, y BORRAR al mismo. Los usuarios están almacenados en la memoria
del servidor, y cualquier cambio a estos durante la ejecución del programa será reiniciada en
cuanto la Aplicación se reinicie.

Instalación.

Antes de iniciar con la instalación, asegúrate de tener NodeJS instalado.

1. Clonar este repositorio: 'git clone URL-REPO'
2. Ingresar al directorio: 'cd NOMBRE-DIRECTORIO'
3. Instalar las dependencias: 'npm install'

Uso.

La aplicación debe ejecutarse de manera local, corriendo el comando 'node app.js' en la terminal
que usted esté utilizando.

Endpoints.

#Crear usuario

Ruta: '/CRUD/CREATE'
Método: 'POST'
Cuerpo de la solicitud:
{
  "id": "1234",
  "nombre": "Ejemplo",
  "edad": 30
}

#Obtener Lista de Usuarios
Ruta: /CRUD/READ
Método: GET

#Obtener Usuario por ID
Ruta: /CRUD/READ/:id
Método: GET

#Actualizar Usuario por ID
Ruta: /CRUD/UPDATE/:id
Método: PUT
Cuerpo de la Solicitud:
{
  "newId": "5678",
  "nombre": "NuevoEjemplo",
  "edad": 35
}

#Eliminar Usuario por ID
Ruta: /CRUD/DELETE/:id
Método: DELETE

Este proyecto no es un proyecto completo, y el manejo de errores no está contemplado en el desarrollo
de esta aplicación.
