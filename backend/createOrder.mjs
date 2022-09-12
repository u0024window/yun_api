import axios from "axios"

var param = {
    "CustomerOrderNumber": "Test341356443900",//
    "ShippingMethodCode": "EGWTR",//
    "TrackingNumber": "",
    "TransactionNumber": "",
    "Height": 0,
    "Length": 0,
    "Width": 0,
    "LabelType": "PDF",//
    "PackageCount": 1,
    "Weight": 1,//
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
        "FirstName": "MONIKASAS",//
        "LastName": "",
        "Company": "",
        "Street": "MUSIKVAGEN 4",//
        "StreetAddress1": "",
        "StreetAddress2": "",
        "City": "BROMOLLA",//
        "State": "SKANE",//
        "Zip": "29538",//
        "Phone": "5204710145",
        "HouseNumber": "",
        "Email": "123456@qq.com"
    },
    "Sender": {
        "CountryCode": "US", "FirstName": null, "LastName": null, "Company": "Jammin Butter", "Street": "168 Roweland Dr", "City": "Johnson City", "State": "TN", "Zip": "37601", "Phone": "4237483929"
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







export default async function createOrder(url, authorization, body) {
    try {
        const res = await axios({
            method: 'post',
            url,
            data: body,
            headers: {
                Authorization: authorization,
                'Content-Type': 'application/json;charset=UTF-8'
            },
        });
        return res.data
    } catch {
        return {
            message: 'error',
            data: res.data
        }
    }

}



