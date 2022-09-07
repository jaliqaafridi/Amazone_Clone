const express = require("express");
// const Products = require("../constant/Productsdata");
const router = new express.Router();
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");

//get productsdata api
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    // console.log("console the data" + prductsdata);
    res.status(201).json(productsdata);
  } catch (error) {
    console.log("helo");
    console.log("error" + error.message);
  }
});
//get individual data
router.get("/getproductone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const individuadata = await Products.findOne({ id: id });

    // console.log(individuadata + "individual data");

    res.status(201).json(individuadata);
  } catch (error) {
    res.status(400).json(individuadata);
    console.log("error" + error.message);
  }
});

// register data

router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(422).json({ error: "filll the all details" });
    console.log("bhai nathi present badhi details");
  }

  try {
    const preuser = await USER.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "This email is already exist" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "password are not matching" });
    } else {
      const finaluser = new USER({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });

      // yaha pe hasing krenge

      const storedata = await finaluser.save();
      console.log(storedata + "user successfully added");
      res.status(201).json(storedata);
    }
  } catch (error) {
    console.log(
      "error the bhai catch ma for registratoin time" + error.message
    );
    res.status(422).send(error);
  }
});

module.exports = router;
