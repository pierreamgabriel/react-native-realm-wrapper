# React Native Realm Wrapper

With this wrapper, you can write less code when using Realm.

## Installation and usage

First, install Realm:

```bash
npm install realm
```
Then:

```bash
npm install react-native-realm-wrapper
```
Import it:

```javascript
import { rnrw } from 'react-native-realm-wrapper';
```

## First instructions

You don't need to worry about opening and closing realms because everything is done automatically. All operations can be performed without calling any additional function.

This wrapper supports only the functions listed here. If you need anything else, you can always use Realm directly.

All functions return a promise with a success or error message or the query results.

## Schemas

Here, schemas are arrays, not objects, and they have the following elements: schema name, properties, and encryption key (optional). The id property is always required, and it must be an integer representing the primary key.  

```javascript
const schema = ["Cars", {id: "int", model: "string", color: "string", year: "int"}];
```
The id will automatically be used as the primary key.

## Write operations

### Create and edit objects

With the same function, you can create new objects or edit existing ones. If you pass a new id, it'll be a new object, and if you pass an existing id, the object properties will be updated with the new values provided.

The id property must be unique per object. Objects from different schemas can have the same id.

```javascript
rnrw.write(schema, properties);
```
Example:

```javascript
const schema = ["Cars", {id: "int", model: "string", color: "string", year: "int"}];

rnrw.write(schema, {id: 1, model: "Honda Pilot", color: "Blue Pearl", year: 2022});
```

### Delete an object

To delete an object, you must pass its id.

```javascript
rnrw.del(schema, id);
```
Example:

```javascript
const schema = ["Cars", {id: "int", model: "string", color: "string", year: "int"}];

rnrw.del(schema, 1);
```

### Delete all objects of a specific type

It deletes all objects in a schema.

```javascript
rnrw.delT(schema);
```
Example:

```javascript
const schema = ["Cars", {id: "int", model: "string", color: "string", year: "int"}];

rnrw.delT(schema);
```

### Delete all objects 

It deletes all objects from all schemas.

```javascript
rnrw.delAll();
```
If you're using an encryption key, it must be passed as an argument.

```javascript
rnrw.delAll(key);
```

## Read operations

### Find a specific object by primary key

```javascript
rnrw.pk(schema, id);
```
Example:

```javascript
const schema = ["Cars", {id: "int", model: "string", color: "string", year: "int"}];

rnrw.pk(schema, 1).then(obj => {});
```

### Query an object type

It returns all objects in a schema.

```javascript
rnrw.ot(schema).then(obj => {});
```
You can sort the objects by any property. In the example below, we're sorting them by model in ascending order:

```javascript
rnrw.ot(schema, "model").then(obj => {});
```
To sort in descending order, pass true as the third argument.

### Find the next available id

Since every object in a schema must have a unique id, you can use the following function to find the next available one:

```javascript
rnrw.nextID(schema).then(id => {});
```

## Add or remove properties (schema version)

To add or remove properties, use the following function passing the modified schema and the new schema version as arguments. The standard version is zero, so if you're making changes for the first time, you can set it to 1.

```javascript
rnrw.schema(schema, newVersion);
```
Example:

```javascript
// Original schema: ["Cars", {id: "int", model: "string", color: "string", year: "int"}];

// Modified schema:

const schema = ["Cars", {id: "int", brand: "string", model: "string", color: "string", year: "int"}];

rnrw.schema(schema, 1);
```
As you can see, when you add or remove properties, you need to set a new schema version greater than the previous one, and it comes with some changes too. Let's see what happens when the schema version changes:

**The schema array will require two additional elements**

The fourth element must always be the new schema version, and the third one will depend on whether you're using an encryption key. If you're using it, pass the key, and if not, pass null.

With encryption key:

```javascript
const schema = [name, properties, key, schemaVersion];
```
Without encryption key:

```javascript
const schema = [name, properties, null, schemaVersion];
```
All schemas in Realm use the same schema version. Even if you're changing the properties of only one schema, the other ones will follow the same rule. 

**The delAll() function will require two arguments**

The second argument must always be the new schema version, and the first one will depend on whether you're using an encryption key. If you're using it, pass the key, and if not, pass null.

With encryption key:

```javascript
rnrw.delAll(key, schemaVersion);
```
Without encryption key:

```javascript
rnrw.delAll(null, schemaVersion);
```

## Encryption

If you're starting a new project, you can opt for encryption. Unfortunately, there's no easy way of encrypting an existing Realm database. Bear in mind that, although you first pass the key in only one schema array, all future schemas will be encrypted too, and you must use the key with all of them.

To learn more about how encryption works with Realm, read their page https://docs.mongodb.com/realm/sdk/react-native/advanced/encrypt/.