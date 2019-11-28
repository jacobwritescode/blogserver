const global = require('../helpers/global')
const globalfunctions = require('../helpers/globalFunctions')


const schema = global.mongoose.Schema;

const UserSchema = new schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    salt: String,
    token: String
});


UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) { return next() };
    var salt = global.crypto.randomBytes(8).toString('hex')
    var encryptedPassword = globalfunctions.encryptPass(globalfunctions.haveValue(user.password), salt)
    user.password = encryptedPassword;
    user.salt = salt
    next();
}, function (err) {
    next(err)
})

UserSchema.methods.comparePassword = function (candidatePassword, next) {
    var salt = this.salt
    var encryptedPassword = globalfunctions.encryptPass(globalfunctions.haveValue(candidatePassword), salt)
    if (encryptedPassword === this.password) {
        next(null, true)
    } else next(null,false)
}


const UserModel = global.mongoose.model('User', UserSchema);
module.exports = { UserModel };