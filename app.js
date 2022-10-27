const sql = require("msnodesqlv8");
const express = require('express');
const app = express();
CORS = require('cors');
app.use(CORS());

//CONNECTION STRING
const connectionString = "server=; Database=; User Id=sa; Password=; Trusted_Connection=Yes; Driver={SQL Server Native Client 11.0}";

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/",function(req,res)
{
    res.send("<h1> Hello word !</h1>")
});

//GET DATA
app.get('/data', function (req, res) 
{
    const query = "SELECT * FROM Student";

    sql.query(connectionString, query, (err, rows) => 
    {
        res.send(rows)
    })
})

//GET DATA ID
app.get('/data/:id', function (request, response) 
{
    const query = " SELECT * FROM Student WHERE ID = " + request.params.id;

    sql.query(connectionString, query, (err, rows) => 
    {
        response.send(rows)
    })
});

//INSERT QUERY
app.post('/post', function (request, response) 
{
    const query = " INSERT INTO Student (Fname, Lname, Email)VALUES('" + request.body.Fname + "', '" + request.body.Lname + "', '" + request.body.Email + "')"

    sql.query(connectionString, query, (err, rows) => 
    {
        response.send(rows)
    })
 
});

//UPDATE QUERY
app.put('/put', function (request, response) 
{
    const query = " UPDATE Student SET Fname = '" + request.body.Fname + "', Lname = '" + request.body.Lname + "', Email = '" + request.body.Email + "' WHERE ID = " + request.body.ID;

    sql.query(connectionString, query, (err, rows) => 
    {
        response.send(rows)
    })
    console.log(request.body)
})

//DELETE QUERY
app.delete('/data/:id', function (request, response) 
{
    const query = " DELETE FROM Student WHERE ID = " + request.params.id;

    sql.query(connectionString, query, (err, rows) => 
    {
        response.send(rows)
    })
});

app.listen(process.env.PORT || 3000,()=>
console.log(' Server is running... '));