const UserModel = require('../database/user.model');
const User = require('../../domain/User')
const PasswordHasher = require('../util/PasswordHasher')
const IDChecker = require('./IDChecker')
class UserGateway {
    
    async findByUsername(userInfo){
        const {username,password} = userInfo;
        const result = await UserModel.findOne({username:username});
        let obj={};
        if(result && PasswordHasher.isMatched(password,result.password) ) {
               const user = new User(result._id,result.username,result.password,result.role);
               obj = user.getObj();
        }
        return obj;
    }

    async createUser(userInfo) {
        let {username,password,role} = userInfo;
        password = PasswordHasher.hash(password);
        const user = {
             username : username,
             password : password,
             role: role
        }
        const result = await UserModel.insertMany(user);
        return result;
    }
    async deleteUser(userInfo){
        const {id} = userInfo;
        if ( ! IDChecker(id) ) return {};
        const result =await UserModel.deleteOne({_id:id});
        return result;
    }
    async editUser(userInfo){
        let {id,username,password,role} = userInfo;
        password = PasswordHasher.hash(password);
        if( !IDChecker(id) ) return {};
        const user = {
            username:username,
            password:password,
            role : role,
            updated_at: Date.now()
        }
        const result = await UserModel.updateOne({_id:id},user);
        return result;
    }
}

module.exports = UserGateway;