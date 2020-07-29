const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema({
    identification_number: { type: String, required: true, unique: true},
    issue_by: { type: String },
    prefix_name: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    desired:{
        position: { type: String },
        department: { type: String },
    },
    personal:{
        birthdate: { type: String },
        gender: { type: String },
        race: { type: String },
        nationality: { type: String },
        religion: { type: String },
        marital_status: { type: String },
        domicile: { type: String },
        address: { type: String },
        phone: { type: String },
        mobile: { type: String, required: true},
        email: { type: String},
        emergency_prefix_name: { type: String},
        emergency_first_name: { type: String},
        emergency_last_name: { type: String},
        emergency_concerned: { type: String},
        emergency_phone: { type: String}
    },
    education:{
        university: { type: String},
        degree: { type: String},
        major: { type: String},
        minor: { type: String},
        completed_course: { type: String},
        avgscore: { type: String}
    },
    job:{
        current_occupation: { type: String },
        current_company: { type: String },
        current_section: { type: String },
        current_position: { type: String },
        current_salary: { type: String },
        current_phoneoffice_number: { type: String },
        history_company: { type: String },
        history_position: { type: String },
        history_salary: { type: String },
        history_startofwork: { type: String },
        history_endofwork: { type: String },
        history_reason4leaving: { type: String },
        license_name: { type: String },
        license_start: { type: String },
        license_expire: { type: String }
    },
    //covid19workdetail: { type: String },
    covid19workdetail_1: { type: String },
    covid19workdetail_2: { type: String },
    covid19workdetail_3: { type: String },
    covid19workdetail_4: { type: String },
    covid19workdetail_5: { type: String },
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);