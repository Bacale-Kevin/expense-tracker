const model = require("../models/model");

//create categories
async function create_Categories(req, res) {
  const Create = new model.Categories({
    type: "Investment",
    color: "#FCBE44",
  });

  await Create.save(function (err) {
    if (!err) return res.json(Create);

    return res.status(400).json({ message: `Error while creating categories${err}` });
  });
}

//GET Categories
async function get_categories(req, res) {
  let data = await model.Categories.find({});

  let filter = await data.map((v) => Object.assign({}, { type: v.type, color: v.color }));

  return res.json(filter);
}

//POST create Transaction
async function create_Transaction(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not provided");
  const { name, type, amount } = req.body;


  const create = await new model.Transaction({
    name,
    type,
    amount,
  });

  create.save(function (err) {
    if (!err) return res.json(create);

    return res.status(400).json({ message: `Error while creating transaction${err}` });
  });
}

//GET Transaction
async function get_Transaction(req, res) {
  let data = await model.Transaction.find({});

  return res.json(data);
}

//DELETE
async function delete_Transaction(req, res) {
  if (!req.body) res.status(400).json({ message: "Requeest body not Found" });

  await model.Transaction.deleteOne(req.body, function (err) {
    if (!err) res.json("Record Deleted...!");
  })
    .clone()
    .catch(function (err) {
      res.json("Error while deleting Transaction Record");
    });
}

//GET   aggregate joins two collections together
async function get_labels(req, res) {
  model.Transaction.aggregate([
    {
      $lookup: {
        from: "categories", //specify the collection to join
        localField: "type", // the field or attribute to be join
        foreignField: "type",
        as: "categories_info", // the display name of the output array any value can be specified
      },
    },
    {
      $unwind: "$categories_info",
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categories_info["color"],
          }
        )
      );
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json("Lookup Collection Error");
    });
}

module.exports = {
  create_Categories,
  get_categories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
  get_labels,
};
