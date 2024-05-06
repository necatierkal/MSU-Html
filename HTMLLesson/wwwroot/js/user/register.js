
let validation = -1;
let captchaControl = null;

$(document).ready(function () {
    Page.Init();
 
});

let Page = {
    Init: function () {
        Page.Handler();
        Page.Clear();
        Utility.RefreshCaptcha();
    },
    Handler: function () {
        $(document).on("click", "#btn_cancel", function (e) {
            history.back(); //Javascript metodudur. 1 geriye gelir. İçerisine rakam belirtirsek o kadar geriye gelir.
        });
        $(document).on("click", "#btn_clear", function (e) {
            Page.Clear();
        });
        $(document).on("click", "#btn_save", function (e) {
            User.Register();
        });
        $(document).on("click", "#spn_refreshCaptcha", function (e) {
            Utility.RefreshCaptcha();
        });
        $(document).on("click", "#btn_test", function (e) {
            Utility.CaptchaControl();
        });

        
    },
    Clear: function () {
    //    document.getElementsByClassName("Form-control").val = "";
    //    document.getElementsById("input_lastname").val = "";

        $("body :input").val(""); //body etiketinenin içerisindeki tüm inputlarını al, valuelarına boş atama yap. (Clear)
        $("#input_username").focus();
        Utility.RefreshCaptcha();
    },
    ClearValidation: function () {
        $("body :input").css("border-color", "#ced4da");
        $("div").css("border-color", "#ced4da");      
    }

}


let User = {

    Validate: function () {
        Page.ClearValidation();
        if ($("#input_username").val() == "") validation = 1;
        else if ($("#input_phone").val() == "") validation = 2;
        else if ($("#input_password").val() == "") validation = 3;
        else if ($("#input_password").val() != $("#input_cpassword").val()) validation = 4;
        else if (!Utility.CaptchaControl()) validation = 5;
        return validation == -1 ? false : true;
    },

    Register: function () {
              

        if (User.Validate())
        {
            //Utility.WriteLog("Validation failed(Passwords are not same)!")
            //Utility.WriteInfo("Parolalar eşleşmiyor.", false)
            Utility.WriteError();
            //Utility.WriteInfo("Hata"!!);
            validation = -1;
            return false;
        }

      
        let user = {

            Name: $("#input_username").val(),
            Lastname: $("#input_lastname").val(),
            Username: $("#input_nickname").val(),
            Phone: $("#input_phone").val(),
            Birthday: $("#input_birthday").val() == "" ? null : $("#input_birthday").val(), //Utility.ToTurkishDate("input_birthday"),
            Email: $("#input_email").val(),
            Password: $("#input_password").val(),
            Address: $("#input_address").val()
        };
    
        Utility.WriteLog(user);


        //Client ve server arasındaki haberleşmeyi asenkron bir şekilde ajax (asenkron javascript) sağlar.
        $.ajax({
            type: "POST",
            data: JSON.stringify(user),
            url: "/user/register",
            contentType: "application/json",
            async: true

        }).done(function (res) {
            //Utility.WriteLog(res);
            Utility.WriteSuccess("New User created with Id:'" + res + "'");
            $("#input_name").val(res.Name);
            //Utility.WriteInfo("Confirmation is true!", true);
        })

    }
}


let Utility = {
    WriteLog: function (log) {
        console.log(log);
    },//,
    //ToTurkishDate: function () {
    //    var dateInp = document.getElementById("input_birthday").value;
    //    var selDate = new Date(dateInp);
    //    //var formattedDate = selDate.toLocaleDateString("tr-TR");

    //    //Utility.WriteLog(formattedDate);
    //    //alert(formattedDate);
    //    return selDate.toLocaleDateString('tr-TR');
    //}
    WriteInfo: function (info) {
        $("#spn_warning").html(info).css("color","#008000");//.css("border","1px");
        // $("#span_warning").html(info); //Yukarıdakinin aynısının jquery ile yazılışı
    },
    WriteSuccess: function (info) {
        $("#spn_warning").html(info).css("color","#008000");
    },
    MakeRed: function ($elem) {
        $($elem).each(function (index, $element) {
            $element.css("border", "1px solid red");
            if (index == 1 || $elem.length==1) $element.focus();
        });
    },
    WriteError: function (info = null) {
        switch (validation) {
            case 1:
                info = "Username is required!";
                Utility.MakeRed([$("#div_username"),$("#input_name")]);
                break;
            case 2:
                info = "Phone is required!";
                Utility.MakeRed([$("#div_phone"), $("#input_phone")]);
                break;
            case 3:
                info = "Password is required!";
                Utility.MakeRed([$("#div_password"), $("#input_password")]);
                break;
            case 4:
                info = "Password confirmation is not same!";
                Utility.MakeRed([$("#div_password"), $("#input_password"), $("#div_cpassword"), $("#input_cpassword")]);
                break;
            case 5:
                info = "Captcha control is invalid!"
                Utility.MakeRed([$("#input_captcha")]);
                break;
             
            default:
                Utility.WriteSuccess("New user info was sent to save");
                break;
        }
    
        //if ($elem != null) {
        //    $.each($elem,function(index,$elem))
        //}

          $("#spn_warning").html(info).css("color","red");
        // $("#span_warning").html(info); //Yukarıdakinin aynısının jquery ile yazılışı
    },

    Randomizer: function (startValue=0,endValue=10) {
        //let randomValue = Math.floor(Math.random())  
        return startValue + Math.floor(Math.random() * (endValue - startValue));
         
    },
    RefreshCaptcha: function () {
        // $("spn_captcha").html(Utility.Randomizer(25,35));
        let x = Utility.Randomizer();
        let y = Utility.Randomizer();
        let randomProcess = Utility.Randomizer(0, 3);
        let captcha = "  | ";
        if (y > x) {
            let temp = x;
            x = y;
            y = temp;
        };
        switch (randomProcess) {
            case 0:
                captchaControl = x + y;
                captcha += x + "+" + y;
                break;
            case 1:
                captchaControl = x - y;
                captcha += x + "-" + y;
                break;
            case 2:
                captchaControl = x * y;
                captcha += x + "*" + y;
                break;
            default:
                break;
        };
        $("#spn_captcha").html(captcha);

    },
    CaptchaControl: function () {
        let userInput = document.getElementById("input_captcha").value;
        let result = captchaControl == userInput ? true : false;
       
        return result;
    }
 

}

console.log("Register javascript loaded.");

//$(document).on("click", "#btn_clear", function (e) {
//    console.log("Clear button clicked.");
//});