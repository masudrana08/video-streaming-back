const UserModel = require("../../Models/UserModel");

const controlSubscribe = (req, res) => {
  const authUser = req.user.username;
  const subscribeUser = req.query.subscribe;
  UserModel.findOne({ username: authUser }).then((dbres) => {
    if (dbres.subscribed.indexOf(subscribeUser) < 0) {
      const subscribed = [...dbres.subscribed, subscribeUser];
      dbres.subscribed = subscribed;
      dbres.save();
    }

    UserModel.findOne({ username: subscribeUser }).then((dbres2) => {
      if (dbres2.subscribers.indexOf(authUser) < 0) {
        const subscribers = [...dbres2.subscribers, authUser];
        dbres2.subscribers = subscribers;
        dbres2.save().then((result) => {
          res.send(JSON.stringify({ status: "ok" }));
        });
      }else{
        res.send({status:'Something Wrong'})
      }
    });
    
  });
};
module.exports = controlSubscribe;
