
$(document).ready(function () {
    Page.Init();
 
});

let Page = {
    Init: function () {
        Page.Handler();
        Page.Clear();
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

        
    },
    Clear: function () {
    //    document.getElementsByClassName("Form-control").val = "";
    //    document.getElementsById("input_lastname").val = "";

        $("body :input").val(""); //body etiketinenin içerisindeki tüm inputlarını al, valuelarına boş atama yap. (Clear)
        $("#input_username").focus();
    }

}


let User = {
    Register: function () {
        let user = {

            Name: $("#input_username").val(),
            Lastname: $("#input_lastname").val(),
            Username: $("#input_nickname").val(),
            Phone: $("#input_phone").val(),
            Birthday: $("#input_birthday").val(),
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
            Utility.WriteLog(res);
        })

    }
}


let Utility = {
    WriteLog: function (log) {
        console.log(log);
    }
}

console.log("Register javascript loaded.");

//$(document).on("click", "#btn_clear", function (e) {
//    console.log("Clear button clicked.");
//});