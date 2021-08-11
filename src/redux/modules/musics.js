export const Types = {
    SET_MUSICS: 'musics/SET_MUSICS',
    SET_MUSIC: 'music/SET_MUSIC',
    SET_POSITIONMILLIS: 'positionMillis/SET_POSITIONMILLIS',
};

const initialState = {
    musics: {},
    music: null,
    positionMillis: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.SET_MUSICS:
            return { ... state, musics: action.payload}
        case Types.SET_MUSIC:
            return { ... state, music: action.payload}
        case Types.SET_POSITIONMILLIS:
            return { ... state, playback: action.payload}
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

export function setPositionMillis(positionMillis) {
    return {
        type: Types.SET_POSITIONMILLIS,
        payload: positionMillis,
    };
};
