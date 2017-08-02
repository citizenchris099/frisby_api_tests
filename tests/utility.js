/**
 * Created by chrismanning on 5/15/17.
 */
var utility = function () {
};

var moment = require('moment');
var frisby = require('frisby');
var url = process.env['url'];
var debug = process.env['debug'];
var roundAddRoute = '/api/roundAdd';
var pmAddRoute = '/api/procedureAdd';
var pmUpdateRoute = '/api/procedureUpdate/';
var roundUpdateRoute = '/api/roundUpdate/';
var pmGetRoute = '/api/procedures/';
var roundsGetRoute = '/api/rounds/'
var runSchedulerRoute = '/api/runscheduler';
var getTasksRoute = '/api/scheduledTasks/'
var schedulerExpect = function () {
	return {
		"results": {
			"status": "Success"
		}
	}
};

utility.prototype.now = function (add, date, frequency) {
	frequency = frequency || 'days'
	return moment(date).add(add, frequency).format("YYYY-MM-DDTHH:mm:ss") + ".000Z";
};
utility.prototype.dateCut = function (date, cut) {
	cut = cut || ':';
	return date.substring(0, date.indexOf(cut));
};
utility.prototype.expectArray = function (tasksExpected, frequency, add, date) {
	var self = this;
	var returnArray = [];
	var toAdd;
	var addThis;
	if (frequency === 'h' || frequency === 'd' || frequency === 'w' || frequency === 'M'
	    || frequency === 'Q' || frequency === 'y' || frequency === 'm') {
		toAdd = 1
	} else if (frequency === 'bw') {
		frequency = 'w';
		toAdd = 2
	} else if (frequency === 'sa') {
		frequency = 'Q';
		toAdd = 2
	}
	for (var count = 0; count < tasksExpected; count++) {
		addThis = toAdd * count + add;
		returnArray.push(self.now(addThis, date, frequency))
	}
	return returnArray;
};
utility.prototype.dueDateArray = function (createArray, frequency, toAdd) {
	var self = this;
	var returnArray = []
	for (var count = 0; count < createArray.length; count++) {
		returnArray.push(self.now(toAdd, createArray[count], frequency))
	}
	return returnArray;
}
utility.prototype.assetLocs = function (add, date) {
	var returnArray = [];
	var locAsset = [{"id": "kgB3L7RCmT5Lc2W7X", "originalStartDate": date},
		{"id": "GJJpX89TLFqhjP4fe", "originalStartDate": date},
		{"id": "GKpAiEibberiMBtoC", "originalStartDate": date},
		{"id": "W7aoMqGz6Sya5FFtQ", "originalStartDate": date},
		{"id": "o4mrRuKwkwtYnuuWp", "originalStartDate": date},
		{"id": "vkERswHDNjckMq9hB", "originalStartDate": date},
		{"id": "hhm5sEMovwT8LCC8f", "originalStartDate": date},
		{"id": "DwqmjowASHSkY9KGS", "originalStartDate": date},
		{"id": "8jYpT2va8WmYKrBvC", "originalStartDate": date},
		{"id": "88B8KmxEwfaXDhJ4r", "originalStartDate": date}]
	for (var count = 0; count < add; count++) {
		returnArray.push(locAsset[count])
	}
	return returnArray;
}
utility.prototype.updateScenario = function (choice, scenarioDetails, pmToPost, pmExpect, updateDetails, pmUpdate, pmUpdateExpect, taskJson, timeFrame) {
	var routs, tasks, due, create,start;
	if (choice === 'pm') {
		routs = [pmAddRoute, pmGetRoute, pmUpdateRoute];
		tasks = 5;
		due = 6;
		create = 7;
		start = 2
	} else if (choice === 'rounds') {
		routs = [roundAddRoute, roundsGetRoute, roundUpdateRoute];
		tasks = 3;
		due = 4;
		create = 5;
		start = 1
	}
	var self = this;
	console.log('update scenario details: type = '+choice+' start date = '+scenarioDetails[start])
	console.log('////////////////posted////////')
	console.log(pmToPost(scenarioDetails))

	frisby.create('post a pm/round')
	      .post(url
	            + routs[0], pmToPost(scenarioDetails), {json: true}, {headers: {'Content-Type': 'application/json'}})
	      .expectStatus(200)
	      .expectHeaderContains('Content-Type', 'json')
	      .expectJSONTypes({
		                       "id": String
	                       })
	      .afterJSON(function (getNew) {
	      	console.log('/////post returned id//////')
		      console.log(getNew)
		      var pmId = getNew["id"];
		      console.log('get url = '+url + routs[1] + pmId)
		      frisby.create('get a pm/round')
		            .get(url + routs[1] + pmId, {headers: {'Content-Type': 'application/json'}})
		            .expectStatus(200)
		            .expectHeaderContains('Content-Type', 'json')
		            .expectJSON(pmExpect(pmId, scenarioDetails))
		            .afterJSON(function () {
			            console.log('////////////////posted update////////')
			            console.log(pmUpdate(updateDetails))
			            frisby.create('update a pm')
			                  .post(url + routs[2]
			                        + pmId, pmUpdate(updateDetails), {json: true}, {headers: {'Content-Type': 'application/json'}})
			                  .expectStatus(200)
			                  .expectHeaderContains('Content-Type', 'json')
			                  .afterJSON(function () {
				                  frisby.create('get a pm')
				                        .get(url + routs[1]
				                             + pmId, {headers: {'Content-Type': 'application/json'}})
				                        .expectStatus(200)
				                        .expectHeaderContains('Content-Type', 'json')
				                        .expectJSON(pmUpdateExpect(pmId, updateDetails))
				                        .afterJSON(function () {
					                        console.log('date entered into scheduler = '+timeFrame)
					                        console.log('////////////////////////')
					                        frisby.create('run scheduler')
					                              .put(url
					                                   + runSchedulerRoute, {"date": timeFrame}, {json: true}, {headers: {'Content-Type': 'application/json'}})
					                              .expectStatus(200)
					                              .expectHeaderContains('Content-Type', 'json')
					                              .expectJSON(schedulerExpect())
					                              .afterJSON(function (schedulerReturn) {
						                              console.log('scheduler returned')
						                              console.log(schedulerReturn)
						                              frisby.create('get scheduled tasks')
						                                    .get(url + getTasksRoute
						                                         + pmId, {headers: {'Content-Type': 'application/json'}})
						                                    .expectStatus(200)
						                                    .expectHeaderContains('Content-Type', 'json')
						                                    .expectJSON('?', taskJson(pmId, updateDetails))
						                                    .afterJSON(function (tasksGet) {
						                                    	console.log('//////tasks'
							                                                + ' received/////')
							                                    console.log(tasksGet)
							                                    if (debug === 'yes') {
							                                    	if(choice === 'pm') {
																		console.log('pm id = ' + pmId);
																	} else if(choice === 'rounds'){
																		console.log('rounds id = ' + pmId);
																	}
								                                    console.log('actual tasks received = '
								                                                + tasksGet.length);
								                                    console.log('due = '
								                                                + self.dateCut(updateDetails[due][0], 'T')
								                                                + ' &'
								                                                + ' actual due date = '
								                                                + self.dateCut(tasksGet[0]["dueDate"], 'T'));
							                                    }
							                                    expect(tasksGet.length)
								                                    .toEqual(updateDetails[tasks]);
							                                    expect(self.dateCut(updateDetails[due][0], 'T'))
								                                    .toEqual(self.dateCut(tasksGet[0]["dueDate"], 'T'));
							                                    for (var count = 0;
							                                         count < tasksGet.length;
							                                         count++) {
								                                    if (debug === 'yes') {
									                                    console.log('created = '
									                                                + self.dateCut(updateDetails[create][count], 'T')
									                                                + ' & actual created date = '
									                                                + self.dateCut(tasksGet[count]["created"], 'T'));
								                                    }
								                                    expect(self.dateCut(updateDetails[create][count], 'T'))
									                                    .toEqual(self.dateCut(tasksGet[count]["created"], 'T'));
							                                    }
						                                    })
						                                    .toss();
					                              })
					                              .toss()
				                        })
				                        .toss()
			                  })
			                  .toss();
		            })
		            .toss()
	      })
	      .toss();
};
utility.prototype.scenario = function (choice,getArray, scenarioDetails, roundToPost, roundExpect, taskJson, timeFrame) {
	var routs, tasks, due, create,start;
	if (choice === 'pm') {
		routs = [pmAddRoute, pmGetRoute];
		tasks = 5;
		due = 6;
		create = 7;
		start = 2
	} else if (choice === 'rounds') {
		routs = [roundAddRoute, roundsGetRoute];
		tasks = 3;
		due = 4;
		create = 5;
		start = 1
	}
	var self = this;
	var idArray = [];
	var limit = getArray.length-1;
	for (var count = 0; count < getArray.length; count++) {
		(function (passedInCount) {
			console.log('scenario details: fequency = '+getArray[passedInCount]+' & start date ='
			            + ' '+scenarioDetails(getArray[passedInCount])[start])
			console.log('////////////////posted////////')
			console.log(roundToPost(scenarioDetails(getArray[passedInCount])))
			frisby.create('post a round')
			      .post(url
			            + routs[0], roundToPost(scenarioDetails(getArray[passedInCount])), {json: true}, {headers: {'Content-Type': 'application/json'}})
			      .expectStatus(200)
			      .expectHeaderContains('Content-Type', 'json')
			      .expectJSONTypes({
				                       "id": String
			                       })
			      .afterJSON(function (getNew) {
			      	console.log('///////id returned/////////')
				      console.log(getNew)
				      idArray.push(getNew["id"]);
				      frisby.create('get Hourly round')
				            .get(url + routs[1]
				                 + getNew["id"], {headers: {'Content-Type': 'application/json'}})
				            .expectStatus(200)
				            .expectHeaderContains('Content-Type', 'json')
				            .expectJSON(roundExpect(getNew["id"], scenarioDetails(getArray[passedInCount])))
				            .afterJSON(function (anotherGet) {
					            console.log('////////////////get////////')
				            	console.log(anotherGet);
					            console.log('////////////////////////')
					            if (passedInCount===limit) {
					            	console.log('date entered into scheduler = '+timeFrame)
						            console.log('////////////////////////')
						            frisby.create('run scheduler')
						                  .put(url
						                       + runSchedulerRoute, {"date": timeFrame}, {json: true}, {headers: {'Content-Type': 'application/json'}})
						                  .expectStatus(200)
						                  .expectHeaderContains('Content-Type', 'json')
						                  .expectJSON(schedulerExpect())
						                  // .waits(60000)
						                  .afterJSON(function (schedulerReturn) {
						                  	console.log('scheduler returned')
							                  console.log(schedulerReturn)
							                  for (var count = 0; count < getArray.length; count++) {
								                  (function (passedInCount2) {
								                  	console.log('url path = '+url + getTasksRoute
								                                + idArray[passedInCount2])
									                  frisby.create('get scheduled tasks')
									                        .get(url + getTasksRoute
									                             + idArray[passedInCount2], {headers: {'Content-Type': 'application/json'}})
									                        .expectStatus(200)
									                        .expectHeaderContains('Content-Type', 'json')
									                        .expectJSON('?', taskJson(idArray[passedInCount2], scenarioDetails(getArray[passedInCount2])))
									                        .afterJSON(function (getNew3) {
										                        console.log('////////////////tasks received////////')
										                        console.log(getNew3);
										                        console.log('////////////////////////')
										                        expect(getNew3.length)
											                        .toEqual(scenarioDetails(getArray[passedInCount2])[tasks]);
										                        expect(self.dateCut(scenarioDetails(getArray[passedInCount2])[due][0], 'T'))
											                        .toEqual(self.dateCut(getNew3[0]["dueDate"], 'T'));
										                        for (var count2 = 0;
										                             count2 < getNew3.length;
										                             count2++) {
											                        (function (passedInCount3) {
												                        if (debug === 'yes') {
													                        console.log('array name = '
													                                    + getArray[passedInCount2])
													                        console.log('created = '
													                                    + self.dateCut(scenarioDetails(getArray[passedInCount2])[create][passedInCount3], 'T')
													                                    + ' & actual created date = '
													                                    + self.dateCut(getNew3[passedInCount3]["created"], 'T'));
												                        }
												                        expect(self.dateCut(scenarioDetails(getArray[passedInCount2])[create][passedInCount3], 'T'))
													                        .toEqual(self.dateCut(getNew3[passedInCount3]["created"], 'T'));
											                        })(count2);
										                        }
									                        })
									                        .toss();
								                  })(count);
							                  }

						                  })
						                  .toss()
					            }
				            })
				            .toss();
			      })
			      .toss();
		})(count);
	}
};
exports.utility = new utility();