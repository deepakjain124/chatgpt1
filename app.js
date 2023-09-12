const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "https://gptoutputdetector.com",
      "https://gptzero.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.post("/api/third-party-endpoint/detectText", async (req, res) => {
  try {
    var config = {
      method: "post",
      url: "https://zerogpt.p.rapidapi.com/api/v1/detectText",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "90d7afdba5msh12be53e53b2d01fp17a0bbjsn282e40360e36",
        "X-RapidAPI-Host": "zerogpt.p.rapidapi.com",
      },
      data: {
        input_text: req.body.input_text,
      },
    };

    axios(config)
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error);
      });
    // Forward the response to the client
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).send(error);
  }
});

app.post("/api/third-party-endpoint/detectImage", async (req, res) => {
  try {
    var config = {
      method: "post",
      url: "https://real-or-fake-image.p.rapidapi.com/api-v1.0/SafeUnsafeImageWithTags",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "90d7afdba5msh12be53e53b2d01fp17a0bbjsn282e40360e36",
        "X-RapidAPI-Host": "real-or-fake-image.p.rapidapi.com",
      },
      data: {
        api_key: 'test_fake_image_rapid',
        base64_image: req.body.base64_image,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response)
        res.send(response.data);
      })
      .catch(function (error) {
        console.log(error)
        res.send(error);
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
