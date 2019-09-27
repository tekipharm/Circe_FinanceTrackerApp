function signup(){
    let firstname=document.forms.myform.firstname.value;
    let lastname=document.forms.myform.lastname.value;
    let email=document.forms.myform.email.value;
    let password1=document.forms.myform.password1.value;
    let password2=document.forms.myform.password2.value;

   
    if(firstname=="" ){
        let error1=document.getElementById('invalidpassword');
         error1.style.display="block";
         event.preventDefault();
    return false;
    };
    if(lastname==""){
        let error2=document.getElementById('invalidlastname');
        error2.style.display="block";
        event.preventDefault();
        return false;
      
    };
    if(password1=="" || password1< 4){
        let error3=document.getElementById('invalidpassword1');
        error3.style.display="block";
        event.preventDefault();
        return false;
      
    };

    if(password1 !== password2){
        let error3=document.getElementById('invalidpassword2');
        error3.style.display="block";
        event.preventDefault();
        return false;

    }
    if(email==""){
        let error4=document.getElementById('invalidemail');
        error4.style.display="block";
        event.preventDefault();
        return false;
      

    }


    };
