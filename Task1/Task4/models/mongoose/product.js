import db, {mongoose} from "./index";

const productSchema = mongoose.Schema({
  id: String,
  displayName: String,
  lastModifiedDate: {
    type: Date,
    default: Date.now
  }
});

productSchema.pre('save', function preSave(next) {
  this.lastModifiedDate = Date.now();
  next();
});

const Product = db.model('Product', productSchema);

const initialData = [
  new Product({
    id: "sku1",
    displayName: "skuName1"
  }),
  new Product({
    id: "sku2",
    displayName: "skuName2"
  })
];

initialData.forEach((item) => {
  item.save((err, product) => {
    if (err) throw new Error(err);
    console.log(`Product ${product.id} is added to MongoDB`);
  });
});

export default Product;