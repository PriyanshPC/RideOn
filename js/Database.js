var db;

function errorHandler(error) {
    console.error("SQL error: " + error.message);
}

var DB = {
    createDatabase: function () {
        var shortName = "RideOnDB";
        var version = "1.0";
        var displayName = "DB for RideOn App";
        var dbSize = 5 * 1024 * 1024;

        function dbCreateSuccess() {
            console.info("Success: Database created successfully");
        }
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },

    createTables: function () {
        db.transaction(function (tx) {
            var createUserTable = `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                FirstName VARCHAR(100),
                LastName VARCHAR(100),
                Email VARCHAR(100),
                Phone VARCHAR(15),
                Username VARCHAR(50),
                Password VARCHAR(50),
                Image TEXT
            );`;

            var createDriverTripPostTable = `CREATE TABLE IF NOT EXISTS driver_posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                Origin VARCHAR(100),
                Destination VARCHAR(100),
                Price DECIMAL(10, 2),
                hasStops BOOLEAN,
                Stop1 VARCHAR(100),
                Price1 DECIMAL(10, 2),
                Stop2 VARCHAR(100),
                Price2 DECIMAL(10, 2),
                Stop3 VARCHAR(100),
                Price3 DECIMAL(10, 2),
                Date DATE,
                Time TIMESTAMP,
                TripDetails TEXT
            );`;

            var createDriverScheduleTable = `CREATE TABLE IF NOT EXISTS driver_schedules (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                Day VARCHAR(100),
                Origin VARCHAR(100),
                Destination VARCHAR(100),
                Price DECIMAL(10, 2),
                hasStops BOOLEAN,
                Stop1 VARCHAR(100),
                Price1 DECIMAL(10, 2),
                Stop2 VARCHAR(100),
                Price2 DECIMAL(10, 2),
                Stop3 VARCHAR(100),
                Price3 DECIMAL(10, 2),
                IsReturn BOOLEAN,
                Time TIMESTAMP,
                Return TIMESTAMP,
                TripDetails TEXT
            );`;

            var createRiderTripPostTable = `CREATE TABLE IF NOT EXISTS rider_posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                Origin VARCHAR(100),
                Destination VARCHAR(100),
                Price DECIMAL(10, 2),
                Date DATE,
                Time TIMESTAMP,
                TripDetails TEXT
            );`;

            var createRiderScheduleTable = `CREATE TABLE IF NOT EXISTS rider_schedules (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                Day VARCHAR(100),
                Origin VARCHAR(100),
                Destination VARCHAR(100),
                Price DECIMAL(10, 2),
                IsReturn BOOLEAN,
                Time TIMESTAMP,
                Return TIMESTAMP,
                TripDetails TEXT
            );`;

            tx.executeSql(createUserTable, [], null, errorHandler);
            tx.executeSql(createDriverTripPostTable, [], null, errorHandler);
            tx.executeSql(createDriverScheduleTable, [], null, errorHandler);
            tx.executeSql(createRiderTripPostTable, [], null, errorHandler);
            tx.executeSql(createRiderScheduleTable, [], null, errorHandler);
        });
    },

    dropTables: function () {
        db.transaction(function (tx) {
            tx.executeSql("DROP TABLE IF EXISTS users;", [], function () {
                console.info("Success: Users table dropped.");
            }, errorHandler);
            tx.executeSql("DROP TABLE IF EXISTS driver_posts;", [], function () {
                console.info("Success: Driver Trip Posts table dropped.");
            }, errorHandler);
            tx.executeSql("DROP TABLE IF EXISTS driver_schedules;", [], function () {
                console.info("Success: Driver Schedules table dropped.");
            }, errorHandler);
            tx.executeSql("DROP TABLE IF EXISTS rider_posts;", [], function () {
                console.info("Success: Rider Trip Posts table dropped.");
            }, errorHandler);
            tx.executeSql("DROP TABLE IF EXISTS rider_schedules;", [], function () {
                console.info("Success: Rider Schedules table dropped.");
            }, errorHandler);
        });
    },

};


