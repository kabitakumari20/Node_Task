const csv = require('csvtojson')
let csvToJson = async (filePath) => {
    let jsonArray = await csv().fromFile(filePath);
    if (jsonArray.length > 0)
        return jsonArray;
    else
        return [];
}
module.exports = { csvToJson }