/**
 * Created by chrismanning on 5/9/17.
 */
var frisby = require('frisby');
var moment = require('moment');
var utility = require('./utility.js').utility;
var url = process.env['url'];
var debug = process.env['debug'];
var roundToPost = function (details) {
	return {
		"name": "Chiller #2", "client": "uM5jSPfAJtAtezipe", "site": "YTdopSSK7Pu9JP6Pm",
		"durationEstimate": {"minutes": "15"}, "schedule": {
			"frequency": details[0], "startDate": details[1], "dueWithin": details[2],
			"assignee": null, "assigneeTeam": "8BvKJ49wzruKisx7y"
		}, "steps": [{
			"step_id": "CdHQpeu2odMrv8kzW", "description": "FLA%",
			"readingtypes": ["4XvtKFgvZg5nTL8tA"], "asset": "xcLRtD4XKz2rosdfv"
		}, {
			"step_id": "DMx7sWBxusBYv7Dax", "description": "Cond. Leaving",
			"readingtypes": ["bk4Xm9cKykYPH7zwi"], "asset": "xcLRtD4XKz2rosdfv"
		}]
	}
};
var roundExpect = function (id, details) {
	return {
		"status": "success", "data": {
			"_id": id, "name": "Chiller #2", "client": "uM5jSPfAJtAtezipe",
			"site": "YTdopSSK7Pu9JP6Pm", "durationEstimate": {
				"minutes": "15"
			}, "schedule": {
				"frequency": details[0], "startDate": details[1], "dueWithin": details[2],
				"assignee": null, "assigneeTeam": "8BvKJ49wzruKisx7y"
			}, "steps": [{
				"step_id": "CdHQpeu2odMrv8kzW", "description": "FLA%",
				"readingtypes": ["4XvtKFgvZg5nTL8tA"], "asset": "xcLRtD4XKz2rosdfv"
			}, {
				"step_id": "DMx7sWBxusBYv7Dax", "description": "Cond. Leaving",
				"readingtypes": ["bk4Xm9cKykYPH7zwi"], "asset": "xcLRtD4XKz2rosdfv"
			}], "name": "Chiller #2", "creator": null
		}
	}
};

var taskJson = function (id, details) {
	return {
		"name": "Chiller #2", "description": null, "site": "YTdopSSK7Pu9JP6Pm",
		"client": "uM5jSPfAJtAtezipe"
		          + "", "round": id, "isBlocked": false, "blockedReason": null,
		"assignee": null, "assigneeTeam": {
			"team_id": "8BvKJ49wzruKisx7y", "name": "Watch"
		}, "durationEstimate": {
			"minutes": "15"
		}, "steps": [{
			"step_id": "CdHQpeu2odMrv8kzW", "description": "FLA%", "isLifeSafety": false,
			"readingtypes": ["4XvtKFgvZg5nTL8tA"], "asset": "xcLRtD4XKz2rosdfv"
		}, {
			"step_id": "DMx7sWBxusBYv7Dax", "description": "Cond. Leaving", "isLifeSafety": false,
			"readingtypes": ["bk4Xm9cKykYPH7zwi"], "asset": "xcLRtD4XKz2rosdfv"
		}], "readings": [{
			"step": "CdHQpeu2odMrv8kzW", "asset": "xcLRtD4XKz2rosdfv",
			"readingtype": "4XvtKFgvZg5nTL8tA", "name": "Percent", "type": "Meter", "uom": "%"
		}, {
			"step": "DMx7sWBxusBYv7Dax", "asset": "xcLRtD4XKz2rosdfv",
			"readingtype": "bk4Xm9cKykYPH7zwi", "name": "Temp", "type": "Meter", "uom": "F"
		}], "status": "Not Started", "creator": "SYSTEM", "comments": [], "isReadByAssignee": false,
		"labels": [{
			"label_id": "vMgPiemQzW3djXd8v", "name": "Round", "isReadOnly": true
		}]
	}
};

var vanillaScenarioDetails = function (get) {
	var details = new Map();
	var startDate = utility.now(0, "2018-05-17T00:00:00.000Z");
	var dueWithin = {"minutes" : 30};

	var hourlyTasksExpected = 25;
	var dailyTasksExpected = 2;
	var weeklyTasksExpected = 1;
	var bwTasksExpected = 1;
	var monthlyTasksExpected = 1;
	var quarterlyTasksExpected = 1;
	var saTasksExpected = 1;
	var annuallyTasksExpected = 1;

	var hourlyCreateExpect = utility.expectArray(hourlyTasksExpected, 'h', 0,"2018-05-17T00:00:00.000Z");
	var hourlyDueExpect = utility.dueDateArray(hourlyCreateExpect, 'h',1);
	var dailyCreateExpect = utility.expectArray(dailyTasksExpected, 'd', 0,"2018-05-17T00:00:00.000Z");;
	var dailyDueExpect = utility.dueDateArray(dailyCreateExpect, 'h',1);
	var weeklyCreateExpect = utility.expectArray(weeklyTasksExpected, 'w', 0,"2018-05-17T00:00:00.000Z");
	var weeklyDueExpect = utility.dueDateArray(weeklyCreateExpect, 'h',1);
	var bwCreateExpect = utility.expectArray(bwTasksExpected, 'bw', 0,"2018-05-17T00:00:00.000Z");
	var bwDueExpect = utility.dueDateArray(bwCreateExpect, 'h',1);
	var monthlyCreateExpect = utility.expectArray(monthlyTasksExpected, 'M', 0,"2018-05-17T00:00:00.000Z");
	var monthlyDueExpect = utility.dueDateArray(monthlyCreateExpect, 'h',1);
	var quarterlyCreateExpect = utility.expectArray(quarterlyTasksExpected, 'Q', 0,"2018-05-17T00:00:00.000Z");
	var quarterlyDueExpect = utility.dueDateArray(quarterlyCreateExpect, 'h',1);
	var saCreateExpect = utility.expectArray(saTasksExpected, 'sa', 0,"2018-05-17T00:00:00.000Z");
	var saDueExpect = utility.dueDateArray(saCreateExpect, 'h',1);
	var annuallyCreateExpect = utility.expectArray(annuallyTasksExpected, 'y', 0,"2018-05-17T00:00:00.000Z");
	var annuallyDueExpect = utility.dueDateArray(annuallyCreateExpect, 'h',1);

	details.set("Hourly", ["Hourly", startDate, dueWithin, hourlyTasksExpected, hourlyDueExpect, hourlyCreateExpect]);
	details.set("Daily", ["Daily", startDate, dueWithin, dailyTasksExpected, dailyDueExpect, dailyCreateExpect]);
	details.set("Weekly", ["Weekly", startDate, dueWithin, weeklyTasksExpected, weeklyDueExpect, weeklyCreateExpect]);
	details.set("Bi-Weekly", ["Bi-Weekly", startDate, dueWithin, bwTasksExpected, bwDueExpect, bwCreateExpect]);
	details.set("Monthly", ["Monthly", startDate, dueWithin, monthlyTasksExpected, monthlyDueExpect, monthlyCreateExpect]);
	details.set("Quarterly", ["Quarterly", startDate, dueWithin, quarterlyTasksExpected, quarterlyDueExpect, quarterlyCreateExpect]);
	details.set("Semi-Annually", ["Semi-Annually", startDate, dueWithin, saTasksExpected, saDueExpect, saCreateExpect]);
	details.set("Annually", ["Annually", startDate, dueWithin, annuallyTasksExpected, annuallyDueExpect, annuallyCreateExpect]);
	return details.get(get);
};

var getArray = ["Hourly", "Daily", "Weekly", "Bi-Weekly",
                "Monthly", "Quarterly", "Semi-Annually",
                "Annually"];

describe('round vanilla scenario', function () {
	it('can run the vanilla scenario', function () {
		utility.scenario('rounds', getArray, vanillaScenarioDetails, roundToPost, roundExpect, taskJson, utility.now(0,"2018-05-18T00:00:00.000Z"))
	});
});