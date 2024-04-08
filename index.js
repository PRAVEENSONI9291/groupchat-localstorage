const express = require('express');
const bp = require('body-parser');

const fs = require('fs');

const app = express();
app.use(bp.urlencoded({extended: true}));


app.get('/', (req, res) => {
    fs.readFile("username.txt", (err, data)=>{
        if(err){
            console.log(err);
            data= "no chat exists";
        }
        res.send(`

            <form action="/" method= "POST" onSubmit="document.getElementById('username').value= localStorage.getItem('username')">
                <input type="text" name="message" id="message"></input>
                <input type="hidden" name="username" id="username"></input>
                <button type="submit">send</button>
            </form>
            ${data}
        `)
    })
})



app.post("/", (req, res, next)=>{
    
    if(req.body.message){

        fs.writeFile("./username.txt", `</br>${req.body.username}: ${req.body.message}`, {flag: 'a'}, (err)=>{

            err? console.log(err) : res.redirect('/');
        })

    }
    else{
        res.redirect('/');

    }
   


} )


app.get('/login', (req, res) => {

    res.send(`

     <form action="/" method= "POST" onSubmit="localStorage.setItem('username', document.getElementById('username').value)">
         <input type="hidden" name="message" id="message"></input>
         <input type="text" name="username" id="username"></input>
         <button type="submit">Submit</button>
     </form>
 `)
    
})


app.listen(3500);


























