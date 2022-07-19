const { conn, Movie } = require("./db");
const express = require("express");
const app = express();
const path = require("path");
const { faker } = require("@faker-js/faker");

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/api/movies", async (req, res, next) => {
  try {
    res.send(await Movie.findAll());
  } catch (err) {
    next(err);
  }
});

app.post("/api/movies", async (req, res, next) => {
  try {
    res.status(201).send(
      await Movie.create({
        name: faker.company.catchPhrase(),
        image: faker.image.image(200, 300, true),
      })
    );
  } catch (err) {
    next(err);
  }
});

app.delete("/api/movies/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    await movie.destroy();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

app.put("/api/movies/:id/rating/:rating", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    await movie.set({
      rating: req.params.rating * 1,
    });
    await movie.save();
    res.send(movie);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ err });
});

const init = async () => {
  try {
    await conn.sync({ force: true });

    await Movie.create({
      name: faker.company.catchPhrase(),
      image: faker.image.image(200, 300, true),
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
