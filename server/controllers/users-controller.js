const { v4: uuidv4 } = require('uuid');
const HttpError = require('./../models/http-error');
const { validationResult } = require('express-validator');
//const mongoose = require('mongoose');
const User = require('./../models/userSchema');

let dummy = [
    {
        id: '1',
        identification_number: '1419900053898',
        prefixname: 'นาย',
        firstname: 'ชานนท์',
        lastname: 'หงษ์ทอง',
        birthdate: '27/01/2529',
        personal:{
            gender: 'ชาย',
            nationlity: 'ไทย',
            address: '215/102 หมู่บ้านคุณาลัยจอย หมู่ที่7 ตำบลพิมลราช อำเภอบางบัวทอง จังหวัดนนทบุรี 11110',
        },
        job:{
            current_occupation: 'พนักงานราชการ',
            current_salary: '19500',
            past_occupation: 'โปรแกรมเมอร์',
            past_salary: '28500',
            reason4leaving: 'สอบได้เป็นพนักงานราชการตำแหน่งนักวิชาการคอมพิวเตอร์ที่กรมการแพทย์'
        },
        covid19work: '',
        allowstatus: 1,
    }
  ]
  
const getUserById = async (req, res, next) => {
    const userid = req.params.uid;
    // const user = dummy.find( u=> {
    //   return u.id === userid;
    // })
    let user;
    try{
      user = await User.findById(userid);
    } catch (err) {
      throw new HttpError('Could not find a user for the provided',500);
    }
    res.json({user});
}

const getUserByIdentification = async (req, res, next) => {
    const identification_number = req.params.pid;

    let user;
    try{
      user = await User.find({ identification_number:  identification_number});
    } catch{
      throw new HttpError('Could not find a user for the provided',500);
    }
    res.json({user}); // => { user } => { user: user}
}

const createUser = async (req, res, next) => {
  const {
    identification_number,
    mobile
  } = req.body;

  // const hasUser = dummy.find(u => u.identification_number === identification_number);
  // if(hasUser){
  //   throw new HttpError('Could not create user becouse user already exists',401);
  // }
  let existUser;
  try{
    existUser = User.findOne({identification_number: identification_number});
  } catch (err) {
    throw new HttpError('Create User failed because exist user', 500);
  }

  const createUser = new User ({
     //id: uuidv4(),
      identification_number: identification_number,
      issue_by: '',
      prefix_name: '',
      first_name: '',
      last_name: '',
      desired:{
          position: '',
          department: '',
      },
      personal:{
          birthdate: '',
          gender: '',
          race: '',
          nationality: '',
          religion: '',
          marital_status: '',
          domicile: '',
          address: '',
          phone: '',
          mobile: mobile,
          email: ''
      },
      education:{
          university: '',
          degree: '',
          major: '',
          minor: '',
          completed_course: '',
          avgscore: ''
      },
      job:{
          current_occupation: '',
          current_company: '',
          current_section: '',
          current_position: '',
          current_salary: '',
          current_phoneoffice_number: '',
          history_company: '',
          history_position: '',
          history_salary: '',
          history_startofwork: '',
          history_endofwork: '',
          history_reason4leaving: '',
          license_name: '',
          license_start: '',
          license_expire: ''
      },
      //covid19workdetail: '',
      covid19workdetail_1: '',
      covid19workdetail_2: '',
      covid19workdetail_3: '',
      covid19workdetail_4: '',
      covid19workdetail_5: ''
  });

  // dummy.push(createUser);

  // const createUser = new User({
  //   identification_number,
  //   mobile
  // })

  let user;
  try{
    user = await createUser.save()
  } catch (err) {
    throw new HttpError('Create User failed, please check and try agine,'+err, 500);
  }
  res.status(201).json(user);
}

const updateUserById = async (req, res, next) => {
  const {
      issue_by,
      prefix_name,
      first_name,
      last_name,
      position,
      department,
      birthdate,
      gender,
      race,
      nationality,
      religion,
      marital_status,
      domicile,
      address,
      phone,
      mobile,
      email,
      emergency_prefix_name,
      emergency_first_name,
      emergency_last_name,
      emergency_concerned,
      emergency_phone,
      university,
      degree,
      major,
      minor,
      completed_course,
      avgscore,
      current_occupation,
      current_company,
      current_section,
      current_position,
      current_salary,
      current_phoneoffice_number,
      history_company,
      history_position,
      history_salary,
      history_startofwork,
      history_endofwork,
      history_reason4leaving,
      license_name,
      license_start,
      license_expire,
      covid19workdetail_1,
      covid19workdetail_2,
      covid19workdetail_3,
      covid19workdetail_4,
      covid19workdetail_5,
  } = req.body;
  
  const userId = req.params.uid;
  
  //const updateUser = { ...dummy.find( u => u.id === userId)};
  //const userIndex = dummy.findIndex( u=> u.id === userId)

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    throw new HttpError('Could not find a user for the provided',500);
  }

  const desiredDetail = {
    position: position,
    department: department,
  }

  const personalDetial = {
    birthdate: birthdate,
    gender: gender,
    race: race,
    nationality: nationality,
    religion: religion,
    marital_status: marital_status,
    domicile: domicile,
    address: address,
    phone: phone,
    mobile: mobile,
    email: email,
    emergency_prefix_name: emergency_prefix_name,
    emergency_first_name: emergency_first_name,
    emergency_last_name: emergency_last_name,
    emergency_concerned: emergency_concerned,
    emergency_phone: emergency_phone
  }

  const educationDetail = {
    university: university,
    degree: degree,
    major: major,
    minor: minor,
    completed_course: completed_course,
    avgscore: avgscore
  }

  const jobDetail = {
    current_occupation: current_occupation,
    current_company: current_company,
    current_section: current_section,
    current_position: current_position,
    current_salary: current_salary,
    current_phoneoffice_number: current_phoneoffice_number,
    history_company: history_company,
    history_position: history_position,
    history_salary: history_salary,
    history_startofwork: history_startofwork,
    history_endofwork: history_endofwork,
    history_reason4leaving: history_reason4leaving,
    license_name:license_name,
    license_start:license_start,
    license_expire:license_expire
  }

  //allow patch
  user.issue_by = issue_by;
  user.prefix_name = prefix_name;
  user.first_name = first_name;
  user.last_name = last_name;
  
  user.desired = desiredDetail;
  user.education = educationDetail;
  user.personal = personalDetial;
  user.job = jobDetail;
  //user.covid19workdetail = covid19workdetail;
  user.covid19workdetail_1 = covid19workdetail_1;
  user.covid19workdetail_2 = covid19workdetail_2;
  user.covid19workdetail_3 = covid19workdetail_3;
  user.covid19workdetail_4 = covid19workdetail_4;
  user.covid19workdetail_5 = covid19workdetail_5;

  try {
    await user.save();
  } catch (err) {
    throw new HttpError('Update User failed, please check and try agine,'+err, 500);
  }

  //dummy[userIndex] = updateUser;
  res.status(200).json({user: user});
}

const deleteUserById = async (req, res, next) => {
  const userid = req.params.uid;
  let user;
  try{
    user = await User.findById(userid);
  } catch (err) {
    throw new HttpError('Could not find a user for the provided',500);
  }

  try{
    await user.remove();
  } catch (err) {
    throw new HttpError('Could not remove a user for the provided',500);
  }
  res.json({message: "Remove User success!"});
}

//change birthdate to mobile
const checkexistByIdentification = async (req, res, next) => {
  const { identification_number, mobile } = req.body;
  let existUser;
  try{
    existUser = await User.findOne({identification_number: identification_number});
  } catch (err) {
    throw new HttpError('something wrong in login function', 500);
  }

  //const identifiedUser = dummy.find(u => u.identification_number === identification_number)
  // if(!identifiedUser || identifiedUser.birthdate !== birthdate){
  //   throw new HttpError('Could not identify user, credentials seem to be wrong', 401);
  // }
  
  //console.log(existUser);
  if(existUser && existUser.personal.mobile !== mobile){
    res.json({message: 'exist user'});
  }else if(!existUser || existUser.personal.mobile !== mobile){
    res.json({message: 'new user'});
  }else{
    res.json(existUser);
  }

}

exports.getUserById = getUserById;
exports.getUserByIdentification = getUserByIdentification;
exports.createUser = createUser;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;
exports.checkexistByIdentification = checkexistByIdentification;