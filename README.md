# Rainstack

# Join our [discord](https://discord.gg/Hp84ss9yRp)!

# What's new in v2.0.0-beta?

- MongoDB system.

# Document
[Turkish document](https://github.com/softyagmur/rainstack/blob/main/documents/tr.md)

# 🌍 Welcome to the English Guide!
**✨ Version 2.0.0-beta.1**
```bash
npm install rainstack

or

pnpm install rainstack
```

# ⏰ Long-term Plans
- Special protected databases.
- Link database, yml databases will be added.

# 🏅 Example Usage
**CommonJS:**
```js
const { Database, writeLang } = require("rainstack");
```

**ESM:**
```js
import { Database, writeLang } from "rainstack";
```

# 📦 Language settings
```ts
writeLang("en"); // en or tr
```

# 📦 Database settings
```ts
const db = new Database();

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

# ⚠️ Warning
**All issues when using this npm package will be considered accepted by you, please act accordingly.**