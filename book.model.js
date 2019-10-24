let mongoose = require('mongoose');
const bcrypt = require("bcrypt");
let Schema = mongoose.Schema;

let BookSchema = new Schema({
    name: String,
    email: String,
    mobile_number: Number,
    address: String,
    password: String
}, {
    // http://mongoosejs.com/docs/guide.html#timestamps
    timestamps: true
});

BookSchema.pre('save', function (next) {
    if (this.password) {
        let salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    next()
});
module.exports = mongoose.model('mydb', BookSchema);
