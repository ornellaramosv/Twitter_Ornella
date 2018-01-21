const express = require('express');
const router = express.Router();
const controller = require('./controller');

/*
 * /api/advertisements/     GET    - READ ALL
 * /api/advertisements/     POST   - CREATE
 * /api/advertisements/:id  GET    - READ ONE
 * /api/advertisements/:id  PUT    - UPDATE
 * /api/advertisements/:id  DELETE - DELETE
 */

router.route('/')
    .get(controller.all)
    .post(controller.create)

router.param('id', controller.find)

router.route('/:id')
    .get(controller.get)
    .put(controller.update)
    .delete(controller.delete)

module.exports = router;