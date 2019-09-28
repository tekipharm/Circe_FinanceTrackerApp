//Each item record of finance app
class Items{
    constructor(itemName, itemAmt){
        this.itemName = itemName;
        this.itemAmt = itemAmt;
    }
}

//Arrannging finance History
class HistoFinances{
    constructor(finObj, week, month, year){
        this.finObj = finObj;
        this.week = week;
        this.month = month;
        this.year = year;
    }
}

// Class to define each finance data object
class Finances{
    constructor(title, amount, items, description, dataStamp){
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
        //Since we are dealing with time, i will return data in time sort.
        return model.finances.sort((a,b)=>
            b.dataStamp - a.dataStamp
        );
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
            modelObj.finances.forEach(f=>f.dataStamp = new Date(f.dataStamp))
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

let rightArticle;

const view = {
    
    init: ()=>{

        //Add Section

        this.itemsList = [];

        //get item amounts
        const getItemAmts = () =>{
            // return $("fieldset#item-list").serializeArray();
            itemsList = [];
            let totalAmt = 0;

            $("#item-list").children('div.item').each(function() {
                const itemName = $(this).find('input[name="item"]')[0].value;
                const itemAmt = $(this).find('input[name="amount"]')[0].value;
                // console.log(this + '- children', itemName);
                // console.log(this + '- children2', itemAmt);
                const itemObj = new Items(itemName, itemAmt);
                // console.log('itemObj', itemObj);

                itemsList.push(itemObj);
            });

            itemsList.forEach(item=>{
                totalAmt +=  +item.itemAmt; //plus converts it to number
            });

            $('#finance-record-total-amt')[0].value = totalAmt;
            // console.log(totalAmt);
        }

        const inputItemChange = () =>{
            //Listen to input item change
            $('input[name="amount"].itemAmt').keyup(getItemAmts);

            //This handles auto suggested values.
            $('input[name="amount"].itemAmt').change(getItemAmts);
        };

        //Create new Item
        const createNewItem = () => {
            const newHTML = `
                <div class="item">
                    <label>
                        Items:
                        <input class="itemName" type="text" name="item" class="finance-record-items" placeholder="e.g Carrot" required>
                    </label>
                    <label>
                        Amount(₦):
                        <input class="itemAmt" type="number" name="amount" id="finance-record-amt" placeholder="6000" min="0" required>
                    </label>
                    <button class="remove-item" title="Remove this item">x</button>
                </div>`;
            $(newHTML).insertAfter('div.item.first-item');
                
            $('button.remove-item').hover(function () {
                // evt.preventDefault();
                // console.log('kkk');
                $(this).parent('div.item').css('box-shadow', '0px 4px 4px rgba(0, 0, 0, 0.5)')
            },
            function () {
                // evt.preventDefault();
                // console.log($(this).parent('div.item'));
                $(this).parent('div.item').attr('style', 'box-shadow :none)')
            });

            //Remove item
            $('button.remove-item').click(function (evt) {
                evt.preventDefault();
                // console.log('kkk');
                $(this).parent('div.item').slideUp(function () {
                $(this).remove();
                getItemAmts();
                });
            });

            //Listen to input item change
            inputItemChange();
        }
      
        //For Dashboard Add form
        this.financeRecordTitle = document.getElementById('finance-record-title');
        this.financeRecordDescription = document.getElementById('finance-record-description');
        this.financeTotalAmt = document.getElementById('finance-record-total-amt');
        this.financeRecordDate = document.getElementById('finance-record-date');
        this.sectFinHistory = document.getElementById('finance-history');
        this.sectFinHistoryList = document.getElementById('finance-history-List');

        const btnAddFinancRec = document.getElementById('submit-finance-record');

        //History Section
        const calcMonth = (dataStamp) => {
            let  finMonth = '';
            const monthIndex = new Date(dataStamp).getMonth();
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
        
        const calcWeekNo = (dataStamp) =>{
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
        
        const calcYear = (dataStamp) =>{
            return dataStamp.getFullYear();
        }
        
        const makehistoFinances = (finance) =>{
            const dataWeekNo = calcWeekNo(finance.dataStamp);
            const dataMonth = calcMonth(finance.dataStamp);
            const dataYear = calcYear(finance.dataStamp);
        
            const hisObj = new HistoFinances(
                this.finObj = finance,
                this.week = dataWeekNo,
                this.month = dataMonth,
                this.year = dataYear
            );
        
            return hisObj;
        }

        this.histOffFinance = [];

        const modelArr = controller.getFinanceData();
        modelArr.forEach(f=> histOffFinance.push(makehistoFinances(f)));

        // console.log('kk', this.histOffFinance);

        const convertDataToWeek = () =>{
            const wk = new Set();
            histOffFinance.map(t => wk.add(t.week));
            const wkArr = Array.from(wk);
        
            let yy = [];
            wkArr.forEach(wk=>{
                const alpha = wk;
                
                let ee = histOffFinance.filter(t => t.week == alpha);
                let ff = ee.map(e=>e.finObj);
                yy.push(new Object({alpha: alpha, val : ff}));
                //console.log(yy);
            });
        
            return yy;
        }
        
        const convertDataToMonth = () =>{
            const mon = new Set();
            histOffFinance.map(t => mon.add(t.month));
            const monArr = Array.from(mon);
        
            let yy = [];
            monArr.forEach(mon=>{
                const alpha = mon;
                
                let ee = histOffFinance.filter(t => t.month == alpha);
                let ff = ee.map(e=>e.finObj);
                yy.push(new Object({alpha: alpha, val : ff}));
                //console.log(yy);
            });
        
            return yy;
        }
        
        const convertDataToYear = () =>{
            const yr = new Set();
            histOffFinance.map(t => yr.add(t.year));
            const yrArr = Array.from(yr);
        
            let yy = [];
            yrArr.forEach(yr=>{
                const alpha = yr;
                
                let ee = histOffFinance.filter(t => t.year == alpha);
                let ff = ee.map(e=>e.finObj);
                yy.push(new Object({alpha: alpha, val : ff}));
                //console.log(yy);
            });
        
            return yy;
        }

        // console.log(convertDataToWeek(),
        // convertDataToMonth(),
        // convertDataToYear());

                //remove class from these buttons
        const removeSel =() =>{
            $('button.viewSelectBtn').removeClass('selected');
        }
        
        //Break finance record into History
        const getForAll = () =>{
            removeSel();
            $('button#view-all').addClass('selected');

            const data = model.finances;
            // console.log(data);
            const artValue = view.makeArticle(data);
            view.setRightArticle(artValue);
            view.render();
        }
        
        //For week, month and year
        const getWrt = (arrHistFinObj, keyword) =>{
            removeSel();
            console.log('arrHistFinObj', arrHistFinObj);
            console.log('keyword', keyword);
            const articleParent = document.createElement('div');
            const h2 = document.createElement('h2');
            h2.innerHTML = `${keyword} view`;
            h2.classList.add('view');

            let fragParent = document.createDocumentFragment();

            arrHistFinObj.forEach(item=>{
                console.log('item',item);
                const articleChild = document.createElement('div');
                const h3 = document.createElement('h3');
                h3.innerHTML =  `${keyword} ${item.alpha}`;
                h3.classList.add('view-no');

                // let frag = document.createDocumentFragment();
                // item.val.forEach(element => {
                const articleReturned = view.makeArticle(item.val);
                // frag.append(articleReturned);
                // });

                //Appending
                articleChild.append(h3);
                articleChild.append(articleReturned);

                fragParent.append(articleChild);
            });

            articleParent.append(h2);
            articleParent.append(fragParent);

            return articleParent;
        }

        const getForWeek = () =>{            
            const data = convertDataToWeek();
            // console.log(data);

            const artValue = getWrt(data, 'Week');
            $('button#view-week').addClass('selected');

            view.setRightArticle(artValue);
            view.render();
        }

        const getForMonth = () =>{            
            const data = convertDataToMonth();
            // console.log(data);

            const artValue = getWrt(data, 'Month');
            $('button#view-month').addClass('selected');
            
            view.setRightArticle(artValue);
            view.render();
        }

        const getForYear = () =>{            
            const data = convertDataToYear();
            // console.log(data);

            const artValue = getWrt(data, 'Year');
            $('button#view-year').addClass('selected');
            
            view.setRightArticle(artValue);
            view.render();
        }

        //Event Listeners
        const startAppDashboard = () =>{
            
            if(btnAddFinancRec){
                btnAddFinancRec.addEventListener('click', function() {
                    event.preventDefault();
                    const status = view.checkInputsOnAddItemForm();
                    if (status == true) {
                        const finData = new Finances(
                            //title, amount, items, description, dataStamp
                            this.title = financeRecordTitle.value,
                            this.amount = financeTotalAmt.value,
                            this.items = itemsList,
                            this.description = financeRecordDescription.value,
                            this.dataStamp = new Date(financeRecordDate.value)
                        );

                        console.log(finData);
                        controller.addNewFinanceData(finData);
                        alert('Data successful Added');
                        view.clearInputsOnAddItemForm();
                        // view.render();
                        document.location.reload();
                    }
                    else{
                        alert('Could not process, Some fields are empty');
                    }
                })
            }

            //Help us add more items
            $('button.add-item').click(function (evt) {
                evt.preventDefault();
                // console.log('kkk');
                createNewItem();
            });

            //Ugly
            $('button#add-item').click(function (evt) {
                evt.preventDefault();
                view.hideSection();
                $('section#add-items-sect').show();
                $('li.container').removeClass('selected');
                window.scrollTo(0, 0);
            });

            $('button#show-finance-history').click(function (evt) {
                evt.preventDefault();
                view.hideSection();
                $('section#finance-history').show();
                $('section#finance-history').attr('style', 'display:grid');
                window.scrollTo(0, 0);
            });

            //For View Changes
            $('button#view-all').click(function(evt){
                evt.preventDefault();
                getForAll();
            });

            $('button#view-week').click(function(evt){
                evt.preventDefault();
                getForWeek();
            });

            $('button#view-month').click(function(evt){
                evt.preventDefault();
                getForMonth();
            });

            $('button#view-year').click(function(evt){
                evt.preventDefault();
                getForYear();
            });

            inputItemChange();
        }

        //Call all the above
        startAppDashboard();

        try {
            // view.render();
            getForAll();
        } catch (error) {
            // localStorage.clear();
            console.log(error);
            // console.log('REFRESH');
        }
    },

    checkInputsOnAddItemForm: () =>{
        //Validation should happen here
        const title = this.financeRecordTitle.value;
        const desc = this.financeRecordDescription.value;
        const items = this.itemsList;
        const amt = this.financeTotalAmt.value;
        const recDate = this.financeRecordDate.value;

        //Confirm that all are not equal to false or empty
        if (title.trim() != "" && desc.trim() != "" &&  items.length != 0 &&  amt.trim() != "" &&  recDate.trim() != "") {
            console.log('Do we have space = no');
            return true;
        }
        console.log('Do we have space = yes');
        return false;
    },

    clearInputsOnAddItemForm: () =>{
        this.financeRecordTitle.value = '';
        this.financeRecordDescription.value = '';
        this.financeTotalAmt.value = '';
        this.financeRecordDate.value = '';
        $('button.remove-item').parent('div.item').remove();
        $('div.first-item').find('input').val('');
    },

    hideSection: () =>{
        $('section').hide();
    },

    sortByDate: (arr) =>{
        console.log('arr',arr);
        const sortedArr = arr.sort((a,b)=>
            new Date(b.dataStamp) - new Date(a.dataStamp)
        );
        return sortedArr;
    },

    makeArticle: (arrFinRec) =>{
        //-----
        const article = document.createElement('div');
        const div = document.createElement('div');
        div.classList.add('list-container');
        const ul = document.createElement('ul');
        ul.classList.add('finance-rec-list');

        let frag = document.createDocumentFragment();

        const finRec = view.sortByDate(arrFinRec);

        finRec.forEach(rec=>{
            //This helps list the record
            console.log('rec', rec);
            const li = document.createElement('li');
            li.classList.add('finance-rec-list-item');

            //For Title
            const pTitle = document.createElement('p');
            pTitle.setAttribute('data-finRec', "title");
            pTitle.innerHTML = rec.title;
            li.append(pTitle);

            //For amount
            const pAmount = document.createElement('p');
            pAmount.setAttribute('data-finRec', "amount");
            pAmount.innerHTML = '₦ ' + rec.amount;
            li.append(pAmount);

            //Make a frag of each item
            const allItems = (arrayItems) =>{
                const ulItem = document.createElement('ul');
                const ulFrag = document.createDocumentFragment();

                arrayItems.forEach(item=>{
                    const liItem = document.createElement('li');
                    liItem.innerHTML = `
                        <span class= 'hist-rec-name'>${item.itemName}</span>, 
                        <span class= 'hist-rec-amt'>₦${item.itemAmt}</span>
                    `
                    ulFrag.append(liItem);
                });
                ulItem.append(ulFrag);
                return ulItem;
            }

            //For items
            const pItems = document.createElement('p');
            pItems.setAttribute('data-finRec', "items");
            // console.log(rec.items);
            pItems.append(allItems(rec.items));
            li.append(pItems);

            //For description
            const pDescription = document.createElement('p');
            pDescription.setAttribute('data-finRec', "description");
            pDescription.innerHTML = rec.description;
            li.append(pDescription);

            //For dataStamp
            const pDateStamp = document.createElement('p');
            pDateStamp.setAttribute('data-finRec', "dataStamp");
            const td = new Date(rec.dataStamp);
            pDateStamp.innerHTML = td.toDateString();
            li.append(pDateStamp);

            frag.append(li);
        });

        ul.append(frag);
        div.append(ul);
        article.append(div);
        ///------------

        return article;
    },

    setRightArticle: (val) =>{
        rightArticle = val;
    },

    getRightArticle: () =>{
        return rightArticle;
    },

    populateSection: () =>{
        sectFinHistoryList.innerHTML=''; //This is shit sha. So much messing with DOM. DAMN DEAD_FvCKIN_LINE
        // const art = document.createElement('div');
        const artRight = view.getRightArticle();
        // art.append(artRight);
        console.log('rr', artRight);
        sectFinHistoryList.append(artRight);
    },

    render: ()=>{

        const modelArr = controller.getFinanceData();
        if (sectFinHistoryList && modelArr.length != 0) {
            view.populateSection();
        }

        // window.scrollTo(0, 0);
    }
}

controller.init();