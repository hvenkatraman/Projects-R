const express =require("express");

const mongodb=require("mongodb");

const cookieParser=require("cookie-parser");

const app= express();

const admin =express.Router();
const student=express.Router();


//url="mongodb://localhost:27017"
//client= mongodb.MongoClient(url);

//db=client.db(school);
app.use(express.json());
app.use(express.text());
//app.use(express.raw());
//
app.use(cookieParser());

app.use('/admin',admin);
app.use('/student',student);
app.set("view engine","ejs");

admin.get("/admin",(req,res,next)=>{console.log("Admin area of user GET at : /user")});

app.get("/",(req,res,next)=>{res.send("Get method at root location : /")});

app.get("/requests_object",(req,res,next)=>{

    const rm=req.method
    const rp =req.protocol;
    const rs=req.secure;
    const rh=req.hostname;
    const rip=req.ip;
    const ra=req.accepts;
    const rheader_ct=req.get("Content-Type");
    const rheader_ct1=req.headers.accept;
    const rheader_al=req.headers['Accept-Language'];

    const rourl=req.originalUrl;
    const rurl=req.url;
    const rpath=req.path;//path isame as baseurl
    const rdomain=req.domain;
    console.log(`Methof=${rm}\nProtocol=${rp}\nSecure=${rs}\nHostname=${rh}\nIP=${rip}\nAccepts=${ra}\nHeader:(Content-Type)=${rheader_ct}\nurl=${rurl}Ourl=${rourl}\nPath=${rpath}\nHeader ct1=${rheader_ct1}\nHeader:Accept-Language=${rheader_al}`)
    res.send("Get method shoeing various request objects : /requests_object")});


app.get("/response_send",(req,res,next)=>{

        res.send("Get method for :/response_send")});

app.get("/response_end",(req,res,next)=>{

        res.end()});


app.get("/response_json",(req,res,next)=>{

        res.json({"Name":"H Venakat Ramana",
                  "Age":"39",
                  "Height":"5ft 10inches",
                  "Designation":"Asst Manager"
                })

});


app.get("/response_redirect",(req,res,next)=>{

        res.location("/xyz").redirect("/response_json")});


app.get("/response_set",(req,res,next)=>{

        res.set("Name","hvr").send("Get method for :/response_set")});

app.get("/response_get",(req,res,next)=>{

        res.get("Name").send("Get method for :/response_get")});

app.get("/response_status",(req,res,next)=>{

        res.status(201).send("Get method for :/response_status")});


app.get("/response_sendstatus",(req,res,next)=>{res.sendStatus(501)});


app.get("/response_render/:page",(req,res,next)=>{

    const page=req.params.page;

    if(page==='index')
     {
       res.render("pages/index.ejs");

     }

    else if(page==='home')
     {
       res.render("pages/home.ejs");
     }

    else if(page==='aboutus')
     {
       res.render("pages/about_us.ejs");}


    else if(page==='feedback')
     {
       res.render("pages/feedback.ejs");}


    else if(page==='ourbusiness')
     {
       res.render("pages/our_business.ejs");}


    else  if(page==='contactus')
     {
       res.render("pages/contact_us.ejs");}
    else
     {
       res.status(401).render("pages/error.ejs");

     }

        });
app.get("/response_set",(req,res,next)=>{

        res.set("Name","hvr").send("Get method for :/response_set")});


// Serve route
app.get('/response_accept', (req, res) => {

      const req_accept =req.params.Accept;
      console.log(req_accept);

  res.format({
    'text/html': () => {
      // Render the index.ejs inside the "pages" folder
      res.render('pages/index', { message: 'Hello, this is the EJS index page' });
    },
    'text/plain': () => {
      res.send('Hello, this is a plain text response');
    },
    'application/json': () => {
      res.json({ message: 'Hello, this is a JSON response' });
    },
    'application/xml': () => {
      res.type('application/xml');
      res.send(`<response><message>Hello, this is an XML response</message></response>`);
    },
    default: () => {
      res.status(406).send('Not Acceptable - format not supported');
    },
  });
});




app.get("/responses_object",(req,res,next)=>{res.send("Get method at root location : /")});
app.get("/crud",(req,res,next)=>{res.send("Its a GET method in: /crud")});

app.get("/default",(req,res,next)=>{

    const req_cookies =req.cookies
    console.log(req_cookies);
    //console.log(Name);
    //onsole.log(Desg;
    //const rh=req.headers;
    //console.log(rh);
    res.cookie("Email","hvenkatraman9@gmail.com");
    res.send("Its a GET method with cookies in: /default");
});

app.get("/user/:id",(req,res,next)=>{
    const  id_as_params= req.params;
    console.log(id_as_params);
    res.send("Its a GET user with params method in : /user")});

app.get("/user/:DepartmentId/:Name",(req,res,next)=>{
    const  id_as_params= req.params;
    const  {DepartmentId,Name}= req.params;
    console.log(`DepartmentId : ${DepartmentId} Name : ${Name}`);

      console.log(id_as_params);
      res.send("Its a GET user/Department/Name with params method in : /user/Department/Name")});

app.get("/site",(req,res,next)=>{
    const name_email_query=req.query;
    console.log(name_email_query);
    res.send("Get method to query username and email at /site ")});

app.post("/crud",(req,res,next)=>{

    const data =(req.body)
    const {Name,Age,Height} =(req.body)
    console.log(`Name : ${Name} Age : ${Age} Height : ${Height}`);

    console.log(data);
    res.send("Its a POST method in : /crud")});
app.put("/crud",(req,res,next)=>{res.send("Its a PUT method in: /crud")});
app.patch("/crud",(req,res,next)=>{res.send("Its a PATCH method in: /crud")});
app.head("/crud",(req,res,next)=>{res.send("Its a HEAD method in: /crud")});
app.options("/crud",(req,res,next)=>{res.send("Its a OPTIONS method in: /crud")});
app.delete("/crud",(req,res,next)=>{res.send("Its a DELETE method in : /crud")});

app.get("/response_status",()=>{res.status(500).send("Internal server error");});

app.listen(8000,()=>{console.log("Server sucessfully created at port : 8000")});




