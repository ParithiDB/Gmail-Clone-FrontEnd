import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, styled, Typography, Box, InputBase, TextField, Button } from '@mui/material'; 
import { Close, DeleteOutline } from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const dialogStyle = { 
    height: '90%',
    width: '80%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    borderRadius: '10px 10px 0 0',
}


const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    background: #f2f6fc;
    & > p {
        font-size: 14px;
        font-weight: 500;
    }
`;

const RecipientWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    & > div {
        font-size: 14px;
        border-bottom: 1px solid #F5F5F5;
        margin-top: 10px;
    }
`;

const Footer = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    align-items: center;
`;

const SendButton = styled(Button)`
    background: #0B57D0;
    color: #fff;
    font-weight: 500;
    text-transform: none;
    border-radius: 18px;
    width: 100px;
`

const ComposeMail = ({ open, setOpenDrawer }) => {
    const [ data, setData ] = useState({});
    const sentEmailService = useApi(API_URLS.saveSentEmails);
    const saveDraftService = useApi(API_URLS.saveDraftEmails);

    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const sendEmail = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://gmail-clone-backend-22a3.onrender.com/send-email', {
              to: data.to,
              subject: data.subject,
              body: data.body,
            });
      
            console.log('Email sent successfully:', response.data.message);
            alert('Email sent Successfully');
      
           
          } catch (error) {
            console.error('Email send failed:', error);
          }

        const payload = {
            to : data.to,
            from : `'Doggo' <${process.env.FROM_MAIL_ID}>`,
            subject : data.subject,
            body : data.body,
            date: new Date(),
            image: '',
            name: `${process.env.FROM_NAME}`,
            starred: false,
            type: 'sent'
        }

        sentEmailService.call(payload);

        if (!sentEmailService.error) {
            setOpenDrawer(false);
            setData({});
        } else {

        }
    }

    const closeComposeMail = (e) => {
        e.preventDefault();
        console.log("draft saved");
        const payload = {
            to : data.to,
            from : `'Doggo' <${process.env.FROM_MAIL_ID}>`,
            subject : data.subject,
            body : data.body,
            date: new Date(),
            image: '',
            name: `${process.env.FROM_NAME}`,
            starred: false,
            type: 'drafts'
        }

        saveDraftService.call(payload);

        if (!saveDraftService.error) {
            setOpenDrawer(false);
            setData({});
        } else {
            console.log("draft saved in else");
        }
    }

    return (
        <Dialog
            open={open}
            PaperProps={{ sx: dialogStyle }}
        >
            <Header>
                <Typography>New Message</Typography>
                <Close fontSize="small" onClick={(e) => closeComposeMail(e)} />
            </Header>
            <RecipientWrapper>
                <InputBase placeholder='Recipients' name="to" onChange={(e) => onValueChange(e)} value={data.to} />
                <InputBase placeholder='Subject' name="subject" onChange={(e) => onValueChange(e)} value={data.subject} />
            </RecipientWrapper>
            <TextField
                multiline
                rows={20}
                sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                name="body"
                onChange={(e) => onValueChange(e)}
                value={data.body}
            />
            <Footer>
                <SendButton onClick={(e) => sendEmail(e)}>Send</SendButton>
                <DeleteOutline onClick={() => setOpenDrawer(false)} />
            </Footer>
        </Dialog>
    )
}

export default ComposeMail;