var concat = require('concat-stream')
var diffy = require('diffy')({ fullscreen: true })
var fs = require('fs')
var input = require('diffy/input')()
var Menu = require('menu-string')

var menu

process.stdin.pipe(concat(list))

input.on('keypress', function (ch, key) {
  if (ch === 'q') process.exit()
})

function list (data) {
  var items = data.toString()
    .split('\n')
    .filter(s => s)
    .map(str => ({ text: str }))
  menu = new Menu({
    items: items
  })
  diffy.render(function () {
    return menu.toString()
  })
  menu.on('update', function () {
    diffy.render()
  })
  diffy.render()
}
