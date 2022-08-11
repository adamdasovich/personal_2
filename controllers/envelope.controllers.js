const envelopes = require('../db/envelopes')

let id = envelopes.length;

const getAllEnvelopes = (req, res) => {
    res.json(envelopes)
}

const getEnvelope = (req, res) => {
    res.json(envelopes[req.envelopeIndex])
}

const createEnvelope = (req, res) => {
    const { name, budget } = req.body
    id++
    if (name && budget) {
        envelopes.push({ id, name, budget })
        res.status(200).json(envelopes)
    } else {
        res.status(400).json({ msg: 'Something is wrong' })
    }
}

const updateEnvelope = (req, res) => {
    const { name, budget } = req.body
    if (name && budget) {
        envelopes[req.envelopeIndex].name = name
        envelopes[req.envelopeIndex].budget = budget
        res.status(201).json({ msg: 'envelope has been updated' })
    } else {
        res.status(400).json({ msg: 'something fucked up' })
    }
}

const deleteAllEnvelopes = (req, res) => {
    envelopes.length = 0;
    res.status(202).send('All envelopes have been deleted')
}

const deleteEnvelope = (req, res) => {
    envelopes.splice(req.envelopeIndex, 1)
    res.status(202).send('One envelope has been deleted')
}

const transferMoney = (req, res) => {
    const { target, amount } = req.body;
    const targetIndex = envelopes.findIndex(env => env.id === parseInt(target))
    if (targetIndex === -1) {
        res.status(404).json({ msg: `Envelope with id: ${target} not found.` })
    } else if (req.envelopeIndex === targetIndex) {
        res.status(400).json({ msg: 'Sorry you cannot transfer to the same account' })
    } else if (!(target && amount)) {
        res.status(404).json({ msg: 'please include the amount you want to transfer.' })
    } else if (envelopes[req.envelopeIndex].budget < amount) {
        res.status(400).json({ msg: 'not enough funds for this transaction' })
    } else {
        envelopes[req.envelopeIndex].budget -= amount;
        envelopes[targetIndex].budget += amount;
        res.json([envelopes[req.envelopeIndex], envelopes[targetIndex]])
    }
}

module.exports = {
    deleteEnvelope,
    deleteAllEnvelopes,
    createEnvelope,
    updateEnvelope,
    getEnvelope,
    getAllEnvelopes,
    transferMoney
}