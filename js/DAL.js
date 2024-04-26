var user ={

    insertData: function (user) {
        db.transaction(function (tx) {
            var sql = `INSERT INTO users (FirstName, LastName, Email, Phone, Username, Password, Image) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            var options = [user.FirstName, user.LastName, user.Email, user.Phone, user.Username, user.Password, user.Image];
            console.log("insert: "+user.FirstName);
            function successCallback() {
                console.info("Success: User inserted successfully.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    },

    selectUser: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM users WHERE Username=?`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },
    select: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM users WHERE id=?`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

    update:function (id, user) {
        db.transaction(function (tx) {
            var sql = `UPDATE users SET FirstName=?, LastName=?, Email=?, Phone=?, Username=?, Image=? WHERE id=?`;
            var options = [user.FirstName, user.LastName, user.Email, user.Phone, user.Username, user.Image, id];
            function successCallback() {
                console.info("Success: "+user.FirstName+" updated successfully.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    },

    delete:function (userId) {
        db.transaction(function (tx) {
            var sql = `DELETE FROM users WHERE id=?`;
            var options = [userId];

            function successCallback() {
                console.info("Success: UserClass deleted successfully.");
            }

            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    }
}

var driver_post={
    insertData: function (trip) {
        db.transaction(function (tx) {
            var sql = `INSERT INTO driver_posts (Origin, Destination, Price, hasStops , Stop1, Price1, Stop2, Price2, Stop3, Price3, Date, Time, TripDetails) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            var options = [trip.Origin, trip.Destination, trip.Price, trip.hasStops , trip.Stop1, trip.Price1, trip.Stop2, trip.Price2, trip.Stop3, trip.Price3, trip.Date, trip.Time, trip.TripDetails];
            function successCallback() {
                console.info("Success: trip inserted successfully.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    },

    selectAll: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM driver_posts`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },
    select: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM driver_posts WHERE id=?`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

    update:function (id, trip) {
        db.transaction(function (tx) {
            var sql = `UPDATE driver_posts SET Origin=?, Destination=?, Price=?, hasStops=?, Stop1=?, Price1=?, Stop2=?, Price2=?, Stop3=?, Price3=?, Date=?, Time=?, TripDetails=? WHERE id=?`;
            var options = [trip.Origin, trip.Destination, trip.Price, trip.hasStops , trip.Stop1, trip.Price1, trip.Stop2, trip.Price2, trip.Stop3, trip.Price3, trip.Date, trip.Time, trip.TripDetails, id];
            function successCallback() {
                console.info("Success: Trip "+trip.Origin+" to "+trip.Destination+" is updated successfully.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    },

    delete:function (options) {
        db.transaction(function (tx) {
            var sql = `DELETE FROM driver_posts WHERE id=?`;
            function successCallback() {
                console.info("Success: trip deleted successfully.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    }
}

var rider_post={
    insertData: function (trip) {
        db.transaction(function (tx) {
            var sql = `INSERT INTO rider_posts (Origin, Destination, Price, Date, Time, TripDetails) VALUES (?, ?, ?, ?, ?, ?)`;
            var options = [trip.Origin, trip.Destination, trip.Price, trip.Date, trip.Time, trip.TripDetails];
            function successCallback() {
                console.info("Success: trip inserted successfully.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    },

    selectAll: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM rider_posts`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },
    select: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM rider_posts WHERE id=?`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },
    update:function (id, trip) {
        db.transaction(function (tx) {
            var sql = `UPDATE rider_posts SET Origin=?, Destination=?, Price=?, Date=?, Time=?, TripDetails=? WHERE id=?`;
            var options = [trip.Origin, trip.Destination, trip.Price, trip.Date, trip.Time, trip.TripDetails, id];
            function successCallback() {
                console.info("Success: Trip "+trip.Origin+" to "+trip.Destination+" is updated successfully.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    },

    delete:function (options) {
        db.transaction(function (tx) {
            var sql = `DELETE FROM rider_posts WHERE id=?`;
            function successCallback() {
                console.info("Success: trip deleted successfully.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    }
}

var driverSch_post={
    insertData: function () {
        db.transaction(function (tx) {
            var sql =`SELECT count(*) as count FROM driver_schedules ;`;

            var options=[]
            tx.executeSql(sql,options, function (tx, result) {
                let count = result.rows.item(0).count;
                if (count === 0) {
            var sql = `INSERT INTO driver_schedules (Day, Origin, Destination, Price, hasStops , Stop1, Price1, Stop2, Price2, Stop3, Price3, IsReturn, Time, Return, TripDetails) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            var option1 = ["Sunday", "", "", "", "false" , "", "", "", "", "", "", "false", "", "", ""];
            var option2 = ["Monday", "", "", "", "false" , "", "", "", "", "", "", "false", "", "", ""];
            var option3 = ["Tuesday", "", "", "", "false" , "", "", "", "", "", "", "false", "", "", ""];
            var option4 = ["Wednesday", "", "", "", "false" , "", "", "", "", "", "", "false", "", "", ""];
            var option5 = ["Thursday", "", "", "", "false" , "", "", "", "", "", "", "false", "", "", ""];
            var option6 = ["Friday", "", "", "", "false" , "", "", "", "", "", "", "false", "", "", ""];
            var option7 = ["Saturday", "", "", "", "false" , "", "", "", "", "", "", "false", "", "", ""];

            function successCallback() {
                console.info("Success: trip inserted successfully.");
            }
            tx.executeSql(sql, option1, successCallback, errorHandler);
            tx.executeSql(sql, option2, successCallback, errorHandler);
            tx.executeSql(sql, option3, successCallback, errorHandler);
            tx.executeSql(sql, option4, successCallback, errorHandler);
            tx.executeSql(sql, option5, successCallback, errorHandler);
            tx.executeSql(sql, option6, successCallback, errorHandler);
            tx.executeSql(sql, option7, successCallback, errorHandler);

                } else {
                }
            }, errorHandler);
        });
    },

    selectAll: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM driver_schedules`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },
    select: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM driver_schedules WHERE Day=?`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

    update:function (id, trip) {
        db.transaction(function (tx) {
            var sql = `UPDATE driver_schedules SET Day=?, Origin=?, Destination=?, Price=?, hasStops=? , Stop1=?, Price1=?, Stop2=?, Price2=?, Stop3=?, Price3=?, IsReturn=?, Time=?, Return=?, TripDetails=? WHERE Day=?`;
            var options = [trip.Day, trip.Origin, trip.Destination, trip.Price, trip.hasStops , trip.Stop1, trip.Price1, trip.Stop2, trip.Price2, trip.Stop3, trip.Price3, trip.IsReturn, trip.Time, trip.Return, trip.TripDetails, id];
            function successCallback() {
                console.info("Success: Trip on "+trip.Day +" is updated successfully.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    },

    delete:function (options) {
        db.transaction(function (tx) {
            var sql = `DELETE FROM driver_schedules WHERE Day=?`;
            function successCallback() {
                console.info("Success: trip deleted successfully.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    }
}

var riderSch_post={
    insertData: function () {
        db.transaction(function (tx) {
            var sql =`SELECT count(*) as count FROM rider_schedules ;`;

            var options=[]
            tx.executeSql(sql,options, function (tx, result) {
                let count = result.rows.item(0).count;
                if (count === 0) {
                    var sql = `INSERT INTO rider_schedules (Day, Origin, Destination, Price, IsReturn, Time, Return, TripDetails) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                    var option1 = ["Sunday", "", "", "", "false", "", "", ""];
                    var option2 = ["Monday", "", "", "", "false", "", "", ""];
                    var option3 = ["Tuesday", "", "", "", "false", "", "", ""];
                    var option4 = ["Wednesday", "", "", "", "false", "", "", ""];
                    var option5 = ["Thursday", "", "", "", "false", "", "", ""];
                    var option6 = ["Friday", "", "", "", "false", "", "", ""];
                    var option7 = ["Saturday", "", "", "", "false", "", "", ""];

                    function successCallback() {
                        console.info("Success: trip inserted successfully.");
                    }
                    tx.executeSql(sql, option1, successCallback, errorHandler);
                    tx.executeSql(sql, option2, successCallback, errorHandler);
                    tx.executeSql(sql, option3, successCallback, errorHandler);
                    tx.executeSql(sql, option4, successCallback, errorHandler);
                    tx.executeSql(sql, option5, successCallback, errorHandler);
                    tx.executeSql(sql, option6, successCallback, errorHandler);
                    tx.executeSql(sql, option7, successCallback, errorHandler);

                } else {
                }
            }, errorHandler);
        });
    },

    selectAll: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM rider_schedules`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },
    select: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM rider_schedules WHERE Day=?`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

    update:function (id, trip) {
        db.transaction(function (tx) {
            var sql = `UPDATE driver_schedules SET Day=?, Origin=?, Destination=?, Price=?, IsReturn=?, Time=?, Return=?, TripDetails=? WHERE Day=?`;
            var options = [trip.Day, trip.Origin, trip.Destination, trip.Price, trip.IsReturn, trip.Time, trip.Return, trip.TripDetails, id];
            function successCallback() {
                console.info("Success: Trip on "+trip.Day +" is updated successfully.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    },

    delete:function (options) {
        db.transaction(function (tx) {
            var sql = `DELETE FROM rider_schedules WHERE Day=?`;
            function successCallback() {
                console.info("Success: trip deleted successfully.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    }
}