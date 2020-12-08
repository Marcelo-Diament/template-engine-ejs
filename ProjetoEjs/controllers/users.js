const controller = {
  index: (req, res, next) => res.render('users', {
    title: 'Users',
    message: 'Você está na view users.ejs'
  })
}

module.exports = controller