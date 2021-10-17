// initialize packages
const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');
// variable Declaration
const app = express();
const localPort = 3000;

// initialize external file
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

mailchimp.setConfig({
    apiKey: "8c9c26a4170e95ac16155fc2f9f9d877-us5",
    server: "us5"
});

app.get('/' , (req , res)=>{
    res.sendFile(__dirname + "/signup.html");
})
app.post('/' , (req, res)=>{

    const listId = "56773d9fc0";
    const subscribingUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.emailAddress
    };

    
    async function run() {
        try{
            const response = await mailchimp.lists.addListMember(listId, {
                email_address: subscribingUser.email,
                status: "subscribed",
                merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
                }
            });
            console.log(
                `Successfully added contact as an audience member`
            );
            res.sendFile(__dirname + "/success.html");
        }catch(e){
        res.sendFile(__dirname + '/failure.html');
        }
    }
    

    run();
    
});

app.post('/failure', (req, res) => {
    res.redirect('/');
});


app.listen(process.env.PORT || localPort, ()=>{
    console.log(`...server is running on port ${localPort}`);
});

// API key
// 8c9c26a4170e95ac16155fc2f9f9d877-us5

// List ID
// 56773d9fc0


