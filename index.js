const fs = require("fs");
//json path
const FILE_PATH = "user_data.json";

// Read the user_data json file
function readUserJSON() {
    try {
        const user_data = fs.readFileSync(FILE_PATH, "utf8");
        return JSON.parse(user_data);
    } catch (error) {
        return [];
    }
};

//  write users to json file
function writeUserJSON(user_data) {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(user_data, null, 2));
    } catch (err) {
        console.error('Error writing to file:', err);
    }
}

//  adding users to json file
function addUser(fname, lname) {
    const user_data = readUserJSON();
    user_data.push({ fname, lname });
    writeUserJSON(user_data);
    console.log(`User ${fname} ${lname} created.`);
}


//  editing user in json file
function editUser(ofname, olname, nfname, nlanme) {
    const user_datas = readUserJSON();
    const user_data = user_datas.find(item => item.fname === ofname && item.lname === olname);
    if (user_data) {
        user_data.fname = nfname;
        user_data.lname = nlanme;
        writeUserJSON(user_datas);
        console.log(`user_data ${ofname} ${olname} edited to ${nfname} ${nlanme}.`);
    } else {
        console.log(`user_data ${ofname} ${olname} not found.`);
    }
}

// Delete an user by index
function deleteUser(del_user_data_index) {
    const user_data = readUserJSON();
    if (del_user_data_index < 0 || del_user_data_index >= user_data.length) {
        console.log('Invalid del_user_data_index');
        return;
    }
    const removedUser = user_data.splice(del_user_data_index, 1);
    writeUserJSON(user_data);
    console.log('User deleted:', removedUser[0]);
}

// Display all users
function userList() {
    const user_data = readUserJSON();
    console.log('Current user_data:', user_data);
}

// Parse command line arguments
const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
    case 'add':
        addUser(args[0], args[1]);
        break;
    case 'edit':
        editUser(args[0], args[1], args[2], args[3]);
        break;
    case 'delete':
        deleteUser(args[0]);
        break;
    case 'read':
        userList();
        break;
    default:
        console.log('command error: Use add<firstname Lastname>, edit <oldfirstname oldlastname newfirstname newlastname>, delete <index>, read');
}
