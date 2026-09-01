// ## Part 2 — Modules, Array Methods, async/await, Optional Chaining
// ### Exercise 8 — async/await
// Run this file in the browser console or with Node 18+.

const BASE_URL = "https://jsonplaceholder.typicode.com";

// 1. Write an async function fetchPosts() that:
//    - fetches BASE_URL + "/posts"
//    - parses the JSON response
//    - returns the first 5 items
//    - logs each item's title
async function fetchPosts() {
  try {
    const res = await fetch(BASE_URL + "/posts")
    const posts = await res.json()
    const firstFivePosts = posts.slice(0, 5)

    firstFivePosts.forEach((post) => console.log(post.title))

    return firstFivePosts
  } catch (error) {
    console.log("Failed to load posts")
  }
}

// 2. Add try/catch to fetchPosts().
//    If the fetch fails, log "Failed to load posts".

// 3. Write an async function getPostById(id) that:
//    - fetches BASE_URL + "/posts/" + id
//    - throws an Error if res.ok is false
//    - returns the parsed JSON object
async function getPostById(id) {
  const res = await fetch(BASE_URL + "/posts/" + id)

  if (!res.ok) {
    throw new Error("Post not found")
  }
  return res.json()
}

// Call getPostById(1) and log the result.
getPostById(1)
  .then((post) => console.log(post))
  .catch((error) => console.log(error.message))

// Call getPostById(99999) — what happens? Handle it.
getPostById(99999).catch((error) => console.log(error.message))
