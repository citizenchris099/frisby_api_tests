/**
 * Created by johngossett on 5/23/17.
 */
var frisby = require('frisby');
var moment = require('moment');
var oDate = moment().utc().format("YYYY-MM-DDTHH:mm:ss") + ".000Z";
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
        }], "assetsOrLocs": utility.assetLocs(1,details[2])
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
var pmUpdate = function (details) {
    return {
        "name": "SAC Units", "isLifeSafety": details[0], "durationEstimate": {"minutes": "3"},
        "schedule": {
            "frequency": details[1], "startDate": details[2], "dueWithin": details[3],
            "assignee": "LH8J4cELRRsW8Ggu2", "assigneeTeam": "idTqTEP3b3uYJfdAa", "type": details[4]
        }, "steps": [{
            "step_id": "yca7wP98jo5P27MdB",
            "description": "Check air cleaner filter; change if dirty"
        }],
        "assetsOrLocs": utility.assetLocs(2,details[2])
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
        }], "asset": "kgB3L7RCmT5Lc2W7X", "durationEstimate": {
            "minutes": "3"
        }, "steps": [{
            "step_id": "yca7wP98jo5P27MdB",
            "description": "Check air cleaner filter; change if dirty"
        }]

    }
};

describe('pm tests', function () {
    it('can post and validate a monthly pm due ', function () {
        var createExpect = utility.expectArray(31, 'M', 0,oDate);
        var dueExpect = utility.dueDateArray(createExpect, 'w', 1);
        var dueDate = utility.now(0, oDate);
        var pmDetails = [false, "Weekly", dueDate, {"weeks": 1}, "fixed",4];
        var pmUpdateDetails = [true, "Monthly", dueDate, {"weeks": 1}, "fixed",2,dueExpect,createExpect];
        var timeFrame = utility.now(30, oDate);
        utility.updateScenario('pm', pmDetails, pmToPost, pmExpect, pmUpdateDetails, pmUpdate, pmExpect, taskJson, timeFrame)
    });
});