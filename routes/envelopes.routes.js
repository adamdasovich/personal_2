const express = require('express');
const router = express.Router();
const middleware = require('../middleware/envelopeId');
const envelopesControllers = require('../controllers/envelope.controllers');

router.use('/:id', middleware);

router.get('/', envelopesControllers.getAllEnvelopes);
router.get('/:id', envelopesControllers.getEnvelope);
router.post('/', envelopesControllers.createEnvelope);
router.put('/:id', envelopesControllers.updateEnvelope);
router.delete('/:id', envelopesControllers.deleteEnvelope);
router.delete('/', envelopesControllers.deleteAllEnvelopes);
router.put('/:id/transfer', envelopesControllers.transferMoney)

module.exports = router;
