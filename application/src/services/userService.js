'use strict'

const User = require('../models/User')
const userDao = require('../dao/userDao')
//const crypto = require('crypto')
//const path = require('path')
//const fs = require('fs')
//const { rootDir } = require('../utils')

const userService = {

    findUserById: async function (id) {
        const user = await userDao.findOneById(id)
        return user
    },
    /*
        update: async function (id, fields, file){
    
            const user = await userDao.findOneById(id)
    
            const pictureUploadFolder = path.join(rootDir, 'static/user_img')
    
            if (file){
    
                if (user.picture){
                    try {
                    await fs.promises.unlink(path.join(pictureUploadFolder, user.picture))
                    } catch (e){}
                }
    
                await fs.promises.writeFile(path.join(pictureUploadFolder, file.originalname), file.buffer)
            }
    
            if (fields.password !== '') {
                const hash = crypto.createHash('sha256')
                hash.update(fields.password)
                fields.password = hash.digest('hex')
            }
    
            const updatedUser = await user.update({ ...fields, picture: file ? file.originalname : user.picture })
    
            return updatedUser
        }*/
}

module.exports = userService