const vToF = {
    'V1': '5',
    'V2': '5+',
    'V3': '6a',
    'V4': '6b',
    'V5': '6c',
    'V6': '7a',
    'V7': '7b',
    'V8': '7c'
};

var vScale = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8'];
var fontScale = ['5', '5+', '6a', '6b', '6c', '7a', '7b', '7c'];

const fToV = {
    '5': 'V1',
    '5+': 'V2',
    '6a': 'V3',
    '6b': 'V4',
    '6c': 'V5',
    '7a': 'V6',
    '7b': 'V7',
    '7c': 'V8'
};

var selector = document.querySelector('.grade');
document.querySelector('.scale').addEventListener('click', function(){
    if (document.querySelector('.scale').textContent == "V") {
        document.querySelector('.scale').textContent = "Font";
        console.log(selector);
        for (var i = 0; i < 8; i++) {
            console.log(selector.options[i]);
            selector.options[i].text = vToF[selector.options[i].value];
            selector.options[i].value = selector.options[i].text;
        }
        fetchItems(1);

    } else {
        document.querySelector('.scale').textContent = "V";

        for (var i = 0; i < 8; i++) {
            console.log(selector.options[i]);
            selector.options[i].text = fToV[selector.options[i].value];
            selector.options[i].value = selector.options[i].text
        }
        fetchItems(0);
    }
});

document.querySelector('.create-todo').addEventListener('click', function(){
    document.querySelector('.new-item').style.display='block';
    document.querySelector('.body').addEventListener("keypress", function (event) {
        console.log(event);
        if (event.key == "Enter") {
            addItem();
        }
    });
});

document.querySelector('.save-button').addEventListener('click', function(){
    addItem();
});

function fetchItems(scale) {
    const itemsList = document.querySelector('ul.todo-items');
    itemsList.innerHTML = '';
    var newItemHTML = '';
    try{
        var itemsStorage = localStorage.getItem('todo-items');
        if (itemsStorage == null) {
            itemsStorage = '[]';
        }
        var itemsArr = JSON.parse(itemsStorage);

        for (var i = 0; i < itemsArr.length; i++) {
            var status = '';
            if (itemsArr[i].status == 1) {
                status = 'class="done"';
            } else {
                status = 'class="not-done"';
            }

            const gradeColors = {
                'V1': 'rgba(101, 155, 188, 0.17)',
                'V2': 'rgba(101, 155, 188, 0.29)',
                'V3': 'rgba(101, 155, 188, 0.41)',
                'V4': 'rgba(101, 155, 188, 0.53)',
                'V5': 'rgba(101, 155, 188, 0.65)',
                'V6': 'rgba(101, 155, 188, 0.77)',
                'V7': 'rgba(101, 155, 188, 0.89)',
                'V8': 'rgba(101, 155, 188, 1)'
            };


            newItemHTML += 
            `<li data-itemindex="${i}" ${status} style="background-color: ${gradeColors[itemsArr[i].difficulty]}">
                <div class="itemComplete" style="display:flex;">
                    <span class="difficulty" style="margin-right:5px; margin-left:5px;">
                        ${itemsArr[i].difficulty}
                    </span>
                    <span class="item" style="background-color:rgba(255, 255, 255, 0.5); box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.6); border-radius:6px; padding-top:1px; padding-bottom:1px; padding-right:4px; padding-left:4px; vertical-align: middle; text-align:center;">
                        ${itemsArr[i].item}
                    </span>
                </div>
                <span class="itemDelete" style="background-color:white; border-radius:8px; padding-right:4px; padding-left:4px; padding-top:1px; padding-bottom:1px">
                    X
                </span>
            </li>`;
        }

        
        itemsList.innerHTML = newItemHTML;

        var itemsListUL = document.querySelectorAll('ul li');
        for (var i = 0; i < itemsListUL.length; i++) {

            itemsListUL[i].querySelector('.itemComplete').addEventListener('click', function() {
                var index = this.parentNode.dataset.itemindex;
                itemComplete(index);
            });
            itemsListUL[i].querySelector('.itemDelete').addEventListener('click', function() {
                var index = this.parentNode.dataset.itemindex;
                itemDelete(index);
            });
        }
    } catch(e) {
    }
}

function itemComplete(index) {
    
    var itemsStorage = localStorage.getItem('todo-items');

    if (itemsStorage == null) {
        itemsStorage = '[]';
    }

    var itemsArr = JSON.parse(itemsStorage);
    if (itemsArr[index].status == 1) {
        document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').className='not-done';
        itemsArr[index].status = 0;
    } else {
        document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').className='done';
        itemsArr[index].status = 1;
    }

    saveItems(itemsArr);
    fetchItems();
}

function itemDelete(index) {
    var itemsStorage = localStorage.getItem('todo-items');
    if (itemsStorage == null) {
        itemsStorage = '[]';
    }
    var itemsArr = JSON.parse(itemsStorage);
    
    itemsArr.splice(index, 1);
    
    saveItems(itemsArr);

    fetchItems();

}

function addItem() {
    var itemName = document.querySelector('.new-item input').value;
    var itemDifficulty = document.querySelector('.grade').value;
    if(itemName != ''){
  
        var itemsStorage = localStorage.getItem('todo-items');
    
        if(itemsStorage == null){
          itemsStorage = '[]';
        }

        var itemsArr = JSON.parse(itemsStorage);


        itemsArr.push({"item":itemName, "status":0, "difficulty":itemDifficulty});
        saveItems(itemsArr);
        fetchItems();
        document.querySelector('.new-item input').value='';
        document.querySelector('.new-item grade').value='1';
        document.querySelector('.new-item').style.display='none';
    }
}

function saveItems(obj) {
    var string = JSON.stringify(obj);
    localStorage.setItem('todo-items', string);
}

fetchItems();

