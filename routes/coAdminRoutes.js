const express = require('express');
const router = express.Router();
const coAdminController = require('../controller/coAdminController');

router.get('/', coAdminController.getAllCoAdmins);
router.get('/:id', coAdminController.getCoAdminById);
router.post('/', coAdminController.createCoAdmin);
router.put('/:id', coAdminController.updateCoAdmin);
router.delete('/:id', coAdminController.deleteCoAdmin);

module.exports = router;
