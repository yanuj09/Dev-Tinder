
# DevTinder APIs

## auth Router
-POST/ signup
-POST/ login
-POST/ logout

## profileRouther
-GET/ profile/view
-PATCH/ profile/ edit
-PATCH/ profile/ password   // forget password api


## connectionRequest routher
-POST/request/send/:status/:userId

-POST/ request/send/interested/:userId
-POST/request/send/ignored/:userId

-POST/request/review/:status/:userId

-POST/request/review/accepted/:requesteId
-POST/request/review/rejected/:requesteId


## userRouter
-GET/user/connections
-GET/user/requests
-GET/user/feed- Gets you the profiles of other user on platforms


Status: ignore, interested, accepted, rejected