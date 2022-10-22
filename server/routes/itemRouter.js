const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')

router.post('/', itemController.createItem)
router.get('/', itemController.getItems)

module.exports = router