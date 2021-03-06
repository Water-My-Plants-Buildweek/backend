Water My Plant API

Base URL: https://water-my-pants.herokuapp.com/

Endpoints

| Request | URL               | Description                 |
| ------- | ----------------- | --------------------------- |
| POST    | api/auth/register | Registers new user          |
| POST    | api/auth/login    | login as an existing user   |
| POST    | api/plants        | add plant to logged in user |
| GET     | api/plants        | get all plants              |
| GET     | api/plants/:id    | get specific plant by id    |
| PUT     | api/plants/:id    | edit specific plant         |
| DELETE  | api/plants/:id    | delete specific plant       |

Table Requirements

Users

| Name     | Type    | Required | Unique | Notes                     |
| -------- | ------- | -------- | ------ | ------------------------- |
| id       | integer | yes      | yes    | users id (auto generated) |
| username | string  | yes      | yes    | users username            |
| password | string  | yes      | no     | users password            |
| phone    | string  | no       | yes    | users phone-number        |

Plants

| Name         | Type    | Required | Unique | Notes                      |
| ------------ | ------- | -------- | ------ | -------------------------- |
| id           | integer | yes      | yes    | plants id (auto generated) |
| nickname     | string  | yes      | no     | plants nickname            |
| species      | string  | yes      | no     | plants species             |
| h2oFrequency | integer | yes      | no     | plants water frequency     |
| image url    | string  | no       | no     | plants picture             |
