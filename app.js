const express = require("express");

const app = express();
const router = express.Router();

const users = [
    {id: 3423, nombre: 'pepito', edad: 25},
    {id: 1231, nombre: 'juanito', edad: 75},
    {id: 5543, nombre: 'dibu', edad: 22},
    {id: 1122, nombre: 'messi', edad: 12},
    {id: 1142, nombre: 'yo', edad: 43}
];

app.use(express.json());

//CREATE
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

router.get('/READ', (req, res) => {
    try {
        return res.status(200).json(users);
    } catch(err) {
        return res.status(500).json({error:'Hubo un error al intentar mostrar los usuarios.', details:err.message});
    }
})

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