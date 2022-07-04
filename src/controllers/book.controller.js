const Book = require("../models/book.model");

module.exports = {
    create: async(req, res, next) => {
        let {title, image, category, quantity, price, description} = req.body;
        try {
            const newBook = await Book.create({title, image, category, quantity, price, description});
            res.status(201).json({msg: "Created Successful!", newBook})
        } catch (error) {
            res.status(500).json({msg: "server error!"});
        }
    }, 

    update: async(req, res, next) => {
        let {_id, title, image, category, quantity, price, description} = req.body;
        try {
            const book = await Book.findByIdAndUpdate(_id, {title, image, category, quantity, price, description}, {
                new: true
            });
            res.status(201).json({msg: "Updated Successful!", book})
        } catch (error) {
            res.status(500).json({msg: "server error!"});
        }
    },

    delete: async(req, res, next) => {
        let {_id} = req.body;
        try {
            const deleteBook = await Book.findByIdAndDelete(_id);
            res.status(200).json({msg: "Deleted Successful!"});
        } catch (error) {
            res.status(500).json({msg: "server error!"});
        }
    },

    get: async(req, res, next) => {
        const {page, limit} = req.query;
        const options = {
            page, limit
        };
        Book.paginate({}, options, function (err, result) {
            if(err){
                res.status(500).json({msg: "server error!"});
            }
            res.json(result)
        });
    }
}
