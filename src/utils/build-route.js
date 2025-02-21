export function buildRoutes(path) {
    //Selecionando os parametros da url, tudo que começa com :, por exemplo /tasks/:id, o :id será selecionado
    const pathParamsRegex = /:([a-zA-Z]+)/g;
    //Substituindo o parametro pela regex, toda url que atender os parametros da regex retornaram test ok.
    const pathWithParams = path.replaceAll(pathParamsRegex, '([a-zA-Z0-9\-_]+)');

    return new RegExp(`^${pathWithParams}`);
}