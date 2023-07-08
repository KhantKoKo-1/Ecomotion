"use strict";
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const bcrypt = require("bcrypt");
const Sequelize = require('sequelize');
require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51NOvtFDZoqDdWCBfuJLSUykflqeaJa4vdw7vCQ3xhEZsy94NYbq7siMF1ivBKeBOpjjkiNzSXACD5mKguNaTBPbU008rc7LkHn"
);
const mysql = require("mysql2");
const { Report } = require("./models");
require("dotenv").config();
// const { default: Invoice } = require('../client/src/pages1/invoice');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Simple Route
app.get("/", (req, res) => {
  res.send("Welcome to EcoMotion.");
});

// Routes
const userRoute = require("./routes/user");
app.use("/user", userRoute);

const { Invoice } = require("./models");
const { Card } = require("./models");
db.sequelize.sync({ alter: true }).then(() => {
  const port = process.env.APP_PORT;
  app.listen(port, () => {
    console.log(`⚡ Server running on http://localhost:${port}`);
  });
});

app.get("/api/get/card", (req, res) => {
  // const { user_id } = req.params;
  Card.findAll()
    .then((cards) => {
      res.send(cards);
    })
    .catch((error) => {
      console.error("Error retrieving cards:", error);
    });
});

app.post("/api/post/card", async (req, res) => {
  const data = req.body;
  if (
    data.cardNumber.length === 16 &&
    data.cardHolderName &&
    data.cardMonth.length === 2 &&
    data.cardYear.length === 2 &&
    data.CVC.length === 3
  ) {
    const card = Card.build({
      card_number: data.cardNumber,
      cardholder_name: data.cardHolderName,
      exp_month: data.cardMonth,
      exp_year: data.cardYear,
      cvv: data.CVC,
       user_id: 1,
    });

    card
      .save()
      .then((savedCard) => {
        console.log("Card saved:");
        res.send("success");
      })
      .catch((error) => {
        console.error("Error saving card:", error);
      });
  } else {
    console.log("Data inserted unsuccessfully:");
    res.send("fail");
  }
});

// Delete card data
app.delete("/api/delete/card/:id", async (req, res) => {
  const { id } = req.params;

  Card.destroy({
    where: { id: id },
  })
    .then((deletedCount) => {
      if (deletedCount > 0) {
        console.log("Card deleted successfully.");
        res.send("Delete");
      } else {
        console.log("Card not found or already deleted.");
      }
    })
    .catch((error) => {
      console.error("Error deleting card:", error);
    });
});

// Update card data
app.put("/api/update/card/:id", async (req, res) => {
  const { id } = req.params;
  const { cardNumber, cardHolderName, cardMonth, cardYear, CVC } = req.body;

  if (
    cardNumber.length === 16 &&
    cardHolderName &&
    cardMonth.length === 2 &&
    cardYear.length === 2 &&
    CVC.length === 3
  ) {
    const updatedData = {
      card_number: cardNumber,
      cardholder_name: cardHolderName,
      exp_month: cardMonth,
      exp_year: cardYear,
      cvv: CVC,
    };

    Card.update(updatedData, {
      where: { id: id },
    })
      .then((updatedCount) => {
        if (updatedCount > 0) {
          console.log("Card updated successfully.");
          res.send("success");
        } else {
          console.log("Card not found or already up to date.");
        }
      })
      .catch((error) => {
        console.error("Error updating card:", error);
      });
  } else {
    console.log("Invalid card details");
    res.status(400).send("Invalid card details");
  }
});

app.put("/api/topup/card/:id", (req, res) => {
  const { id } = req.params;
  const { balance } = req.body;
  Card.findOne({
    where: { id: id },
  })
    .then((card) => {
      if (card) {
        let newBalance = 0;
        if (card.balance !== null) {
          newBalance = parseInt(balance) + parseInt(card.balance);
        } else {
          newBalance = parseInt(balance);
        }
        console.log(newBalance);
        const updatedData = {
          balance: newBalance,
        };

        Card.update(updatedData, {
          where: { id: id },
        })
          .then((updatedCount) => {
            if (updatedCount > 0) {
              card.balance = newBalance;
              res.send(card);
            } else {
              console.log("Card not found or already up to date.");
            }
          })
          .catch((error) => {
            console.error("Error updating card:", error);
          });
      } else {
        console.log("Card not found.");
      }
    })
    .catch((error) => {
      console.error("Error selecting card:", error);
    });
});

app.get("/api/get/:user_id", (req, res) => {
  const { user_id } = req.params;

  Invoice.findAll({
    where: { user_id: user_id },
  })
    .then((invoices) => {
      if (invoices.length > 0) {
        res.send(invoices);
      } else {
        res.send("fail");
      }
    })
    .catch((error) => {
      console.error("Error selecting invoice:", error);
      res.status(500).send("Error selecting invoice.");
    });
});

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    const invoice = Invoice.build({
      date: new Date(),
      cost: amount,
      user_id: 1,
      stripe_client_secret: paymentIntent.client_secret,
    });
    console.log(invoice);
    invoice
      .save()
      .then((savedInvoice) => {
        res.send(savedInvoice);
      })
      .catch((error) => {
        console.error("Error saving card:", error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});



// Create a new report
app.post("/api/post/report", async (req, res) => {
  const {
    name,
    contactNumber,
    dateOfReport,
    timeOfReport,
    selectedImage,
    otherDamages,
  } = req.body;
  if (name && contactNumber && dateOfReport && timeOfReport && otherDamages) {
    const report = Report.build({
      name: name,
      contactNumber: contactNumber,
      dateOfReport: dateOfReport,
      timeOfReport: timeOfReport,
      selectedImage: selectedImage,
      otherDamages: otherDamages,
    });

    report
      .save()
      .then((savedReport) => {
        console.log("Report saved successfully.");
        res.send(savedReport);
      })
      .catch((error) => {
        console.error("Error saving report:", error);
        res.status(500).send("Internal Server Error");
      });
  } else {
    console.log("Invalid report details");
    res.status(400).send("Invalid report details");
  }
});

// Get all reports
app.get("/api/get/reports", async (req, res) => {
  try {
    const report = await Report.findAll();
    res.send(report);
  } catch (error) {
    console.error("Error retrieving reports:", error);
    res.status(500).send("Internal Server Error");
  }
});
// try the get all reports in a new project


// Get a report by ID
app.get("/api/get/report/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const report = await Report.findByPk(id);
    if (report) {
      res.send(report);
    } else {
      res.status(404).send("Report not found");
    }
  } catch (error) {
    console.error("Error retrieving report:", error);
    res.status(500).send("Internal Server Error");
  }
});


// Update a report by ID
app.put("/api/update/report/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    contactNumber,
    dateOfReport,
    timeOfReport,
    selectedImage,
    otherDamages,
  } = req.body;

  try {
    const report = await Report.findByPk(id);
    if (!report) {
      return res.status(404).send("Report not found");
    }

    // Update the report properties
    report.name = name;
    report.contactNumber = contactNumber;
    report.dateOfReport = dateOfReport;
    report.timeOfReport = timeOfReport;
    report.selectedImage = selectedImage;
    report.otherDamages = otherDamages;

    // Save the updated report
    await report.save();

    console.log("Report updated successfully.");
    res.send(report);
  } catch (error) {
    console.error("Error updating report:", error);
    res.status(500).send("Internal Server Error");
  }
});


// Delete a report by ID
app.delete("/api/delete/report/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCount = await Report.destroy({ where: { id: id } });
    if (deletedCount > 0) {
      res.send("Report deleted successfully");
    } else {
      res.status(404).send("Report not found");
    }
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).send("Internal Server Error");
  }
});
