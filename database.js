const {
    createPool
} = require('mysql');
const Pool = createPool ({
    host: "127.0.0.1",
    database: "worldtech",
    user :"root",
    password: "",
    connectionlimit: 10

})
Pool.query(`SELECT * FROM famille`,(err, result, fields) => {
    if (err) {
        return console.log(err);
    }
    return console.log(result);
})