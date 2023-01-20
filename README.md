# :black_joker: 5 card poker hand generator :black_joker:

Created with Nextjs. Deployed with docker.

Web app that display 5 random card poker hand. Result is given a simple analyses.
On asking for a new hand, the old hand is send with evaluation to API for persistence.

### public api 

* api/hand - url endpoint for generated hand and analyses
* api/oldHands - for 5 last hands played and pushed to db
* api/winner - Send request body with array of strings that represent hands. Ace Heart is AH, 10 Clubs is TC, 5 diamonds is 5D, etc. Api will take array and return the winner of the hands.