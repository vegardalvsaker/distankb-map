export const getApiUrl = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return 'https://localhost:5001/api/deringenskulletru'
    } else {
        return 'https://deringenskulletru-api.azurewebsites.net/api/deringenskulletru'
    }
}
export const seasons = [
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
    '2011',
    '2010',
    '2009',
    '2008',
    '2007',
    '2005',
    '2004',
    '2003',
    '2002',
]
