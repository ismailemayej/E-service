const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const uri =
  "mongodb+srv://iRapair:H3hBsAnljxpJt1bD@firstuser.pppqtxx.mongodb.net/?retryWrites=true&w=majority";
const cors = require("cors");

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("e-services");
    // For Our Services------------------------------------
    const OurServiceCollection = db.collection("OurSevices");
    app.get("/ourservice", async (req, res) => {
      let query = {};
      if (req.query.priority) {
        query.priority = req.query.priority;
      }
      const cursor = OurServiceCollection.find(query);
      const OurSevices = await cursor.toArray();
      res.send({ status: true, data: OurSevices });
    });
    app.post("/ourservice", async (req, res) => {
      const ourservice = req.body;
      const result = await OurServiceCollection.insertOne(ourservice);
      res.send(result);
      console.log(result);
    });
    app.get("/ourservice/:id", async (req, res) => {
      const id = req.params.id;
      const result = await OurServiceCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });
    app.delete("/ourservice/:id", async (req, res) => {
      const id = req.params.id;
      const result = await OurServiceCollection.deleteOne({
        _id: new ObjectId(id),
      });
      console.log(result);
      res.send(result);
    });
    // status update
    app.put("/ourservice/:id", async (req, res) => {
      const id = req.params.id;
      const item = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          imgurl: item.imgurl,
          paragraph: item.paragraph,
          name: item.name,
          item1: item.item1,
          item2: item.item2,
          item3: item.item3,
          item4: item.item4,
          item5: item.item5,
        },
      };
      const options = { upsert: true };
      const result = await OurServiceCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });

    // For Event Items------------------------------------------
    const EventItemCollection = db.collection("EventItems");
    app.get("/eventitem", async (req, res) => {
      let query = {};
      if (req.query.priority) {
        query.priority = req.query.priority;
      }
      const cursor = EventItemCollection.find(query);
      const OurSevices = await cursor.toArray();
      res.send({ status: true, data: OurSevices });
    });
    app.post("/eventitem", async (req, res) => {
      const eventitem = req.body;
      const result = await EventItemCollection.insertOne(eventitem);
      res.send(result);
      console.log(result);
    });
    app.get("/eventitem/:id", async (req, res) => {
      const id = req.params.id;
      const result = await EventItemCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });
    app.delete("/eventitem/:id", async (req, res) => {
      const id = req.params.id;
      const result = await EventItemCollection.deleteOne({
        _id: new ObjectId(id),
      });
      console.log(result);
      res.send(result);
    });
    // status update
    app.put("/eventitem/:id", async (req, res) => {
      const id = req.params.id;
      const eventitem = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          eventimgurl: eventitem.eventimgurl,
          EventName: eventitem.EventName,
        },
      };
      const options = { upsert: true };
      const result = await EventItemCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });

    // For Recent Event----------------------------------------------------------
    const RecentEventCollection = db.collection("RecentEvent");
    app.get("/recentevent", async (req, res) => {
      let query = {};
      if (req.query.priority) {
        query.priority = req.query.priority;
      }
      const cursor = RecentEventCollection.find(query);
      const event = await cursor.toArray();
      res.send({ status: true, data: event });
    });
    app.post("/recentevent", async (req, res) => {
      const recentevent = req.body;
      const result = await RecentEventCollection.insertOne(recentevent);
      res.send(result);
      console.log(result);
    });
    app.get("/recentevent/:id", async (req, res) => {
      const id = req.params.id;
      const result = await RecentEventCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });
    app.delete("/recentevent/:id", async (req, res) => {
      const id = req.params.id;
      const result = await RecentEventCollection.deleteOne({
        _id: new ObjectId(id),
      });
      console.log(result);
      res.send(result);
    });
    // status update
    app.put("/recentevent/:id", async (req, res) => {
      const id = req.params.id;
      const recentevent = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          recenteventimgurl: recentevent.recenteventimgurl,
          deatails: recentevent.deatails,
        },
      };
      const options = { upsert: true };
      const result = await RecentEventCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello Programing World!");
});

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
