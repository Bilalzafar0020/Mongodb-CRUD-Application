
// import express from 'express';
// import { nanoid } from 'nanoid';
// const router = express.Router();

// import {client} from '../../mongodb.mjs'

// const db = client.db('mydatabase');

// // Use the collection "people"
// const col = db.collection("Alltods");

// //  local variable but in case of database we will use database not this 
// // let todos = [{
// //     id: nanoid(),
// //     task: "",
// //     completed: false
// // }];


// ///////////////////////////////            post http method 
// router.post('/todo', async (req, res, next) => {
//   try {
//     if (!req.body.task) {
//       res.status(403).send('Task field is required');
//       return;
//     }

//     const newTodo = {
//       id: nanoid(),
//       task: req.body.task,
//       completed: false,
//     };

//     await col.insertOne(newTodo);
//     res.send('Todo added successfully');
//   } catch (error) {
//     console.error('Error adding todo:', error);
//     res.status(500).send('Failed to add todo');
//   }
// });

// ///////////////////////////////            get http method 
// router.get('/todo/:todoId', async (req, res, next) => {
//     try {
//       const todoId = req.params.todoId;
  
//       // Finding the todo by ID in the 'Alltods' collection in MongoDB
//       const todo = await col.findOne({ id: todoId });

//           // const todo = todos.find(todo => todo.id === todoId);
  
//       if (todo) {
//         res.send(todo);
//       } else {
//         res.status(404).send('Todo not found with id ' + todoId);
//       }
//     } catch (error) {
//       res.status(500).send('Failed to fetch todo');
//     }
//   });
  
//   router.get('/todos', async (req, res, next) => {
//     try {
//       // Fetching  all todos from the 'Alltods' collection in MongoDB
//       const todos = await col.find().toArray();
//       res.send(todos);
//     } catch (error) {
//       res.status(500).send('Failed to fetch todos');
//     }
//   });
import express from 'express';
import { nanoid } from 'nanoid';
const router = express.Router();

import { client } from '../../mongodb.mjs';

// Get reference to the 'mydatabase' database
const db = client.db('mydatabase');

// Use the collection 'Alltods' for todos
const col = db.collection('Alltods');

/////////////////////////////// post http method

router.post('/todo', async (req, res, next) => {
  try {
    if (!req.body.task) {
      res.status(403).send('Task field is required');
      return;
    }

    const newTodo = {
      id: nanoid(),
      task: req.body.task,
      completed: false,
    };

    // Insert the new todo into the 'Alltods' collection in MongoDB
    await col.insertOne(newTodo);
    res.send('Todo added successfully');
  } catch (error) {
    res.status(500).send('Failed to add todo');
  }
});

/////////////////////////////// get http method

router.get('/todo/:todoId', async (req, res, next) => {
  try {
    const todoId = req.params.todoId;

    // Find the todo by ID in the 'Alltods' collection in MongoDB
    const todo = await col.findOne({ id: todoId });

    if (todo) {
      res.send(todo);
    } else {
      res.status(404).send('Todo not found with id ' + todoId);
    }
  } catch (error) {
    res.status(500).send('Failed to fetch todo');
  }
});

router.get('/todos', async (req, res, next) => {
  try {
    // Fetch all todos from the 'Alltods' collection in MongoDB
    const todos = await col.find().toArray();
    res.send(todos);
  } catch (error) {
    res.status(500).send('Failed to fetch todos');
  }
});

/////////////////////////////// delete http method

router.delete('/todo/:todoId', async (req, res, next) => {
  try {
    const todoId = req.params.todoId;

    // Delete the todo by ID from the 'Alltods' collection in MongoDB
    const result = await col.deleteOne({ id: todoId });

    if (result.deletedCount > 0) {
      res.send('Todo deleted');
    } else {
      res.status(404).send('Todo not found');
    }
  } catch (error) {
    res.status(500).send('Failed to delete todo');
  }
});

/////////////////////////////// put http method

router.put('/todo/:todoId', async (req, res, next) => {
  try {
    const todoId = req.params.todoId;

    // Find the todo by ID in the 'Alltods' collection in MongoDB
    const todo = await col.findOne({ id: todoId });

    if (!todo) {
      res.status(404).send('Todo not found');
      return;
    }

    if (!req.body.task) {
      res.status(403).send('Task field is required');
      return;
    }

    // Update the todo in the 'Alltods' collection in MongoDB
    await col.updateOne(
      { id: todoId },
      {
        $set: {
          task: req.body.task,
          completed: req.body.completed || false,
        },
      }
    );

    res.send('Todo updated');
  } catch (error) {
    res.status(500).send('Failed to update todo');
  }
});

export default router;




// ///////////////////////////////            delete http method 


// router.delete('/todo/:todoId',  async (req, res, next) => {
   
//     try {
//         const todoId = req.params.todoId;
    
//         const result = await col.deleteOne({ id: todoId });
    
//         if (result.deletedCount > 0) {
//           res.send('Todo deleted');
//         } else {
//           res.status(404).send('Todo not found');
//         }
//       } catch (error) {
//         res.status(500).send('Failed to delete todo');
//       }
  
// });

// ///////////////////////////////            put http method 

// router.put('/todo/:todoId', async (req, res, next) => {
//     try {
//       const todoId = req.params.todoId;
  
//       // Finding  the todo by ID in the 'Alltods' collection in MongoDB
//       const todo = await col.findOne({ id: todoId });
  
//       if (!todo) {
//         res.status(404).send('Todo not found');
//         return;
//       }
  
//       if (!req.body.task) {
//         res.status(403).send('Task field is required');
//         return;
//       }
  
//       // Updating the todo in the 'Alltods' collection in MongoDB
//       await col.updateOne(
//         { id: todoId },
//         {
//           $set: {
//             task: req.body.task,
//             completed: req.body.completed || false,
//           },
//         }
//       );
  
//       res.send('Todo updated');
//     } catch (error) {
//       res.status(500).send('Failed to update todo');
//     }
//   });
  
//   export default router;