import { ActionReducer, Action } from '@ngrx/store';
import { ADD_ITEM, ADD_LIST, CLEAN_CACHE } from '../actions';

const defaultState = {
    pages: {},
    posts: {},
    tags: {},
    categories: {},
    users: {},
};

export const itemsReducer: ActionReducer<Object> = (state: Object = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case ADD_ITEM: {
            return Object.assign({}, state, {
                [payload.id]: payload
            });
        }

        case ADD_LIST: {
            const { list, itemType } = payload;
            const newItems = {};

            list.forEach((item) => {
                newItems[item.id] = item;
                if (item._embedded && item._embedded.author) { // already stored in the state. avoid duplicates
                    delete item._embedded.author;
                }
            });
            console.log('eee', newItems)
            return Object.assign({}, state, {
                [itemType]: Object.assign({}, state[itemType], newItems)
            });
        }

        case CLEAN_CACHE: {
            return defaultState;
        }

        default:
            return state;
    }
}