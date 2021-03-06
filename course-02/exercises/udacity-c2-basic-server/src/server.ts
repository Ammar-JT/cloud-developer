//express is the framework we use to build our web server:
import express, { Router, Request, Response } from 'express';

//body parser, is a tool to use a body coming from a request
//.. (body is like when you send a form using post method):
import bodyParser from 'body-parser';

import { Car, cars as cars_list } from './cars';
import { reduce } from 'bluebird';

//here you implements an async function, I think it make a thread,
//.. and then you code what you want in that thread:
(async () => {
  //here you used the interface Car, and make an array of it called cars:
  //after that, you stored the array of object, which called cars_list 
  //..in cars:
  let cars:Car[]  = cars_list;

  //Create an express applicaiton
  const app = express(); 
  //default port to listen
  const port = 8082; 
  
  //use middleware so post bodies 
  //are accessable as req.body.{{variable}}
  app.use(bodyParser.json()); 

/// ==========
  /// Next is an endpoints, it's just like the routes in Laravel,
  /// ... with a function containing the request and the response:
  // Root URI call

  //       (  first param  , second param     );
  //app.get("root endpoint", implemnt req and res function);
  //as you can see, the second parameter used a function and write what
  //.. inside of it directly:
  app.get( "/", ( req: Request, res: Response ) => {
    res.status(200).send("Welcome to the Cloud!");
  } );

  ///----------------
  /// another endpoint (route alike):
  // Get a greeting to a specific person 
  // to demonstrate routing parameters
  // > try it {{host}}/persons/:the_name
  app.get( "/persons/:name", 
    ( req: Request, res: Response ) => {
      //notice that {name} is getting the :name!!!
      //unlike laravel,no need to get it form req.params.name or something!
      //Wow ya Node.js wow!
      let { name } = req.params;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
  } );

  ///----------------
  /// another endpoint (route alike), as you can see, instead of req.params, ur used a traditional way,
  ///... which is a whole get query: req.query:
  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  app.get( "/persons/", ( req: Request, res: Response ) => {
    //same as before, {name} comes from the get request queries,
    // yes like a magic:
    let { name } = req.query;

    if ( !name ) {
      return res.status(400)
                .send(`name is required`);
    }

    return res.status(200)
              .send(`Welcome to the Cloud, ${name}!`);
  } );

/// ==========
  /// same as before but with post request:
  // Post a greeting to a specific person
  // to demonstrate req.body
  // > try it by posting {"name": "the_name" } as 
  // an application/json body to {{host}}/persons
  app.post( "/persons", 
    async ( req: Request, res: Response ) => {
      //note that we use another async here, just to process the body
      //.. cuz we process the body of the post req in a separate thread

      const { name } = req.body;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
  } );

  // @TODO Add an endpoint to GET a list of cars
  // it should be filterable by make with a query paramater
  app.get("/cars/", (req: Request, res: Response) => {
    //make means what company make it (tesla or toyota or...)
    let{make} = req.query;

    let cars_list = cars;

    //if we have optional "make" query paramater, filter by it
    //if not, next will be skipped
    if(make){
      //cars.filter is a built-in function for any array, i think ya3nee:
      //and yes, it use a callback function you right it for every inex
      //.. in the array, here is our the cb function vvv
      cars_list = cars.filter((car) => car.make === make);
    }

    //return the resulting list along with 200 success:
    res.status(200).send(cars_list);

  });

  // @TODO Add an endpoint to get a specific car
  // it should require id
  // it should fail gracefully if no matching car is found
  app.get("/cars/:id", (req: Request, res: Response) => {
    //destruct our parth params:
    let {id} =  req.params;

    //check to make sure the id is set:
    if(!id){
      //respond with an error if not:
      return res.status(400).send('id is required');
    }
    
    //try to find the car by id
    const car = cars.filter((car) => car.id == id);

    //respond not found, if we do not have this id
    if(car && car.length === 0){
      return res.status(404).send('car is not found');
    }

    //return the car with a success status code:
    res.status(200).send(car);
  });

  /// @TODO Add an endpoint to post a new car to our list
  // it should require id, type, model, and cost
  app.post("/cars/", (req: Request, res:Response) => {
    //destruct our body payload for our variables:
    let {make, type, model, cost, id} = req.body;

    //check to make sure all required variables are set:
    if (!id || !type || !model || !cost){
      //respond wit han error if not 
      return res.status(400)
        .send('make, type, model,cost, id, are required');
    }

    //create a new instance 
    //LOOK how you can make an object out of interface:
    const new_car: Car = {
      make: make, type: type, model: model, cost: cost, id: id
    };

    //add this car to our local variable
    // push() is a built-in function for arrays, in this case we add
    //.. a new object in the array
    cars.push(new_car);

    //res with 201 - creation success:
    res.status(201).send(new_car);
  })



  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();


//aws credentials, you can install locally using the termenal
// write down:
/// aws configure
// then use the info in the new user credential file, in the excel project folder.