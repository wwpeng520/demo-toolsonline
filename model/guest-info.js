const Sequelize = require('sequelize');
const sequelize = require('./db');

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

// 添加新访客客户端信息
exports.addClientInfo = (ip, wordsInput) => {
    return Guest.create({
        ip: ip,
        wordsInput: wordsInput
    }).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
};

// 添加新访客ip和访问项目
exports.addGuest = (ip, item) => {
    
};

//显示所有访问记录
exports.getHistory = ()=>{
    return Guest.findAll();
};

// 通过IP查找用户
exports.findByIp = ip => {
    return Guest.findAll({ where: { ip: ip } });
};
