
const { MONGODB_DATABASE } = process.env
const {MONGODB_PASSWORD} = process.env
const MONGODB_URI = `mongodb+srv://${MONGODB_PASSWORD}/${MONGODB_DATABASE}`

const Config = {
    db: {
        name: 'ecommerce',
        collection: 'products',
        cnxStr: MONGODB_URI,
        projection: { __v: 0 }

    }
}

module.exports = Config