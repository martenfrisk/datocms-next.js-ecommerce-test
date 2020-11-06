/* eslint-disable */

const {
    SiteClient
} = require('datocms-client')
const client = new SiteClient('7cb43e824fe1faf51e0931012e69dd')
const products = require('./items.json')

const itemId = '9650724'


async function update() {
    products.forEach(product => {
        client.items
            .update(product.id, {
                platform: 'Playstation'
            })
            .then(item => console.log(item))
            .catch(err => console.error(err))
        }
    )
}

update()