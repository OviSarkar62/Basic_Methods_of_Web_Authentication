# Basic Methods of Web Authentication

Basic methods of web authentication including Encrypting Database, Hashing Password, Salting & Hashing Password.

### Lesson1: Database Encryption

### Lesson2: Hashing Password

### Lesson3: Hashing & Salting Password

### Encryption

       const encrypt = require('mongoose-encryption');
       var encKey = process.env.ENC_KEY;
       userSchema.plugin(encrypt, { secret: encKey, encryptedFields: ['password'] });
