# :black_joker: 5 card poker hand generator :black_joker:

Created with Nextjs. Deployed with docker.

Web app that display 5 random cards poker hand. Result is given a simple analyses.
On asking for a new hand, the old hand is send with evaluation to API for persistence.

Project is written in NextJs. Styling is tailwind. Server is nextjs server. API use api folder structure of next. Validation for APIs uses zod, and server to db route use tRPC.
I also use Prisma ORM which works particularly well with tRPC and nextj typescript to communicate with my database.

### public api 

* api/hand - url endpoint for generated hand and analyses
* api/oldHands - for 5 last hands played and pushed to db
* api/winner - Send request body with array of strings that represent hands. Ace Heart is AH, 10 Clubs is TC, 5 diamonds is 5D, etc. Api will take array and return the winner of the hands.

### Docker
To initiate project with docker:
docker build -t 5-card-poker --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" 5-card-poker

### db
The project is set up for postgres db. If you have a db available. Set url in .env file DATABASE_URL and type in npx prisma migrate dev in terminal. Or set the url as arg in the docker run.

Docker compose initiates a postgres docker container. Must be connected. 

