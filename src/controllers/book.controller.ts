import Book from "../models/book.model";

export default {
  create: async (req: any, res: any, next: any) => {
    let { title, image, category, quantity, price, description } = req.body;
    try {
      const newBook = await Book.create({
        title,
        image,
        category,
        quantity,
        price,
        description,
      });
      res.status(201).json({ msg: "Created Successful!", newBook });
    } catch (error) {
      res.status(500).json({ msg: "server error!" });
    }
  },

  update: async (req: any, res: any, next: any) => {
    let { _id, title, image, category, quantity, price, description } =
      req.body;
    try {
      const book = await Book.findByIdAndUpdate(
        _id,
        { title, image, category, quantity, price, description },
        {
          new: true,
        }
      );
      res.status(201).json({ msg: "Updated Successful!", book });
    } catch (error) {
      res.status(500).json({ msg: "server error!" });
    }
  },

  delete: async (req: any, res: any, next: any) => {
    let { _id } = req.body;
    try {
      const deleteBook = await Book.findByIdAndDelete(_id);
      res.status(200).json({ msg: "Deleted Successful!" });
    } catch (error) {
      res.status(500).json({ msg: "server error!" });
    }
  },

  get: async (req: any, res: any, next: any) => {
    const { page, limit } = req.query;
    const options = {
      page,
      limit,
    };
    Book.paginate({}, options, function (err: any, result: any) {
      if (err) {
        res.status(500).json({ msg: "server error!" });
      }
      res.json(result);
    });
  },
};
