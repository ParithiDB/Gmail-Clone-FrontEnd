
import { Typography, CircularProgress, Box } from "@mui/material";


const SuspenseLoader = () => {

    return (
        <div className='center-container'>
        <Box>
            <CircularProgress />
            <Typography>Loading...</Typography>
        </Box>
        </div>
    )
}

export default SuspenseLoader;