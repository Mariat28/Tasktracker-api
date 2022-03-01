const Joi = require('joi');
const express = require('express');
x
const app = express();

function indexRoutes() {
  const tasks = [
    { id: 1, title: "Deep work" },
    { id: 2, title: "Post to github" },
    { id: 3, title: "Post to instagram" },
  ];
  app.get("/", (req, res) => {
    // res.send("Hello world!!");
    // using pug views 
    res.render('index', {title: 'My Task Tracker', message: 'Hy there, lets get started'});
  });
  app.get("/api/tasks", (req, res) => {
    res.send(tasks);
  });
  app.get("/api/tasks/:id", (req, res) => {
    let task = tasks.find((t) => t.id === parseInt(req.params.id, 10));
    if (!task) return res.status(404).send("The course was not found");
    res.send(task);
  });

  app.post("/api/tasks", (req, res) => {
    const { error } = validateTask(req.body);
    if (error) return res.status(400).send(error);
    const task = {
      id: tasks.length + 1,
      title: req.body.title,
    };
    tasks.push(task);
    res.send(task);
  });
  app.put("/api/tasks/:id", (req, res) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id, 10));
    if (!task) return res.status(404).send("Task not found");
    // const result = validateTask(req.body);
    const { error } = validateTask(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    task.title = req.body.title;
    res.send(task);
  });

  app.delete("/api/tasks/:id", (req, res) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id, 10));
    if (!task) return res.status(400).send("Task not found");

    const taskIndex = tasks.indexOf(task);
    tasks.splice(taskIndex, 1);
    res.send(task);
  });
  function validateTask(task) {
    const schema = {
      title: Joi.string().min(4).required(),
    };
    return (result = Joi.validate(task, schema));
  }
}
module.exports = indexRoutes;
