
<p width="100%" align="center">
 <img src='/public/logo192.png' alt='React logo' width='200' height='200'> 
 <img src='/src/Images/Blue_Stacked.png' alt='Fluree logo' width='185'>
 </p>

# **To do list generator powered by React and FlureeDB**

This repo is designed to introduce a basic react application that uses FlureeDB to manage data. By using any http client, in this application we use [axios](https://axios-http.com/), queries and transactions are issued to create, read, update, and destroy data from my FlureeDB.

## Getting started

1. To get started git clone the repo via https, `https://github.com/fdmmarshall/to-do-lists-generator.git`, with the git CLI `gh repo clone fdmmarshall/to-do-lists-generator`, or a number of other suitable methods.

2. `cd` into the repo, run `npm install`

3. then run `npm start`, once it's compiled it will set the app to open in the browser [http://localhost:3000](http://localhost:3000)

## **React**

To keep things simple this application uses Create React App.

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
# **What is Fluree?**

Fluree is a data platform that combines immutable [ledger](https://docs.flur.ee/guides/1.0.0/intro/what-is-fluree) with a graph database, if you are not familiar with chain or blockchain data, think of it as a list of transactions that are sequenced by time. This ledger is tamperproof and each block in the ledger is linked to the previous block. 

Every block contains critical metadata like a hash, a timestamp, and the size of the block data (block-bytes). Core data of within each block are flakes [flakes](https://docs.flur.ee/guides/1.0.0/intro/what-is-fluree#flakes). These flakes contain all the data that is added, updated, or deleted. Flakes are an integral part in Fluree and are used to represent everything, for a indepth look at Flakes refer to the [architecture](https://docs.flur.ee/guides/1.0.0/architecture/flakes) docs.

Schemas in Fluree is made up of [collections and predicates](https://docs.flur.ee/guides/1.0.0/intro/what-is-fluree#collections-and-predicates), we will go further into how to use them in the Schema section below.

At its core, data in Fluree leverages the [Resource Description Framework (RDF)](https://www.w3.org/TR/rdf-concepts/). RDF is a W3C standard model for data interchange on the Web*. Data in Fluree is modelled by the [RDF Triple](https://www.w3.org/TR/rdf-concepts/#section-triples), which contains a subject, predicate, object.

A simple example would be: "Ingenious rocks are formed from hardened lava", 'Ingenious rocks' is the subject, 'are formed' is the predicate, and 'hardened lava' is the object. When comparing the same sentence to the typical approach of an entity–attribute–value model: entity(Ingenious rocks), attribute(formed), value(harden lava).

> *For an more indepth look into RDF refer to the W3C [docs](https://www.w3.org/RDF/).
# **Getting Started with Fluree**

This to do list generator uses [Fluree Anywhere](https://docs.flur.ee/docs/1.0.0/getting-started/fluree-anywhere) to manage data, for a indepth installation guide of Fluree visit the [Installation](https://docs.flur.ee/docs/1.0.0/getting-started/installation) docs. For brief installation points refer below.

## **Installing Fluree**

- [Download](https://s3.amazonaws.com/fluree-releases-public/fluree-latest.zip) and unzip Fluree
- Launch Fluree with default options by running `./fluree_start.sh` in the terminal for mac and in Bash emulator for Windows
- Once Fluree is done starting up it will log the web server port 8090, `http://localhost:8090`, for versions below 1.0.0 the web server port is 8080.
- To exit click `ctrl + c`, this will not delete any ledgers or successful transactions.
- For further installation information visit the [Installation](https://docs.flur.ee/docs/1.0.0/getting-started/installation) docs

> Fluree requires Java 11 or above. To verify your version run `java -- version` in the terminal or visit [java](https://www.java.com/en/download/manual.jsp) to download.


## **Creating your Ledger, Schema, and Sample Data**

In this section we will break down ledger creation, implementing a basic schema, and adding sample data.

### **Ledger**

A ledger in Fluree is bascially the mechanism which stores and keeps track of [*updates*](https://docs.flur.ee/docs/1.0.0/transact/updating-data) or [*transactions*](https://docs.flur.ee/docs/1.0.0/transact/basics) to your data. There are a few different ways to create a new ledger, for more details refer to the [ledger](https://docs.flur.ee/docs/1.0.0/getting-started/ledger-operations) docs.

Here we will create a new ledger in the admin UI:

<p width="100%" align="center">
<img src='/src/Images/FlureeDB_Admin_Console.png' alt='Fluree admin UI' width='600'>
</p>

After pressing the 'Add Ledger' button you will see the modal below. Enter a network name and DB name, example: `test/one1`

<p width="100%" align="center">
<img src='/src/Images/Create_ledger_modal.png' alt='Ledger Modal' width='600'>
</p>

> The name of your network and ledger will become part of the unqiue URL that includes the API endpoint. Example: `http://localhost:8090/fdb/test/one1/query`

### **Schema**

Once the ledger has been created the next step is to build your schema. Schemas in Fluree consist of [*collections*](https://docs.flur.ee/docs/1.0.0/schema/collections) and [*predicates*](https://docs.flur.ee/docs/1.0.0/schema/predicates).

You can think of *collections* as tables in a relational DB and *predicates* as columns, refer to the [Schema](https://docs.flur.ee/docs/1.0.0/schema/overview) section in the docs for a more elaborate explanation. An important detail to note is that Schemas in Fluree are just data, the easiest way to add data is using our JSON format to represent the schema and transact it into the database. We are using FlureeQL (below) to create our transactions, FlureeQL combines features from GraphQl and SPARQL to create a simple JSON syntax.

Below is the schema for the to do list generator:

The schema has three collections, list, task, and assignee.

                        [    
                            {
                            "_id": "_collection",
                            "name": "list",
                            "doc": "the list collection" //optional descriptive 
                            },
                            {
                            "_id": "_collection",
                            "name": "task",
                            "doc": "the task collection"
                            },
                            {
                            "_id": "_collection",
                            "name": "assignee",
                            "doc": "the assignee collection"
                            }
                        ]

  Each collection has three predicates.
  
  The list collection consists of list/name, list/description, and list/tasks

                        [
                            { 
                            "_id": "_predicate",
                            "name": "list/name",
                            "type": "string",
                            "index": true,
                            "doc": "the name of the list"
                            },
                            {
                            "_id": "_predicate",
                            "name": "list/description",
                            "type": "string",
                            "doc": "a description of the list"
                            },
                            {
                            "_id": "_predicate",
                            "name": "list/tasks",
                            "type": "ref",
                            "multi": true,
                            "restrictCollection": "task",
                            "doc": "the tasks that make up the list"
                            }
                        ]

The task collection consists of task/name, task/assignedTo, and task/isCompleted

                        [                       
                            {
                            "_id": "_predicate",
                            "name": "task/name",
                            "type": "string",
                            "index": true,
                            "doc": "the name of the task"
                            },
                            {
                            "_id": "_predicate",
                            "name": "task/assignedTo",
                            "type": "ref",
                            "index": true,
                            "restrictCollection": "assignee",
                            "doc": "to whom is the task assigned to"
                            },
                            {
                            "_id": "_predicate",
                            "name": "task/isCompleted",
                            "type": "boolean",
                            "doc": "the completetion status of the task"
                            }   
                        ]

The assignee collection consists of assignee/name, assignee/email, and assignee/lists

                        [ 
                            
                            {
                            "_id": "_predicate",
                            "name": "assignee/name",
                            "type": "string",
                            "index": true,
                            "doc": "the name of the assignee"
                            },
                            {
                            "_id": "_predicate",
                            "name": "assignee/email",
                            "type": "string",
                            "unique": true,
                            "doc": "the email of the assignee"
                            },
                            {
                            "_id": "_predicate",
                            "name": "assignee/lists",
                            "type": "ref",
                            "multi": true,
                            "restrictCollection": "list",
                            "doc": "the lists that the assignee is connected to"
                            }
                        ]   

 > An important thing to note about predicates is that within Fluree they are their own type of collection, so they can consist of predicates themselves (you can think of them as properties that describe a type of predicate). For a list of types and further explanation refer to the [predicate](https://docs.flur.ee/docs/1.0.0/schema/predicates#_predicate-predicates) docs.

 Once you have solidified your schema you can insert it into your DB, using the admin UI, as your first transaction:

 <p width="100%" align="center">
<img src="/src/Images/Insert_Schema_pt1.gif" alt="transacting schema" width="650" />
 </p>

> In the example gif above we transacted only the collection schema as a separate transaction item, but if we wanted to transact the schema (collection and predicates) together, we can easily achieve this by creating a transaction array with each transaction item as objects. Refer to the example [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/to-do-list/src/data/Schema).

To explore your schema and understand the connectedness of each collection and predicates, Fluree gives you the ability to visualize each relationship. In the gif below we select *Schema* on the left nav bar then press the *Launch Schema Explorer* button. 

 <p width="100%" align="center">
<img src="/src/Images/exploring_schema.gif" alt="exploring the Schema" width="650" />
 </p>

### **Sample Data**

After setting your schema it is time to transact some dummy data. Similar to how you transacted your schema you will transact some dummy data within the admin UI. To grab a copy of the dummy data refer to the code [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/to-do-list/src/data/Seed-data).

<p width="100%" align="center">
 <img src='/src/Images/Seed_data_example.png' alt='example seed data' width='600'>
 </p>

When the dummy data has been successfully transacted, run the `npm start` command to view the application with populated data in the browser, open [http://localhost:3000](http://localhost:3000). You should see the following: 

<p width="100%" align="center">
 <img src='/src/Images/TodoList_example.png' alt='to do list in browser' width='600'>
 </p>

### **Querying and Transacting Data within the application**

Now that you have some data inside we can dive into the way we structure [queries](https://docs.flur.ee/docs/1.0.0/query/overview) and [transactions](https://docs.flur.ee/docs/1.0.0/transact/basics) in the application. As this is a simple to do list we will be able to create a new list with 1 or more set of tasks, and each task has an assignee. We are also able to delete a task and edit a task's name and completion status.

First lets review the functionality that is connected to the DB and the data that is being recieved and sent.

The application will need to pull the `assignee` data in order to propagate the `Select Assignee` component in the form. We will also need to grab the list data from Fluree on load in order to propagate the `Todo` and the `Task` components. This will all be done by querying Fluree.

> While Fluree does allow querying in GraphQL, Curl, and SparQL, queries issued in this application are in FlureeQL. Please refer to the docs for examples [languages](https://docs.flur.ee/docs/1.0.0/query/overview), mentioned above, by toggling the *Display Examples* at the top left corner.

#### **Querying assignee data**

 Below is the query that pulls the `assignee` data from Fluree when the application loads. You can find it [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/3a9b6d5c47503df9599ae4c50488c50aad40dbe9/src/ListContext.js#L88) within the `loadAssignedToData` function.


                {
                    select: ['_id', 'email' 'name'],
                    from: 'assignee',
                    opts: {
                        compact: true,
                        orderBy: ['ASC', '_id'],
                        },
                }    

This is a basic query, where we are selecting all the `_id`, `email`, and `name` predicate values (these can also be substituted with just '*') in the assignee collection. This is similar to a SQL query where we would write the same query as,

                SELECT 
                _id,
                email,
                name
                FROM assignee
            
               OR

                SELECT * FROM assignee    

The other section of this query (below the `from` clause), uses the query key of `opts` which is not required, but gives you the ability to set optional keys when retrieving data, for a list of optional keys and their descriptions, refer to the doc [here](https://docs.flur.ee/docs/1.0.0/query/overview#opts-key).

Refer to the code base [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L88) for the API request that hold the `assignee` data query.

#### **Querying list data**

 Below is the query that pulls all the related `list` data from Fluree when the application loads. You can find it [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/2dc89d3c15b82d943d7226d5af14390ed9f36120/src/ListContext.js#L106) within the `fetchListData` function.

                {
                    select: [
                        '*',
                        {
                        tasks: [
                            '*',
                            {
                            assignedTo: ['*'],
                            },
                        ],
                        },
                    ],
                    from: 'list',
                    opts: {
                        compact: true,
                        orderBy: ['ASC', '_id'],
                    },
                }        

This type of query is called [Crawling the graph](https://docs.flur.ee/docs/1.0.0/query/advanced-query#crawling-the-graph), it contains sub-queries that pull data from different collections that have predicates of type [ref](https://docs.flur.ee/docs/schema/predicates#predicate-types), starting with the collection in the `from` clause. So essentially we are selecting ALL the data from the `list` collection then all the related data in the `task` collection, since `tasks` is a reference predicate in the `list` collection.

The next subquery pulls related data from the `assignee` collection, since the `assignedTo` predicate in the `task` collection is a reference predicate to the `assignee` collection. All the data above is linked via the predefined predicates of type ref.

Another way of thinking about the predicate type of `ref` are as `joins` in a relational DBs, but the ability to join is a property set to predicates (in Fluree) as displayed in the predicate schema above. A SQL example of the query below would be,

            SELECT *,
            task.isCompleted,
            task.assignedTo,
            assignee.name,
            assignee.email
            FROM list
            JOIN task ON task.list_id = list.id
            LEFT JOIN assignee on assignee.name = task.assignedTo
            ORDER BY ASC;


Refer to the code base [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L106) for the API request that hold the `list` data query.
### **Transacting and updating data**

The next set of functionality we will cover are the ones that send transactions to Fluree in the application, these are the equivalent to `INSERT` or `UPDATE` statements in SQL. When the form component is filled and submitted the data is sent to Fluree via a transact. The other events are when a deletion of a task is made, and then when a task name is edited or the checkbox completed status is changed, these are all updates that are sent to Fluree via a transact.

#### **Transacting data to Fluree**

Here we will break down all the steps that go into transacting the form data to Fluree, and the creation of the transact that is nested in the api request. Start at the `addList` function [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L135) in the code base.

The const [`newList`](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L136) is the transaction item that holds the list data. Lets run through it and dissect each part, then we will compare it to the seed data we entered earlier.

                {
                    _id: `list$1`,
                    name,
                    description,
                    tasks: [],
                };

The `_id` is set to a temporary id, since every transaction in fluree must be accompanied by an `_id` value in order to refer to the subject we are creating. For more temp id examples visit **Temporary Ids** in the [Transaction Basics](https://docs.flur.ee/docs/1.0.0/transact/basics) section of the docs.

The name and description (above) are set to the values of the `list name` and `list description` submitted in the form. Notice that the tasks is set to an empty array. This is because in we will be looping through the submitted tasks and adding their data as objects to the transaction item [`newTask`](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L159).

                {
                    _id: `task$${index}`,
                    name: task.task
                    isCompleted: task.completed,
                    assignedTo: isAssignedTo
                };

Below is an example of the transaction that is sent to Fluree on submission.

                [
                    {
                    _id: `list$1`,
                    name,
                    description,
                    tasks: [
                            {
                    _id: `task$${index}`,
                    name: task.task
                    isCompleted: task.completed,
                    assignedTo: isAssignedTo
                            },
                            {
                    _id: `task$${index}`,
                    name: task.task
                    isCompleted: task.completed,
                    assignedTo: isAssignedTo
                            },
                            {
                    _id: `task$${index}`,
                    name: task.task
                    isCompleted: task.completed,
                    assignedTo: isAssignedTo
                            }
                        ],
                    }
                ]

Refer to the code base [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L171) for the API request that holds the `list` data transaction.

#### **Updating existing data in Fluree**

Updating data uses the same structure and syntax as transacting new data to Fluree. We will be updating data by using the `_id` retrieved from the query in [`fetchListData`](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L106).
#### **Deleting tasks**

[`deleteTask`](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L203) holds the asynchronous function [`deleteTaskFromFluree`](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L207) that deletes the task.

            [
                {
                    _id: chosenTask._id,
                    _action: 'delete'
                }
            ]

Instead of using temporary ids, here we match the `_id` to the intended task then use the `_action` transact key to specify a deletion when sent to Fluree. For more on deleting data refer to the [deleting data](https://docs.flur.ee/docs/1.0.0/transact/deleting-data) section.

Refer to the code base [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L207) for the API request that holds the deletion transact item.
#### **Editing tasks**

Similar to the way we delete tasks above, [`editTasks`](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L227) matches the task `_id` and includes the data change for the name of the task and completion status. For more detail updating data refer to the [updating data](https://docs.flur.ee/docs/1.0.0/transact/updating-data) section.

                [
                    {
                        _id: newTask._id,
                        name: newTask.name,
                        isCompleted: newTask.isCompleted,
                    }
                ]

Refer to the code base [here](https://github.com/fdmmarshall/to-do-lists-generator/blob/74b1e4ec7554c3d92c558abba359f831ffc5d1c3/src/ListContext.js#L241) for the API request that holds the update transact item.
### **Learn more**

For other API endpoint and examples visit the Fluree docs, [here](https://docs.flur.ee/api).

For more on the Fluree ledger and its Blockchain technology visit the [Blockchain](https://docs.flur.ee/guides/1.0.0/architecture/blockchain) docs.

A subject we did not cover are [Smart Functions](https://docs.flur.ee/guides/1.0.0/smart-functions/smart-functions) in Fluree, which can be used in setting permissions to your DB. Here is a full [list](https://docs.flur.ee/guides/1.0.0/smart-functions/smart-functions) of accepted smart functions.

A deeper dive into analytical queries and examples visit the docs section, [here](https://docs.flur.ee/guides/1.0.0/analytical-queries/inner-joins-in-fluree).