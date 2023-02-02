# Combat service
## Solution

A service which accepts an input JSON on HTTP, with the info about the battlefield and returns the next coordinate to attack.

I simulated a REST api under /targets resource.

 **REST API endpoints:**

 ```
  POST /targets/radar
    Accept: application/json
    Content-Type: application/json
    {"protocols":["avoid-mech"],"scan":[{"coordinates":
    {"x":0,"y":40},"enemies":{"type":"soldier","number":10}}]}
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
