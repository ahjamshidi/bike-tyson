import EditBikeForm from '@/components/editBikeForm/EditBikeForm';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';



export function EditBikePage () {

  // Extracting `id` from the URL
  const {id} = useParams();

  return (
    <Box sx={{
      width: '100%',
      maxWidth: '500px',
      overflowY: 'auto',
      maxHeight: 'calc(100vh - 120px)',
      padding: '0 20px',
      boxSizing: 'border-box',
      mt: 8,
      pb: 7,
    }}>
      <EditBikeForm bikeId={id}></EditBikeForm>

    </Box>
  );
}
