module.exports = (app) => {
  const news = require("../controllers/news.controller.js");

  // Create a news
  app.post("/news", news.create);

  // Get all news
  app.get("/news", news.getAll);

  // Get a single news
  app.get("/news/:newsId", news.getById);

  // Update a news
  app.put("/news/:newsId", news.update);

  // Delete a news
  app.delete("/news/:newsId", news.delete);
};
