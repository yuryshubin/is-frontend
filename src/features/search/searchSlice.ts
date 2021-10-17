import {BLSearchItem} from './types/BLSearchItem';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from '../../app/store';
import SearchAPI, {SearchServiceResponse} from './searchAPI';
import {RootState} from '../../app/rootReducer';
import {logger} from '../../globals';

export interface SearchState {
   loading: boolean;
   items: BLSearchItem[];
   errorMessage?: string;
   currentPage: number;
   totalPages: number;
   criteria?: string;
   runningRequest: number;
}

export const initialState: SearchState = {
   loading: false,
   items: [],
   errorMessage: undefined,
   currentPage: 0,
   totalPages: 0,
   runningRequest: 0,
};

export const searchSlice = createSlice({
   name: 'search',
   initialState,
   reducers: {
      reset: (state) => {
         state.items = [];
         state.errorMessage = undefined;
         state.currentPage = 0;
         state.totalPages = 0;
         state.criteria = undefined;
      },
      setRunningRequest: (state, {payload}: PayloadAction<string>) => {
         state.criteria = payload;
         state.runningRequest = state.runningRequest + 1;
      },
      setLoading: (state, {payload}: PayloadAction<boolean>) => {
         state.loading = payload;
         state.errorMessage = payload ? undefined : state.errorMessage;
      },
      setSuccess: (state, {payload}: PayloadAction<{response: SearchServiceResponse; criteria?: string}>) => {
         state.errorMessage = undefined;
         state.loading = false;
         state.runningRequest = 0;

         if (state.criteria !== payload.criteria) state.items = payload.response.items;
         else state.items = state.items.concat(payload.response.items);

         state.currentPage = payload.response.currentPage;
         state.totalPages = payload.response.totalPages;
      },
      setError: (state, {payload}: PayloadAction<string>) => {
         state.loading = false;
         state.errorMessage = payload;
         state.items = [];
      },
   },
});

export const searchItems =
   (criteria: string): AppThunk =>
   async (dispatch, getState) => {
      try {
         const minSearchLength = 1;
         const itemsLimit = 12;

         const validators = {
            criteriaInvalid: (): boolean => !criteria || criteria.length < minSearchLength,
            criteriaChanged: (): boolean => criteria !== getState().search.criteria,
            samePageLoading: (): boolean => getState().search.loading && getState().search.criteria === criteria,
            pageOutOfBounds: (): boolean =>
               getState().search.currentPage > 0 && getState().search.currentPage === getState().search.totalPages,
         };

         if (validators.criteriaInvalid()) {
            logger.debug(`invalid criteria. reset state`);
            return dispatch(reset());
         }

         if (validators.samePageLoading()) {
            return logger.debug(`same page is being loaded`);
         }

         if (validators.criteriaChanged()) {
            logger.debug(`criteria changed`);
            dispatch(reset());
         }

         if (validators.pageOutOfBounds()) {
            return logger.debug(`page is out of bounds`);
         }

         dispatch(setLoading(true));
         dispatch(setRunningRequest(criteria));
         const prevRunningRequest = getState().search.runningRequest;

         const response = await SearchAPI.search(criteria, getState().search.currentPage + 1, itemsLimit);

         if (getState().search.runningRequest === prevRunningRequest) {
            logger.debug(`processing: ${response.items.length} ${response.currentPage} / ${response.totalPages}`);
            dispatch(setSuccess({response, criteria}));
         }
      } catch (e: any) {
         logger.error(`search call failed`, e);
         dispatch(setError('sorry, got an error'));
      }
   };

export const {reset, setLoading, setRunningRequest, setSuccess, setError} = searchSlice.actions;
export const searchSelector = (state: RootState) => state.search;
export default searchSlice.reducer;
