import { httpClient } from '@felipemarinhodev/commons-http-client';
import http from 'http';

console.log("Node JS!");

http.createServer(async (_, res) => {

  const githubPayload = await httpClient.get("https://api.github.com/users/felipemarinhodev");

  res.write(JSON.stringify({ 
    message: "Hello from Node Server!!",
    githubPayload
  }));
  res.end();
}).listen(4000);
