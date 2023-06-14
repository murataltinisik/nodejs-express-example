# nodejs-express-example
_This is a nodejs express example, Test of this project didn't do._

## INDEX & USER ROUTES
| Route         | HTTP VERB | POST BODY                                                             | DESCRIPTION        |
|---------------|-----------|-----------------------------------------------------------------------|--------------------|
| /             | GET       | HTML TEMP                                                             | return Index Page  |
| /register     | POST      | ```{ name, surname, email, password }```                              | Create a news user |
| /authenticate | POST      | ```{ email, password }```                                             | Take a token       |


## NEWS ROUTES
| Route              | HTTP VERB | POST BODY                                     | DESCRIPTION          |
|--------------------|-----------|-----------------------------------------------|----------------------|
| /api/news          | GET       | Empty                                         | Get all news data    |
| /api/news/:news_id | GET       | Empty                                         | Get single news data |
| /api/news          | POST      | ```{ title, content, image, tag, user_id }``` | Create a new news    |
| /api/news/:news_id | PUT       | ```{ title, content, image, tag, user_id }``` | Update the news      |
| /api/news/:news_id | DELETE    | Empty                                         | Delete the news      |

