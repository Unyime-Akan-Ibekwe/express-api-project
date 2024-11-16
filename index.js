const express = require('express')
const app = express();
const fs = require('fs'); //For fs module
const PORT = 5000;

app.get("/", (req, res)=>{
  res.send("HELLO, AND WELCOME TO MY FIRST SERVER")
})

//Helper function to read the users.json file
const getUsers = () => {
    const data = fs.readFileSync('.users.json', 'UTF-8'); //To read file synchronously
    return JSON.parse(data); //Parse JSON data
}

//Endpoint to GET the list of all the users
  app.get('/users', (req, res) => {
    fs.readFile('users.json', 'UTF-8', (err, data) => {
      if (err) {
        res.status(500).send('Failed to read data from file');
      } else {
        res.send(JSON.parse(data));
      }
    });
  });


// Endpoint to GET a user by their name
app.get('/users/name/:name', (req, res) => {
  fs.readFile('users.json', 'UTF-8', (err, data) => {
    if (err) {
      res.status(500).send('FAILED TO READ DATA FROM THE FILE');
    } else {
      const users = JSON.parse(data);
      const user = Object.values(users).find(user => user.name.toLowerCase() === req.params.name.toLowerCase());
      if (user) {
          res.send(user);
        } else {
          res.status(404).send('USER CANNOT BE FOUND');
        }
      }
    });
  });
  

  
//Endpoint to GET a user by their ID
app.get("/users/:id", (req, res)=>{
    //res.send("This is the users ID list")//
    fs.readFile('users.json', 'UTF-8', (err, data) => {
    if (err) {
      res.status(500).send('FAILED TO READ DATA FROM THE FILE');
    } else {
      const users = JSON.parse(data);
      const user = Object.values(users).find(user => user.id === parseInt(req.params.id));
      if (user) {
        res.send(user);
      } else {
        res.status(404).send('USER CANNOT BE FOUND');
      }
    }
  })
})

//Endpoint to GET a user by their professions
app.get('/users/profession/:profession', (req, res) => {
  fs.readFile('users.json', 'UTF-8', (err, data) => {
    if (err) {
      res.status(500).send('FAILED TO READ DATA FROM THE FILE');
    } else {
      const users = JSON.parse(data);
      const selectedUsers = Object.values(users).filter(user => user.profession.toLowerCase() === req.params.profession.toLowerCase());
      if (selectedUsers.length > 0) {
        res.send(selectedUsers);
      } else {
        res.status(404).send('USERS WITH SUCH PROFESSION ARE NOT FOUND');
      }
    }
  });
  });



//Starting the server
app.listen(PORT,()=>{
    console.log(`My server is running on: http://localhost:${PORT}`);
})
