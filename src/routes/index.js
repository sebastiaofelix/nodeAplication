const { Router } = require("express");

const usersRouter = require("./user.routes");
const notesRouter = require("./movies-notes.routes");
const tagsRouter = require("./movies-tags.routes");
const sessionsRouter = require("./sessions.routes");

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/movieNotes", notesRouter);
routes.use("/movieTags", tagsRouter);

module.exports = routes;