# frisby-api-tests
Automated API tests written using frisbyjs

### contributing tests
These tests are written using [jasmine-node](http://ricostacruz.com/cheatsheets/jasmine.html), [frisby js](http://frisbyjs.com/docs/api/) and [moment.js](https://momentjs.com/docs/#/manipulating/add/)
 
 Tests or Scenarios and Updates consist of a POST & GET of each Round/PM Frequency type. Then the scheduler is run with a date speciffied by the test and finally a GET is performed for each of the tasks generated withing the time freame.
 Frequency types are 
  * Hourly (round only)
  * Daily
  * Bi-Weekly
  * Monthly
  * Quarterly
  * Semi-Annualy
  * Annualy
  
  To add a scenario create copy of the default Round or PM spec (dpending on the type you're testing)
  edit the values of the scenarioDetails array to match the variables required for your test.
  variables represented in this array are as follows
  [frequncy , startDate, dueWithin, tasksExpected, dueExpect, createExpect]

  To add an update, create copy of the default Round or PM round spec (depending on the type you're testing)
  edit the values of createExpect, dueExpect, dueDate, roundDetails, roundsUpdateDetails, and time frame.


