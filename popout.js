document.querySelector('.create-todo').addEventListener('click', function(){
    document.querySelector('.new-item').style.display='block';
});

document.querySelector('.new-item button').addEventListener('click', function(){
    var itemName = document.querySelector('.new-item input').value;
    var itemDifficulty = document.querySelector('.new-item select').value;
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
        document.querySelector('.new-item select').value='V1';
        document.querySelector('.new-item').style.display='none';
      }
});

function fetchItems() {
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


            newItemHTML += `<li data-itemindex="${i}" ${status} style="background-color: ${gradeColors[itemsArr[i].difficulty]}">
            <div class="itemComplete" style="display:flex;"><span class="difficulty" style="margin-right:5px; margin-left:5px;">${itemsArr[i].difficulty}</span><span class="item">${itemsArr[i].item}</span></div>
            <span class="itemDelete" style="background-color:white; border-radius:8px; padding-right:4px; padding-left:4px; padding-top:1px; padding-bottom:1px">X</span></li>`;
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

function saveItems(obj) {
    var string = JSON.stringify(obj);
    localStorage.setItem('todo-items', string);
}

fetchItems();

