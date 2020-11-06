/* eslint-disable */

const { SiteClient } = require('datocms-client')
const client = new SiteClient('7cb43e824fe1faf51e0931012e69dd')
const fs = require('fs')
const itemId = '9650724'

let data = []

async function getAll() {

 await client.items
    .all({
        filter: {
            type: 'product'
        }
    })
    .then(res => {
        fs.writeFileSync('./admin-tools/items.json', JSON.stringify(res))
    })
    .catch(err => console.error(err))
}
getAll()
