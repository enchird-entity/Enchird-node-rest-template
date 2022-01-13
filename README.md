# Enchird Node.js Backend Template
This is Node.js + Typescript + Mongoose Express template. To be used for all Enchird Node.js Rest Api projects

## Documentation
Clone the project to your local computer and create a new branch, this will be the primary branch for all your code. Once you test you code and are ready to submit, create a pull request to the develop branch. **NEVER PUSH DIRECTLY TO THE MASTER BRANCH**. Merging to the master branch shall be done **ONLY BY THE ADMINS**
### Models
All models files end with `*.model.ts` and should be defined in the `src/models` directory, see the the example `src/models/user.model.ts`

### Controllers
Similar to models, controllers should end with `*.controller.ts` and should be defined in the path `src/routers`. 
For uniformity we recommend all you responses should have well defined status codes. 400* for client errors, 500* for server errors. Every endpoints response object should follow the format
```typescript
interface TickketApiResponse {
    data?: any;             // The data to be passed to the client
    message?: string;       // A custom message, ex. "Saved to Database", or "There was an error adding this record",
    errorText?: string;     // For debugging purposes, please convert the error message to a string; see the in user.controller.ts
}
```
Please see the example in `src/controllers/user.controller.ts`.

### Running the dev server
Rul locally with the command `yarn dev` or  `npm run dev`. This script loads the the env file.

### Building 
To build the project, run `yarn build`. This commands builds the project and outputs the files in the `dist` directory.