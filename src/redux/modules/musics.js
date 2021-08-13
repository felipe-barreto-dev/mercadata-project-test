export const Types = {
    SET_MUSICS: 'musics/SET_MUSICS',
    SET_MUSIC: 'music/SET_MUSIC',
};

const initialState = {
    musics: {},
    music: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.SET_MUSICS:
            return { ... state, musics: action.payload}
        case Types.SET_MUSIC:
            return { ... state, music: action.payload}
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

export function setMusic(music) {
    return {
        type: Types.SET_MUSIC,
        payload: music,
    };
};