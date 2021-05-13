import React, { FC } from 'react';
import { SnackbarOrigin, SnackbarProvider } from 'notistack';
import { isMobile } from 'react-device-detect';

const MAX_SNACKBAR = 3;
const AUTO_HIDE_DURATION = 3000;
const POSITION = {
  vertical: 'bottom',
  horizontal: 'left',
};
interface IFNotistackWrapperProps {}

const FNotistackWrapper: FC<IFNotistackWrapperProps> = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={MAX_SNACKBAR}
      autoHideDuration={AUTO_HIDE_DURATION}
      anchorOrigin={POSITION as SnackbarOrigin}
      dense={isMobile}
    >
      {children}
    </SnackbarProvider>
  );
};
export default FNotistackWrapper;
