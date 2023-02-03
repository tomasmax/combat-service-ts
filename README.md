# Combat service

Simulates a combat game where the endpoint has to return the next target to attack.

## Solution

A service which accepts an input JSON on HTTP, with the info about the battlefield and returns the next coordinate to attack.

The next target depends on the protocols that are passed to the request, they should be compatible between them. For example, closest-enemies and furthest-enemies protocols aren't.

  **Available protocols:**
  - Prioritize closest enemy target
  'closest-enemies'
  - Prioritize furthest enemy target
  'furthest-enemies'
  - Prioritize allies targets
  'assist-allies'
  - Don't attack any target with allies
  'avoid-crossfire'
  - Attack a mech target. Otherwise attack another target
  'prioritize-mech'
  - Don't attack mech targets
  'avoid-mech'

It has a REST api under /targets resource accessible.

 **REST API endpoints:**

 ```
  POST /targets/radar
    Accept: application/json
    Content-Type: application/json
    {
      "protocols":["avoid-mech"],
      "scan":[{"coordinates":{"x":0,"y":40},"enemies":{"type":"soldier","number":10}}]
    }
 ```

**To run it locally:**
  - Install dependencies `npm install`
  - Run like production `npm run start`
  - Run for dev (watches for any files changes) `npm run dev`
  - Go to http://localhost:3000/

**To run with docker:**
  - Run `docker compose up`
  - Go to http://localhost:3000/  

**To run tests**
  - After dependencies are installed
  - Run tests `npm run test`
  - Run tests watching for changes `npm run test:watch`
  - Run test with coverage `npm run test:coverage`
