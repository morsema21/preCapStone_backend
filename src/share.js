const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");

app.use(cors());

app.use(express.json());

const route = express.Router();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

module.exports = {
  app,
  bcrypt,
  jwt,
  route,
  prisma,
};
