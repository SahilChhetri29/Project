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

    const empData = new EmpTable({
        id: id,
        name: name,
        department: department,
        salary: salary
    });

    empData.save()
    .then(data =>{
        res.redirect('/home');
    })
    .catch(err =>{
        console.log(err);
    })

}

exports.getAllEmployee = (req, res, next)=>{

    EmpTable.find()
    .then(employees =>{
        res.render('allEmployee', {pageTitle: 'All Employees', employees: employees});
    })
    .catch(err=>{
        cosnole.log(err);
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