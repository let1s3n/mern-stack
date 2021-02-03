const { Router } = require('express');
const router = Router();
const { getUsers,createUser,deleteUser } = require('../controllers/users.controllers');


router.route('/')
  .get(getUsers)
  .put(createUser)

router.route('/:id')
  
  .delete(deleteUser)


module.exports = router;