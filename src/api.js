const api = {
    'preprod': {
        'common': 'http://www.preprod.hotgrid.cn:8082/API_Application_Grid/grid/pc',
        'BJ': 'http://www.preprod.hotgrid.cn:8282/API_Application_Grid_BJ/grid/pc'
    },
    'prod': {
        'common': 'http://www.hotgrid.cn:10007/API_Application_Grid/grid/pc',
        'BJ': 'http://www.hotgrid.cn:10007/API_Application_Grid_BJ/grid/pc'
    },
    'dev': {
        'common': 'http://120.52.56.22:8082/API_Application_Grid/grid/pc',
        'BJ': 'http://120.52.56.22:8282/API_Application_Grid_BJ/grid/pc'
    }
}

export default api[env];
