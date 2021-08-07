export const Types = {
    SET_MUSICS: 'musics/SET_MUSICS',
};

const initialState = {
    musics: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.SET_MUSICS:
            return { ... state, musics: action.payload}
        default:
            return state;
    }
}

export function setMusics(musics) {
    return {
        type: Types.SET_MUSICS,
        payload: musics,
    };
};
