$(document).ready(function(){

    $.getJSON("http://localhost:3000/candidate/fetchallgmail",function(data){
        $.each(data,function(index,item){
            $('#email').append($('<option>').text(item.email))
        })
    })

    
    })
