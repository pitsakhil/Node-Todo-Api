## Get started

**API Base url** :  [https://cryptic-mesa-93221.herokuapp.com/](https://cryptic-mesa-93221.herokuapp.com/)

- **GET : */todos* **
- **POST : */todos* **
`Sample Payload :
    {
        "text": "Sample Text"
    }`
- **PUT : */todos/:id* **
`Sample Payload :
    {
        "text": "Updated Sample Text",
        "completed": true
    }`
- **DELETE : */todos/:id* **

### Heroku usefull commands
 - heroku login
 - heroku create
 - git push heroku master
 - heroku open
 - heroku addons:create mongolab:sandbox
 - heroku config
 - heroku git:remote -a <app-name>
 - heroku logout