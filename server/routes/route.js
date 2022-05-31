const routes = require("express").Router();
const controller = require("../controller/controller");

routes.route("/api/categories").post(controller.create_Categories).get(controller.get_categories);

routes
  .route("/api/transaction")
  .post(controller.create_Transaction)
  .get(controller.get_Transaction)
  .delete(controller.delete_Transaction);

routes.route('/api/lables').get(controller.get_labels)

module.exports = routes;
