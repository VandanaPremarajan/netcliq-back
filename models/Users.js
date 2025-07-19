const mongoose = require('mongoose');
const ROLES = require('../constants/roles');
const SubscribersSchema = new mongoose.Schema({
    first_name : {
        type: String,
        required: true
    }, 
    last_name : {
        type: String,
        required: true
    }, 
    phone_number : {
        type: String,
        required: true
    }, 
    email_address : {
        type: String,
        required: true
    }, 
    password : {
        type: String,
        required: true
    }, 
    profile_pic : {
        type: String,
        required: true
    }, 
    role: { 
        type: String, 
        enum: Object.values(ROLES),
        default: ROLES.SUBSCRIBER
    }, 
    is_active : {
        type: Boolean,
        required: true
    }

}, { timestamps: true });
module.exports = mongoose.model('Subscribers', SubscribersSchema);