import axios from "axios"

// GET Method 
axios
  .get("http://localhost:7000/users")
  .then(response => {
    console.log("response: ", response)
    // do something about response
  })
  .catch(err => {
    console.error(err)
  })

// POST Method
axios
  .post("http://localhost:7000/users", { firstName: "example", lastname: "example", age: 10 })
  .then(response => {
    console.log("response: ", response)
    // do something about response
  })
  .catch(err => {
    console.error(err)
  })

// PUT Method
axios
  .put("http://localhost:7000/users/:id", { firstName: "example", lastname: "example", age: 10 })
  .then(response => {
    console.log("response: ", response)
    // do something about response
  })
  .catch(err => {
    console.error(err)
  })

// PATCH Method
axios
  .put("http://localhost:7000/users/:id", { age: 20 })
  .then(response => {
    console.log("response: ", response)
    // do something about response
  })
  .catch(err => {
    console.error(err)
  })

// DELETE Method
axios
  .delete("http://localhost:7000/users/:id", { age: 20 })
  .then(response => {
    console.log("response: ", response)
    // do something about response
  })
  .catch(err => {
    console.error(err)
  })