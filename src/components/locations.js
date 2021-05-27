const locationsData = [
    {
        address: '1201 Fulton Road',
        city: 'Mayfield',
        geolocation: {
            _type: 'geopoint',
            lat: 36.7256143,
            lng: -88.6635187,
        },
        googleMapsLink: 'https://goo.gl/maps/KCTqbHTR2a8qTcje6',
        handle: 'mayfield',
        locationNumber: 1,
        partsPhoneNumber: '270-994-7880',
        phoneNumber: '270-247-4456',
        servicePhoneNumber: '270-705-0633',
        state: 'Kentucky',
        title: 'Mayfield, KY',
        zip: 42066,
    },
    {
        address: '1117 Hopkinsville Street',
        city: 'Princeton',
        geolocation: {
            _type: 'geopoint',
            lat: 37.1011843,
            lng: -87.8664847,
        },
        googleMapsLink: 'https://goo.gl/maps/72Bn1Y4v7GkmWGJw6',
        handle: 'princeton',
        locationNumber: 2,
        partsPhoneNumber: '270-625-2553',
        phoneNumber: '270-365-2053',
        servicePhoneNumber: '270-625-1151',
        state: 'Kentucky',
        title: 'Princeton, KY',
        zip: 42445,
    },
    {
        address: '250 Shelton Lane',
        city: 'Russellville',
        geolocation: {
            _type: 'geopoint',
            lat: 36.8466883,
            lng: -86.9042727,
        },
        googleMapsLink: 'https://goo.gl/maps/PrB37DBRqhUmcr31A',
        handle: 'russellville',
        locationNumber: 3,
        partsPhoneNumber: '270-994-7881',
        phoneNumber: '270-726-7171',
        servicePhoneNumber: '270-847-5563',
        state: 'Kentucky',
        title: 'Russellville, KY',
        zip: 42276,
    },
    {
        address: '1540 State Route 130 South',
        city: 'Morganfield',
        geolocation: {
            _type: 'geopoint',
            lat: 37.6802142,
            lng: -87.9391587,
        },
        googleMapsLink: 'https://goo.gl/maps/TywXy3259S1NHDLQ8',
        handle: 'morganfield',
        locationNumber: 4,
        partsPhoneNumber: '270-994-7882',
        phoneNumber: '270-389-3668',
        servicePhoneNumber: '270-285-2808',
        state: 'Kentucky',
        title: 'Morganfield, KY',
        zip: 42437,
    },
    {
        address: '411 Alfred Thun Road',
        city: 'Clarksville',
        geolocation: {
            _type: 'geopoint',
            lat: 36.5985982,
            lng: -87.2805749,
        },
        googleMapsLink: 'https://goo.gl/maps/o66z9uMwTTAzMUdKA',
        handle: 'clarksville',
        locationNumber: 5,
        partsPhoneNumber: '931-220-8644',
        phoneNumber: '931-647-0029',
        servicePhoneNumber: '931-624-8280',
        state: 'Tennessee',
        title: 'Clarksville, TN',
        zip: 37040,
    },
    {
        address: '188 US Highway 51 South',
        city: 'Clinton',
        geolocation: {
            _type: 'geopoint',
            lat: 36.6523022,
            lng: -88.9907235,
        },
        googleMapsLink: 'https://goo.gl/maps/iaNWK6fB3BV8wuhc7',
        handle: 'clinton',
        locationNumber: 6,
        partsPhoneNumber: '270-293-4900',
        phoneNumber: '270-653-4311',
        servicePhoneNumber: '270-254-1662',
        state: 'Kentucky',
        title: 'Clinton, KY',
        zip: 42031,
    },
    {
        address: '3690 James Sanders Boulevard',
        city: 'Paducah',
        geolocation: {
            _type: 'geopoint',
            lat: 37.0849693,
            lng: -88.6954947,
        },
        googleMapsLink: 'https://goo.gl/maps/pUVSQkysbHwPQxvb9',
        handle: 'paducah',
        locationNumber: 8,
        phoneNumber: '270-408-1397',
        servicePhoneNumber: '618-317-5184',
        state: 'Kentucky',
        title: 'Paducah, KY',
        zip: 42001,
    },
    {
        address: '2804 Pembroke Road',
        city: 'Hopkinsville',
        geolocation: {
            _type: 'geopoint',
            lat: 36.8349961,
            lng: -87.4436297,
        },
        googleMapsLink: 'https://goo.gl/maps/CrYCNqfLSu5twK2x7',
        handle: 'hopkinsville',
        locationNumber: 9,
        partsPhoneNumber: '270-206-2347',
        phoneNumber: '270-886-3994',
        servicePhoneNumber: '270-206-2346',
        state: 'Kentucky',
        title: 'Hopkinsville, KY',
        zip: 42240,
    },
    {
        address: '2951 North 600 West',
        city: 'Jasper',
        geolocation: {
            _type: 'geopoint',
            lat: 38.42043,
            lng: -87.0199347,
        },
        googleMapsLink: 'https://goo.gl/maps/vgcBqi4E7TD3TMvy9',
        handle: 'jasper',
        locationNumber: 10,
        partsPhoneNumber: '270-727-0021',
        phoneNumber: '812-634-1717',
        servicePhoneNumber: '270-709-5346',
        state: 'Indiana',
        title: 'Jasper, IN',
        zip: 47546,
    },
    {
        address: '10300 Telephone Road',
        city: 'Chandler',
        geolocation: {
            _type: 'geopoint',
            lat: 38.0069981,
            lng: -87.4405217,
        },
        googleMapsLink: 'https://goo.gl/maps/YdZxudLsZqumerFp8',
        handle: 'chandler',
        locationNumber: 11,
        partsPhoneNumber: '270-970-1146',
        phoneNumber: '812-424-5507',
        servicePhoneNumber: '812-217-1464',
        state: 'Indiana',
        title: 'Evansville, IN',
        zip: 47610,
    },
    {
        address: '60 East Frontage Road',
        city: 'Poseyville',
        geolocation: {
            _type: 'geopoint',
            lat: 38.1796082,
            lng: -87.7839687,
        },
        googleMapsLink: 'https://goo.gl/maps/aiZ7T5tS6DHKmjHZ9',
        handle: 'poseyville',
        locationNumber: 12,
        partsPhoneNumber: '270-970-3283',
        phoneNumber: '812-874-2233',
        servicePhoneNumber: '270-709-5251',
        state: 'Indiana',
        title: 'Poseyville, IN',
        zip: 47633,
    },
    {
        address: '7362 South State Road 57',
        city: 'Elnora',
        geolocation: {
            _type: 'geopoint',
            lat: 38.9108678,
            lng: -87.0388881,
        },
        googleMapsLink: 'https://goo.gl/maps/MgEiZJnUKcyiuq7h9',
        handle: 'elnora',
        locationNumber: 14,
        partsPhoneNumber: '270-727-0151',
        phoneNumber: '812-659-2101',
        servicePhoneNumber: '270-709-5329',
        state: 'Indiana',
        title: 'Newberry, IN',
        zip: 47529,
    },
    {
        address: '6018 E Grand River Ave',
        city: 'Portland',
        geolocation: {
            _type: 'geopoint',
            lat: 42.8708826,
            lng: -84.9575322,
        },
        googleMapsLink: 'https://maps.google.com/maps?cid=5067675611662270609',
        handle: 'portland',
        locationNumber: 51,
        partsPhoneNumber: '517-526-1444',
        phoneNumber: '517-647-4164',
        state: 'Michigan',
        title: 'Portland, MI',
        zip: 48875,
    },
    {
        address: '332 W Saginaw Hwy',
        city: 'Grand Ledge',
        geolocation: {
            _type: 'geopoint',
            lat: 42.7416368,
            lng: -84.7559832,
        },
        googleMapsLink: 'https://maps.google.com/maps?cid=2580208267126159926',
        handle: 'grand-ledge',
        locationNumber: 52,
        phoneNumber: '517-622-2220',
        state: 'Michigan',
        title: 'Grand Ledge, MI',
        zip: 48837,
    },
    {
        address: '1365 East Monroe Road, Highway M-46',
        city: 'St. Louis',
        geolocation: {
            _type: 'geopoint',
            lat: 43.4082374,
            lng: -84.5836095,
        },
        googleMapsLink: 'https://maps.google.com/maps?cid=1642581173721942912',
        handle: 'st-louis',
        locationNumber: 53,
        partsPhoneNumber: '989-681-5772',
        phoneNumber: '989-681-5771',
        state: 'Michigan',
        title: 'St. Louis, MI',
        zip: 48880,
    },
    {
        address: '500 N Garfield Rd',
        city: 'Linwood',
        geolocation: {
            _type: 'geopoint',
            lat: 43.7532906,
            lng: -84.0888468,
        },
        googleMapsLink: 'https://maps.google.com/maps?cid=8255640421270896732',
        handle: 'linwood',
        locationNumber: 54,
        partsPhoneNumber: '989-615-6499',
        phoneNumber: '989-697-4486',
        state: 'Michigan',
        title: 'Linwood, MI',
        zip: 48634,
    },
    {
        address: '4240 E Rosebush Rd',
        city: 'Rosebush',
        geolocation: {
            _type: 'geopoint',
            lat: 43.6979579,
            lng: -84.764663,
        },
        googleMapsLink: 'https://maps.google.com/maps?cid=6974697701248942967',
        handle: 'rosebush',
        locationNumber: 55,
        phoneNumber: '989-779-1707',
        state: 'Michigan',
        title: 'Rosebush, MI',
        zip: 48878,
    },
    {
        address: '106 N Occidental Hwy',
        city: 'Tecumseh',
        geolocation: {
            _type: 'geopoint',
            lat: 42.0080161,
            lng: -83.9662793,
        },
        googleMapsLink: 'https://maps.google.com/maps?cid=1465727069237503681',
        handle: 'tecumseh',
        locationNumber: 56,
        partsPhoneNumber: '517-862-4564',
        phoneNumber: '517-423-2133',
        state: 'Michigan',
        title: 'Tecumseh, MI',
        zip: 49286,
    },
    {
        address: '20801 Pontiac Trail',
        city: 'South Lyon',
        geolocation: {
            _type: 'geopoint',
            lat: 42.432808,
            lng: -83.6520207,
        },
        googleMapsLink: 'https://maps.google.com/maps?cid=15571153608568634338',
        handle: 'south-lyon',
        locationNumber: 57,
        phoneNumber: '248-437-2091',
        state: 'Michigan',
        title: 'South Lyon, MI',
        zip: 48178,
    },
    {
        address: '18880 Northland Drive',
        city: 'Big Rapids',
        geolocation: {
            _type: 'geopoint',
            lat: 43.7404637,
            lng: -85.5047226,
        },
        googleMapsLink: 'https://goo.gl/maps/29cVUJqobmndyCZn9',
        handle: 'big-rapids',
        locationNumber: 58,
        partsPhoneNumber: '231-349-2632',
        phoneNumber: '231-796-6302',
        state: 'Michigan',
        title: 'Big Rapids, MI',
        zip: 49307,
    },
    {
        address: '4363 S Morey Rd',
        city: 'Lake City',
        geolocation: {
            _type: 'geopoint',
            lat: 44.275942,
            lng: -85.2165238,
        },
        googleMapsLink: 'https://maps.google.com/maps?cid=6046451767336177960',
        handle: 'lake-city',
        locationNumber: 59,
        partsPhoneNumber: '231-631-9212',
        phoneNumber: '231-839-8660',
        state: 'Michigan',
        title: 'Lake City, MI',
        zip: 49651,
    },
    {
        address: '2085 West, E Michigan 55',
        city: 'West Branch',
        geolocation: {
            _type: 'geopoint',
            lat: 44.276464,
            lng: -84.2128127,
        },
        googleMapsLink: 'https://maps.google.com/maps?cid=13981324432215749983',
        handle: 'west-branch',
        locationNumber: 60,
        phoneNumber: '989-343-5333',
        state: 'Michigan',
        title: 'West Branch, MI',
        zip: 48661,
    },
    {
        address: '710 N Cedar St',
        city: 'Mason',
        geolocation: {
            _type: 'geopoint',
            lat: 42.5916667,
            lng: -84.460522,
        },
        googleMapsLink: 'https://maps.google.com/maps?cid=993177882931948573',
        handle: 'mason',
        locationNumber: 61,
        partsPhoneNumber: '517-512-3550',
        phoneNumber: '517-676-9588',
        servicePhoneNumber: '517-512-3550',
        state: 'Michigan',
        title: 'Mason, MI',
        zip: 48854,
    },
    {
        address: '2 Industrial Park Dr',
        city: 'Williamston',
        geolocation: {
            _type: 'geopoint',
            lat: 42.6797579,
            lng: -84.2835333,
        },
        googleMapsLink: 'https://maps.google.com/maps?cid=2195516416217207846',
        handle: 'williamston',
        locationNumber: 62,
        partsPhoneNumber: '517-449-2321',
        phoneNumber: '517-655-4606',
        servicePhoneNumber: '517-230-7239',
        state: 'Michigan',
        title: 'Williamston, MI',
        zip: 48895,
    },
    {
        address: '1155 S Milford Rd',
        city: 'Highland',
        geolocation: {
            _type: 'geopoint',
            lat: 42.6284637,
            lng: -83.6181554,
        },
        googleMapsLink: 'https://maps.google.com/maps?cid=2268885837745156805',
        handle: 'highland',
        locationNumber: 63,
        phoneNumber: '248-887-2410',
        state: 'Michigan',
        title: 'Highland, MI',
        zip: 48357,
    },
    {
        address: '2525 E Grand River Rd',
        city: 'Williamston',
        geolocation: {
            _type: 'geopoint',
            lat: 42.685101,
            lng: -84.2629619,
        },
        googleMapsLink: 'https://maps.google.com/maps?cid=12131623024442618823',
        handle: 'williamston-online',
        locationNumber: 64,
        phoneNumber: '517-655-1803',
        state: 'Michigan',
        title: 'Williamston, MI (E-Commerce)',
        zip: 48895,
    },
    {
        address: '1047 N Shiawassee St',
        city: 'Corunna',
        geolocation: {
            _type: 'geopoint',
            lat: 42.9965633,
            lng: -84.1221656,
        },
        googleMapsLink: 'https://maps.google.com/maps?cid=13350137965574263705',
        handle: 'corunna',
        locationNumber: 65,
        partsPhoneNumber: '517-927-9619',
        phoneNumber: '989-743-8844',
        servicePhoneNumber: '517-614-3218',
        state: 'Michigan',
        title: 'Corunna, MI',
        zip: 48817,
    },
    {
        address: '3915 Tractor Drive',
        city: 'Howell',
        geolocation: {
            _type: 'geopoint',
            lat: 42.6205732,
            lng: -83.9935972,
        },
        googleMapsLink: 'https://www.google.com/maps?cid=17837768501208751903',
        handle: 'howell',
        locationNumber: 66,
        phoneNumber: '517-540-6141',
        state: 'Michigan',
        title: 'Howell, MI',
        zip: 48855,
    },
    {
        address: '290 N Railroad St',
        city: 'Rives Junction',
        geolocation: {
            _type: 'geopoint',
            lat: 42.3882704,
            lng: -84.4657646,
        },
        googleMapsLink: 'https://maps.google.com/maps?cid=15618453756614428384',
        handle: 'rives-junction',
        locationNumber: 67,
        partsPhoneNumber: '517-614-0210',
        phoneNumber: '517-513-6071',
        state: 'Michigan',
        title: 'Rives Junction, MI',
        zip: 49277,
    },
    {
        address: '110 S Lincoln St',
        city: 'Charlotte',
        geolocation: {
            _type: 'geopoint',
            lat: 42.5631309,
            lng: -84.8483576,
        },
        googleMapsLink: 'https://www.google.com/maps?cid=16922207306427351583',
        handle: 'charlotte',
        locationNumber: 68,
        phoneNumber: '517-543-2540',
        state: 'Michigan',
        title: 'Charlotte, MI',
        zip: 48813,
    },
];

export default locationsData;