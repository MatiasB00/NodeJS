const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//Información metadata sobre la API
const options = {
    definition: {
        openapi: "3.0.0",
        info: {title: 'API Crud Básico', version: '1.0.1'},
    },
    apis : ['./app.js']
};
//Docs en JSON format
const swaggerSpec = swaggerJSDoc(options);




const app = express();
const router = express.Router();
app.use('api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

const users = [
    {id: 3423, nombre: 'pepito', edad: 25},
    {id: 1231, nombre: 'juanito', edad: 75},
    {id: 5543, nombre: 'dibu', edad: 22},
    {id: 1122, nombre: 'messi', edad: 12},
    {id: 1142, nombre: 'yo', edad: 43}
];



//CREATE
/**
 * @swagger
 * /CRUD/CREATE:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Crea un nuevo usuario con la información proporcionada.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               edad:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Éxito, se ha creado un nuevo usuario.
 *       500:
 *         description: Error al intentar crear un nuevo usuario.
 */
router.post('/CREATE', (req, res) => {
    const { id, nombre, edad } = req.body;

    try {
        const newUser = {id: id, nombre: nombre, edad: edad};
        users.push(newUser);
        return res.status(200).json('Se ha ingresado un nuevo usuario!');
    }
    catch(err) {
        return res.status(500).json({error: 'Se ha producido un error al intentar crear un nuevo usuario.', details:err.message});
    }
});

//READ
/**
 * @swagger
 * /CRUD/READ:
 *   get:
 *     summary: Listado de usuarios.
 *     description: Muestra todos los usuarios cargados en el sistema.
 *     responses:
 *       200:
 *         description: Éxito, se mostraron los usuarios.
 *       500:
 *         description: Error al intentar mostrar los usuarios.
 */
router.get('/READ', (req, res) => {
    try {
        return res.status(200).json(users);
    } catch(err) {
        return res.status(500).json({error:'Hubo un error al intentar mostrar los usuarios.', details:err.message});
    }
})
/**
 * @swagger
 * /CRUD/READ/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     description: Obtiene la información de un usuario específico según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Éxito, devuelve la información del usuario.
 *       500:
 *         description: Error al intentar obtener la información del usuario.
 */
router.get('/READ/:id', (req, res) => {
    const { id } = req.params;

    try {
        const searchedUser = users.find((user) => {return user.id == id});
        return res.status(200).json(searchedUser);
    } catch(err) {
        return res.status(500).json({error: 'Hubo un error al intentar mostrar el usuario.', details:err.message});
    }
})

//UPDATE
/**
 * @swagger
 * /CRUD/UPDATE/{id}:
 *   put:
 *     summary: Actualiza la información de un usuario por ID
 *     description: Actualiza la información de un usuario específico según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newId:
 *                 type: integer
 *                 description: Nuevo ID del usuario.
 *               nombre:
 *                 type: string
 *                 description: Nuevo nombre del usuario.
 *               edad:
 *                 type: integer
 *                 description: Nueva edad del usuario.
 *     responses:
 *       200:
 *         description: Éxito, la información del usuario ha sido actualizada.
 *       500:
 *         description: Error al intentar actualizar la información del usuario.
 */
router.put('/UPDATE/:id', (req, res) => {
    const { newId, nombre, edad } = req.body;
    const { id } = req.params;

    try {
        const newUser = {id: newId, nombre: nombre, edad: edad};
        const index = users.findIndex((user) => {
            console.log(user.id, id)
            return Number(user.id) === Number(id);
        });
        console.log(index);
        users[index] = newUser;

        return res.status(200).json({msg: `El usuario ${id} fue actualizado con éxito.`, newUser})
    } catch (err) {
        return res.status(500).json({error:`Hubo un error al actualizar el usuario ${id}:`, details: err.message});
    };

});

//DELETE
/**
 * @swagger
 * /CRUD/DELETE/{id}:
 *   put:
 *     summary: Elimina un usuario por ID.
 *     description: Elimina un usuario específico según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Éxito, el usuario ha sido eliminado.
 *       500:
 *         description: Error al intentar eliminar la información del usuario.
 */
router.delete('/DELETE/:id', (req, res) => {
    const { id } = req.params;

    try {
        const indexOfUser = users.findIndex((user) => Number(user.id) === Number(id));
        users.splice(indexOfUser, 1);
        return res.status(200).json(`El usuario ${id} fue eliminado con éxito.`)
    } catch(err) {
        return res.status(500).json({error:'Hubo un error al borrar el usuario.', details:err.details})
    };
});


app.use('/CRUD', router);

app.listen(3000, ()=> {
    console.log('Escuchando en el puerto 3000')
});
