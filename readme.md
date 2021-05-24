# db.users.createIndex({email:1},{unique:true})

Used To make email unique and prevent duplicate entry
Used bcrypt for encrypt the password

# I have used JWT(Json wen Token) which is basically used to provide securety between two application client and server side

In this i have used JWT if User Login through user form then it will check credential to mongodb if it is present then it will give access of website to user


There are 2 JWT

1)Access JWT which will be stored inreddis JWT which will have access to token 15min 

2)Refresh JWT which will be stored in mongodb.

Suppose the Access Token is expired then we can give token to user after 15min from the refresh JWT mongoDb if user want access to website after 15min.


If the credential provided is invalid then it will give user message about wrong credential
