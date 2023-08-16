// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('credits');

// Create a new document in the collection.
db.getCollection('Student').insertOne({
  ID:"1",
  Name:"李四",
  Gender:"Male",
  Age:18,
  EarnedCredits:100,
});
