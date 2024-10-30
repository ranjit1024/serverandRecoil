import express from "express"
import cors from "cors"

const app = express();
const port = 3000;
app.use(cors());

app.get("/", (req, res) => {
    res.send("this is the data")
})



app.get("/userdata", async (req, res)=>{
    let networkCount = Math.floor(Math.random()*10);
    let messageCount = Math.floor(Math.random()*10);
    let notificationCount = Math.floor(Math.random()*10);
    let jobsCount = Math.floor(Math.random()*10);

    res.json({
        "network":networkCount,
        "jobs":jobsCount,
        "message":messageCount,
        "notification":notificationCount
    })
})
app.get("/todo", (req,res)=>{
    const id = req.query.id;
    const todos = [
        {
            "id":1,
            "task":"go to gym",
            "descripition":"go to the gym between 10 to 12",
            "completed":false
        },
        {
            "id":2,
            "task":"go to study hall",
            "descripition":"study for 12 hours",
            "completed":false
        }
    ];
    const finalResponse = todos.filter(todo => id == todo.id);
    if(finalResponse == " "){
        res.status(411).send("this is not a valid id")
    }
    else{
        res.json(finalResponse)
    }
})
app.listen(port, ()=>{
    console.log(`listing on port number ${port}`)
})