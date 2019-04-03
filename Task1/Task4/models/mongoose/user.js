import db, {mongoose} from "./index";

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: {
    type: String,
    match: /.*?@.*?\..*?/
  },
  lastModifiedDate: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function preSave(next) {
  this.lastModifiedDate = Date.now();
  next();
});

 const User = db.model('User', userSchema);

const initialData = [
  new User({
    username: "userName1",
    password: "qwerty",
    email: "user1@gmail.com"    
  }),
  new User({
    username: "userName2",
    password: "password",
    email: "user1@gmail.com"
  })
];

initialData.forEach((item) => {
  item.save((err, user) => {
    if (err) throw new Error(err);
    console.log(`User ${user.username} is added to MongoDB`);
  });
});

export default User;