const http = require("http");

const server = http.createServer((req, res) => {
  const { url, method } = req;
  console.log(url);
  let content = "";
  if (url == "/") {
    content = `<h1>Hello!</h1>
    <form method="POST" action="/create-user">
    <label for="name="userName'">User name</label>
    <input name="userName' id="userName'/>
    <button>Save</button>
    </form>`;
  } else if (url == "/create-user" && method == "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const parsed = Buffer.concat(body).toString();
      console.log(body);
      console.log(parsed);
    });
  } else if (url == "/users") {
    const users = [1, 2, 3, 4, 5].map((id) => `<li>User ${id}</li>`).join("");
    content = `
    <ul>
        ${users}
    </ul>
    `;
  } else {
    content = `
   Not found
    `;
  }

  res.write(`
    <html>
    <head></head>
    <body>${content}</body>
    </html>
    `);
  res.end();
});
server.listen(3000);
