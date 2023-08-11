const api_url = {
    development: {
        API_URL_getListsApi: 'https://esexqht4ce.execute-api.eu-central-1.amazonaws.com/feature/lists',
        API_URL_createListApi:'https://esexqht4ce.execute-api.eu-central-1.amazonaws.com/feature/list',
        API_URL_updateListTitleApi:'https://esexqht4ce.execute-api.eu-central-1.amazonaws.com/feature/list',
        API_URL_deleteListApi:'https://esexqht4ce.execute-api.eu-central-1.amazonaws.com/feature/list/{id}',
        API_URL_createCardApi:'https://esexqht4ce.execute-api.eu-central-1.amazonaws.com/feature/card',
        API_URL_updateCardApi:'https://esexqht4ce.execute-api.eu-central-1.amazonaws.com/feature/card',
        API_URL_deleteCardApi:'https://esexqht4ce.execute-api.eu-central-1.amazonaws.com/feature/card/{id}',
        API_URL_getCardsByListId:'https://esexqht4ce.execute-api.eu-central-1.amazonaws.com/feature/cards/{id}',
    },
    production: {
        API_URL_getListsApi: 'https://esexqht4ce.execute-api.eu-central-1.amazonaws.com/feature/lists',
        API_URL_createListApi:'https://esexqht4ce.execute-api.eu-central-1.amazonaws.com/feature/list',
        API_URL_updateListTitleApi:'https://esexqht4ce.execute-api.eu-central-1.amazonaws.com/feature/list',
        API_URL_deleteListApi:'https://esexqht4ce.execute-api.eu-central-1.amazonaws.com/feature/list/{id}',
        API_URL_createCardApi:'https://esexqht4ce.execute-api.eu-central-1.amazonaws.com/feature/card',
        API_URL_updateCardApi:'https://esexqht4ce.execute-api.eu-central-1.amazonaws.com/feature/card',
        API_URL_deleteCardApi:'https://esexqht4ce.execute-api.eu-central-1.amazonaws.com/feature/card/{id}',
        API_URL_getCardsByListId:'https://esexqht4ce.execute-api.eu-central-1.amazonaws.com/feature/cards/{id}',
    },
};
export default api_url;
