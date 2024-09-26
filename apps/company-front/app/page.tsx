"use client"

import { httpClient } from "@felipemarinhodev/commons-http-client";

export default function Page () {

  httpClient.get("https://api.github.com/users/felipemarinhodev")
    .then((data) => console.log(data));

  return <h1>Company front</h1>;
}
