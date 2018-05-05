// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var tables = [
  {
    name: "bob",
    phone: "555-1234",
    email: "bob@example.com",
    id: 123
  }
];

var waitlist = [
  {
    name: "random guy",
    phone: "555-5678",
    email: "guy@example.com",
    id: 321
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all tables
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays all on waitlist
app.get("/api/reserve", function(req, res) {
    return res.json(waitlist);
});



app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservation = req.body;
  
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);
  
  for (i=0; i < tables.length; i++) {
    if (newReservation.name === tables[i].name) {
      alert("You already have a reservation.")
    } else {
      for (j=0; j < waitlist.length; j++) {
        if (newReservation.name === waitlist[j].name) {
          alert("You already have a reservation.")
        } else {
          if(tables.length < 5) {

            tables.push(newReservation);
        
            res.json(newReservation);
        
            } else {
              waitlist.push(newReservation);
        
              res.json(newReservation);
            }
        }
      }
    }
  }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});