// Class to define each finance data object

class Finances{
    constructor(name, amount, financeType, description, timeStamp){
        this.name = name;
        this.amount = amount;
        this.financeType = financeType;
        this.description = description;
        this.timeStamp = timeStamp;
    }
}

//USing MVC wmake codes to be better structured even while using pure vanilla JS

//Model that stores our finance data
const model ={
    finances=[],
    selectedFinanceData = null //This is for the data one wants to edit or delete.
}

//Controller is made to communicate between Model and View

    //So basically, we add finance and it's documented as liability or income.