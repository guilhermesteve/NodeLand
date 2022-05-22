const { v4: uuid } = require('uuid')
const Jimp = require('jimp')
const Ad = require('../models/Ad');
const Category = require('../models/Category')
const User = require('../models/User');
const State = require('../models/State');

const addImage = async (buffer) => {
    let newName = `${uuid()}.jpg`
    let tmp = await Jimp.read(buffer)

    tmp.resize(500, Jimp.AUTO).quality(80).write(`./public/media/${newName}`)

    return newName;
}

const Ads = {
    getCategories: async (req, res) => {
        const cats = await Category.find()

        let categories = [];

        for (let i in cats) {
            categories.push({
                ...cats[i]._doc,
                img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
            })
        }

        res.json({ categories })

    },
    getList: async (req, res) => {
        let { sort = 'asc', offset = 0, limit = 8, q, cat, state } = req.query

        filters = { status: true }

        if (q) {
            filters.title = { '$regex': q, '$options': 'i' }
        }

        if (cat) {
            const c = await Category.findOne({ slug: cat })
            if (c) {
                filters.category = c._id.toString()
            }
        }

        if (state) {
            const s = await State.findOne({ name: state.toUpperCase() }).exec()
            if (s) {
                filters.state = s._id.toString()
            }
        }
        const total = (await Ad.find(filters)).length
        const adData = await Ad.find(filters)
            .sort({ dateCreated: sort == 'asc' ? 1 : -1 })
            .skip(parseInt(offset))
            .limit(parseInt(limit))
            .exec()

        let adList = []
        for (let i in adData) {

            const imgDefault = adData[i].images.find(e => e.default)

            if (imgDefault) {
                adData[i].images = `${process.env.BASE}/media/${imgDefault.url}`
            } else {
                adData[i].images = `${process.env.BASE}/media/default.jpg`

            }
            adList.push({ ...adData[i]._doc })
        }

        res.json({ adList, total })

    },
    getItem: async (req, res) => {
        let { id, other = null } = req.query

        if (!id) {
            return res.json({ error: 'sem produto' })
        }

        const ad = await Ad.findById(id)

        if (!ad) {
            return res.json({ error: 'sem produto' })
        }

        ad.views++
        await ad.save()


        let images = []


        for (let i in ad.images) {
            images.push(`${process.env.BASE}/media/${ad.images[i].url}`)
        }

        const category = await Category.findById(ad.category)

        const userInfo = await User.findById(ad.idUser)

        const state = await State.findById(ad.state)

        res.json({
            id: ad._id,
            title: ad.title,
            price: ad.price,
            priceNegotiable: ad.priceNegotiable,
            description: ad.description,
            dateCreated: ad.dateCreated,
            views: ad.views,
            images,
            category,
            state: state.name,
            userInfo: { name: userInfo.name, email: userInfo.email }
        })

    },
    addAction: async (req, res) => {
        const token = req.token
        let { title, price, priceneg, desc, cat } = req.body
        const user = await User.findOne({ token })

        price = price ? parseFloat(price.replace('.', '').replace(',', '.')) : 0

        const newAdd = new Ad();

        newAdd.status = true;
        newAdd.idUser = user._id
        newAdd.state = user.state
        newAdd.dateCreated = new Date()
        newAdd.title = title
        newAdd.category = cat;
        newAdd.price = price;
        newAdd.priceNegotiable = priceneg === 'true' ? true : false
        newAdd.description = desc;
        newAdd.views = 0;

        if (req.files && req.files.img) {
            if (!req.files.img.length) {
                const imgUrl = await addImage(req.files.img.data)
                newAdd.images.push({
                    url: imgUrl,
                    default: false
                })
            } else {
                for (let i = 0; i < req.files.img.length; i++) {
                    const imgUrl = await addImage(req.files.img[i].data)
                    newAdd.images.push({
                        url: imgUrl,
                        default: false
                    })

                }
            }
        }

        if (newAdd.images.length > 0) {
            newAdd.images[0].default = true;
        }


        await newAdd.save();

        res.status(201).json({ ad: newAdd })

    },
    editAction: async (req, res) => {
        const token = req.token
        let { id } = req.params
        let { title, status, price, cat, priceneg, desc, images } = req.body

        if (!id) {
            return res.json({ error: "id inválido" })
        }

        const ad = await Ad.findById(id)

        if (!id) {
            return res.json({ error: "ad não encontrado" })
        }

        const user = await User.findOne({ token })

        if (user._id.toString() !== ad.idUser) {
            return res.json({ error: "Sem permissão para alterar anúncio" })
        }


        let updates = {}

        if (title) {
            updates.title = title
        }

        if (price) {
            updates.price = parseFloat(price.replace('.', '').replace(',', '.'))
        }

        if (priceneg) {
            updates.priceNegotiable = priceneg
        }

        if (desc) {
            updates.description = desc
        }

        if (cat) {
            let c = await category.findOne({ slug: cat })
            if (!c) {
                return res.json({ error: "categoria não existe" })
            }
            updates.category = c._id
        }

        if(status){
            updates.status = status
        }

        if(images){
            updates.images = images;
        }


        await Ad.findByIdAndUpdate(id, { $set: updates})

        // TODO : novas imagens

        res.json({updates})

    }
}


module.exports = Ads;