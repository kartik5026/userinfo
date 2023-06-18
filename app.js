const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",(req,res)=>{
    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const user_email = req.body.email;

    const data ={
        members:[
            {
                email_address:user_email,
                status:"subscribed",
                merge_fields:{
                    FNAME:first_name,
                    LNAME:last_name
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/e7de1a3b83";
    var options={
        method:"POST",
        auth:"kartik:5e1a796c9109f041dc899453e36575cb-us21"
    }
    
   const request =  https.request(url,options,(response)=>{
        if(response.statusCode == 200){
            res.sendFile(__dirname+"/success.html");
        } 
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        })
    })
    
    
    request.write(jsonData);
    request.end();
    
})

app.get("/failure",(req,res)=>{
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running on port 3000");
})



// api key
// 5e1a796c9109f041dc899453e36575cb-us21

// List Id:
// e7de1a3b83