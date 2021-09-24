const addItem = (btn) => {
    
    const userName = btn.value;
    const itemId = btn.parentNode.querySelector('[name=newItem]').value;

    // creating a dynamic div element
    const div = document.createElement('div');
    div.className = "item";

    const input1 = document.createElement('input');
    input1.className = "form-check-input";
    input1.type = "checkbox";
    input1.id = "checkboxNoLabel";
    input1.name = "checkBox";
    input1.value = itemId; // value
    input1.setAttribute("onclick", "deleteList(this)")

    const p = document.createElement('p');
    p.innerHTML = itemId; // value

    const input2 = document.createElement('input');
    input2.id = "userId";
    input2.type = "hidden";
    input2.name = "name";
    input2.value = userName; // value

    fetch(`/${userName}/${itemId}`, {
        method: "POST"
    })
    .then(result => {
        return result.json();
    })
    .then(data => {
        const before = document.querySelector(".addItem");

        const divBox = document.querySelector(".listBox").insertBefore(div, before);
        divBox.appendChild(input1);
        divBox.appendChild(p);
        divBox.appendChild(input2);
        document.getElementById('addField').value = '';
    })
    .catch(err => {
        console.log(err);
    })
}

const deleteList = (btn) => {
    
    const delId = btn.value;
    const userName = btn.parentNode.querySelector("#userId").value;
    const prodElement = btn.closest("div");

    fetch(`/product/${userName}/${delId}`, {
        method: "DELETE"
    })
    .then(result => {
        return result.json();
    })
    .then(data => {
        prodElement.parentNode.removeChild(prodElement);
    })
    .catch(err => {
        console.log(err);
    })
}