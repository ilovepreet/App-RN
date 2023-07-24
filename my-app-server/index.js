import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import Users from './models/users.js'
import Conn from './db/conn.js'

const port = process.env.PORT || 2000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
Conn();


app.post('/data', async (req, res) => {
  try {
    if (!req.body._id) {
      const usershere = new Users({
        username: req.body.username,
        message: req.body.message
      });
      const myusers = await usershere.save();
      res.status(201).json(myusers);
    } else {
      const updatedUser = await Users.findByIdAndUpdate(
        req.body._id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating data" });
  }
});

app.get('/data', async (req,res) => {
    const list = await Users.find({});
    res.json(list)
});

  app.delete('/data/:id', async (req, res) => {
    try {
      const deletedUser = await Users.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
  });

app.listen(port, () => {
    console.log("server is running");
})

