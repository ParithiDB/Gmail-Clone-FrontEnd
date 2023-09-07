import { Box, Typography, styled, Divider } from '@mui/material';

const Component = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
    opacity: .8,
});

const StyledDivider = styled(Divider)({
    width: '100%',
    marginTop: 10
})

const NoMails = ({ message }) => {

    if (!message) {
        // Handle the case where message is undefined
        return (
            <Component>
                <Typography>No message available</Typography>
                <StyledDivider />
            </Component>
        );
    }


    return (
        <Component>
            <Typography>{message.heading}</Typography>
            <Typography>{message.subHeading}</Typography>
            <StyledDivider />
        </Component>
    )
}

export default NoMails;