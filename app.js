const http = require("http");
const fs = require("fs");

let express = require("express");
const app = express();
app.use(express.static("public"));

const ps = require("prompt-sync")();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Listen in on port " + port));

app.get("/", (req, res) => {
  res.send("Hello wordddddddld");
});

const data = require("./data.json");

const { error, Console } = require("console");
const { allowedNodeEnvironmentFlags } = require("process");

//QUESTION1

app.get("/subjects", (req, res) => {
  const arr = {};

  for (let x in data) {
    arr[data[x].className] = data[x].subject;
  }

  res.send(arr);
});

//QUESTION 2

app.get("/subjects/course_nbr", (req, res) => {
  var count = 0;
  const arr = [];
  const subjectC = ps("What is the Subject ");

  for (x in data) {
    if (Object.values(data[x]).includes(subjectC)) {
      arr[count] = data[x].course_info[0].class_nbr;

      count += 1;
    }
  }

  if (count == 0) {
    res.send("ERROR 404: Subject Not Found");
  } else {
    res.send(arr);
  }
});

//QUESTION 3

app.get("/subjects/timetable", (req, res) => {
  const sub = ps("Enter Subject: ");
  const cour = ps("Enter Course code: ");
  count = 0;
  const arr = [];

  for (x in data) {
    if (
      Object.values(data[x]).includes(sub) &&
      data[x].course_info[0].class_nbr == cour
    ) {
      arr.push(data[x].course_info);

      count += 1;
    }
  }

  if (count == 0) {
    res.send("Subject or course code doesnt exist");
  } else {
    res.send(arr);
  }
});

// console.log(arr);
// ("use strict");


//Question 4 - create new schedule
// var scheduleData = fs.readFileSync("Schedules.json");
// var scheduleData = JSON.parse(scheduleData); 
 
app.get("/subjects/createschedule", (req,res)=> {

  var scheduleName = ps("Enter name of new schedule: ");

  let schedule = {
    name: scheduleName
  }


  const saveData = (schedule) => {
    const finished = (error) => {
      if(error){
        console.error(error)
        return;
      }
    }
    const jsonData = JSON.stringify(schedule)
    fs.writeFile('Schedules.json', jsonData, finished)
  }


  // if (search(scheduleName, arr) < 0){
  //   res.send(`Schedule ${name} Was Created!`);
  //   arr.push(name);
  // }else{
  //   res.send("Schedule Alreay Exist!");
  // };
  // function search (str, array){
  //   for(var j=0; j<array.length; j++){
  //     if(array[j].match(str)) return 1;
  //   };
  //   return -1;
  // };

  saveData(schedule)


});

app.get("/subjects/createschedule/addinfo", (req,res)=> {

res.send('add info page');


});