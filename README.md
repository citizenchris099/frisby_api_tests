# fly-api-tests
Automated API tests of the various spectrum related apis

### running tests
these tests are intended to be run against a locally running copy of spectrum on port 3000.
  
    * "npm run test_vanillaRounds": runs the vanilla rounds test
    * "npm run test_decJanRounds":  runs the December January crossover rounds test
    * "npm run test_leapYearRounds": runs the leap year rounds test
    * "npm run test_fallTimeChangeRounds": runs the fall time change rounds test
    * "npm run test_springTimeChangeRounds": runs the spring time change rounds test
    * "npm run test_roundUpdates":  runs the round updates test
    * "npm run test_roundUpdates2": runs another version of the rounds updates test
    * "npm run test_vanillaPM": runs a vanilla PM test
    * "npm run test_decJanPM": runs the December January crossover PM test
    * "npm run test_leapYearPM": runs the leap year PM test
    * "npm run test_daylightSavingsTimePM": runs the daylight saving time PM test
    * "npm run test_pmUpdate": runs the PM update
    * "npm run test_vanillaRounds_debug": runs the vanilla rounds test with console log on
    * "npm run test_decJanRounds_debug": runs the december january crossover rounds test with console log on
    * "npm run test_leapYearRounds_debug": runs the leap year rounds crossover rounds test with console log on
    * "npm run test_fallTimeChangeRounds_debug": runs the fall time change rounds test with console log on
    * "npm run test_springTimeChangeRounds_debug": runs the spring time change rounds test with console log on
    * "npm run test_roundUpdates_debug": runs the rounds update test with console log on
    * "npm run test_roundUpdates2_debug": runs another version of the rounds update test with console log on
    * "npm run test_pmUpdate_debug": runs a pm update test with console logs on
    * "npm run test_decJanPM_debug": runs the december january crossover pm test with consols log on
    * "npm run test_leapYearPM_debug": runs the leap year pm test with console log on
    * "npm run test_daylightSavingstimePM_debug": runs the daylight saving time pm test with console log on
    * "npm run test_vanillaPM_debug": runs vanilla PM test with console log on 

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


