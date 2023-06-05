
const url = `http://18.208.249.57:3000//api/likes`

const trueMotivatorRequest = Functions.makeHttpRequest({
  url: url,
})

// Execute the API request (Promise)
const trueMotivatorResponse = await trueMotivatorRequest
    if (trueMotivatorResponse.error) {
      console.error(trueMotivatorResponse.error)
      throw Error("Request failed")
    }


const data = trueMotivatorResponse["data"]
if (data.Response === "Error") {
  console.error(data.Message)
  throw Error(`Functional error. Read message: ${data.Message}`)
}

// extract the number of likes and dislikes
const likes = data.numberOfLikes
const dislikes = data.numberOfDislikes
const result = {
  likes: likes,
  dislikes: dislikes
}

return Functions.encodeString(JSON.stringify(result))