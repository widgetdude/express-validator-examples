# express-validator-examples

A few different ways to implement express validator

## References

1.  `https://express-validator.github.io/docs/`
2.  `https://github.com/validatorjs/validator.js`

## Setup

##### Install the dependencies

```bash
npm install
```

##### Start the server

```bash
npm start
```

##### Make Request

Send a POST request to `http://localhost:8080/examples/1` with the following body:

```json
{
  "userId": "633065ec5cac22c34826c340",
  "event": "GameScore",
  "game": "Snake",
  "score": 88
}
```

## Rules

Every request payload should:

1. Have a `userId` and should be a valid mongo id
2. Have a `event` and it should be one of ["GameScore", "GameStart", "GameEnd"]
3. Have a `game` if the `event` is `GameScore`. It should be one of ["Pong", "Tetris", "Snake"]
4. Have a `score` if the `event` is `GameScore`. It should be a number and be between 0 and 100.

### Invalid Payload Examples

Game score > 100

```json
{
  "userId": "633065ec5cac22c34826c340",
  "event": "GameScore",
  "game": "Snake",
  "score": 101
}
```

Invalid game type

```json
{
  "userId": "633065ec5cac22c34826c340",
  "event": "GameScore",
  "game": "Pacman",
  "score": 50
}
```

### Valid Payload

```json
{
  "userId": "633065ec5cac22c34826c340",
  "event": "GameScore",
  "game": "Snake",
  "score": 88
}
```
