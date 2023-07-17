//地価公示レイヤーのシンボルを定義
const chikakojiLyrSymbol = {
    type: "simple-marker",
    size: 8,
    color: "#0000ff",
    outline: {
        color: "white",
        width: 1
    }
};

const CreateChikakojiSimpleRenderer = () => {
    const simpleRenderer = {
        type: "simple",
        symbol: chikakojiLyrSymbol,
    }
    return simpleRenderer;
}

export {
    CreateChikakojiSimpleRenderer,
}