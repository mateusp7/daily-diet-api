import { app } from "./app";

app.get("/", () => {
  return "Hello World!";
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server listening on port 3333");
  });
