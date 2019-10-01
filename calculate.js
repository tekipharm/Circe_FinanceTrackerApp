function calulate(){
    
    let financeamt=document.getElementById("finance-record-amt");
    let financeamt2=document.getElementById("finance-record-amt2");
    value1=financeamt.value;
    value2=financeamt2.value;
    total= Number(value1) +  Number(value2);
    document.getElementById('result').value=total;
   
    
    
}

