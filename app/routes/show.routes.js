module.exports = (app) => {
  const shows = require("../controllers/shows.controller.js");

  // Create a new Show
  app.post("/shows", shows.create);

  // Get all Shows
  app.get("/shows", shows.getAll);

  // Get a single Show with ShowId
  app.get("/shows/:showId", shows.getById);

  // Update a Show with ShowId
  app.put("/shows/:showId", shows.update);

  // Delete a Show with ShowId
  app.delete("/shows/:showId", shows.delete);
};
