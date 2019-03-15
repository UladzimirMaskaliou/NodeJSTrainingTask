import { createServer } from 'http';

const product = {
    sampleTime: 1,
	name: 'SupremeT-Shirt',
	brand: 'Supreme',
	price: 99.99,
	options:[{
		color: 'blue'
	},
	{
		size: 'XL'
	}] 
};

createServer().
  on('request', (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});	
  	res.write(JSON.stringify(product));
  	res.end();
  }).listen(9080);