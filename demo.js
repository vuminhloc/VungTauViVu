var users = [
	{ 
  	name: 'Thinh', 
    phone: '070123123'
  },
  {
  	name: 'Hung',
    phone: '080456456'
  },
  {
  	name: 'Hoang',
    phone: '090123123'
  }
];
var value = 1;
var rq = users.filter((result)=>{
    return result.indexOf(value)
})
console.log(rq)