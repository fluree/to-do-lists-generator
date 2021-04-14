
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
                            "doc": ""
                            },
                            {
                            "_id": "_predicate",
                            "name": "task/assignedTo",
                            "type": "ref",
                            "index": true,
                            "restrictCollection": "assignee",
                            "doc": ""
                            },
                            {
                            "_id": "_predicate",
                            "name": "task/isCompleted",
                            "type": "boolean",
                            "doc": ""
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
<img src="/src/Images/Insert_Schema_pt1.gif" alt="transacting schema" width="400" />
 </p>

### **Sample Data**

After setting your schema it is time to transact some dummy data. Similar to how you transacted your schema you will transact some dummy data within the admin UI.

<p width="100%" align="center">
 <img src='/src/Images/Seed_data_example.png' alt='example seed data' width='600'>
 </p>

When the dummy data has been successfully transacted, run the `npm start` command to view the application with populated data in the browser, open [http://localhost:3000](http://localhost:3000). You should see the following: 

<p width="100%" align="center">
 <img src='/src/Images/TodoList_example.png' alt='to do list in browser' width='600'>
 </p>

### **Querying and Transacting Data within the application**

Now that you have some data inside we can dive into the way we structure [queries](https://docs.flur.ee/docs/1.0.0/query/overview) and [transactions](https://docs.flur.ee/docs/1.0.0/transact/basics) in the application.

First lets review the functionality that is connected to the DB and the data that is being recieved and sent.

The application will need to pull the assignee data in order to propagate the `Select Assignee` component in the form. We will also need to grab the list data from Fluree on load in order to propagate the `Todo` and the `Task` components. This will all be done by querying Fluree.

> While Fluree does allow querying in GraphQL, Curl, and SparQL, queries issued in this application are in FlureeQL. Please refer to the docs for examples [languages](https://docs.flur.ee/docs/1.0.0/query/overview), mentioned above, by toggling the *Display Examples* at the top left corner.

#### **Querying assignee data**

<p width="100%" align="center">
 <img src='/src/Images/pull_assignee_data.png' alt='code for pulling assignee data' width='600'>
 </p>

 Below is the query that is nested in `loadAssignedToData`

                {
                select: ['_id', 'email' 'name'],
                from: 'assignee',
                opts: {
                    compact: true,
                    orderBy: ['ASC', '_id'],
                        },
                }       

This is a basic query, we are selecting all the `_id`, `email`, and `name` predicate values in the assignee collection.

The other section of this query (below the `from` clause), uses the query key of `opts` which is not required, but gives you the ability to set optional keys when retrieving data, for a list of optional keys and their descriptions, refer to the doc [here](https://docs.flur.ee/docs/1.0.0/query/overview#opts-key).

#### **Querying list data**

<p width="100%" align="center">
 <img src='/src/Images/pull_list_data.png' alt='code for pulling list data' width='600'>
 </p>

 Below is the query that was nested in `fetchListData`

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

The next subquery pulls related data from the `assignee` collection, since the `assignedTo` predicate in the `task` collection is a reference predicate to the `assignee` collection.

Another way of thinking about the predicate type of `ref` are as `joins` in a relational DBs, but the ability to join is a property set to predicates (in Fluree) as displayed in the predicate schema above.

### **Transacting and updating data**

The next set of functionality we will cover are the ones that send transactions to Fluree in the application. When the form component is filled and submitted the data is sent to Fluree via a transact. The other events are when a deletion of a task is made, and then when a task name is edited or the checkbox completed status is changed, these are all updates that are sent to Fluree via a transact.

#### **Transacting data to Fluree**

Here we will break down all the steps that go into transacting the form data to Fluree, and the creation of the transact that is nested in the api request.

<p width="100%" align="center">
 <img src='/src/Images/add_list_build_transaction.png' alt='first part of addList function' width='600'>
 </p>

 Within the addList function the first const `newList` is the transaction item that holds the list data. Lets run through it and dissect each part, then we will compare it to the seed data we entered earlier.

            const newList = {
            _id: `list${'$' + Math.floor(Math.random() * 10 + 1)}`,
            name,
            description,
            tasks: [],
            };

The `_id` is set to a temporary id, since every transaction in fluree must be accompanied by an `_id` value in order to refer to the subject we are creating. For more temp id examples visit **Temporary Ids** in the [Transaction Basics](https://docs.flur.ee/docs/1.0.0/transact/basics) section of the docs.

The name and description are set to that values of the `list name` and `list description` submitted in the form. Notice that the tasks is set to an empty array. This is because in we will be looping through the submitted tasks and adding their data as objects to the transact item.

            let userId = task.assignedTo;
            let isAssignedTo = userId;
            if (userId === 'new') {
            isAssignedTo = {
            _id: userId,
            name: task.newAssignedTo,
            email: task.email,
              };
            }

        const newTask = {
            _id: `task$${index}`,
            name: task.task
            isCompleted: task.completed,
            assignedTo: isAssignedTo
        };
        
        newList.tasks.push(newTask); 

The code above is located within the for each that cycles through the tasks array. The first section is setting userId to the value of task.assignedTo, then checking the value of userId, if its 'new' we will need to create a nested transact item that created a new assignee in Fluree (notice the `isAssignedTo` object that holds the predicate information that is needed for the assignee collection).

If the `userId` value is NOT a new user then it assumes the `_id` value for the assignee information queried in `loadAssignedToData()`. This is happening for each task. This enables the tasks to be connected to an assignee and their information (name and email) in Fluree.

The last bit of code is setting each task as `newTask` which is a transaction item that has a temporary id, name, completed checkbox status, and assignee information. Each `newTask` transaction item is then pushed into `newList` mentioned above.

Once this process has been done and each list, task, and assignee data is accounted for we then nest the `newList` into an array and set it as a variabled called `transactLoad`. 

            let transactLoad = [newList];

We will be using `transactLoad` in the api request detailed in the next code breakdown below. Similar to the transact item in our dummy data this is what the output would generate:

            {
            _id: `list${'$' + Math.floor(Math.random() * 10 + 1)}`,
            name,
            description,
            tasks: [{
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
        }],
            }

Now we focus on the second part of the `addList` function. We have built the transact item with all the form data, but need to construct the api request.

 <p width="100%" align="center">
 <img src='/src/Images/add_list_pt_2.png' alt='second part of addList function' width='600'>
 </p>

`sendListData` is an asynchronous function that hold the api requesting that sends the transaction item to Fluree. This is nested within the `addList` function then called at the end. Within the `sendListData` there is an if statement that checks if the response was a successful status code then it sets the list data in the UI with the `setLists` custom hook.

<p width="100%" align="center">
 <img src='/src/Images/submit_list.png' alt='submitting list data and adding a list' width='600'>
</p>

This is the submission function that calls the `addList` when the submit button is pressed.

#### **Updating existing data in Fluree**

Updating data uses the same structure and syntax as transacting new data to Fluree. We will be updating data by using the `_id` retrieved from the query in`fetchListData`. 
#### **Deleting tasks**

 <p width="100%" align="center">
 <img src='/src/Images/delete_task.png' alt='deleting a task' width='600'>
</p>

`deleteTask` holds the asynchronous function `deleteTaskFromFluree` that deletes the task. By matching the `_id` to the intended task then uses the `_action` transact key to specify a deletion when sent to Fluree. For more on deleting data refer to the [deleting data](https://docs.flur.ee/docs/1.0.0/transact/deleting-data) section.

#### **Editing tasks**

 <p width="100%" align="center">
 <img src='/src/Images/edit_task.png' alt='importing collection schema' width='600'>
</p>

Similar to the way we delete tasks above, `editTasks` matches the task `_id` and includes the data change for the name of the task and completion status. For more detail updating data refer to the [updating data](https://docs.flur.ee/docs/1.0.0/transact/updating-data) section.

### **Learn more**

For other API endpoint and examples visit the Fluree docs, [here](https://docs.flur.ee/api).

For more on the Fluree ledger and its Blockchain technology visit the [Blockchain](https://docs.flur.ee/guides/1.0.0/architecture/blockchain) docs.

A subject we did not cover are [Smart Functions](https://docs.flur.ee/guides/1.0.0/smart-functions/smart-functions) in Fluree, which can be used in setting permissions to your DB. Here is a full [list](https://docs.flur.ee/guides/1.0.0/smart-functions/smart-functions) of accepted smart functions.

A deeper dive into analytical queries and examples visit the docs section, [here](https://docs.flur.ee/guides/1.0.0/analytical-queries/inner-joins-in-fluree).

