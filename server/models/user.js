import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const SALT_WORK_FACTOR = 10;


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(undefined, isMatch);
    });
};

const User = mongoose.model('users', UserSchema);
module.exports = User;

