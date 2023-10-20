Obfuscated code samples for a Next.JS app that interacts with the Plaid API to interact with financial institutions.

High-Level Architecture : https://www.figma.com/file/8EhUyIk7rk8WekdFi4rHAB/Example-Plaid-NextJS-High-Level-Architecture?type=whiteboard&node-id=0%3A1&t=LTfGIpPHArxuTrOL-1

Data layer:

  -We are going to model a user and some of their crypto holdings in a relational model and will include some default SQL. 
  
  -This design is extremely simplistic, in a real project with a real-world use case we would look at the requirements and see if a NoSQL / JSON / etc DB would be better.
  
  -Since we are going relational we are going with a normalized schema, with additional scaling details we might consider denormalizing / preparing for sharding at the 
   application layer / etc. 
   
  -Data model / ERD : https://www.figma.com/file/Mse2uBfyq91YyRT93lS2iQ/Plaid-NextJS-ERD?type=whiteboard&node-id=0%3A1&t=okAlUeME9aLYP5et-1
  
  -A sample schema is included under /schema. In practice we would want to handle DB migrations in some organized manner such as using DBMate, Prisma, etc. 
  
  -Since Vercel Database / Neon is serverless we have autoscaling / only using compute loads as they are needed but this can result in some cold start issues. In a real 
   project we would look at application performance and adjust the time to compute loads sleeping accordingly.
