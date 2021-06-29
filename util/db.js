// Load Models
const User = require('../models/user');
const ClassList = require('../models/classlists');

// Register User



// Get User Details



// Get User's Classlists
async function getUserClasses(id) {
    // check for promise return
    let result = await ClassList.find({ ownerid: id }).exec();
    console.log("getUserClasses", result);
    return result;
}


// Add New Class
async function addNewClass(id, cname, clist) {
    var newList = new ClassList({
        ownerid: id,
        name: cname,
        pupils: clist
    });

    let result = await newList.save();

    if (result.isResolved) {
        return true;
    } else {
        return false;
    }
}

module.exports.addNewClass = addNewClass;
module.exports.getUserClasses = getUserClasses;