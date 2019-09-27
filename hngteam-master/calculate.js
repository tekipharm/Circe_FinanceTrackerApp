function calulate(){
    //let financetitle=document.getElementById('finance-record-title').value;
    //let financedescription=document.getElementById('finance-record-description').value;
    //let financedate=document.getElementById('finance-record-date').value;
    let financeamt=document.getElementById("finance-record-amt");
    let financeamt2=document.getElementById("finance-record-amt2");
    value1=financeamt.value;
    value2=financeamt2.value;
    total= Number(value1) +  Number(value2);
    document.getElementById('result').value=total;
    document.getElementById('price').value=total;

    


   




    


}

