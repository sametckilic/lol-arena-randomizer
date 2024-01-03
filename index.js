const express = require("express");
const champions = require("./champions.js");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { teams: null });
});
app.post("/", (req, res) => {
  const playerNames = req.body.playerNames;
  const teams = assignChampionsToPlayers(playerNames);

  res.render("index", { teams });
});

function assignChampionsToPlayers(playerNames) {
  const teams = [[], [], [], []]; // 4 takım oluştur
  const shuffledChampions = champions.sort(() => Math.random() - 0.5);
  const suffledPlayerNames = playerNames.sort(() => Math.random() - 0.5);
  const players = playerNames;

  for (let i = 0; i < playerNames.length; i++) {
    const champion = shuffledChampions.pop();
    const teamIndex = i % 4;
    teams[teamIndex].push({
      player: suffledPlayerNames[i],
      champion: champion,
    });
  }
  return teams;
}

app.listen(3000, () => {
  console.log("Example app listening", champions[1]);
});
