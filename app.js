const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://gptoutputdetector.com",
    // origin:"http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.post("/api/third-party-endpoint/login", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.zerogpt.com/api/auth/login",
      {
        email: "deepakjaindj052@gmail.com",
        password: "123456abc",
      }
    );
    // Forward the response to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors appropriately
    res.status(500).send(error);
  }
});

app.post("/api/third-party-endpoint/detectText", async (req, res) => {
  console.log(req)
  try {
    var config = {
      method: "post",
      url: "https://api.zerogpt.com/api/detect/detectText",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${req.body.token}`,
          "ApiKey":"5518bf40-af89-424e-833c-3c2cac3f9437"
      },
      data: {
        input_text:req.body.input_text
      },
    };

    axios(config)
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error)
      });
    // Forward the response to the client
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).send(error);
  }
});
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
