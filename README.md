# Rainstack

# Join our [discord](https://discord.gg/Hp84ss9yRp)!

# What's new in v3.1.0?

- Mongo and JSON database systems.
- Language system.

# Document

[Turkish document](https://github.com/softyagmur/rainstack/blob/main/documents/tr.md)

# 🌍 Welcome to the English Guide!

--✨ Version 3.1.0--

```bash
npm install rainstack

or

pnpm install rainstack
```

# ⏰ Long-term Plans

- Language system, for console.log()
- MetusDB will now give all the data it can, for example: db.set(“slenzy.code”, “value”).then((response)=>{console.log(response.data)}) where it will access all information about the data using response.data
- Link database (the user will run an express server on his/her computer e.g. http://localhost:5000 where link databases will be separated /database/user.json, /database/passward.json etc.)
- Yml database (I have no idea, I don't know yml, I will investigate)
- Detailed document (5 different languages: Turkish, English, German, French, German, French and Latin)
- Storing the database of private users will be as follows: we will open a server for private users, we will open a server for private users, everyone will be able to see a certain channel, everyone will be able to see a certain channel, all data records will take place in that channel, for example, data set, there will send the whole database, data deleted, send it again, if there is a data loss, the man will be able to access even the data from a long time ago.

# 🏅 Example Usage

--CommonJS:--

```js
const { Database, writeLang } = require("rainstack");
```

--ESM:--

```js
import { Database, writeLang } from "rainstack";
```

# 📦 Language settings

```ts
writeLang("en"); // en or tr
```

# 📦 Database settings (JSON)

```ts
const db = new Database("path.json"); // not required

db.set("key.object1.object2", "value"); // result: { key: { object1: { object2: "value" } } }

db.get("key"); // result: { object1: { object2: "value" } }
db.get("key.object1"); // result: { object2: "value" }
db.get("key.object1.object2"); // result: "value"
db.getAll(); // result: { key: { object1: { object2: "value" } } } => all keys

db.push("key.array", "value1"); // result: { key: { array: ["value1"] } }
db.push("key.array", "value2"); // result: { key: { array: ["value1", "value2"] } }
db.unpush("key.array", "value1"); // result: { key: { array: ["value2"] } }
db.unpush("key.array"); // result: { key: {} } removes the entire array

db.has("key.object1.object2"); // result: true
db.delete("key.object1.object2"); // result: { key: { object1: {} } }
db.delete("key.object1"); // result: { key: {} }
db.delete("key"); // result: {}
db.deleteAll(
  "You are fully responsible for the data in your project. This data will be deleted. Do you confirm? (I confirm)"
); // result: {} => deletes all data in the database
```

# 📦 Database settings (Mongo)

```ts
const db = new MongoDatabase();
const mongo = "mongodburl";

(async () => {
  await mongoose
    .connect(mongo)
    .then(() => {
      console.log("Mongodb connection successful!");
    })
    .catch((e) => {
      console.error(e);
    });
})();

(async () => {
  db.set("key", "testValue"); // result: {value: "testValue"}
  db.set("key2", { name: "testValue", age: 21 }); // result: {"value": {name:"testValue",age:21}}

  await db.get("key"); // result: testValue
  await db.get("key2"); // result: {name:"testValue",age:21}
  await db.getAll(); // result: {key:"testValue",key2:{name:"testValue",age:21}}

  db.push("newKey", "value1"); // result: ["value1"]
  db.unpush("newKey"); // result: []
  db.unpush("newKey", "value1"); // result []

  db.has("key"); // result: true
  db.delete("key"); // result: {}
  db.delete("key2"); // result: {}
  db.deleteAll(
    "You are fully responsible for the data in your project. This data will be deleted. Do you confirm? (I confirm)"
  ); // result: {} => deletes all data in the database
})();
```

# ⚠️ Warning

--All issues when using this npm package will be considered accepted by you, please act accordingly.--
