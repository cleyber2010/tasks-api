export function extractQueryParams(query) {

    return query.substring(1).split('&').reduce((queryParams, queryItem) => {
        const [key, value] = queryItem.split('=');
        queryParams[key] = value;
        return queryParams;
    }, {});
}