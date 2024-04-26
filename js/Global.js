$(document).ready(function(){
    init();
    initDB();
});

function init(){
    $('#lstDays').on("click", "a", clickHandler);
    function clickHandler() {
        localStorage.setItem("DrSchPost_Id", $(this).attr("data-row-id") );
    }
    //LoginPage Change
    $('#btnLoginSubmit').on('click', frmloginValidation);
    $('#ShowPswd').on('click',ShowPasswordLogin);
    $('#signup').on('click',function e(){$.mobile.changePage($('#SignupPage'))});

    //SignUpPage Change
    $('#btnSave').on('click',frmSignUpValidation);
    $('#ShowPswd_SU').on('click',ShowPasswordSignUp);
    $('#btnCancel').on('click',btnCancel);

    //HomePage Change
    $('#imgbackHP1').on('click',function e(){$.mobile.changePage($('#LoginPage'))});
    $('#imgUser1').on('click',UserProfileLink);
    $('#DrivingSelector').on('click', function e(){$.mobile.changePage($('#DrTripDetails'))});
    $('#RidingSelector').on('click', function e(){$.mobile.changePage($('#RdTripDetails'))});

    //UserProfile Change
    $('#UPImg').on('click',capturePhoto);
    $('#imgbackHP2').on('click',HomePageLink);
    $('#btnSaveUP').on('click',frmUserProfileValidation);
    $('#btnCancelUP').on('click',HomePageLink);
    $('#btnClearDb').on('click', ClearDatabase)

    //DriverPage Change

        //DrTripDetails :
    $('#imgbackHP3').on('click',HomePageLink);
    $('#imgUser3').on('click',UserProfileLink);
    $('#btnPostDr').on('click',frmDrTripDetails);
    $('#AddchkBox').change(function e (){ $('#divAddStops').toggle(); });
        //DrTripPosted :
    $('#imgbackHP4').on('click',HomePageLink);
    $('#imgUser4').on('click',UserProfileLink);
    $('#DrTripPosted').on('pageshow', ShowAllDrTrips);
        //DrShowRiders :
    $('#imgbackHP13').on('click',ToDrTripPosted);
    $('#imgUser13').on('click',UserProfileLink);
    $('#DrShowRiders').on('pageshow',DrShowRiders);
        //DrTripEdit :
    $('#DrTripEdit').on('pageshow',DrPostById);
    $('#imgbackHP5').on('click',ToDrTripPosted);
    $('#imgUser5').on('click',UserProfileLink);
    $('#btnDeleteDr').on('click', btnDeleteDr);
    $('#btnUpdateDr').on('click', frmDrTripEdit);
    $('#btnCancelDr').on('click', ToDrTripPosted);
    $('#AddchkBoxEdit').change(function e (){ $('#divAddStopsEdit').toggle(); });
        //DrSchedule :
    $('#imgbackHP6').on('click',HomePageLink);
    $('#imgUser6').on('click',UserProfileLink);
        //DrScheduleEdit :
    $('#imgbackHP7').on('click',ToDrSchedule);
    $('#imgUser7').on('click',UserProfileLink);
    $('#DrSchedule').on('pageshow',ShowDrSchedule);
    $('#DrScheduleEdit').on('pageshow',DrSchById);
    $('#btnDeleteDrSch').on('click', DeleteDrSchedule);
    $('#btnUpdateDrSch').on('click', frmDrSchEdit);
    $('#btnCancelDrSch').on('click', ToDrSchedule);
    $('#AddchkBoxSch').change(function e (){ $('#divAddStopsSch').toggle(); });
    $('#radSingleDr').change(function e(){$('#dtTimeDrReturn').hide()});
    $('#radReturnDr').change(function e(){$('#dtTimeDrReturn').show()});

    //RiderPage Change

        //RdTripDetails :
    $('#imgbackHP8').on('click',HomePageLink);
    $('#imgUser8').on('click',UserProfileLink);
    $('#btnPostRd').on('click',frmRdTripDetails);
        //RdTripPosted :
    $('#imgbackHP9').on('click',HomePageLink);
    $('#imgUser9').on('click',UserProfileLink);
    $('#RdTripPosted').on('pageshow', ShowAllRdTrips);
        //RdTripEdit :
    $('#RdTripEdit').on('pageshow',RdPostById);
    $('#imgbackHP10').on('click',function e(){$.mobile.changePage($('#RdTripPosted'))});
    $('#imgUser10').on('click',UserProfileLink);
    $('#btnDeleteRd').on('click', btnDeleteRd);
    $('#btnUpdateRd').on('click', frmRdTripEdit);
    $('#btnCancelRd').on('click', ToRdTripPosted);
        //RdShowDrivers :
    $('#imgbackHP14').on('click',ToRdTripPosted);
    $('#imgUser14').on('click',UserProfileLink);
    $('#RdShowDrivers').on('pageshow',RdShowDrivers);
        //RdSchedule :
    $('#imgbackHP11').on('click',HomePageLink);
    $('#imgUser11').on('click',UserProfileLink);
        //RdScheduleEdit :
    $('#imgbackHP12').on('click',ToRdTripPosted);
    $('#imgUser12').on('click',UserProfileLink);
    $('#RdSchedule').on('pageshow',ShowRdSchedule);
    $('#RdScheduleEdit').on('pageshow',RdSchById);
    $('#btnDeleteRdSch').on('click', DeleteRdSchedule);
    $('#btnUpdateRdSch').on('click', frmRdSchEdit);
    $('#btnCancelRdSch').on('click', btnCancelRdSch);
    $('#radSingleRd').change(function e(){$('#dtTimeRdReturn').hide()});
    $('#radReturnRd').change(function e(){$('#dtTimeRdReturn').show()});
}
function initDB(){
    try{
        DB.createDatabase();
        if(db){
            console.info("creating Table");
            DB.createTables();
            driverSch_post.insertData();
            riderSch_post.insertData();
        }
        else{
            console.error("Error while opening the database");
        }
    }
    catch (error){
        console.error("ERRORS :"+error);
    }
}
function ShowPasswordLogin(){
    let txtPswd = $('#txtPswd');
    if(txtPswd.attr("type") ==="password"){
          txtPswd.attr("type","text");
       }else{
           txtPswd.attr("type","password");
       }
}
function ShowPasswordSignUp(){
    let txtPswd_SU = $('#txtPswd_SU');
    let txtVerifyPswd_SU = $('#txtVerifyPswd_SU');
    if(txtPswd_SU.attr("type")==="password" && txtVerifyPswd_SU.attr("type")==="password" ){
        txtPswd_SU.attr("type","text");
        txtVerifyPswd_SU.attr("type","text");
    }else{
        txtPswd_SU.attr("type","password");
        txtVerifyPswd_SU.attr("type","password");
    }
}
function btnCancel(){
    $.mobile.changePage($('#LoginPage'));
    $('#frmSignup')[0].reset();
}
function ToDrTripPosted(){
   $.mobile.changePage($('#DrTripPosted'));
}
function ToDrSchedule(){
    $.mobile.changePage($('#DrSchedule'));
}
function ToRdTripPosted(){
    $.mobile.changePage($('#RdTripPosted'));
    $('#frmRdTripEdit')[0].reset();
}
function btnCancelRdSch(){
    $.mobile.changePage($('#RdSchedule'));
    $('#frmRdSchEdit')[0].reset();
}
function capturePhoto() {
        var image = $("#UPImg");
        image.prop("src",'http://localhost:63342/Index.html/css/lib/images/Logo.png');
}
