# paymaya-nodejs

This is a unofficial paymaya node sdk that allows existing nodejs app to accept payments using the existing paymaya endpoints which supports (MasterCard and Visa enabled card (credit, debit, or prepaid)
)
## Installation

	npm install paymaya-nodejs

## Sample Usage
    using ES6
	import paymayaNode from 'paymaya-nodejs';

    const secretKey = "YOUR_SECRET_API_KEY";
    const publicKey = "YOUR_PUBLIC_API_KEY";

	const paymaya = new paymayaNode({ secretKey, publicKey, isSandbox: true });

	// To create payment token
    const result = await paymaya.createCustomer({
          "card": {
                "number": "5123456789012346",
                "expMonth": "05",
                "expYear": "2025",
                "cvc": "111"
          }
    })

## License

MIT

## Release History

* 1.0.0 - Initial release
