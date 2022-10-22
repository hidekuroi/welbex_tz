const db = require('../db')

class itemController {
    async createItem(req, res) {
        try{
            const {title, amount, distance} = req.body

            const newItem = await db.query(`INSERT INTO item (title, amount, distance, date) values ($1, $2, $3, current_date) RETURNING *`, [title, amount, distance])

            return res.json(newItem.rows[0])
        } catch(e) {
            res.status(500).json(e)
        }
    }
    async getItems(req, res) {
        try{
            let {limit, page, key, condition, value} = req.query
            limit = limit || 10
            page = page || 1
            const offset = page * limit - limit

            if(key && condition && value) {
                switch (condition) {
                    case 'equal':
                        condition = '='
                        break;
                    case 'contains':
                        key = `CAST(${key} AS TEXT)`
                        condition = `ILIKE`
                        value = `'%${value}%'`
                        break;
                    case 'greater':
                        condition = '>='
                        break;
                    case 'less':
                        condition = '<='
                        break;
                    default:
                        break;
                }

                const totalCount = await db.query(`
                SELECT COUNT(*) FROM item 
                WHERE ${key} ${condition} ${value}
                `)

                const items = await db.query(`
                SELECT * FROM item 
                WHERE ${key} ${condition} ${value} 
                ORDER BY id LIMIT ${limit} 
                OFFSET ${offset}
                `)

                return res.json({items: items.rows, count: totalCount.rows[0].count})
            }
            else {
                const totalCount = await db.query(`
                SELECT COUNT(*) FROM item
                `)

                const items = await db.query(`
                SELECT * FROM item
                ORDER BY id LIMIT ${limit} OFFSET ${offset}
                `)

                return res.json({items: items.rows, count: totalCount.rows[0].count})
            }
        } catch(e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new itemController()