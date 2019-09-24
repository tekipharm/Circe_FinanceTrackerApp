// Class to define each finance data object

class Finances{
    constructor(id, title, amount, items, description, timeStamp){
        this.id = id,  //Plan to use Date.now();
        this.title = title;
        this.amount = amount;
        this.items = items; //An array of items
        this.description = description;
        this.timeStamp = timeStamp; //Date Object
    }

    calcWeekNo() {
        let dt = timeStamp;
        var tdt = new Date(dt.valueOf());
        var dayn = (dt.getDay() + 6) % 7;
        tdt.setDate(tdt.getDate() - dayn + 3);
        var firstThursday = tdt.valueOf();
        tdt.setMonth(0, 1);
        if (tdt.getDay() !== 4) {
            tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
        }
        //604800000 is 1 week in milliseconds
        return 1 + Math.ceil((firstThursday - tdt) / 604800000);
    }

    get weekNo(){
        return this.calcWeekNo();
    }

    calcMonth(){
        let  finMonth = '';
        const monthIndex = timeStamp.getMonth();
        const monthIndexValue ={
            'January': 1,
            'February': 2,
            'March': 3,
            'April': 4,
            'May': 5,
            'June': 6,
            'July': 7,
            'August': 8,
            'September': 9,
            'October': 10,
            'November': 11,
            'December': 12
        }

        for (let key in monthIndexValue) {
            if (monthIndex == monthIndexValue[key]) {
                finMonth = key;
            }
        }

        return finMonth;
    }

    get month(){
        return this.calcMonth();
    }

    get year(){
        return timeStamp.getFullYear();
    }
}

//USing MVC wmake codes to be better structured even while using pure vanilla JS

//Model that stores our finance data
const model = {
    // finances = [ ],
    // selectedFinanceData = null //This is for the data one wants to edit or delete.
}

//Controller is made to communicate between Model and View

    //So basically, we add finance and it's documented as liability or income.
const controler = {
    init: () =>{
        model.finances = [ ],
        model.selectedFinanceData = null
    },

    addNewFinanceData: (data) =>{
        // Add finance data to the model . Data should belong to class Finances
        model.finances.push(data);
    },

    updateFinanceData: (newData) =>{
        this.financeData = model.selectedFinanceData;
        this.financeData.title = newData.title;
        this.financeData.amount = newData.amount;
        this.financeData.items = newData.items;
        this.financeData.description = newData.description;
        this.financeData.timeStamp = newData.timeStamp;
    },

    deleteFinanceData: (currentData) =>{
        //For...loop is long
        model.finances.forEach((element,i) => {
            if (element.id  == currentData.id) {
                //Remove the record
                model.finances.splice(i, 1);
                // set selectData to null 
                model.selectedFinanceData = null;
            }
        });        
    },

    getFinanceData: () => {
        return model.finances;
    },

    setSelectFinData: (finData) => {
        model.selectedFinanceData = finData;
    },

    getSelectFinData: () => {
       return model.selectedFinanceData;
    }
}

controler.init();