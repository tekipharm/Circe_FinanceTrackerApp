// Class to define each finance data object

class Finances{
    constructor(id, title, amount, items, description, dataStamp){
        this.id = id,  //Plan to use Date.now();
        this.title = title;
        this.amount = amount;
        this.items = items; //An array of items
        this.description = description;
        this.dataStamp = dataStamp; //Date Object
    }

    calcWeekNo() {
        let dt = dataStamp;
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
        const monthIndex = dataStamp.getMonth();
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
        return dataStamp.getFullYear();
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
const controller = {
    init: () =>{
        model.finances = [ ],
        model.selectedFinanceData = null

        if(localStorage.cicre_finance){
            controller.convertLocalToModel();
        }

        view.init();
    },

    addNewFinanceData: (data) =>{
        // Add finance data to the model . Data should belong to class Finances
        model.finances.push(data);

        //Update in Local Storage
        controller.addDataToLocal();  
    },

    updateFinanceData: (newData) =>{
        this.financeData = model.selectedFinanceData;
        this.financeData.title = newData.title;
        this.financeData.amount = newData.amount;
        this.financeData.items = newData.items;
        this.financeData.description = newData.description;
        this.financeData.dataStamp = newData.dataStamp;

        //Update in Local Storage
        controller.addDataToLocal();    
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
        controller.addDataToLocal();    
    },

    getFinanceData: () => {
        return model.finances;
    },

    setSelectFinData: (finData) => {
        model.selectedFinanceData = finData;
    },

    getSelectFinData: () => {
       return model.selectedFinanceData;
    },

    addDataToLocal: () =>{
        //Clear all old data
        localStorage.clear()

        // then add these
        // const obj = model;
        console.log('model', model);
        const obj = JSON.stringify(model);
        console.log('obj', obj);
        localStorage.setItem('cicre_finance', obj);
        console.log('Moved in', localStorage);
    },

    convertLocalToModel: function(){
        //This function is only called when we have the same data, so all we need to do is get the stored data and render.
        if(localStorage.cicre_finance){
            const modelObj = JSON.parse(localStorage.getItem('cicre_finance'));
            console.log('modelObj', modelObj);
            for (const key in model) {
                model[key] = modelObj[key];
            }
            console.log('Model', model);
        } else{
            //Not in storage
            // controller.defaultSelectedLang();
            console.log('%cError' + '%c No set Language in Local Storage', "background-color: red; color: white", "color: red");
        }
    }
}

const view = {
    init: ()=>{
        //For Dashboard Add form
        this.financeRecordTitle = document.getElementById('finance-record-title');
        this.financeRecordDescription = document.getElementById('finance-record-description');
        this.financeRecordItems = document.getElementById('finance-record-items');
        this.financeRecordAmt = document.getElementById('finance-record-amt');
        this.financeRecordDate = document.getElementById('finance-record-date');

        const btnAddFinancRec = document.getElementById('submit-finance-record');

        if(btnAddFinancRec){
            btnAddFinancRec.addEventListener('click', function() {
                event.preventDefault();
                const status = view.checkInputsOnAddItemForm();
                if (status == true) {
                    const finData = new Finances(
                        this.id = Date.now(), //For Ever Unique
                        this.title = financeRecordTitle.value,
                        this.description = financeRecordDescription.value,
                        this.amount = financeRecordAmt.value,
                        this.items = financeRecordItems.value,
                        this.dataStamp = new Date(financeRecordDate.value)
                    );

                    console.log(finData);
                    controller.addNewFinanceData(finData);
                    alert('Data successful Added');
                    view.clearInputsOnAddItemForm();
                }
                else{
                    alert('Could not process, Some fields are empty');
                }
            })
        }
    },

    checkInputsOnAddItemForm: () =>{
        //Validation should happen here
        const title = this.financeRecordTitle.value;
        const desc = this.financeRecordDescription.value;
        const items = this.financeRecordItems.value;
        const amt = this.financeRecordAmt.value;
        const recDate = this.financeRecordDate.value;

        //Confirm that all are not equal to false or empty
        if (title.trim() != "" && desc.trim() != "" &&  items.trim() != "" &&  amt.trim() != "" &&  recDate.trim() != "") {
            console.log('Do we have space = no');
            return true;
        }
        console.log('Do we have space = yes');
        return false;
    },

    clearInputsOnAddItemForm: () =>{
        this.financeRecordTitle.value = '';
        this.financeRecordDescription.value = '';
        this.financeRecordItems.value = '';
        this.financeRecordAmt.value = '';
        this.financeRecordDate.value = '';
    }
}

controller.init();