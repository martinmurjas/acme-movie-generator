const Sequelize = require("sequelize");
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/the_acme_item_tracker_db"
);

const { STRING, INTEGER } = Sequelize;

const Movie = conn.define("movie", {
  name: {
    type: STRING,
    allowNull: false,
  },
  rating: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 3,
    validate: {
      min: 1,
      max: 5,
    },
  },
  image: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = {
  conn,
  Movie,
};
