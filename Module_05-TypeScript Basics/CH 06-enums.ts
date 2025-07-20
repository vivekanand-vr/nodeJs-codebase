/*
 * TypeScript: Enums
 *
 * - Enums allow you to define a set of named constants.
 * - There are two main types: numeric and string enums.
 * - Enums are useful when you want to restrict a variable to a limited set of values.
 * - They are compiled into real JavaScript objects.
 */

// 1. Numeric enum (default starts at 0)
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

const move = (dir: Direction) => {
  console.log("Moving:", Direction[dir]); // Reverse lookup
};

move(Direction.Left); // Moving: Left

// 2. String enum
enum HttpStatus {
  OK = "200 OK",
  NotFound = "404 Not Found",
  ServerError = "500 Server Error"
}

function handleStatus(status: HttpStatus) {
  if (status === HttpStatus.OK) {
    console.log("Success!");
  } else {
    console.log("Error:", status);
  }
}

handleStatus(HttpStatus.NotFound);

// 3. Constant enum (does not emit object in compiled JS)
const enum Color {
  Red,
  Green,
  Blue
}

const favoriteColor: Color = Color.Green;
