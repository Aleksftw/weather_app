# Weather App
 Full-stack weather application consisting of:  
- REST API endpoint which internally retrieves data from a remote service (OpenWeatherMap) and delivers it in JSON machine readable format.  
- Front end UI that presents the data in human readable format.  
    
## Local Setup 
Clone/download repo, cd into the local directory and then run:

```sh
$ npm install
$ cd src
$ node index.js
```

## Making calls to the REST endpoint
Once the local server is running, the endpoint can be called by making a request to the following URL
```sh
$ curl "localhost:8080/api/forecast/<CITY-OF-YOUR-CHOICE>"
```
for example:
```sh
$ curl "localhost:8080/api/forecast/sofia"
$ {"city":"Sofia","country":"BG","forecasts":[{"date":"Saturday, 3/31/2018","weatherDesc":"sky is clear","weatherIcon":"01d","minDailyTemp":12.8,"maxDailyTemp":21},{"date":"Sunday, 4/1/2018","weatherDesc":"moderate rain","weatherIcon":"10d","minDailyTemp":4.69,"maxDailyTemp":10.56},{"date":"Monday, 4/2/2018","weatherDesc":"light snow","weatherIcon":"13d","minDailyTemp":-0.25,"maxDailyTemp":8.3},{"date":"Tuesday, 4/3/2018","weatherDesc":"sky is clear","weatherIcon":"01d","minDailyTemp":-3.07,"maxDailyTemp":14.22},{"date":"Wednesday, 4/4/2018","weatherDesc":"light rain","weatherIcon":"10d","minDailyTemp":6.57,"maxDailyTemp":16.36}],"maxPeriodTemp":21,"minPeriodTemp":-3.07}
```

## Interacting with the UI 
Once the local server is running, the UI can be reached in the browser by navigating to `http://localhost:8080/`  
To search for a city, hover on the looking glass, type your query and hit Enter.  

## Things to note  
- At this stage while the input does get sanitized to prevent XSS attacks, the app does not employ any validation (front-end or server-side).  
- As the app uses a free OpenWeatherMap license a **rate limit of 60 calls/minute** is imposed.  
- 