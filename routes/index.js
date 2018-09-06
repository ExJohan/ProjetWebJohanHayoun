var express = require('express')
var router = express.Router()

const list = [{
  name: 'Tintin'
}, {
  name: 'Asterix'
}]


router.get('/list', (req, res) => {
  res.json(list)
})

router.post('/list', (req, res) => {
	list.push({
  	name: req.body.name
  })
  res.send('OK')
})

router.delete('/list/:data', (req, res) => {
	const thedata = req.params.data
	console.log("query data : " + thedata + " data : "+req.data+ " body data : " + req.body.data + "param data : " + req.params.data)
	list.splice(thedata, 1)
	res.send('OK')
})

module.exports = router