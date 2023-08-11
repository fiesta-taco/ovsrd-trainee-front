const api_url = {
    development: {
        API_URL_getListsApi: 'http://localhost:3000/dev/lists',
        API_URL_createListApi:'http://localhost:3000/dev/list',
        API_URL_updateListTitleApi:'http://localhost:3000/dev/list',
        API_URL_deleteListApi:'http://localhost:3000/dev/list/',
        API_URL_createCardApi:'http://localhost:3000/dev/card',
        API_URL_updateCardApi:'http://localhost:3000/dev/card',
        API_URL_deleteCardApi:'http://localhost:3000/dev/card/',
        API_URL_getCardsByListId:'http://localhost:3000/dev/cards/',
    },
    production: {
        API_URL_getListsApi: 'http://localhost:3000/dev/lists',
        API_URL_createListApi:'http://localhost:3000/dev/list',
        API_URL_updateListTitleApi:'http://localhost:3000/dev/list',
        API_URL_deleteListApi:'http://localhost:3000/dev/list/',
        API_URL_createCardApi:'http://localhost:3000/dev/card',
        API_URL_updateCardApi:'http://localhost:3000/dev/card',
        API_URL_deleteCardApi:'http://localhost:3000/dev/card/',
        API_URL_getCardsByListId:'http://localhost:3000/dev/cards/',
    },
};
export default api_url;