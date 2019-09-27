function login(){
    let email=document.forms.myform.email.value;
    let password1=document.forms.myform.password1.value;

   
    
    if(email==""){
        let error4=document.getElementById('invalidemail');
        error4.style.display="block";
        event.preventDefault();
        return false;
      

    }

    if(password1=="" || password1< 4){
        let error3=document.getElementById('invalidpassword1');
        error3.style.display="block";
        event.preventDefault();
        return false;
      
    };



    }
;
