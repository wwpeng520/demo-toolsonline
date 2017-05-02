let Sequelize = require('sequelize');
let sequelize = require('./db');

// 创建 model
let Guest = sequelize.define('guest', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    },
    ip: {
        type: Sequelize.STRING,
        allowNull:false
        
    },
    wordsInput: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
});

// 创建表
let guest = Guest.sync({ force: false });

// 添加新用户
exports.addGuest = (ip, wordsInput) => {
    return Guest.create({
        ip: ip,
        wordsInput: wordsInput
    }).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
};

//显示所有访问记录
exports.getHistory = ()=>{
    return Guest.findAll();
};

// 通过IP查找用户
exports.findByIp = ip => {
    return Guest.findAll({ where: { ip: ip } });
};

// exports.findByIp = ip => {
//     return Guest.findAll({ where: { ip: ip } }).then(function(result){
//         for (var i = 0; i < result.length; i++){
//             console.log(result[i].wordsInput);
//         }
//     });
// };