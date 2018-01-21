# NODE JS EXAMPLE WITH MONGODB

This is a project based on Node.js which simulates the Twitter publication system

| Fields | Restriction | Required |
| ------ | ------ | ------ |
| Content | 280 characters | True |
| Location | 64 characters | True |
| Author First Name | 32 characters | True |
| Author Last Name | 32 characters | True |
| Author Email| 64 characters | True |
| Status| ------ | False |

### Installation

Clone the repository
```sh
$ git clone https://github.com/josuedor/Twitter_Ornella.git
```
Also this project  needs to work properly:
* [Node.js](https://nodejs.org/)
* [Express](http://expressjs.com/) 
* [Moment.js](https://momentjs.com/) 
* [Mongoose.js](https://mongoosejs.com/) 
* [body-parser-json](https://www.npmjs.com/package/body-parser-json)
* [MongoDB on AWS Cloud 9](https://github.com/nax3t/aws-cloud9-instructions#mongodb-instructions)

So you have to install the dependencies and start the server.

```sh
$ npm install -d
$ npm i express -S  
$ npm i moment -S 
$ npm i mongoose -S 
$ npm i body-parser -S 
$ npm start
```

### Documentation

* `GET /tweets` : You get in a json all the tweets stored in the database.
* `GET /authors` : You get in a json all the authors stored in the database where the status is true.
* `GET /tweets/:id` : You get in a json the specific tweet stored in the database through an id sent by the url.
* `GET /authors/:id` : You get in a json the specific author stored in the database through an id sent by the url.
* `POST /tweets` : Create in a jason a new tweet in the database.
* `POST /authors` : Create in a jason a new author in the database.
* `PUT /tweets/:id` : Edite in a jason a specific tweet in the database.
* `PUT /authors/:id` : Edite in a jason a specific author in the database.
* `DELETE /tweets/:id` : Delete in a jason a specific tweet in the database.
* `DELETE /authors/:id` : Delete in a jason a specific author in the database.

### Example
***POST Author***
```sh
{
  "firstname": "Ornella",
  "lastname" : "Ramos",
  "email" : "ornellar@uninorte.edu.co"
}
````

***POST Tweet***
```sh
{
  "content": "Post made by Ornella",
  "location" : "Colombia",
  "author" : "5a64fc3fa1ff4f14b2c7e75d"
}
````

**Free Software, Hell Yeah!**

