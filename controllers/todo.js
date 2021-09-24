const User = require("../models/user");

const date = require("../date");

exports.getTodoList = (req, res, next) => {

    let DATE = date.getDate();
    let DAY = date.getDay();
    let MONTH = date.getMonth();
    let YEAR = date.getYear();

    if(req.isAuthenticated()){

        const foundUser = req.user.username;

        User.findOne({username: foundUser})
        .then(result => {
            res.render("todo/index", {
                pageTitle: "To do list",
                day: DAY, 
                date: DATE,
                month: MONTH, 
                year: YEAR, 
                addList: result.items, 
                FOUNDUSER: result.username
            });
        }).catch(err => {
            console.log(err);
        });

        // User.findOne({username: foundUser}, function(err, result){
        //     if(!err){
        //         res.render("index", {day: DAY, date: DATE, month: MONTH, year: YEAR, addList: result.items, FOUNDUSER: result.username});
        //     }
        //     else{
        //         console.log(err);
        //     }
    
        // });
    }
    else {
        res.redirect("/login");
    }

}

exports.postTodoList = (req, res, next) => {

    const entered = req.params.itemId;
    const fuser = req.params.prodId;
 
    if(entered == ""){
         res.redirect("/");
    }
    else {
        
        User.findOne({username: fuser})
            .then(foundList => {
                foundList.items.push(entered);
                foundList.save();
            })
            .then(() => {
                res.status(200).json({message: "success"});
            })
            .catch(err => {
                res.status(500).json({message: "Deleting failed"});
            });
    }
 
}

exports.deleteItem = (req, res, next) => {

    const delId = req.params.delId;
    const list_Name = req.params.prodId;

    // const d = _.lowerCase(DAY);
    // const c = _.lowerCase(list_Name);
 
    // if(d === c ){

        // User.findOne({username: list_Name}, function(err, found){
        //     if(err){
        //         console.log(err);
        //     }
        //     else{
        //         found.items.splice(delId, 1);
        //         console.log(found.items);
        //         console.log("successfully deleted");
        //     }
        // });
        // res.redirect("/");
    // }
    // else{
    User.findOne({username: list_Name})
        .then(foundList => {
            foundList.items.pull(delId);
            foundList.save();
        })
        .then(() => {
            res.status(200).json({message: "success"});
        }).catch(err => {
            res.status(500).json({message: "Deleting failed"});
        });
}

// exports.createList = (req, res, next) => {

//     const listName = _.capitalize(req.params.createList);

//     List.findOne({name: listName}, function(err, found){
//         if(!err){
//             if(!found){

//                 const list = new List({
//                     name: listName,
//                     item: [] 
//                  });
//                  list.save();
//             }
//             else{
//                 res.render("index", {listTitle: found.name, addList: found.item});
//             }
//         }
//         else{
//             console.log(err);
//         }
//     });

// }