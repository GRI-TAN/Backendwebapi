const express =require('express')
const router =express.Router()
const Employeecontoller = require('../contollers/Employeecontoller')
const upload = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')
router.get('/',authenticate,Employeecontoller.index)
router.post('/show',Employeecontoller.show)
router.post('/store',upload.single('avatar'),Employeecontoller.store)
router.post('/update',Employeecontoller.update)
router.post('/destroy',Employeecontoller.destroy)

module.exports=router