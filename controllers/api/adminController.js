const db = require('../../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const adminService = require('../../services/adminService')


const adminController = {
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => {
      return res.json(data)
    })
  },

  createRestaurant: (req, res) => {
    Category.findAll({ raw: true, nest: true })
      .then(categories => {
        return res.render('admin/create', { categories: categories })
      })
  },

  postRestaurant: (req, res) => {
    adminService.postRestaurant(req, res, (data) => {
      return res.json(data)
    })
  },

  getRestaurant: (req, res) => {
    adminService.getRestaurant(req, res, (data) => {
      return res.json(data)
    })
  },

  editRestaurant: (req, res) => {
    Category.findAll({ raw: true, nest: true })
      .then(categories => {
        return Restaurant.findByPk(req.params.id)
          .then(restaurant => {
            return res.render('admin/create', { categories: categories, restaurant: restaurant.toJSON() })
          })
      })
  },

  putRestaurant: (req, res) => {
    adminService.putRestaurant(req, res, (data) => {
      return res.json(data)
    })
  },

  deleteRestaurant: (req, res) => {
    adminService.deleteRestaurant(req, res, (data) => {
      return res.json(data)
    })
  },

  getUsers: (req, res) => {
    return User.findAll({ raw: true })
      .then(users => { return res.render('admin/users', { users }) })
  },

  toggleAdmin: (req, res) => {
    return User.findByPk(req.params.id)
      .then(async user => {
        await user.update({ isAdmin: !user.isAdmin })
      })
      .then(() => {
        req.flash('success_messages', 'users was successfully to update')
        return res.redirect('/admin/users')
      })
  }
}

module.exports = adminController
