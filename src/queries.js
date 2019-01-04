var queries = [
    {
        "description": "Get all the executions irrespective of whether they are successfull or not",
        "query":"PREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0APREFIX+model%3A+%3Chttps%3A%2F%2Fw3id.org%2Fmint%2FmodelCatalog%23%3E%0D%0ASELECT+%3Fmodel+%3Flabel%0D%0AWHERE+%7B%0D%0A++%3Fmodel+a+model%3AModel.%0D%0A++%3Fmodel+rdfs%3Alabel+%3Flabel%0D%0A%7D"
    }
]
