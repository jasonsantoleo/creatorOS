import client from "./lib/ds.js";

async function name() {
    const a=await client.user.findMany({})
    console.log("db executed");
}