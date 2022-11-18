const storage = localStorage;

function price(amount) 
{
	const formatter = new Intl.NumberFormat('en-UK', {
		style: 'currency',
		currency: 'EUR',
	});

	return formatter.format(amount)
}

function store(key, value)
{
	storage.setItem(key, JSON.stringify(value));
}

function get(key)
{
	return JSON.parse(storage.getItem(key))
}

function has(key)
{
	return !!storage.getItem(key);
}