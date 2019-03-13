const idGen = (kind) => {
    return kind + '_' + Date.now() + '_' + Math.random().toString().slice(-8);
};

export {idGen}