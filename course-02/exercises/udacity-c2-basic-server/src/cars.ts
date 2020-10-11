//a simple ts file, used as libarary.

//an exportable Car interface:
//to understand how interface works in ts
//.. go to your github, and see Typescript_Basics
export interface Car {
    make: string;
    type: string;
    model: string;
    cost: number;
    id: number;
}

//an exportable array of objects from Car type,
export const cars: Car[] = [
    { make: 'tesla', type: 'sedan', model: 'roadster', cost: 33, id: 0 },
    { make: 'tesla', type: 'suv', model: 'model 3', cost: 48, id: 1 },
    { make: 'toyota', type: 'sedan', model: 'prius', cost: 22, id: 2 },
    { make: 'honda', type: 'sedan', model: 'civic', cost: 22, id: 3 }
   ]