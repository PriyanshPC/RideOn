function frmloginValidation(){
    let Uname = $('#txtUsername').val();
    let options = [Uname];

    user.selectUser(options,callback);

    let Username="";
    let Password="";

    function callback(tx, results) {
        if (isValid_frmlogin()) {
            try {
                let data = results.rows[0];
                localStorage.setItem("id",data["id"]);
                let  FirstName = data['FirstName']
                Username = data['Username'];
                Password = data['Password'];
                if ($('#txtUsername').val() != Username || $('#txtPswd').val() != Password) {
                    alert("Incorrect Username or Password");
                } else {
                    $('.username-change').html(FirstName);
                    $.mobile.changePage($('#HomePage'));
                }
            } catch (e) {
                console.log("User not found")
                alert("Incorrect Username or Password");
            }
        } else {
            console.log("Form not valid");
        }
    }
}
function frmSignUpValidation(){
    if(isValid_frmSignup()){

        let FirstName = $("#txtFirstName").val();
        let LastName = $("#txtLastName").val();
        let Email = $("#txtEmail").val();
        let Phone = $("#numPhone").val();
        let Username = $("#txtUserName_SU").val();
        let Password = $("#txtPswd_SU").val();
        let Image = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
        var userData = new C_User(FirstName, LastName, Email, Phone, Username, Password, Image );
        user.insertData(userData);
        $('#frmSignup')[0].reset();
        $.mobile.changePage($('#LoginPage'));
    }else{
        console.log("Form not valid");
    }
}
function frmUserProfileValidation(){
    let id = localStorage.getItem("id");
    if (isValid_frmUserProfile()) {;
        let FirstName = $("#txtFirstNameUP").val();
        let LastName = $("#txtLastNameUP").val();
        let Email = $("#txtEmailUP").val();
        let Phone = $("#numPhoneUP").val();
        let Username = $("#txtUserName_UP").val();
        let Image =String($('#UPImg').prop('src'));
        console.log(Image);
        var userData = new C_User(FirstName, LastName, Email, Phone, Username, Image);
        user.update(id, userData);
        $('.user').prop('src', Image);
        $('.username-change').html(FirstName);
        HomePageLink();
    } else {
        console.log("Form not valid");
    }
}

//Driver Pages
function CheckBoxStatus(){
    var isCheckedAdd = $('#AddchkBox').prop('checked');
    var isCheckedEdit = $("#AddchkBoxEdit").prop('checked');
    var isCheckedSch = $("#AddchkBoxSch").prop('checked');
    return !!(isCheckedAdd || isCheckedEdit || isCheckedSch);
}
function RadioBoxStatus(){
    var IsReturn = $('#dtTimeDrReturnSch').prop('checked');
    return !!(IsReturn);
}
function frmDrTripDetails(){
    if(isValid_frmDrTripDetails()){

        let Origin = $('#txtOriginDr').val();
        let Destination = $('#txtDestDr').val();
        let Price = $('#numPriceDr').val();
        let hasStops = CheckBoxStatus();
        let Stop1 = $('#txtStop1').val();
        let Price1 = $('#txtPrice1').val();
        let Stop2 = $('#txtStop2').val();
        let Price2 = $('#txtPrice2').val();
        let Stop3 = $('#txtStop3').val();
        let Price3 = $('#txtPrice3').val();
        let Date = $('#dtDateDr').val();
        let Time = $('#dtTimeDr').val();
        let TripDetails = $('#txtTripDtlsDr').val();
        
        var tripData = new C_Driver(Origin, Destination, Price, hasStops , Stop1, Price1, Stop2, Price2, Stop3, Price3, Date, Time, TripDetails)
        driver_post.insertData(tripData);
        $('#frmDrTripDetails')[0].reset();
        $.mobile.changePage($('#DrTripPosted'));

    }else{
        console.log("Form not valid");
    }
}
function ShowAllDrTrips(){
    $('#lstDrViewPost').html("");

    driver_post.selectAll([],callback);
    function callback(tx, results) {
        console.info("Success: All Records selected successfully");
        let innerHtml="";
        for (let i = 0; i < results.rows.length; i++) {
            let data = results.rows[i];
            let Origin = data['Origin'];
            let Destination = data['Destination'];
            let Price = data['Price'];
            let hasStops = data['hasStops'];
            let Stop1 = data['Stop1'];
            let Price1 = data['Price2'];
            let Stop2 = data['Stop2'];
            let Price2 = data['Price2'];
            let Stop3 = data['Stop3'];
            let Price3 = data['Price3'];
            let Date = data['Date'];
            let Time = data['Time'];
            let TripDetails = data['TripDetails'];

            if(hasStops === 'true'){
                innerHtml += `
            <li>
                <a data-role="button" data-row-id=${data['id']} href="#DrShowRiders">
                <h2>${Date} , ${Time}</h2>
                <p>Origin: ${Origin}</p>
                <p>Destination: ${Destination} @ $${Price}</p>
                <p>Stops: ${Stop1} @ $${Price1}, ${Stop2} @ $${Price2}, ${Stop3} @ $${Price3}</p>
                <p>Trip Details: ${TripDetails}</p>
                <a href="#DrTripEdit" data-row-id=${data['id']} data-rel="content" data-position-to="window"></a>
                </a>
            </li>`;
            }else{
                innerHtml += `
            <li>
                <a data-role="button" data-row-id=${data['id']} href="#DrShowRiders">
                <h2>${Date} , ${Time}</h2>
                <p>Origin: ${Origin}</p>
                <p>Destination: ${Destination} @ $${Price}</p>
                <p>Trip Details: ${TripDetails}</p>
                <a href="#DrTripEdit" data-row-id=${data['id']} data-rel="content" data-position-to="window"></a>
                </a>
            </li>`;
            }

            let listView = $('#lstDrViewPost');
            listView = listView.html(innerHtml);
            listView.listview('refresh');
            listView.on("click", "a", clickHandler);

            function clickHandler() {
                localStorage.setItem("DrPost_Id", $(this).attr("data-row-id") );
            }
        }
    }
}
function DrPostById(){
    $('#frmDrTripEdit')[0].reset();
    let options = [localStorage.getItem("DrPost_Id")];
    driver_post.select(options,callback);
    function callback(tx, results) {
        console.info("Success: Post details selected successfully");
        let data = results.rows[0];
        let Origin = data['Origin'];
        let Destination = data['Destination'];
        let Price = data['Price'];
        let hasStops = data['hasStops'];
        let Stop1 = data['Stop1'];
        let Price1 = data['Price2'];
        let Stop2 = data['Stop2'];
        let Price2 = data['Price2'];
        let Stop3 = data['Stop3'];
        let Price3 = data['Price3'];
        let Date = data['Date'];
        let Time = data['Time'];
        let TripDetails = data['TripDetails'];

        $('#txtOriginDrEdit').val(Origin);
        $('#txtDestDrEdit').val(Destination);
        $('#numPriceDrEdit').val(Price);
        $('#dtDateDrEdit').val(Date);
        $('#dtTimeDrEdit').val(Time);
        $('#txtTripDtlsDrEdit').val(TripDetails);

        if(hasStops ==='true'){
            $('#AddchkBoxEdit').prop("checked", true);
            $('#divAddStopsEdit').show();
            $('#txtEditStop1').val(Stop1);
            $('#txtEditPrice1').val(Price1);
            $('#txtEditStop2').val(Stop2);
            $('#txtEditPrice2').val(Price2);
            $('#txtEditStop3').val(Stop3);
            $('#txtEditPrice3').val(Price3);
        }else{
            $('#AddchkBoxEdit').prop("checked", false);
            $('#divAddStopsEdit').hide();
        }
        $('#AddchkBoxEdit').checkboxradio("refresh");
    }
}
function frmDrTripEdit(){
    var id = localStorage.getItem("DrPost_Id");

    if(isValid_frmDrTripEdit()){

        let Origin = $('#txtOriginDrEdit').val();
        let Destination = $('#txtDestDrEdit').val();
        let Price = $('#numPriceDrEdit').val();
        let hasStops = CheckBoxStatus();
        let Stop1 = $('#txtEditStop1').val();
        let Price1 = $('#txtEditPrice1').val();
        let Stop2 = $('#txtEditStop2').val();
        let Price2 = $('#txtEditPrice2').val();
        let Stop3 = $('#txtEditStop3').val();
        let Price3 = $('#txtEditPrice3').val();
        let Date = ($('#dtDateDrEdit').val());
        let Time = $('#dtTimeDrEdit').val();
        let TripDetails = $('#txtTripDtlsDrEdit').val();
        var tripData = new C_Driver(Origin, Destination, Price, hasStops , Stop1, Price1, Stop2, Price2, Stop3, Price3, Date, Time, TripDetails)
        driver_post.update(id,tripData);
        $.mobile.changePage($('#DrTripPosted'));
    }else{
        console.log("Form not valid");
    }
}
function btnDeleteDr(){
    var options =[localStorage.getItem('DrPost_Id')]
    driver_post.delete(options);
    $.mobile.changePage($('#DrTripPosted'));
}
function ShowDrSchedule(){
    let id = localStorage.getItem("DrSchPost_Id");
    driverSch_post.selectAll([],callback);
    function callback(tx, results) {
        console.info("Success: All Posts selected successfully");
        for (let i = 0; i < results.rows.length; i++) {
            let data = results.rows[i];
            let Day = data['Day'];
            let Origin = data['Origin'];
            let Destination = data['Destination'];
            let Price = data['Price'];
            let hasStops = data['hasStops'];
            let Stop1 = data['Stop1'];
            let Price1 = data['Price2'];
            let Stop2 = data['Stop2'];
            let Price2 = data['Price2'];
            let Stop3 = data['Stop3'];
            let Price3 = data['Price3'];
            let IsReturn = data['IsReturn'];
            let Time = data['Time'];
            let Return = data['Return'];
            let TripDetails = data['TripDetails'];


            let innerHtml = "";
            if (hasStops === 'true' && IsReturn === 'true') {
                innerHtml += `
            <li>
                <a data-role="button" data-row-id=${Day} href="#">
                <h2>${Day}</h2>
                <p>Origin: ${Origin}</p>
                <p>Destination: ${Destination} @ $${Price}</p>
                <p>Stops: ${Stop1} @ $${Price1}, ${Stop2} @ $${Price2}, ${Stop3} @ $${Price3}</p>
                <p>Time: ${Time}       Return: ${Return} </p>
                <p>Trip Details: ${TripDetails}</p>
                <a href="#DrScheduleEdit" data-row-id=${Day} data-rel="content" data-position-to="window"></a>
                </a>
            </li>`;
            } else if (hasStops === 'true' && IsReturn === 'false') {
                innerHtml += `
            <li>
                <a data-role="button" data-row-id=${Day} href="#">
                <h2>${Day}</h2>
                <p>Origin: ${Origin}</p>
                <p>Destination: ${Destination} @ $${Price}</p>
                <p>Stops: ${Stop1} @ $${Price1}, ${Stop2} @ $${Price2}, ${Stop3} @ $${Price3}</p>
                <p>Time: ${Time}</p>
                <p>Trip Details: ${TripDetails}</p>
                <a href="#DrScheduleEdit" data-row-id=${Day} data-rel="content" data-position-to="window"></a>
                </a>
            </li>`;
            } else if (hasStops === 'false' && IsReturn === 'True') {
                innerHtml += `
            <li>
                <a data-role="button" data-row-id=${Day} href="#">
                <h2>${Day}</h2>
                <p>Origin: ${Origin}</p>
                <p>Destination: ${Destination} @ $${Price}</p>
                <p>Time: ${Time}       Return: ${Return} </p>
                <p>Trip Details: ${TripDetails}</p>
                <a href="#DrScheduleEdit" data-row-id=${Day} data-rel="content" data-position-to="window"></a>
                </a>
            </li>`;
            } else {
                innerHtml += `
            <li>
                <a data-role="button" data-row-id=${Day} href="#">
                <h2>${Day}</h2>
                <p>Origin: ${Origin}</p>
                <p>Destination: ${Destination} @ $${Price}</p>
                <p>Time: ${Time} </p>
                <p>Trip Details: ${TripDetails}</p>
                <a href="#DrScheduleEdit" data-row-id=${Day} data-rel="content" data-position-to="window"></a>
                </a>
            </li>`;
            }
            var lstDay;
            switch (Day) {
                case 'Sunday':
                    lstDay = $('#lstDrSun');
                    lstDay = lstDay.html(innerHtml);
                    lstDay.listview('refresh');
                    break;
                case 'Monday':
                    lstDay = $('#lstDrMon');
                    lstDay = lstDay.html(innerHtml);
                    lstDay.listview('refresh');
                    break;
                case 'Tuesday':
                    lstDay = $('#lstDrTue');
                    lstDay = lstDay.html(innerHtml);
                    lstDay.listview('refresh');
                    break;
                case 'Wednesday':
                    lstDay = $('#lstDrWed');
                    lstDay = lstDay.html(innerHtml);
                    lstDay.listview('refresh');
                    break;
                case 'Thursday':
                    lstDay = $('#lstDrThu');
                    lstDay = lstDay.html(innerHtml);
                    lstDay.listview('refresh');
                    break;
                case 'Friday':
                    lstDay = $('#lstDrFri');
                    lstDay = lstDay.html(innerHtml);
                    lstDay.listview('refresh');
                    break;
                case 'Saturday':
                    lstDay = $('#lstDrSat');
                    lstDay = lstDay.html(innerHtml);
                    lstDay.listview('refresh');
                    break;
                default:
                    lstDay = $('#lstDrSun');
            }
            lstDay.on("click", "a", clickHandler);
            function clickHandler() {
                localStorage.setItem("DrSchPost_Id", $(this).attr("data-row-id"));
            }
        }
    }
}
function DrSchById(){
    let options = [localStorage.getItem("DrSchPost_Id")];
    driverSch_post.select(options,callback);
    function callback(tx, results) {
        console.info("Success: Post details selected successfully");
        let data = results.rows[0];
        let Origin = data['Origin'];
        let Destination = data['Destination'];
        let Price = data['Price'];
        let hasStops = data['hasStops'];
        let Stop1 = data['Stop1'];
        let Price1 = data['Price2'];
        let Stop2 = data['Stop2'];
        let Price2 = data['Price2'];
        let Stop3 = data['Stop3'];
        let Price3 = data['Price3'];
        let IsReturn = data['IsReturn'];
        let Time = data['Time'];
        let Return = data['Return'];
        let TripDetails = data['TripDetails'];

        $('#txtOriginDrSch').val(Origin);
        $('#txtDestDrSch').val(Destination);
        $('#numPriceDrSch').val(Price);
        $('#dtTimeDrSch').val(Time);
        $('#txtTripDtlsDrSch').val(TripDetails);

        if(hasStops ==='true'){
            $('#AddchkBoxSch').prop("checked", true);
            $('#divAddStopsSch').show();
            $('#txtSchStop1').val(Stop1);
            $('#txtSchPrice1').val(Price1);
            $('#txtSchStop2').val(Stop2);
            $('#txtSchPrice2').val(Price2);
            $('#txtSchStop3').val(Stop3);
            $('#txtSchPrice3').val(Price3);
        }else{
            $('#AddchkBoxSch').prop("checked", false);
            $('#divAddStopsSch').hide();
        }
        if(IsReturn === 'true'){
            $('#radSingleDr').prop('checked', false);
            $('#radReturnDr').prop('checked', true);
            $('#dtTimeDrReturn').show();
            $('#dtTimeDrReturnSch').val(Return);
        }else{
            $('#radSingleDr').prop('checked', true);
            $('#radReturnDr').prop('checked', false);
            $('#dtTimeDrReturn').hide();
        }
        $('#AddchkBoxSch').checkboxradio("refresh");
    }
}
function frmDrSchEdit(){
    var id = localStorage.getItem("DrSchPost_Id");

    if(isValid_frmDrSchEdit()){
        let Day = id;
        let Origin = $('#txtOriginDrSch').val();
        let Destination = $('#txtDestDrSch').val();
        let Price = $('#numPriceDrSch').val();
        let hasStops = CheckBoxStatus();
        let Stop1 = $('#txtSchStop1').val();
        let Price1 = $('#txtSchPrice1').val();
        let Stop2 = $('#txtSchStop2').val();
        let Price2 = $('#txtSchPrice2').val();
        let Stop3 = $('#txtSchStop3').val();
        let Price3 = $('#txtSchPrice3').val();
        let IsReturn = RadioBoxStatus();
        let Time = $('#dtTimeDrSch').val();
        let Return = $('#dtTimeDrReturnSch').val();
        let TripDetails = $('#txtTripDtlsDrSch').val();
        var tripData = new C_DriverSch(Day,Origin, Destination, Price, hasStops , Stop1, Price1, Stop2, Price2, Stop3, Price3, IsReturn, Time, Return, TripDetails)
        driverSch_post.update(id, tripData);
        $.mobile.changePage($('#DrSchedule'));
    }else{
        console.log("Form not valid");
    }
}
function DeleteDrSchedule(){
    var id = localStorage.getItem("DrSchPost_Id");

    let Day = id;
    let Origin = "";
    let Destination = "";
    let Price = "";
    let hasStops = "false";
    let Stop1 = "";
    let Price1 = "";
    let Stop2 = "";
    let Price2 = "";
    let Stop3 = "";
    let Price3 = "";
    let IsReturn = "false";
    let Time = "";
    let Return = "";
    let TripDetails = "";
    var tripData = new C_DriverSch(Day,Origin, Destination, Price, hasStops , Stop1, Price1, Stop2, Price2, Stop3, Price3, IsReturn, Time, Return, TripDetails)
    driverSch_post.update(id, tripData);
    $.mobile.changePage($('#DrSchedule'));
}
function DrShowRiders(){
    let options = [localStorage.getItem("DrPost_Id")];
    driver_post.select(options,callback);
    function callback(tx, results) {
        console.info("Success: Driver Details selected successfully");
        let data = results.rows[0];
        let OriginDr = data['Origin'];
        let DestinationDr = data['Destination'];
        let DateDr = data['Date'];

        rider_post.selectAll([],callback2);
        function callback2(tx, results) {
            console.info("Success: Rider Details selected successfully");
            let innerHtml="";
            for (let i = 0; i < results.rows.length; i++) {

                let data = results.rows[i];
                let Origin = data['Origin'];
                let Destination = data['Destination'];
                let Price = data['Price'];
                let Date = data['Date'];
                let Time = data['Time'];
                let TripDetails = data['TripDetails'];
console.log(Origin , Date);
                let innerHtml="";
                if(OriginDr === Origin && DestinationDr === Destination && DateDr === Date){
                    innerHtml += `
                                    <li>
                                    <a data-role="button">
                                    <h2>${Date} , ${Time}</h2>
                                    <p>Origin: ${Origin}</p>
                                    <p>Destination: ${Destination} @ $${Price}</p>
                                    <p>Trip Details: ${TripDetails}</p>
                                    </a>
                                    </li>`;


                    let listView = $('#lstDrRiders');
                    listView = listView.html(innerHtml);
                    listView.listview('refresh');
                }
                else{
                    console.log('No record Found');
                }

            }
        }
    }
}

//Rider Pages
function frmRdTripDetails(){
    if(isValid_frmRdTripDetails()){
        let Origin = $('#txtOriginRd').val();
        let Destination = $('#txtDestRd').val();
        let Price = $('#numPriceRd').val();
        let Date = $('#dtDateRd').val();
        let Time = $('#dtTimeRd').val();
        let TripDetails = $('#txtTripDtlsRd').val();

        var tripData = new C_Rider(Origin, Destination, Price, Date, Time, TripDetails)
        rider_post.insertData(tripData);
        $('#frmRdTripDetails')[0].reset();
        $.mobile.changePage($('#RdTripPosted'));

    }else{
        console.log("Form not valid");
    }
}
function ShowAllRdTrips(){
    $('#lstRdViewPost').html("");

    rider_post.selectAll([],callback);
    function callback(tx, results) {
        console.info("Success: All Records selected successfully");
        let innerHtml="";
        for (let i = 0; i < results.rows.length; i++) {
            let data = results.rows[i];
            let Origin = data['Origin'];
            let Destination = data['Destination'];
            let Price = data['Price'];
            let Date = data['Date'];
            let Time = data['Time'];
            let TripDetails = data['TripDetails'];

                innerHtml += `
            <li>
                <a data-role="button" data-row-id=${data['id']} href="#RdShowDrivers">
                <h2>${Date} , ${Time}</h2>
                <p>Origin: ${Origin}</p>
                <p>Destination: ${Destination} @ $${Price}</p>
                <p>Trip Details: ${TripDetails}</p>
                <a href="#RdTripEdit" data-row-id=${data['id']} data-rel="content" data-position-to="window"></a>
                </a>
            </li>`;


            let listView = $('#lstRdViewPost');
            listView = listView.html(innerHtml);
            listView.listview('refresh');
            listView.on("click", "a", clickHandler);

            function clickHandler() {
                localStorage.setItem("RdPost_Id", $(this).attr("data-row-id") );
            }
        }
    }
}
function RdPostById(){
    $('#frmRdTripEdit')[0].reset();
    let options = [localStorage.getItem("RdPost_Id")];
    rider_post.select(options,callback);
    function callback(tx, results) {
        console.info("Success: Post details selected successfully");
        let data = results.rows[0];
        let Origin = data['Origin'];
        let Destination = data['Destination'];
        let Price = data['Price'];
        let Date = data['Date'];
        let Time = data['Time'];
        let TripDetails = data['TripDetails'];

        $('#txtOriginRdEdit').val(Origin);
        $('#txtDestRdEdit').val(Destination);
        $('#numPriceRdEdit').val(Price);
        $('#dtDateRdEdit').val(Date);
        $('#dtTimeRdEdit').val(Time);
        $('#txtTripDtlsRdEdit').val(TripDetails);

    }
}
function frmRdTripEdit(){
    var id = localStorage.getItem("RdPost_Id");

    if(isValid_frmRdTripEdit()){

        let Origin = $('#txtOriginRdEdit').val();
        let Destination = $('#txtDestRdEdit').val();
        let Price = $('#numPriceRdEdit').val();
        let Date = ($('#dtDateRdEdit').val());
        let Time = $('#dtTimeRdEdit').val();
        let TripDetails = $('#txtTripDtlsRdEdit').val();
        var tripData = new C_Rider(Origin, Destination, Price, Date, Time, TripDetails)
        rider_post.update(id,tripData);
        $.mobile.changePage($('#RdTripPosted'));
    }else{
        console.log("Form not valid");
    }
}
function btnDeleteRd(){
    var options =[localStorage.getItem('RdPost_Id')]
    rider_post.delete(options);
    $.mobile.changePage($('#RdTripPosted'));
}
function ShowRdSchedule(){
    let id = localStorage.getItem("RdSchPost_Id");
    riderSch_post.selectAll([],callback);
    function callback(tx, results) {
        console.info("Success: All Posts selected successfully");
        for (let i = 0; i < results.rows.length; i++) {
            let data = results.rows[i];
            let Day = data['Day'];
            let Origin = data['Origin'];
            let Destination = data['Destination'];
            let Price = data['Price'];
            let IsReturn = data['IsReturn'];
            let Time = data['Time'];
            let Return = data['Return'];
            let TripDetails = data['TripDetails'];

            let innerHtml="";

            if (IsReturn === 'True') {
                innerHtml += `
            <li>
                <a data-role="button" data-row-id=${Day} href="#">
                <h2>${Day}</h2>
                <p>Origin: ${Origin}</p>
                <p>Destination: ${Destination} @ $${Price}</p>
                <p>Time: ${Time}       Return: ${Return} </p>
                <p>Trip Details: ${TripDetails}</p>
                <a href="#RdScheduleEdit" data-row-id=${Day} data-rel="content" data-position-to="window"></a>
                </a>
            </li>`;
            } else {
                innerHtml += `
            <li>
                <a data-role="button" data-row-id=${Day} href="#">
                <h2>${Day}</h2>
                <p>Origin: ${Origin}</p>
                <p>Destination: ${Destination} @ $${Price}</p>
                <p>Time: ${Time} </p>
                <p>Trip Details: ${TripDetails}</p>
                <a href="#RdScheduleEdit" data-row-id=${Day} data-rel="content" data-position-to="window"></a>
                </a>
            </li>`;
            }
            var lstDay;
            switch (Day) {
                case 'Sunday':
                    lstDay = $('#lstRdSun');
                    lstDay = lstDay.html(innerHtml);
                    lstDay.listview('refresh');
                    break;
                case 'Monday':
                    lstDay = $('#lstRdMon');
                    lstDay = lstDay.html(innerHtml);
                    lstDay.listview('refresh');
                    break;
                case 'Tuesday':
                    lstDay = $('#lstRdTue');
                    lstDay = lstDay.html(innerHtml);
                    lstDay.listview('refresh');
                    break;
                case 'Wednesday':
                    lstDay = $('#lstRdWed');
                    lstDay = lstDay.html(innerHtml);
                    lstDay.listview('refresh');
                    break;
                case 'Thursday':
                    lstDay = $('#lstRdThu');
                    lstDay = lstDay.html(innerHtml);
                    lstDay.listview('refresh');
                    break;
                case 'Friday':
                    lstDay = $('#lstRdFri');
                    lstDay = lstDay.html(innerHtml);
                    lstDay.listview('refresh');
                    break;
                case 'Saturday':
                    lstDay = $('#lstRdSat');
                    lstDay = lstDay.html(innerHtml);
                    lstDay.listview('refresh');
                    break;
                default:
                    lstDay = $('#lstRdSun');
            }
            lstDay.on("click", "a", clickHandler);
            function clickHandler() {
                localStorage.setItem("RdSchPost_Id", $(this).attr("data-row-id"));
            }
        }
    }
}
function RdSchById(){
    let options = [localStorage.getItem("RdSchPost_Id")];
    riderSch_post.select(options,callback);
    function callback(tx, results) {
        console.info("Success: Post details selected successfully");
        let data = results.rows[0];
        let Origin = data['Origin'];
        let Destination = data['Destination'];
        let Price = data['Price'];
        let IsReturn = data['IsReturn'];
        let Time = data['Time'];
        let Return = data['Return'];
        let TripDetails = data['TripDetails'];

        $('#txtOriginRdSch').val(Origin);
        $('#txtDestRdSch').val(Destination);
        $('#numPriceRdSch').val(Price);
        $('#dtTimeRdSch').val(Time);
        $('#txtTripDtlsRdSch').val(TripDetails);

        if(IsReturn === 'true'){
            $('#radSingleRd').prop('checked', false);
            $('#radReturnRd').prop('checked', true);
            $('#dtTimeRdReturn').show();
            $('#dtTimeRdReturnSch').val(Return);
        }else{
            $('#radSingleRd').prop('checked', true);
            $('#radReturnRd').prop('checked', false);
            $('#dtTimeRdReturn').hide();
        }
    }
}
function frmRdSchEdit(){
    var id = localStorage.getItem("RdSchPost_Id");

    if(isValid_frmRdSchEdit()){
        let Day = id;
        let Origin = $('#txtOriginRdSch').val();
        let Destination = $('#txtDestRdSch').val();
        let Price = $('#numPriceRdSch').val();
        let IsReturn = RadioBoxStatus();
        let Time = $('#dtTimeRdSch').val();
        let Return = $('#dtTimeRdReturnSch').val();
        let TripDetails = $('#txtTripDtlsRdSch').val();
        var tripData = new C_RiderSch(Day,Origin, Destination, Price, IsReturn, Time, Return, TripDetails)
        riderSch_post.update(id, tripData);
        $.mobile.changePage($('#RdSchedule'));
    }else{
        console.log("Form not valid");
    }
}
function DeleteRdSchedule(){
    var id = localStorage.getItem("RdSchPost_Id");

    let Day = id;
    let Origin = "";
    let Destination = "";
    let Price = "";
    let IsReturn = "false";
    let Time = "";
    let Return = "";
    let TripDetails = "";
    var tripData = new C_RiderSch(Day,Origin, Destination, Price, IsReturn, Time, Return, TripDetails)
    riderSch_post.update(id, tripData);
    $.mobile.changePage($('#RdSchedule'));
}
function RdShowDrivers(){
    $('#lstRdDrivers').html("");
    let options = [localStorage.getItem("RdPost_Id")];
    rider_post.select(options,callback);
    function callback(tx, results) {
        console.info("Success: Rider Details selected successfully");
        let data = results.rows[0];
        let OriginRd = data['Origin'];
        let DestinationRd = data['Destination'];
        let DateRd = data['Date'];

        driver_post.selectAll([],callback2);
        function callback2(tx, results) {
            console.info("Success: Driver Details selected successfully");
            let innerHtml="";
            for (let i = 0; i < results.rows.length; i++) {
                let data = results.rows[i];
                let Origin = data['Origin'];
                let Destination = data['Destination'];
                let Price = data['Price'];
                let Date = data['Date'];
                let Time = data['Time'];
                let TripDetails = data['TripDetails'];
                console.log(Origin , Date);
                let innerHtml="";
                innerHtml += `
                                    <li>
                                    <a data-role="button">
                                    <h2>${Date} , ${Time}</h2>
                                    <p>Origin: ${Origin}</p>
                                    <p>Destination: ${Destination} @ $${Price}</p>
                                    <p>Trip Details: ${TripDetails}</p>
                                    </a>
                                    </li>`;


                let listView = $('#lstRdDrivers');
                listView = listView.html(innerHtml);
                listView.listview('refresh');
                if(OriginRd === Origin && DestinationRd === Destination && DateRd === Date){

                }
                else{
                    console.log('No record Found');
                }

            }
        }
    }
}

//IDK PAGES
function HomePageLink(){
    $.mobile.changePage($('#HomePage'));
}
function UserProfileLink(){
    $.mobile.changePage($('#UserProfile'));
    let id = localStorage.getItem("id");
    let options = [id];
    user.select(options,callback);
    function callback(tx, results) {
        let data = results.rows[0];
        if(data['Image']==='undefined'){
            $('#UPImg').prop('src', 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg');
        }else{
            $('#UPImg').prop('src',data['Image']);
        }
        $("#txtFirstNameUP").val(data['FirstName']);
        $("#txtLastNameUP").val(data['LastName']);
        $("#txtEmailUP").val(data['Email']);
        $("#numPhoneUP").val(data['Phone']);
        $("#txtUserName_UP").val(data['Username']);
        $('.username-change').html(data['FirstName']);
    }
}
function ClearDatabase(){
    DB.dropTables();
    console.log("tables dropped");
}