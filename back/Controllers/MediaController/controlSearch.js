const MediaModel = require("../../Models/MediaModel");
const UserModel = require("../../Models/UserModel");
const uniqueArray = require("../../Utilities/uniqueArray");

const controlSearch = (req, res) => {
  const { key } = req.query;
  const arrayOfKey = key.toLowerCase().split(" ");
  MediaModel.find({
    $or: [{ title: { $in: arrayOfKey } }, { tags: { $in: arrayOfKey } }],
  }).then((dbres) => {
    res.send(dbres);
  });
  if (req.user && req.user.username) {
    UserModel.findOne({ username: req.user.username }).then((dbres) => {
      const searches = [...dbres.searches, ...arrayOfKey];
      const uniqueSearches = uniqueArray(searches);
      console.log(searches, 'searches');
      console.log(uniqueSearches, 'unique searches');
      dbres.searches = uniqueSearches;
      dbres.save();
    });
  }
};

module.exports = controlSearch;
