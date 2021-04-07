
<p width="100%" align="center">
 <img src='/public/logo192.png' alt='React logo' width='200' height='200'> <img src='/src/Images/Blue_Stacked.png' alt='Fluree logo' width='185'>
 </p>

# To do list generator powered by React and FlureeDB

This repo is designed to introduce a basic react application that uses FlureeDB to manage data. By using [axios](https://axios-http.com/), queries and transactions are issued to send and recieve data from my FlureeDB.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Getting Started with Fluree

This to do list generator uses [Fluree Anywhere](https://docs.flur.ee/docs/1.0.0/getting-started/fluree-anywhere) to manage data, for a indepth installation guide of Fluree visit the [Installation](https://docs.flur.ee/docs/1.0.0/getting-started/installation) docs. For brief installation points refer below.

## Installing Fluree

- [Download](https://docs.flur.ee/docs/1.0.0/getting-started/installation#installing-fluree-locally) and unzip Fluree
- Launch Fluree with default options by running `./fluree_start.sh` in the terminal for mac and in Bash emulator for Windows
- Once Fluree is done starting up it will log the web server port 8080, `http://localhost:8080`.
- To exit click `ctrl + c`, this will not delete any ledgers or successful transactions.

> Fluree requires Java 11 or above. To verify your version run `java - version` in the terminal or visit [java](https://www.java.com/en/download/manual.jsp) to download.


## Creating your Ledger, Schema, and Sample Data

In this section we will break down ledger creation, implementing a basic schema, and adding sample data.

### Ledger

A ledger in Fluree is bascially the mechanism which stores and keeps track of [updates](https://docs.flur.ee/docs/1.0.0/transact/updating-data) or [*transactions*](https://docs.flur.ee/docs/1.0.0/transact/basics) to your data. There are a few different ways to create a new ledger, for more details refer to the [ledger](https://docs.flur.ee/docs/1.0.0/getting-started/ledger-operations) docs.

Here we will create a new ledger in the admin UI:

<p width="100%" align="center">
<img src='/src/Images/FlureeDB_Admin_Console.png' alt='Fluree admin UI' width='600'>
</p>


After pressing the 'Add Ledger' button you will see the modal below. Enter a network name and DB name, example: `test/one1`

<p width="100%" align="center">
<img src='/src/Images/Create_ledger_modal.png' alt='Ledger Modal' width='600'>
</p>

> The name of your network and ledger enable you to precisely issue queries and transactions

### Schema

Once the ledger has been created the next step is to build your schema. Schema in Fluree consist of [*collections*](https://docs.flur.ee/docs/1.0.0/schema/collections) and [*predicates*](https://docs.flur.ee/docs/1.0.0/schema/predicates).

You can think of *collections* as tables in a relational DB and *predicates* as columns, refer to the [Schema](https://docs.flur.ee/docs/1.0.0/schema/overview) section in the docs for a more elaborate explanation.

Below is the schema for the to do list generator:

The schema has three collections, list, task, and assignee.

                        [    
                            {
                            "_id": "_collection",
                            "name": "list"
                            },
                            {
                            "_id": "_collection",
                            "name": "task"
                            },
                            {
                            "_id": "_collection",
                            "name": "assignee"
                            }
                        ]

  Each collection has three predicates.
  
  The list collection consists of list/name, list/description, and list/tasks

                        [
                            { 
                            "_id": "_predicate",
                            "name": "list/name",
                            "type": "string",
                            "index": true
                            },
                            {
                            "_id": "_predicate",
                            "name": "list/description",
                            "type": "string"
                            },
                            {
                            "_id": "_predicate",
                            "name": "list/tasks",
                            "type": "ref",
                            "multi": true,
                            "restrictCollection": "task"
                            }
                        ]

The task collection consists of task/name, task/assignedTo, and task/isCompleted

                        [                       
                            {
                            "_id": "_predicate",
                            "name": "task/name",
                            "type": "string",
                            "index": true
                            },
                            {
                            "_id": "_predicate",
                            "name": "task/assignedTo",
                            "type": "ref",
                            "index": true,
                            "restrictCollection": "assignee"
                            },
                            {
                            "_id": "_predicate",
                            "name": "task/isCompleted",
                            "type": "boolean"
                            }   
                        ]

The assignee collection consists of assignee/name, assignee/email, and assignee/lists

                        [ 
                            
                            {
                            "_id": "_predicate",
                            "name": "assignee/name",
                            "type": "string",
                            "index": true
                            },
                            {
                            "_id": "_predicate",
                            "name": "assignee/email",
                            "type": "string",
                            "unique": true
                            },
                            {
                            "_id": "_predicate",
                            "name": "assignee/lists",
                            "type": "ref",
                            "multi": true,
                            "restrictCollection": "list"
                            }
                        ]   

 > An important thing to note about predicates is that within Fluree they are their own type of collection, so they can consist of predicates themselves (you can think of them as properties that describe a type of predicate). For a list of types and further explanation refer to the [predicate](https://docs.flur.ee/docs/1.0.0/schema/predicates#_predicate-predicates) docs.

 Once you have solidified your schema you can insert it into your DB, using the admin UI, as your first transaction:

 <p width="100%" align="center">
 <img src='/src/Images/importing%20first%20set%20of%20schema.png' alt='importing collection schema' width='600'>
 </p>

### Sample Data

After setting your schema it is time to transact some dummy data. Similar to how you transacted your schema you will transact some dummy data.

<p width="100%" align="center">
 <img src='/src/Images/Seed_data_example.png' alt='importing collection schema' width='600'>
 </p>

### Querying and Transaction Data within the application
