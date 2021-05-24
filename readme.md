db.users.createIndex({email:1},{unique:true})
Used To make email unique and prevent duplicate entry


Used bcrypt for encrypt the password