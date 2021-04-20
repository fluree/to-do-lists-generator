<p width="100%" align="center">
 <img src='/public/logo192.png' alt='React logo' width='200' height='200'> 
 <img src='/src/Images/Blue_Stacked.png' alt='Fluree logo' width='185'>
 </p>

# **To-Do List Generator powered by React and FlureeDB**

This repo is designed to introduce a basic React application that uses FlureeDB to manage data. By using any HTTP client (in this application we use [axios](https://axios-http.com/)), queries and transactions are issued to create, read, update, and destroy data from the FlureeDB.

## Getting started

1. To get started git clone the repo via `git clone https://github.com/fdmmarshall/to-do-lists-generator.git`, or any other preferred method.

2. `cd` into the repo and run `npm install`

3. then run `npm start` to locally serve the app in your browser at [http://localhost:3000](http://localhost:3000)

## **React**

To keep things simple this application uses Create React App.

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# **What is Fluree?**

Fluree is a Web3-capable graph database platform powered by an [immutable ledger](https://docs.flur.ee/guides/1.0.0/intro/what-is-fluree) backplane.

If you are not familiar with chain or blockchain data, think of it as a list of provable transactions that are sequenced by time. This ledger is tamper-proof and each block in the ledger is linked to the previous block.

Every block contains critical metadata like a hash, a timestamp, and the size of the block data (block-bytes). The core data that constitutes each block, though, are extensions of RDF triples that we call [flakes](https://docs.flur.ee/guides/1.0.0/intro/what-is-fluree#flakes). These flakes contain all the data that is added, updated, or deleted at the moment in time described by each block. Flakes are an integral part of Fluree and are used to represent everything: for a in-depth look at Flakes refer to the [architecture](https://docs.flur.ee/guides/1.0.0/architecture/flakes) docs.

Fluree's graph schemas are made up of [collections and predicates](https://docs.flur.ee/guides/1.0.0/intro/what-is-fluree#collections-and-predicates), we will go further into how to use them in the Schema section below.

At its core, data in Fluree leverages the [Resource Description Framework (RDF)](https://www.w3.org/TR/rdf-concepts/). RDF is a W3C standard model for data interchange on the Web\*. Data in Fluree is modelled by the [RDF Triple](https://www.w3.org/TR/rdf-concepts/#section-triples), which contains a subject, a predicate, and an object.

A simple example would be: "The sky's color is blue", where 'sky' is the subject, 'color' is the predicate, and 'blue' is the object. When comparing the same sentence to the typical approach of an entity–attribute–value model: entity(sky), attribute(color), value(blue).

> \*For a more in-depth look into RDF refer to the W3C [docs](https://www.w3.org/RDF/).

# **Getting Started with Fluree**

This to-do list app uses [Fluree Anywhere](https://docs.flur.ee/docs/1.0.0/getting-started/fluree-anywhere) to manage data, for a in-depth installation guide of Fluree visit the [Installation](https://docs.flur.ee/docs/1.0.0/getting-started/installation) docs. For brief installation points refer below.

## **Installing Fluree**

- [Download](https://fluree-releases-public.s3.amazonaws.com/fluree-1.0.0-beta10.zip) and unzip Fluree (v1.0.0-beta10)
- Launch Fluree with default options by running `./fluree_start.sh` in the terminal for Macs and in Bash emulator for Windows
- Once Fluree is done starting up it will be available for use behind port 8090, e.g. `http://localhost:8090`. [Note: for versions below 1.0.0 the default web server port may be :8080]. Navigating to :8090 in your browser will serve Fluree's default AdminUI. The Fluree server behind :8090 will also respond to POST requests against Fluree's HTTP API endpoints.
- To exit, click `ctrl + c` to kill the thread in your terminal. This will not delete any ledgers or successful transactions.
- For further installation information visit the [Installation](https://docs.flur.ee/docs/1.0.0/getting-started/installation) docs

> Fluree requires Java 11 or above. To verify your version run `java --version` in the terminal or visit [java](https://www.java.com/en/download/manual.jsp) to download.

## **Creating your Ledger, Schema, and Sample Data**

In this section we will break down ledger creation, implementing a basic schema, and adding sample data.

### **Ledger**

A ledger in Fluree is basically the mechanism which stores and keeps track of [_updates_](https://docs.flur.ee/docs/1.0.0/transact/updating-data) or [_transactions_](https://docs.flur.ee/docs/1.0.0/transact/basics) to your data. There are a few different ways to create a new ledger, for more details refer to the [ledger](https://docs.flur.ee/docs/1.0.0/getting-started/ledger-operations) docs.

Here we will create a new ledger in the admin UI:

<p width="100%" align="center">
<img src='/src/Images/FlureeDB_Admin_Console.png' alt='Fluree admin UI' width='600'>
</p>

After pressing the 'Add Ledger' button you will see the modal below. Enter a network name and DB name, for example: `test/one1`

<p width="100%" align="center">
<img src='/src/Images/Create_ledger_modal.png' alt='Ledger Modal' width='600'>
</p>

> The name of your network and ledger will become part of the unique URL that includes the API endpoint. Example: `http://localhost:8090/fdb/test/one1/query`

### **Schema**

Once the ledger has been created the next step is to build your schema. Schemas in Fluree consist of [_collections_](https://docs.flur.ee/docs/1.0.0/schema/collections) and [_predicates_](https://docs.flur.ee/docs/1.0.0/schema/predicates).

You can think of _collections_ as tables in a relational DB and _predicates_ as columns, although you should refer to the [Schema](https://docs.flur.ee/docs/1.0.0/schema/overview) section in the docs for a more elaborate explanation. An important detail to note is that Schemas in Fluree are just data, and the easiest way to add data is using our JSON syntax to represent the schema and transact it into the database. As you see below, we are using this JSON syntax -- aka FlureeQL -- to create our transactions. FlureeQL combines features from GraphQL and SPARQL while maintaining a convenient JSON shape.

Below is the schema for the to-do list generator:

The schema has three collections: `list`, `task`, and `assignee`.
```json
    [{
        "_id": "_collection",
        "name": "list",
        "doc": "Subjects in this collection will be individual to-do lists, which can reference several specific tasks."
    },
    {
        "_id": "_collection",
        "name": "task",
        "doc": "Subjects in this collection will be individual tasks, which can reference individual assignees"
    },
    {
        "_id": "_collection",
        "name": "assignee",
        "doc": "Subjects in this collection describe individuals who could be assigned specific tasks"
    }]
```

> We've added some `doc` strings to each collection and predicate to offer additional clarity for users. This descriptive metadata does not affect the schema other than to aid any developers who need to understand it.

Each collection has three predicates.

The list collection consists of list/name, list/description, and list/tasks
```json
[
    {
        "_id": "_predicate",
        "name": "list/name",
        "type": "string",
        "index": true,
        "doc": "The name of the list. This is indexed for easier querying, but is not a unique value from one list to another"
    },
    {
        "_id": "_predicate",
        "name": "list/description",
        "type": "string",
        "doc": "A string describing the list"
    },
    {
        "_id": "_predicate",
        "name": "list/tasks",
        "type": "ref",
        "multi": true,
        "restrictCollection": "task",
        "doc": "Because one list can include multiple tasks, this allows a single list subject to make graph references to multiple task subjects"
    }
]
```
The task collection consists of task/name, task/assignedTo, and task/isCompleted
```json
[
    {
        "_id": "_predicate",
        "name": "task/name",
        "type": "string",
        "index": true,
        "doc": "The name of the task"
    },
    {
        "_id": "_predicate",
        "name": "task/assignedTo",
        "type": "ref",
        "restrictCollection": "assignee",
        "doc": "A ref between a task and an assignee, modeling the individual to whom the task is assigned"
    },
    {
        "_id": "_predicate",
        "name": "task/isCompleted",
        "type": "boolean",
        "doc": "The completion status of the task"
    }
]
```
The assignee collection consists of assignee/name, assignee/email, and assignee/lists
```json
[
    {
        "_id": "_predicate",
        "name": "assignee/name",
        "type": "string",
        "index": true,
        "doc": "The name of the assignee"
    },
    {
        "_id": "_predicate",
        "name": "assignee/email",
        "type": "string",
        "unique": true,
        "doc": "The email of the assignee"
    },
    {
        "_id": "_predicate",
        "name": "assignee/lists",
        "type": "ref",
        "multi": true,
        "restrictCollection": "list",
        "doc": "The lists owned by an individual -- this is potentially different from the tasks that are assigned to a specific individual"
    }
]
```
> An important thing to note about predicates is that within Fluree they are their own type of collection, so they can consist of predicates themselves (you can think of them as properties that describe a type of predicate). For example, `_predicate/name` is a predicate that belongs to the `_predicate` collection. For a list of types and further explanation refer to the [predicate](https://docs.flur.ee/docs/1.0.0/schema/predicates#_predicate-predicates) docs.

Once you have solidified your schema you can insert it into your DB, using the admin UI, as your first transaction:

 <p width="100%" align="center">
<img src="/src/Images/Insert_Schema_pt1.gif" alt="transacting schema" width="650" />
 </p>

> In the example gif above we transacted only the collection schema as a separate transaction item, but if we wanted to transact the schema (collection and predicates) together, we can easily achieve this by creating a single transaction array with each transaction item as individual objects. Refer to the example [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/to-do-list/src/data/Schema).

To explore your schema and understand the connectedness of each collection and predicates, Fluree gives you the ability to visualize each relationship. In the gif below we select _Schema_ on the left nav bar then press the _Launch Schema Explorer_ button.

 <p width="100%" align="center">
<img src="/src/Images/exploring_schema.gif" alt="exploring the Schema" width="650" />
 </p>

### **Sample Data**

After setting your schema it is time to transact some data. Similar to how you transacted your schema you will transact data within the admin UI. To grab a copy of the sample data refer to the code [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/to-do-list/src/data/Seed-data).

<p width="100%" align="center">
 <img src='/src/Images/Seed_data_example.png' alt='example seed data' width='600'>
 </p>

When the sample data has been successfully transacted, run the `npm start` command to view the application with populated data in the browser (i.e. by opening [http://localhost:3000](http://localhost:3000)). You should see the following:

<p width="100%" align="center">
 <img src='/src/Images/TodoList_example.png' alt='to do list in browser' width='600'>
 </p>

### **Querying and Transacting Data within the application**

Now that you have some data inside of Fluree, we can dive into the way we structure [queries](https://docs.flur.ee/docs/1.0.0/query/overview) and [transactions](https://docs.flur.ee/docs/1.0.0/transact/basics) in the application. As this is a simple to do list we will be able to create a new list with 1 or more sets of tasks; each task having an assignee. We are also able to delete a task and edit a task's name and completion status.

First, lets review the functionality that is connected to the DB and the data that is being received and sent.

The application will need to pull the `assignee` data in order to populate the `Select Assignee` dropdown component in the form. We will also need to grab the list data from Fluree when the app initially mounts in order to populate the `Todo` and the `Task` components. This will all be done by querying Fluree.

> While Fluree does allow querying in GraphQL, curl, and SPARQL... queries issued in this application are in FlureeQL's simplified JSON syntax. Please refer to the docs for examples in the [languages](https://docs.flur.ee/docs/1.0.0/query/overview) mentioned above, by toggling the _Display Examples_ at the top left corner.

#### **Querying assignee data**

Below is the query that pulls the `assignee` data from Fluree when the application loads. You can find it [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/3a9b6d5c47503df9599ae4c50488c50aad40dbe9/src/ListContext.js#L88) within the `loadAssignedToData` function.
```json
    {
        "select": ["_id", "email", "name"],
        "from": "assignee"
    }

    OR

    { 
        "select": [ "*" ], 
        "from": "assignee" 
    }
```
This is a basic query, where we are selecting all the `_id`, `email`, and `name` predicate values (these can also be substituted with just `"*"`) in the assignee collection. This is similar to a SQL query where we would write the same query as,
```sql
    SELECT  _id, email,name
    FROM assignee;

    OR

    SELECT * FROM assignee;
```
Refer to the code base [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L88) for the API request that hold the `assignee` data query.

#### **Querying list data**

Below is the query that pulls all the related `list` data from Fluree when the application loads. You can find it [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/2dc89d3c15b82d943d7226d5af14390ed9f36120/src/ListContext.js#L106) within the `fetchListData` function.
```json
{
    "select": [
        "*",
        { 
            "tasks": [
                "*",
                { 
                    "assignedTo": ["*"] 
                }
            ]
        }
    ],
    "from": "list",
    "opts": { 
        "compact": true 
    }
}
```
We can think about this JSON query as "[crawling the graph](https://docs.flur.ee/docs/1.0.0/query/advanced-query#crawling-the-graph)", wherein we crawl across linked data by representing references from one collection to another as nested objects within our JSON syntax. These references are available through [ref predicates](https://docs.flur.ee/docs/schema/predicates#predicate-types) such as `list/tasks`. So essentially we are selecting ALL the data from the `list` collection then each of the records in the `task` collection that are specifically linked to each list, since `list/tasks` is a reference predicate in the `list` collection.

The next graph-crawl pulls related data from the `assignee` collection, since the `task/assignedTo` predicate in the `task` collection is a reference predicate to the `assignee` collection. All the data above is linked via the predefined predicates of type `ref`.

> The other section of this query (below the `from` clause), uses the query key of `opts` which is not required, but gives you the ability to set optional keys when retrieving data. For a list of optional keys and their descriptions, refer to the doc [here](https://docs.flur.ee/docs/1.0.0/query/overview#opts-key).

Another way of thinking about the predicate type of `ref` are as `joins` in relational DBs, but the ability to join is a property set to predicates (in Fluree) as displayed in the predicate schema above. A SQL example of the query below would be,
```sql
    SELECT *,
    task.isCompleted,
    task.assignedTo,
    assignee.name,
    assignee.email
    FROM list
    JOIN task ON task.list_id = list.id
    LEFT JOIN assignee on assignee.name = task.assignedTo
    ORDER BY ASC;
```
> As a schema grows, these sorts of joins can become deeply complicated in a SQL-shaped schema, particularly when joins are mediated by additional join tables. One significant advantage of Fluree's graph schemas and graph query language is the ability to navigate links between data more directly and easily. Another advantage is the ability to query for JSON-shaped data in JSON itself.

Refer to the code base [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L106) for the API request that hold the `list` data query.

### **Transacting and updating data**

The next set of functionality we will cover are the ones that send transactions to Fluree in the application, these are the equivalent to `INSERT` or `UPDATE` statements in SQL. When the form component is filled and submitted, the data is sent to Fluree via the `/transaction` API. The `/transaction` API is also used when a task is deleted, when a task name is edited, or when the checkbox completed status is changed: these are all updates that are sent to Fluree via a transaction.

#### **Transacting data to Fluree**

Here we will break down all the steps that go into transacting the form data to Fluree, and the creation of the transaction that is nested in the API request. Start at the `addList` function [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L135) in the code base.

The const [`newList`](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L136) is the transaction item that holds the list data. Lets run through it and dissect each part, then we will compare it to the seed data we entered earlier. If we were to just transact a list without any linked tasks, it might look like the following:
```json
[{
    "_id": "list$1",
    "name": "My List",
    "description": "This is my grocery list"
}]
```
> In FlureeQL's JSON syntax, we differentiate transactions by wrapping each `{ transaction object }` in `[ bracket notation ]`. This also allows us to imply that a single transaction might `[{ include }, { many }, { transaction }, { items }]`.

The `_id` value must describe the collection this record should belong to. In this example the `$1` suffix gives the record a unique "**temporary id**", in case you need to reference this record elsewhere within your transaction. For more temp id examples visit **Temporary Ids** in the [Transaction Basics](https://docs.flur.ee/docs/1.0.0/transact/basics) section of the docs. Below is a diluted example of the query above in SQL:
```sql
    INSERT INTO list (_id, name, description)
    VALUES("list$1", "My List", "This is my grocery list")
```
Of course, our lists are most valuable when they link list data to independent task record data. An individual task record transaction might look like this:
```json
    [{
        "_id": "task$1",
        "name": "Get Milk",
        "isCompleted": false,
        "assignedTo": ["assignee/email", "jDoe@gmail.com"]
    }]
```

> When a ref predicate like `task/assignedTo` needs to refer to a subject that already exists, Fluree allows you to easily identify that subject by providing a two-tuple of `[A_UNIQUE_PREDICATE, THAT_PREDICATE'S_VALUE]`. So that in the example above, we can have this new `task` refer to an `assignee` whose `assignee/email` value is `jDoe@gmail.com`. You can also, however, reference a brand new `assignee` (see examples below where a new list references a new task), or use a current `assignee`'s unique `_id` value.

Below is an example of the same transaction above in SQL:

```sql
    INSERT INTO task (_id, name, isCompleted, assignedTo)
    VALUES ('task$1', 'Get Milk', false, (SELECT id from assignee WHERE email='jDoe@gmail.com'))
```

In the examples above, we described `list` and `task` transactions separately, but we can easily transact them at once. Below is an example of the transaction array with nested transaction items that is sent to Fluree on submission of a new list with new tasks:

```json
[{
    "_id": "list",
    "name": "My List",
    "description": "This is my grocery list",
    "tasks": [{
        "_id": "task",
        "name": "Get Milk",
        "isCompleted": false,
        "assignedTo": [
            "assignee/email",
            "fmarshall@flur.ee"
        ]
    },
    {
        "_id": "task",
        "name": "Get Bananas",
        "isCompleted": false,
        "assignedTo": [
            "assignee/email",
            "jDoe@gmail.com"
        ]
    },
    {
        "_id": "task",
        "name": "Get Spinach",
        "isCompleted": false,
        "assignedTo": [
            "assignee/email",
            "jDoe@gmail.com"
        ]
    }]
}]
```

> This could also have been transacted using **Temp IDs** -- the `Seed-data` file in `src/data` provides exactly this example.

Refer to the code base [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L171) for the API request that holds the `list` data transaction.

#### **Adding a new Assignee to Fluree**

Above we presented a transaction with `list` data that included an `assignee` already within the drop down selection, but there is functionality in place to create a new assignee and send their information to Fluree, before a transaction with all `list` data is sent. Below is the query found in [addNewAssignee](https://github.com/fdmmarshall/to-do-lists-generator/blob/e1f3076755e0e669d19d0009488f7ee332b4e8b3/src/ListContext.js#L133)

```json
[{
        "_id": "assignee$1",
        "name": "John",
        "email": "john.doe@gmail.com"
}]
```

The same transaction can be mirrored in SQL as: 

```sql
INSERT INTO assignee (_id, name, email)
VALUES ("assignee$1", "John", "john.doe@gmail.com")
```

Refer to the code [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/e1f3076755e0e669d19d0009488f7ee332b4e8b3/src/ListContext.js#L142) for the API request that holds the creation of a new `assignee` data transaction.

#### **Updating & Deleting Existing Data in Fluree**

Updating data uses the same structure and syntax as transacting new data to Fluree. We will be updating data by using the `_id` retrieved from the query in [`fetchListData`](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L106).

#### **Deleting tasks**

[`deleteTask`](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L203) holds the asynchronous function [`deleteTaskFromFluree`](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L207) that deletes the task.
```json
[{
    "_id": 369435906932736,
    "_action": "delete"
}]
```
Instead of using temporary ids, here we match the `_id` to the intended task then use the `_action` transact key to specify a deletion when sent to Fluree. For more on deleting data refer to the [deleting data](https://docs.flur.ee/docs/1.0.0/transact/deleting-data) section. The same transaction can be written in SQL below
```sql
DELETE FROM task
WHERE task._id = 369435906932736;
```
Refer to the code base [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L207) for the API request that holds the deletion transact item.

#### **Editing tasks**

Similar to the way we delete tasks above, [`editTasks`](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L227) matches the task `_id` and includes the data change for the updated name of the task and updated completion status. For more detail updating data refer to the [updating data](https://docs.flur.ee/docs/1.0.0/transact/updating-data) section. This transaction takes a task that already exists and updates its name and its completion status:
```json
[{
    "_id": 369435906932736,
    "name": "This is my task name now",
    "isCompleted": true,
}]
```
The same transaction can be written in SQL as:
```sql
UPDATE task
SET
    task.name = "This is my task name now",
    task.isCompleted = true,
WHERE
    task._id = 369435906932736
```
Refer to the code base [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L241) for the API request that holds the update transact item.

### **Learn more**

For other API endpoint and examples visit the Fluree docs, [here](https://docs.flur.ee/api).

We also have some additional tutorials, which cover additional Fluree functionality in our [Developer Hub](https://github.com/fluree/developer-hub).

For more information on the Fluree ledger and its Blockchain technology visit the [Blockchain](https://docs.flur.ee/guides/1.0.0/architecture/blockchain) docs.

A subject we did not cover in this tutorial is [Smart Functions](https://docs.flur.ee/guides/1.0.0/smart-functions/smart-functions) in Fluree, which can be used in setting permissions to your DB. Here is a full [list](https://docs.flur.ee/guides/1.0.0/smart-functions/smart-functions) of accepted smart functions.

A deeper dive into analytical queries and examples visit the docs section, [here](https://docs.flur.ee/guides/1.0.0/analytical-queries/inner-joins-in-fluree).
