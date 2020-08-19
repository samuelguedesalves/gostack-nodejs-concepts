const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { title } = request.query;

  const results = title 
    ? repositories.filter(repositorie.title.includes(title))
    : repositories;

  return response.status(200).json(results);

});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repositorie);

  return response.status(200).json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex( repositorie => repositorie.id === id );

  if(repositorieIndex < 0){
    return response.status(400).json({ error: "This repo is not found" });
  }

  repositories[repositorieIndex] = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositorieIndex].likes
  }
  
  return response.status(200).json(repositories[repositorieIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex( repositorie => repositorie.id === id );

  if(repositorieIndex < 0){
    return response.status(400).json({ error: 'This repo is not found' });
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex( repositorie => repositorie.id === id );

  if(repositorieIndex < 0){
    return response.status(400).json({ error: 'This repo is not found' });
  }

  repositories[repositorieIndex].likes ++;
  
  return response.status(201).json({ likes: repositories[repositorieIndex].likes })
});

module.exports = app;
