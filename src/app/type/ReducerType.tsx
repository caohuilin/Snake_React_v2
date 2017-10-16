interface IRouting {
    locationBeforeTransitions: {
        pathname: string;
    };
}

interface IAllState {
    routing: IRouting;
}
export {
    IAllState,
    IRouting,
};
