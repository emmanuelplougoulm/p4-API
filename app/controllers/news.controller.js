const News = require("../models/news.model.js");

exports.create = (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({
      message: "Please enter a title.",
    });
  }

  const news = new News({
    title: req.body.title,
    detail: req.body.detail,
    date: req.body.date,
  });

  news
    .save()
    .then((news) => {
      res.send(news);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the news.",
      });
    });
};

exports.getAll = (req, res) => {
  News.find()
    .then((news) => {
      res.send(news);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the book.",
      });
    });
};

exports.getById = (req, res) => {
  News.findById(req.params.newsId)
    .then((news) => {
      if (news) {
        res.send(news);
      }
      return res.status(404).send({
        message: "Book not exist with id " + req.params.newsId,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Book not exist with id " + req.params.newsId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving book with id " + req.params.newsId,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({
      message: "Please enter book title.",
    });
  }

  News.findByIdAndUpdate(
    req.params.newsId,
    {
      title: req.body.title,
      author: req.body.author || "IT jugadu",
    },
    { new: true }
  )
    .then((news) => {
      if (news) {
        res.send(news);
      }
      return res.status(404).send({
        message: "Book does not exist with bookId " + req.params.newsId,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Book does not exist with bookId " + req.params.newsId,
        });
      }
      return res.status(500).send({
        message:
          "Some error occurred while retrieving the book with bookId" +
          req.params.newsId,
      });
    });
};

exports.delete = (req, res) => {
  News.findByIdAndRemove(req.params.newsId)
    .then((news) => {
      if (news) {
        res.send({ message: "News has been deleted successfully!" });
      }
      return res.status(404).send({
        message: "Book not exist with bookId" + req.params.newsId,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Book not exist with bookId" + req.params.newsId,
        });
      }
      return res.status(500).send({
        message:
          "Some error occurred while deleting the book with bookId" +
          req.params.newsId,
      });
    });
};
