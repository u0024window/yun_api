import fetch from 'node-fetch';


export default async function CreateOrder(address, token) {
    var body = [
        {
            "CustomerOrderNumber": "Test3413563900",
            "ShippingMethodCode": "EGWTR",
            "TrackingNumber": "",
            "TransactionNumber": "",
            "Height": 0,
            "Length": 0,
            "Width": 0,
            "PackageCount": 1,
            "Weight": 1,
            "ApplicationType": 1,
            "ReturnOption": 1,
            "TariffPrepay": 0,
            "InsuranceOption": 0,
            "Coverage": 200,
            "SensitiveTypeID": 0,
            "SourceCode": "P0035",
            "Receiver": {
                "TaxId": "",
                "CountryCode": "SE",
                "FirstName": "MONIKASAS",
                "LastName": "",
                "Company": "",
                "Street": "MUSIKVAGEN 4",
                "StreetAddress1": "",
                "StreetAddress2": "",
                "City": "BROMOLLA",
                "State": "SKANE",
                "Zip": "29538",
                "Phone": "5204710145",
                "HouseNumber": "",
                "Email": "123456@qq.com"
            },
            "Sender": {

            },
            "Parcels": [
                {
                    "EName": "code",
                    "CName": "qq",
                    "HSCode": "8517629900",
                    "Quantity": 6,
                    "SKU": "1026787",
                    "ProductUrl": "",
                    "UnitPrice": 0.28,
                    "UnitWeight": 2,
                    "Remark": "1026787",
                    "InvoiceRemark": "",
                    "CurrencyCode": "USD"
                }
            ]
        }
    ]

    const res = await fetch('https://gapi.yunexpressusa.com/api/WayBill/CreateOrder', {
        method: 'post',
        headers: {
            Authorization: 'Basic' + token,
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(body)
    })

    return res
}

