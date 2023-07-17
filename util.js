export function CreateDefinitionExpression(subExpression) {
    const chikakojiExpression = "L01_022 LIKE '" + subExpression + "%'";
    const cityareaExpression = "JCODE LIKE '" + subExpression + "%'";
    return {chikaExp: chikakojiExpression, cityExp:cityareaExpression}
}

export function ZoomToLayer(layer, view) {
    return layer.queryExtent().then((response) => {
        view.goTo(response.extent, {"duration":1000}).catch((error) => {
            console.error(error);
        });
    });
}