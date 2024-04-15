const Product = require("../models/Product");

exports.createProduct = (req, res) => {
  const newProduct = new Product(req.body);  
  newProduct.save().then((savedProduct) => res.status(200).json(savedProduct))
  .catch((err) => res.status(500).json(err));
};

exports.updateProduct = (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((updatedProduct) => res.status(200).json(updatedProduct))
    .catch((err) => res.status(500).json(err));
};

exports.deleteProduct = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(res.status(200).json("Product has been deleted..."))
    .catch((err) => res.status(500).json(err));
};

exports.getProduct = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(500).json(err));
};

exports.getAllProducts = (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const qsearch = req.query.search;
  let products;

  if (qNew) products = Product.find().sort({ createdAt: -1 }).limit(1);
  else if (qCategory)
    products = Product.find({ categories: { $in: [qCategory] } });
  else if (qsearch)
    products = Product.find({ $or: [{ title : {'$regex': qsearch,$options: 'i'}},
                                         { desc : {'$regex': qsearch,$options: 'i'}},
                                         { color : {'$regex': qsearch,$options: 'i'}},
                                         { type : {'$regex': qsearch,$options: 'i'}},
                                         { categories : {'$regex': qsearch,$options: 'i'}},
                                         { brand : {'$regex': qsearch,$options: 'i'}}]});
  else products = Product.find();

  products
    .then((products) => res.status(200).json(products))
    .catch((err) => res.status(500).json(err));
};
