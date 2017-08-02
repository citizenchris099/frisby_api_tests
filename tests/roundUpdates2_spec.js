/**
 * Created by kenziegossett on 5/23/17.
 */
var frisby = require('frisby');
var moment = require('moment');
var oDate = moment().utc().format("YYYY-MM-DDTHH:mm:ss") + ".000Z";
var utility = require('./utility.js').utility;
var url = process.env['url'];
var debug = process.env['debug'];
var roundToPost = function (details) {
    return {
        "roundName": "Chiller #2", "client": "KRzmMZztpCmn8iPWh", "site": "PenSzjwetxXCr9zCz",
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
            "_id": id, "roundName": "Chiller #2", "client": "KRzmMZztpCmn8iPWh",
            "site": "PenSzjwetxXCr9zCz", "durationEstimate": {
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
            }], "name": details[0] + "-Chiller #2", "creator": null
        }
    }
};
var roundUpdate = function (details) {
    return {
        "roundName": "Chiller #2", "durationEstimate": {"minutes": "15"}, "schedule": {
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
}
var taskJson = function (id, details) {
    return {
        "name": details[0] + "-Chiller #2", "description": null, "site": "PenSzjwetxXCr9zCz",
        "client": "KRzmMZztpCmn8iPWh", "round": id, "isBlocked": false, "blockedReason": null,
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
describe('rounds tests', function () {
    it('can post and validate a monthly round due ', function () {
	    var dueDate = utility.now(0, "2018-05-17T00:00:00.000Z");
	    var timeFrame = utility.now(0, "2018-06-17T00:00:00.000Z");
        var createExpect = utility.expectArray(31, 'd', 0,dueDate);
        var dueExpect = utility.dueDateArray(createExpect, 'm', 30);
        var roundsDetails = ["Monthly", dueDate, {"minutes" : 30}, 2];
        var roundsUpdateDetails = ["Daily", dueDate, {"minutes" : 30}, 31, dueExpect, createExpect];
        utility.updateScenario('rounds', roundsDetails, roundToPost, roundExpect, roundsUpdateDetails, roundUpdate, roundExpect, taskJson, timeFrame)
    });
});