const db = require("../util/database");
const Product = require("../models/product");
exports.getAddproduct = (req, res, next) => {
  res.render("admin/add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, price, description, imageUrl);
  product.save();

  res.redirect("/");
};
exports.getProducts = (req, res, next) => {
  // db.execute("SELECT * FROM products").then(()=>{
  //   res.redirect("/");
  // }).catch(err=>console.log(err))

  Product.fetchAll()
    .then(([rows]) => {
      res.render("admin/products", {
        prods: rows,
        docTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);

  const editMode = req.query.edit;
  console.log(editMode);
  if (!editMode) {
    res.redirect("/");
  }

  Product.findById(prodId)
    .then(([product]) => {
      console.log(product);

      res.render("admin/edit-product", {
        productId: prodId,
        docTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));

  // Product.findById(prodId, (product) => {
  //   if (!product) {
  //     return res.redirect("/");
  //   }
  // });
};
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  console.log(updatedProduct);
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.getDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);

  Product.findById(prodId, (product) => {});
};
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  // res.redirect("/");
  Product.deleteByid(prodId);
  res.redirect("/admin/products");
};
