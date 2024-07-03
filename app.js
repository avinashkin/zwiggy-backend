const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const port = process.env.PORT  || 3000;

app.get("/api/restaurants", async (req, res) => {
  const { lat, lng } = req.query;
  const url =
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=" + lat + "&lng=" + lng + "&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

  try {
    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      },
    });
    const data = await resp.json();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({message: 'Error occured', status: false})
  }
});

app.get("/api/menu", async (req, res) => {
    const {lat, lng, restaurantId} = req.query;
    const url = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=" + lat + "&lng=" + lng + "&restaurantId=" + restaurantId + "&catalog_qa=undefined&submitAction=ENTER";

    try {
        const resp = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
          },
        });
        const data = await resp.json();
        res.status(200).send(data);
      } catch (err) {
        res.status(500).send({message: 'Error occured', status: false});
      }
});

app.listen(port, () => {
  console.log("App running at localhost:", port);
});
