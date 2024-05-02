
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
            User.Login();
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
    Login: function () {

      
        let userLogin = {
            
            Username: $("#input_username").val(),           
            Password: $("#input_password").val()
        
        };
    
        Utility.WriteLog(userLogin);


        //Client ve server arasındaki haberleşmeyi asenkron bir şekilde ajax (asenkron javascript) sağlar.
        $.ajax({
            type: "POST",
            data: JSON.stringify(userLogin),
            url: "/user/login",
            contentType: "application/json",
            async: true

        }).done(function (res) {
            Utility.WriteLog(res);
            res == true ? Utility.WriteInfo("Login Başarılı",true) : Utility.WriteInfo("Lütfen tekrar deneyiniz.",false);
        })

    }
}


let Utility = {
    WriteLog: function (log) {
        console.log(log);
    },
    WriteInfo: function (info) {
        document.getElementById("span-warning").innerHTML = info;
       // $("#span_warning").html(info); //Yukarıdakinin aynısının jquery ile yazılışı
    }
}

console.log("Register javascript loaded.");

//$(document).on("click", "#btn_clear", function (e) {
//    console.log("Clear button clicked.");
//});