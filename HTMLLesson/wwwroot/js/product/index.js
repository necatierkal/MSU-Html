console.log("Product/Index javascript loaded.");

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
        $(document).on("click", "#input_getProducts", function (e) {
            Product.GetProducts();
        });
   
        
    },
    Clear: function () {
    //    document.getElementsByClassName("Form-control").val = "";
    //    document.getElementsById("input_lastname").val = "";

        //$("body :input").val(""); //body etiketinenin içerisindeki tüm inputlarını al, valuelarına boş atama yap. (Clear)      
    
    }  

}


let Product = {

    GetProducts: function () {
              
        //Client ve server arasındaki haberleşmeyi asenkron bir şekilde ajax (asenkron javascript) sağlar.
        $.ajax({
            type: "GET",        
            url: "http://localhost:22437/api/Products",
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



//$(document).on("click", "#btn_clear", function (e) {
//    console.log("Clear button clicked.");
//});