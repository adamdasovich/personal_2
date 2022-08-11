const envelopes = require('../db/envelopes')

module.exports = (req, res, next) => {
    const id = req.params.id
    const envelopeIndex = envelopes.findIndex(envelope => envelope.id === parseInt(id))

    if (envelopeIndex == -1) {
        res.status(400).send('Does not exist.')
    } else {
        req.envelopeIndex = envelopeIndex;
        next()
    }
}