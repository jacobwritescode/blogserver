const global = require('./global')


/**
 * [haveValue - middleware function to check null value]
 * @param  {[object]}   req  [request object]
 * @param  {[object]}   res  [response object]
 * @param  {Function} next [callback]
 */
exports.haveValue = (value) => {
    if (!value) {
        value = '';
        return (value);
    } else {
        return (value.trim());
    }
};



/**
 * Sub function for encrypting password
 * @param : password,salt
 * @output: encryptedPassword 
 */
exports.encryptPass = (password, salt) => {
    var encryptedPassword = global.crypto.createHmac('SHA256', salt).update(password).digest("hex");
    return encryptedPassword;
};


exports.findLocation = (req) => {
    // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // if (process.env.NODE_ENV == 'development') {
    //     ip = "123.63.124.181";
    // }
    // console.log("that Ip===>", ip, req.connection.remoteAddress)

    //  latlng = { longitude: geo.ll[1], latitude: geo.ll[0] };
    //return result
    var ip = "123.63.124.181"
    return new Promise((resolve, reject) => {
        if (req.query.longitude && req.query.latitude) {
            var result = { 'longitude': req.query.longitude, 'latitude': req.query.latitude }
            resolve(result)
        }
        else {
            var geo = global.geoip.lookup(ip)
            if (geo) {
                var result = { 'longitude': geo.ll[1], 'latitude': geo.ll[0] }
                resolve(result)
            }
            else reject
        }
    })
}

exports.findUniqueArray = (array) => {
    var arr = {};
    for (var i = 0, len = array.length; i < len; i++)
        arr[array[i]] = array[i];
    newArray = new Array();
    for (var key in arr) {
        newArray.push(arr[key]);
    }
    return newArray;
}


/**
 * [getDateObject function to convert date string of '28/04/2016' format to date object]
 * @param  {[type]}   date      [date string]
 * @return {[type]}             [date object]
 */
exports.getDateObject = function (date) {
    re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    var date = date.match(re);
    var dateObject = new Date(date[3], date[2] - 1, date[1]) //Javascript counts months from 0, so date[2] - 1
    return dateObject;
}