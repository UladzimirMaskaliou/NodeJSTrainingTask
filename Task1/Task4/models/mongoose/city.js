import db, {mongoose} from "./index";

const citySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Why no name?']
  },
  country: String,
  capital: {
    type: Boolean,
    default: false
  },
  location: {
    lat: Number,
    long: Number
  },
  lastModifiedDate: {
    type: Date,
    default: Date.now
  }
});

citySchema.pre('save', function preSave(next) {
  this.lastModifiedDate = Date.now();
  next();
});

const City = db.model('City', citySchema);

const initialData = [
  new City({
    name: "Brest",
    country: "Belarus",
    location: {
      lat: 52.097621,
      long: 23.734051
    }
  }),
  new City({
    name: "Minsk",
    country: "Belarus",
    capital: true,
    location: {
      lat: 53.893009,
      long: 27.567444
    }
  }),  
  new City({
    name: "Grodno",
    country: "Belarus",
    location: {
      lat: 53.688400,
      long: 23.825800
    }
  })
];

initialData.forEach((item) => {
  item.save((err, city) => {
    if (err) throw new Error(err);
    console.log(`City ${city.name} is added to MongoDB`);
  });
});

export default City;