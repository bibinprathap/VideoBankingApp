const common ={};
export default config = {
    production: {
        ...common,
        title: 'Production',
        baseURL: 'https://not.live.yet', //Todo: replace with production url
       
    },
    test: {
        ...common,
        title: 'Test',
        baseURL: 'https://test/api',
    },
    zahid: {
        ...common,
        title: 'zahid',
        baseURL: 'http://172.18.128.94/api',
    },
    bibin: {
        ...common,
        title: 'Bibin',
        baseURL: 'https://adroitclouderpreport.ngrok.io/api',
    }
};