import * as React from 'react';
import { initialAppState, type AppState, type Action } from './AppState';

const AppStateContext = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialAppState,
  dispatch: () => {
    throw new Error();
  },
});

export default AppStateContext;

export function useAppState(): AppState {
  const { state } = React.useContext(AppStateContext);
  return React.useMemo(() => {
    return state;
  }, [state]);
}

export function useDispatch(): React.Dispatch<Action> {
  const { dispatch } = React.useContext(AppStateContext);
  return React.useCallback(
    (action: Action) => {
      dispatch(action);
    },
    [dispatch]
  );
}
