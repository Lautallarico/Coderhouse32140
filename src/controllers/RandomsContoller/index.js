import { fork } from 'child_process'

const randoms = (req, res) => {
    const cant = req.query.cant || 100000
    const subProcess = fork('./src/utils/randomNumbers.js')

    subProcess.send(cant)

    subProcess.on('message', (numbers) => {

        res.render('randoms.hbs', { data: numbers })
    })

}

export const RandomsControllers = { randoms }