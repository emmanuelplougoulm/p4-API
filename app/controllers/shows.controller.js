const Show = require("../models/show.model.js");

// Create and Save a new Show
exports.create = (req, res) => {
  if (!req.body.title) {
    return res.sendStatus(400)({
      message: "Please enter book title.",
    });
  }

  // Create a Show
  const show = new Show({
    title: req.body.title,
    date: req.body.date,
    detail: req.body.detail,
    paragraph1: req.body.paragraph1,
    paragraph2: req.body.paragraph2,
    paragraph3: req.body.paragraph3,
    paragraph4: req.body.paragraph4,
  });

  // Save Show in the database
  show
    .save()
    .then((show) => {
      res.send(show);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book.",
      });
    });
};

// Get all and return all shows.
exports.getAll = (req, res) => {
  Show.find()
    .then((show) => {
      res.send(show);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the book.",
      });
    });
};

// Get a single show with a showId
exports.getById = (req, res) => {
  Show.findById(req.params.showId)
    .then((show) => {
      if (show) {
        res.send(show);
      }
      return res.status(404).send({
        message: "Show not exist with id " + req.params.showId,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Show not exist with id " + req.params.showId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving book with id " + req.params.showId,
      });
    });
};

// Update a show by the showId
exports.update = (req, res) => {
  // Validate Request because title is required
  if (!req.body.title) {
    return res.status(400).send({
      message: "Please enter book title.",
    });
  }

  // Find show and update it
  Show.findByIdAndUpdate(
    req.params.showId,
    {
      title: req.body.title,
      author: req.body.author,
    },
    { new: true }
  )
    .then((show) => {
      if (show) {
        res.send(show);
      }
      return res.status(404).send({
        message: "Show does not exist with showId " + req.params.showId,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Show does not exist with showId " + req.params.showId,
        });
      }
      return res.status(500).send({
        message:
          "Some error occurred while retrieving the show with showId" +
          req.params.showId,
      });
    });
};

// Delete the Book with the bookId
exports.delete = (req, res) => {
  Show.findByIdAndRemove(req.params.showId)
    .then((show) => {
      if (show) {
        res.send({ message: "Show has been deleted successfully!" });
      }
      return res.status(404).send({
        message: "Show not exist with showId" + req.params.showId,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Show not exist with showId" + req.params.showId,
        });
      }
      return res.status(500).send({
        message:
          "Some error occurred while deleting the book with bookId" +
          req.params.bookId,
      });
    });
};
