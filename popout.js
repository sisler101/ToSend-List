var open = false;

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
    changeScale();
});

document.querySelector('.create-todo').addEventListener('click', function(){
    if (open) {
        document.querySelector('.new-item').style.display='none';
    } else {
        document.querySelector('.new-item').style.display='block';
    }
    open = !open;
    
    document.querySelector('.body').addEventListener("keypress", function (event) {
        if (event.key == "Enter") {
            addItem();
        }
    });
});

document.querySelector('.save-button').addEventListener('click', function(){
    addItem();
});

function fetchItems() {
    console.log("in fetchItems");

    const itemsList = document.querySelector('ul.todo-items');
    itemsList.innerHTML = '';
    var newItemHTML = '';
    try{
        console.log("in the try");
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

        // Retrieve the scale from storage
        var scale = localStorage.getItem('scale');
        if (scale == null || scale == '') {
            scale = 'V';
        }
        console.log("scale:");
        console.log(scale);

        document.querySelector('.scale').textContent = scale;
        update(scale);
        
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
        if (vScale.includes(document.querySelector('.grade').value)) {
            document.querySelector('.grade').value = 'V1';
        } else {
            document.querySelector('.grade').value='5';
        }
        
        document.querySelector('.new-item').style.display='none';
        open = false;
    }
}

function saveItems(obj) {
    var string = JSON.stringify(obj);
    localStorage.setItem('todo-items', string);
}

function saveScale(scale) {
    localStorage.setItem('scale', scale);
}

function changeScale() {
    var scale = document.querySelector('.scale').textContent;
    if (scale == 'V') {
        document.querySelector('.scale').textContent = "Font";
        for (var i = 0; i < 8; i++) {
            selector.options[i].text = vToF[selector.options[i].value];
            selector.options[i].value = selector.options[i].text;
        }

    } else {
        document.querySelector('.scale').textContent = "V";

        for (var i = 0; i < 8; i++) {
            selector.options[i].text = fToV[selector.options[i].value];
            selector.options[i].value = selector.options[i].text
        }
    }
    saveScale(document.querySelector('.scale').textContent);
}

function update(scale) {
    if (scale == 'V') {
        for (var i = 0; i < 8; i++) {
            selector.options[i].text = vScale[i];
            selector.options[i].value = vScale[i];
        }
    } else {
        for (var i = 0; i < 8; i++) {
            selector.options[i].text = fontScale[i];
            selector.options[i].value = fontScale[i];
        }
    }
    saveScale(scale);
}

fetchItems();

