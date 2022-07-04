import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["drama", "comedy", "sport"],
    default: "drama",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

bookSchema.plugin(mongoosePaginate);

export default mongoose.model<
  mongoose.Document,
  mongoose.PaginateModel<mongoose.Document>
>("book", bookSchema);
