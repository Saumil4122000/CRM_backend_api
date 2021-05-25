# db.users.createIndex({email:1},{unique:true})

Used To make email unique and prevent duplicate entry
Used bcrypt for encrypt the password

# I have used JWT(Json wen Token) which is basically used to provide securety between two application client and server side

In this i have used JWT if User Login through user form then it will check credential to mongodb if it is present then it will give access of website to user


There are 2 JWT

1)Access JWT which will be stored in reddis db in which client will have access to token 15min 

2)Refresh JWT which will be stored in mongodb.

Suppose the Access Token is expired then we can give token to user after 15min from the refresh JWT mongoDb if user want access to website after 15min.


If the credential provided is invalid then it will give user message about wrong credential

# Complete Process of how i designed the JWT Authorization
1) Now client will have access Token which will send it to api server

2) Server will check whether this token is valid or not if not  it will respond 403 error

3) If it is valid then  server will check it into radis database whether it is there or not

4) If it is not in raddis db then server respond 403 error if it is there then server find the 
corresponding _id of token. Now this _id is stored in MongoDB along with other information.

5) From that id server find data and give access to User.


# Microsoft Extensions Used
1) REST CLIENT

# NODE MODULES USED
1) bcrypt
2) body-parser
3) cors
4) dotenv
5) express
6) helmet
7) jsonwebtoken
8) mongoose
9) morgan
10) redis

# DATABASE USED FOR STORAGE
1) MongoDB
2) REDIS

# CODE EDITOR
1) VS CODE

# ALSO USED MONGODB COMPASS