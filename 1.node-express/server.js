const express = require("express");

const app = express();

const aCars = [
  {
    id: 1,
    producer: "Mercedes",
    model: "3xA",
    type: "male"
  },
  {
    id: 2,
    producer: "Toyota",
    model: "3xB",
    type: "female"
  },
  {
    id: 3,
    producer: "Dacia",
    model: "Solentza",
    type: "male"
  }
];

//Routes

app.get("/", (req, res) => {});

//GET POST PUT DELETE

app.get("/cars", (req, res) => {
  res.send(aCars);
});

app.post("/cars", (req, res) => {
  const car = { id: 4, producer: "Renault", model: "noidea" };
  aCars.push(car);
  res.send({ status: 1, item: car });
});

app.delete("/cars/:id", (req, res) => {
  aCars.pop();
  res.send({ status: 1, itemsCount: 1 });
});

app.patch("/cars/:id", (req, res) => {
  aCars[0].model = "New model";
  res.send({ status: 1, updatedItem: aCars[0] });
});

app.get("/cars/male", (req, res) => {
  const males = aCars.filter(car => {
    return car.type == "male";
  });

  res.send({ males });
});

app.get("/cars/female", (req, res) => {
  const females = aCars.filter(car => {
    return car.type == "female";
  });

  res.send({ females });
});

//Listen

app.listen("80", err => {
  if (err) {
    console.log("Server has crashed, error:", err);
    return;
  }

  console.log("Server listenining");
});
