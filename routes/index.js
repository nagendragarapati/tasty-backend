var express = require('express');
var router = express.Router();
const userServices=require('../controllers/userController')
const restaurantServices=require('../controllers/restaurantController')
const authenticate=require('../middlewares/authenticate')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signUp',userServices.signUp)

router.post('/login',userServices.login)

//Admin APIs

router.post('/createRestaurant',authenticate,restaurantServices.createRestaurant)

router.put('/updateRestaurantById/:id',authenticate,restaurantServices.updateRestaurantById)

router.delete('/deleteRestaurantById/:id',authenticate,restaurantServices.deleteRestaurantById)

router.post('/createFood',authenticate,restaurantServices.createFood)

router.put('/updateFoodById/:id',authenticate,restaurantServices.updateFoodById)

router.delete('/deleteFoodById/:id',authenticate,restaurantServices.deleteFoodById)

router.put('/updateAddressyId/:id',authenticate,restaurantServices.updateAddressById)

router.delete('/deleteAddressById/:id',authenticate,restaurantServices.deleteAddressById)

//User APIs

router.get('/getUserDetails',authenticate,userServices.getUserDetails)

router.get('/getAllRestaurants',restaurantServices.getAllRestaurants)

router.get('/getRestaurantById/:id',restaurantServices.getRestaurantById)






module.exports = router;
