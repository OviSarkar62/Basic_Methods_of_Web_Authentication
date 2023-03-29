# Basic Methods of Web Authentication

Basic methods of web authentication including Encrypting Database, Hashing Password, Salting & Hashing Password.

### Lesson1: Database Encryption

### Lesson2: Hashing Password

### Lesson3: Hashing & Salting Password

### Encryption

    const encrypt = require('mongoose-encryption');
    var encKey = process.env.ENC_KEY;
    userSchema.plugin(encrypt, { secret: encKey, encryptedFields: ['password'] });

### Hashing
// For Register
app.post("/register", async (req,res)=>{
    try{
        const newUser = new User({
            email: req.body.email,
            password: md5(req.body.password)
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch(error){
        res.status(500).json(error.message);
    }
});

// For Login
app.post("/login", async (req,res)=>{
    try{
        const email = req.body.email;
        const password = md5(req.body.password);
        const user = await User.findOne({email: email});
        if(user && user.password === password){
            res.status(200).json({status:"Valid user"});
        } else {
            res.status(404).json({status:"Not valid user"});
        }
    } catch(error){
        res.status(500).json(error.message);
    }
});
