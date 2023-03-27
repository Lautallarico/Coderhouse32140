import { ProductDao } from '../../dao/index.js'
import logger from '../../loggers/loggers.js'
import { DATE_UTILS, ERRORS_UTILS, JOI_VALIDATOR } from '../../utils/index.js'


const getAll = async (req, res) => {
    try {

        const allProducts = await ProductDao.getAllProducts()
        res.status(200).send({ success: true, data: allProducts })

    } catch (error) {

        logger.error('error desde el getAll: ' + error)
        res.status(404).send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })

    }
}

const getById = async (req, res) => {
    try {

        const { id } = req.params
        const product = await ProductDao.getProductById(id)

        if (!product) {
            return res.status(404).send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })
        }

        res.status(200).send({ success: true, data: product, message: "Producto localizado" })

    } catch (error) {

        logger.error(error, `error from getById`)
        res.status(404).send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })
    }
}

const createProduct = async (req, res, cb) => {
    try {

        const { title, description, code, price, thumbnail, stock } = req.body

        const product = await JOI_VALIDATOR.product.validateAsync({ title, description, code, price, thumbnail, stock, timestamp: DATE_UTILS.getTimestamp(), })
        const savedProduct = await ProductDao.saveProduct(product)

        res.status(200).send({ success: true, data: savedProduct, message: "El producto fue creado con éxito" })

    } catch (error) {

        logger.error(error, `error from createProduct`);
        res.status(400).send({ success: false, data: undefined, message: "No pudimos crear el producto" })

    }
}

const deleteProduct = async (req, res) => {
    try {

        const { id } = req.params
        const product = await ProductDao.deleteProductById(id)

        if (!product) {
            return res.status(404).send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })
        }

        res.status(200).send({ success: true, message: "El producto fue eliminado" })

    } catch (error) {

        logger.error(error, `error from deleteProduct`)
        res.status(404).send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })

    }

}



export const ProductController = { getAll, getById, createProduct, deleteProduct }
