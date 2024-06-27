import * as React from 'react';
import { styled, css } from '@mui/system';
import Fade from '@mui/material/Fade';
import { Modal as BaseModal, Box } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Divider from '@mui/material/Divider';
interface ModalComponentProps {
  isOpen: boolean;
  closeModal: () => void;
  modalTitle: string;
  modalCloseElement: any;
  children: any;
}

export default function CustomModal({
  isOpen,
  closeModal,
  modalTitle = '',
  modalCloseElement = <CloseRoundedIcon onClick={closeModal} />,
  children,
}: ModalComponentProps): any {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={isOpen}>
          <ModalContent>
            <Box
              component="div"
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                px: 2,
                pt: 2,
              }}
            >
              <span className="modal-title"> {modalTitle}</span>

             {modalCloseElement}
            </Box>
            <Divider component="div" />
            <Box component="div" sx={{ width: '100%', p: 0, height: '100%' }}>
              {children}
            </Box>
          </ModalContent>
        </Fade>
      </Modal>
    </div>
  );
}
const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  const classListName = open ? 'base-Backdrop-open' : '';
  return <div className={classListName + className} ref={ref} {...other} />;
});

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: end;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    width: 100%;
    height: 80%;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 0px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);
