/**
 * Created by johngossett on 5/9/17.
 */
var frisby = require('frisby');
var moment = require('moment');
var utility = require('./utility.js').utility;
var url = process.env['url'];
var debug = process.env['debug'];
var pmToPost = function (details) {
    return {
        "name": "SAC Units", "client": "uM5jSPfAJtAtezipe", "site": "P6J6b6SWL2hK9DHgB",
        "assettype": "3dXwbXpdi7nxpbXaX", "isLifeSafety": details[0],
        "durationEstimate": {"minutes": "3"}, "schedule": {
            "frequency": details[1], "startDate": details[2], "dueWithin": details[3],
            "assignee": "LH8J4cELRRsW8Ggu2", "assigneeTeam": "idTqTEP3b3uYJfdAa", "type": details[4]
        }, "steps": [{
            "step_id": "yca7wP98jo5P27MdB",
            "description": "Check air cleaner filter; change if dirty"
        }], "assetsOrLocs": utility.assetLocs(2,details[2])
    }
};
var pmExpect = function (id, details) {
    return {
        "status": "success", "data": {
            "_id": id, "name": "SAC Units", "client": "uM5jSPfAJtAtezipe",
            "site": "P6J6b6SWL2hK9DHgB", "assettype": "3dXwbXpdi7nxpbXaX",
            "isLifeSafety": details[0], "durationEstimate": {
                "minutes": "3"
            }, "schedule": {
                "frequency": details[1], "startDate": details[2], "dueWithin": details[3],
                "assignee": "LH8J4cELRRsW8Ggu2", "assigneeTeam": "idTqTEP3b3uYJfdAa",
                "type": details[4]
            }
        }
    }
};
var taskJson = function (id) {
    return {
        "name": "SAC Units", "client": "uM5jSPfAJtAtezipe", "site": "P6J6b6SWL2hK9DHgB",
        "assignee": {
            "user_id": "LH8J4cELRRsW8Ggu2", "name": "Arturo Estrada",
            "description": "hm35@localhost.com"
        }, "assigneeTeam": {
            "team_id": "idTqTEP3b3uYJfdAa", "name": "General Mechanic"
        }, "procedure": id, "isBlocked": false, "asset": "kgB3L7RCmT5Lc2W7X", "steps": [{
            "step_id": "yca7wP98jo5P27MdB",
            "description": "Check air cleaner filter; change if dirty"
        }],
        "asset": "kgB3L7RCmT5Lc2W7X",
        "durationEstimate": {
            "minutes": "3"
        },
        "steps": [
            {
                "step_id": "yca7wP98jo5P27MdB",
                "description": "Check air cleaner filter; change if dirty"
            }
        ]

    }
};

var scenarioDetails = function (get) {
    var details = new Map();
    var startDate = utility.now(0, "2017-05-17T12:00:00.000Z");
    var dueWithin = {"minutes" : 30};

    var dailyTasksExpected = 4;
    var weeklyTasksExpected = 2;
    var bwTasksExpected = 2;
    var monthlyTasksExpected = 2;
    var quarterlyTasksExpectded = 2;
    var saTasksExpected = 2;
    var annuallyTasksExpected = 2;

    var dailyCreateExpect = utility.expectArray(dailyTasksExpected, 'd', 0,"2017-05-17T12:00:00.000Z");
    var dailyDueExpect = utility.dueDateArray(dailyCreateExpect, 'h', 1);
    var weeklyCreateExpect = utility.expectArray(weeklyTasksExpected, 'w', 0,"2017-05-17T12:00:00.000Z");
    var weeklyDueExpect = utility.dueDateArray(weeklyCreateExpect, 'd', 1);
    var bwCreateExpect = utility.expectArray(bwTasksExpected, 'bw', 0,"2017-05-17T12:00:00.000Z");
    var bwDueExpect = utility.dueDateArray(bwCreateExpect, 'd', 1);
    var monthlyCreateExpect = utility.expectArray(monthlyTasksExpected, 'M', 0,"2017-05-17T12:00:00.000Z");
    var monthlyDueExpect = utility.dueDateArray(monthlyCreateExpect, 'w', 1);
    var quarterlyCreateExpect = utility.expectArray(quarterlyTasksExpectded, 'Q', 0,"2017-05-17T12:00:00.000Z");
    var quarterlyDueExpect = utility.dueDateArray(quarterlyCreateExpect, 'w', 2);
    var saCreateExpect = utility.expectArray(saTasksExpected, 'sa', 0,"2017-05-17T12:00:00.000Z");
    var saDueExpect = utility.dueDateArray(saCreateExpect, 'M', 1);
    var annuallyCreateExpect = utility.expectArray(annuallyTasksExpected, 'y', 0,"2017-05-17T12:00:00.000Z");
    var annuallyDueExpect = utility.dueDateArray(annuallyCreateExpect, 'M', 6);

    details.set("Daily", [false, "Daily", startDate, {"hours": 1}, "fixed", dailyTasksExpected, dailyDueExpect, dailyCreateExpect]);
    details.set("Weekly", [false, "Weekly", startDate, {"days": 1}, "fixed", weeklyTasksExpected, weeklyDueExpect, weeklyCreateExpect]);
    details.set("Bi-Weekly", [false, "Bi-Weekly", startDate, {"days": 1}, "fixed", bwTasksExpected, bwDueExpect, bwCreateExpect]);
    details.set("Monthly", [false, "Monthly", startDate, {"weeks": 1}, "fixed", monthlyTasksExpected, monthlyDueExpect, monthlyCreateExpect]);
    details.set("Quarterly", [false, "Quarterly", startDate, {"weeks": 2}, "fixed", quarterlyTasksExpectded, quarterlyDueExpect, quarterlyCreateExpect]);
    details.set("Semi-Annually", [false, "Semi-Annually", startDate, {"months": 1}, "fixed", saTasksExpected, saDueExpect, saCreateExpect]);
    details.set("Annually", [false, "Annually", startDate, {"months": 6}, "fixed", annuallyTasksExpected, annuallyDueExpect, annuallyCreateExpect]);
    return details.get(get);
};

var getArray = ['Daily','Weekly','Bi-Weekly',
    'Monthly','Quarterly','Semi-Annually',
    'Annually'];

describe('pm multi-asset scenario', function () {
    it('can run the multi-asset pm scenario', function () {
        utility.scenario('pm', getArray, scenarioDetails, pmToPost, pmExpect, taskJson, utility.now(0,"2017-05-18T12:00:00.000Z"))
    });
});