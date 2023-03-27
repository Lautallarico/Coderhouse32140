
import { DATE_UTILS, EMAIL_UTILS, ERRORS_UTILS } from '../../utils/index.js'
import { CartDao, ProductDao } from '../../dao/index.js'
import logger from '../../loggers/loggers.js'
import { SEND_WHATSAPP } from '../../utils/whatsapp.js'
import { config } from '../../config/index.js'


const saveCart = async (req, res) => {
    try {
        const startCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] }
        const cart = await CartDao.saveCart(startCart)
        res.send({ success: true, cartId: cart.id })
    } catch (error) {
        console.log(error, `error from saveCart`);
        logger.error('error desde el saveCart')
        res.send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_CART })
    }
}

const updatedCartById = async (req, res) => {
    try {
        const { productId } = req.body
        const { cartId } = req.params


        const cart = await CartDao.getCartById(cartId)
        if (!cart) return res.status(404).send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART })

        const product = await ProductDao.getProductById(productId)
        if (!product) return res.status(404).send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })

        cart.products.push(product)

        const updatedCart = await CartDao.updateCartById(cartId, cart)

        res.status(200).send({ success: true, cart: updatedCart, message: "Carrito actualizado correctamente" })

    } catch (error) {
        
        logger.error('error desde el updatedCartById')
        res.status(404).send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_CART })

    }
}

const deleteCart = async (req, res) => {
    try {
        const { cartId } = req.params

        const cart = await CartDao.deleteCartById(cartId)
        if (!cart) return res.status(404).send({ success: false, message: DATE_UTILS.MESSAGES.NO_CART })

        res.status(204).send({ success: true, message: "Carrito eliminado con éxito" })

    } catch (error) {
        console.log(error, `error from deleteCart`);
        logger.error('error desde el deleteCart')
        res.send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_CART })
    }
}

const deleteProductFromCart = async (req, res) => {
    try {
        const { cartId } = req.params
        const { id_prod } = req.params

        const cart = await CartDao.getCartById(cartId)
        if (!cart) { res.status(404).send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART }) }
        else {
            const product = await ProductDao.getProductById(id_prod)
            if (!product) return res.status(404).send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })

            const foundElementIndex = cart.products.findIndex(element => element._id == id_prod)
            if (foundElementIndex === -1) return res.status(404).send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })
            cart.products.splice(foundElementIndex, 1)

            res.status(200).send({ success: true, message: `Se elimino del carrito ${cartId} el producto con el ID ${id_prod}` })
        }

        const updatedCart = await CartDao.updateCartById(cartId, cart)
        res.status(200).send({ success: true, cart: updatedCart })

    } catch (error) {
        
        logger.error('error desde el deleteProductFromCart')
        res.status(404).send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_CART })

    }
}

const productsInCart = async (req, res) => {
    try {
        const { cartId } = req.params

        const cart = await CartDao.getCartById(cartId)
        if (!cart) return res.status(404).send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART })

        const productsInCart = await cart.products

        res.status(200).send({ success: true, productsInCart: productsInCart })

    } catch (error) {
        console.log(error, `error from productsInCart`);
        logger.error('error desde el productsInCart')
        res.status(404).send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_CART })
    }

}

const cartById = async (req, res) => {
    try {
        const { id } = req.params

        const cart = await CartDao.getCartById(id)

        if (!cart) {
            return res.status(404).send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_CART })
        }

        res.status(200).send({ success: true, data: cart, message: "Carrito localizado" })

    } catch (error) {

        logger.error('error desde el cartById')
        res.status(404).send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_CART })
    }
}

const buyCart = async (req, res) => {
    try {

        const { id } = req.params

        const cart = await CartDao.getCartById(id)
        if (!cart) return res.status(404).send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART })

        let subject = 'Nuevo pedido!'
        let mailTo = config.MAIL.USER
        let listProducts = cart.products.map(({ title }) => (
            `
            <li>${title}</li>
            `
        )).join('')



        let html = `
                        <h3>Nuevo pedido!!</h3>
                        <p> Datos:</p>
                        <ul>
                            ${listProducts}
                        </ul>
                    `



        await EMAIL_UTILS.sendEmail(mailTo, subject, html)

        const options = {
            body: `Nuevo pedido!`
        }

        await SEND_WHATSAPP.whatsappConfig(options)

        res.status(200).send({ success: true, data: cart, message: "Enviamos un whatsapp y mail al vendedor para que pueda despachar el pedido" })

    } catch (error) {

        logger.error('error desde el cartById')
        res.status(404).send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_CART })
    }
}

export const CartController = { saveCart, updatedCartById, deleteCart, deleteProductFromCart, buyCart, productsInCart, cartById }