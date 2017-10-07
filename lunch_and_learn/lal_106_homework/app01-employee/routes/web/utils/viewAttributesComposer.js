let viewAttributesComposer = (title, extraObject) => {
    /* return ({
        title,
        ...extraObject
    });*/
    return Object.assign({title}, extraObject);
};

export default viewAttributesComposer;