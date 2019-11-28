var global = require('../helpers/global.js');
var config = require('../helpers/config.js');

exports.ConnectDB = () => {
    return new Promise((resolve, reject) => {
        //Set up default mongoose connection
        global.mongoose.connect(config.db_path, { useNewUrlParser: true,useUnifiedTopology: true });
        const db = global.mongoose.connection;

        db.on("connected", function () {
            resolve(db);
        });
        db.on("error", reject);
    });
};
