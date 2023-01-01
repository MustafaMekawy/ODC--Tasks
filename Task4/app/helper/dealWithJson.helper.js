const fs = require('fs');
class DealWithJson {
  static readFromJSON = filename => {
    let data;
    try {
      data = JSON.parse(fs.readFileSync(`model/${filename}.json`));
    } catch (e) {
      data = [];
    }

    return data;
  };
  static writeToJSON = (filename, data) =>
    fs.writeFileSync(`model/${filename}.json`, JSON.stringify(data));
}
module.exports = DealWithJson;
