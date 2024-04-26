function isValid_frmlogin(){
    $('#frmlogin').validate({rules:{
            txtUsername:{
                required:true,
            },
            txtPswd:{
                required:true,
            },

            messages:{
                txtUsername:{
                    required:"Please enter your username",
                },
                txtPswd: {
                    required:"Please enter your password",
                }
            }
        }});
    return $('#frmlogin').valid();
}
function isValid_frmSignup(){
    $('#frmSignup').validate({rules:{
            txtFirstName:{
                required:true
            },
            txtLastName:{
                required:true
            },
            txtEmail:{
                required:true,
                email:true
            },
            numPhone:{
                required:true,
                minlength:10,
                maxlength:10,
            },
            txtUserName_SU:{
                required:true
            },
            txtPswd_SU:{
                required:true,
                fn_password:true
            },
            txtVerifyPswd_SU:{
                required:true,
                equalTo:$("#txtPswd_SU")
            },
            Terms:{
                required:true
            },
            messages:{
                txtFirstName:{
                    required:true
                },
                txtLastName:{
                    required:true
                },
                txtEmail:{
                    required:true,
                    email:true
                },
                numPhone:{
                    required:true,
                    minlength:true,
                    maxlength: true
                },
                txtUserName_SU:{
                    required:true
                },
                txtPswd_SU:{
                    required:true,
                    fn_password: true
                },
                txtVerifyPswd_SU:{
                    equalTo:"Please enter the same password as above"
                },
                Terms:{
                    required:"Please confirm the terms and condition"
                }
            }
        }});
    return $('#frmSignup').valid();
}
function isValid_frmUserProfile(){
    $('#frmUserProfile').validate({rules:{
            txtFirstNameUP:{
                required:true
            },
            txtLastNameUP:{
                required:true
            },
            txtEmailUP:{
                required:true,
                email:true
            },
            numPhoneUP:{
                required:true,
                minlength:10,
                maxlength:10,
            },
            txtUserName_UP:{
                required:true
            },
        }});
    return $('#frmUserProfile').valid();
}
function isValid_frmDrTripDetails(){
    $('#frmDrTripDetails').validate({rules:{
            txtOriginDr:{
                required:true,
            },
            txtDestDr:{
                required:true,
            },
            numPriceDr:{
                required:true,
            },
            txtStop1:{
                required:true,
            },
            txtPrice1:{
                required:true,
            },
            dtDateDr:{
                required:true,
                fn_isFutureDate:true
            },
            dtTimeDr:{
                required:true,
            },
            txtTripDtlsDr:{
                required:true,
            }
    }});
    return $('#frmDrTripDetails').valid();
}
function isValid_frmDrTripEdit(){
    $('#frmDrTripEdit').validate({rules:{
            txtOriginDrEdit:{
                required:true,
            },
            txtDestDrEdit:{
                required:true,
            },
            numPriceDrEdit:{
                required:true,
            },
            txtEditStop1:{
                required:true,
            },
            txtEditPrice1:{
                required:true,
            },
            dtDateDrEdit:{
                required:true,
                fn_isFutureDate:true
            },
            dtTimeDrEdit:{
                required:true,
            },
            txtTripDtlsDrEdit:{
                required:true,
            }
        }});
    return $('#frmDrTripEdit').valid();
}
function isValid_frmDrSchEdit(){
    $('#frmDrSchEdit').validate({rules:{
            txtOriginDrSch:{
                required:true,
            },
            txtDestDrSch:{
                required:true,
            },
            numPriceDrSch:{
                required:true,
            },
            txtSchStop1:{
                required:true,
            },
            txtSchPrice1:{
                required:true,
            },
            dtDateDrSch:{
                required:true,
            },
            dtTimeDrSch:{
                required:true,
            },
            txtTripDtlsDrSch:{
                required:true,
            }
        }});
    return $('#frmDrSchEdit').valid();
}
function isValid_frmRdTripDetails(){
    $('#frmRdTripDetails').validate({rules:{
            txtOriginRd:{
                required:true,
            },
            txtDestRd:{
                required:true,
            },
            numPriceRd:{
                required:true,
            },
            dtDateRd:{
                required:true,
                fn_isFutureDate:true
            },
            dtTimeRd:{
                required:true,
            },
            txtTripDtlsRd:{
                required:true,
            }
        }});
    return $('#frmRdTripDetails').valid();
}
function isValid_frmRdTripEdit(){
    $('#frmRdTripEdit').validate({rules:{
            txtOriginRdEdit:{
                required:true,
            },
            txtDestRdEdit:{
                required:true,
            },
            numPriceRdEdit:{
                required:true,
            },
            dtDateRdEdit:{
                required:true,
                fn_isFutureDate:true
            },
            dtTimeRdEdit:{
                required:true,
            },
            txtTripDtlsRdEdit:{
                required:true,
            }
        }});
    return $('#frmRdTripEdit').valid();
}
function isValid_frmRdSchEdit(){
    $('#frmRdSchEdit').validate({rules:{
            txtOriginRdSch:{
                required:true,
            },
            txtDestRdSch:{
                required:true,
            },
            numPriceRdSch:{
                required:true,
            },
            dtDateRdSch:{
                required:true,
            },
            dtTimeRdSch:{
                required:true,
            },
            txtTripDtlsRdSch:{
                required:true,
            }
        }});
    return $('#frmRdSchEdit').valid();
}

jQuery.validator.addMethod("fn_password",function (value,element)    {
        var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{8,}$)");
        return regex.test(value);
    }, 'Password should contain at least \n one digit, \n  one lower case, \n  one upper case, \n( ! @ # $ % & * _ ) any of the 8 special characters mentioned');

jQuery.validator.addMethod("fn_isFutureDate", function(value,element){
    const currentDate = new Date();
    const inputDate = new Date(Date.parse(value));
    return inputDate > currentDate;

}, "Please select valid date. Can not be past date");
