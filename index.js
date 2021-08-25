const postApi = "https://jsonplaceholder.typicode.com/posts";
let contentEl = document.getElementById("blogItems");
let formEl = document.getElementById("submit-form");
let titleInput = document.getElementById("post-title");
let bodyInput = document.getElementById("post-body");
let postObj = {};
let postArr = [];

const renderPosts = (arr) => {
  let html = "";
  // reversing array so new item is on top
  let reversedArr = arr.reverse();

  // looping through array to create html elements
  for (post of reversedArr) {
    html += `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <hr />
      `;
  }

  // add to DOM
  contentEl.innerHTML = html;
};

// getting all blog posts and adding them to the DOM
fetch(postApi)
  .then((res) => res.json())
  .then((data) => {
    // get the first 5
    postArr = data.slice(0, 5);

    // gather all items and create html elements for each
    renderPosts(postArr);
  });

// posting data to API and adding to the DOM
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  titleVal = titleInput.value;
  bodyVal = bodyInput.value;
  postObj.title = titleVal;
  postObj.body = bodyVal;

  // by adding option params, we tell fetch to POST, string the JSON, and the type of data coming through
  fetch(postApi, {
    method: "POST",
    body: JSON.stringify(postObj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // adding new object to postArr
      postArr.push(data);
      renderPosts(postArr);

      titleInput.value = "";
      bodyInput.value = "";
    });
});
