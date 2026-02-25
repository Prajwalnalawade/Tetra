if(document.getElementById('date')!=null)
{    
    document.getElementById('date').innerHTML=(String(new Date())).slice(0,15);
}

function search(){
    if(document.getElementById('input_search').value!="")
    {   if(find(document.getElementById('input_search').value)==false)
       {
           alert("Not found ...!")
       }
       else{
           window.find(document.getElementById('input_search'))
       }
    }
   }

function openForm() {
    window.open("./login.html","_self");
  }
  
(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-200px');
        }
    });
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


})(jQuery);



if(localStorage.getItem("subscriber")!=undefined)
{  
    if(document.getElementById("sub1")!=null)
    {
     document.getElementById("sub1").remove()
    }
     document.getElementById("sub2").remove()
}
