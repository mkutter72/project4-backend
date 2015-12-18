# README For Community Cares Website - Project 4  - Backend Portion of the Project

For general information and details on the UI portion of this project see
https://github.com/mkutter72/project4-frontend-II/blob/master/README.md

## Collections Definitions for Database
* Users : This collection will be used for the creators of the surveys
* Appointments : This collection stores the appointments that are displayed on the calendar
* MessageBoard:   This collection stores the history of the chat session.   The collection holds documents which represents different message boards

###Collections for User and User Authentication
These collections, models and routers originate from https://github.com/ga-wdi-boston/express-passport

###Collection for Users
* Users come from the default project of express-passport




###Collections

####Message Board Collection

| Field | Document |
| :----- | :--- |
| boardName | 'string'
| messages | []


####Apointments Collection

| Field | Document |
| :----- | :--- |
| date | 'string'
| userName | 'string'
| description | 'string'
| time | 'string'

####Validations and Constraints
* boardName is required and must be unique
* all fields are required for Appointments



###Associations
* A user has many appointments
* A user has many message boards
* A message boards has many messages
* An appointment belongs to a single user
* A message belongs to a single message board







###Authorization and Authentication
User authorization and authentication is provided by the express-passport repo that Saad provided.

### URL For The Backend Server

https://intense-cove-9531.herokuapp.com
