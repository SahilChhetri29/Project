const fs = require('fs');
const EmpTable = require('../models/employeeData');

exports.getHomePage = (req, res, next) =>{
    res.render('home', {pageTitle: 'Home Page'});
}

exports.getEmployee = (req, res, next)=>{
    
    const id = req.body.id;

    EmpTable.find({id: id})
    .then(employee =>{
        res.render('allEmployee', {pageTitle: 'Employee Detail', employees: employee});
    })
}

exports.getAddEmployee = (req, res, next)=>{
    res.render('Employee', {pageTitle: 'Add Employee', edit: false, emp: {}});
}

exports.postAddEmployee = (req, res, next)=>{
    const id = req.body.id;
    const name = req.body.name;
    const department = req.body.department;
    const salary = req.body.salary;

    const empData = {
        id: id,
        name: name,
        department: department,
        salary: salary
    };
    fs.readFile('EmployeeData.json',(err, data)=>{
        
        let allEmployees = [];

        if(!err){
            allEmployees = JSON.parse(data);
        }
        allEmployees.push(empData);
    
        fs.writeFile('EmployeeData.json',JSON.stringify(allEmployees),(err, data)=>{
    
            if(err){
                console.log(err);
            }
            res.redirect('/home');
        });
    });
}

exports.getAllEmployee = (req, res, next)=>{

    fs.readFile('EmployeeData.json',(err, data)=>{
        if(err){
            console.log(err);
        }
        const employees = JSON.parse(data);

        let totalSalary = 0;

        for(let i of employees){
            totalSalary += +i.salary;
        }

        res.render('allEmployee', {pageTitle: 'All Employees', employees: employees, totalSalary: totalSalary});
    })
    
}

exports.getUpdateEmployee = (req, res, next)=>{

    const id = req.query.id;
    const edit = req.query.edit;

    EmpTable.findOne({id: id})
    .then(data =>{
        res.render('Employee', {pageTitle: 'Update Employee', edit: edit, emp: data });
    })
    .catch(err =>{
        console.log(err);
    })
};

exports.postUpdateEmployee = (req, res, next)=>{

    const oldId = req.body.oldId;
    const newId = req.body.id;
    const newName = req.body.name;
    const newDepartment = req.body.department;
    const newSalary = req.body.salary;

    EmpTable.findOneAndUpdate({id: oldId},{id: newId, name: newName, department: newDepartment, salary: newSalary})
    .then(result =>{
        res.redirect('/allEmployee');
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.postDeleteEmployee = (req, res, next)=>{

    const id = req.params.id;

    EmpTable.deleteOne({id: id})
    .then(data =>{
        res.redirect('/allEmployee');
    })
    .catch(err =>{
        console.log(err);
    })
}