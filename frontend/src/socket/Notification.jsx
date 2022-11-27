import React, { useEffect } from 'react'
import { Avatar } from "@mui/material";
import styled from 'styled-components';
import TextTruncate from 'react-text-truncate';
import { useState } from 'react';
import { NOTIFICATION_TYPE } from './notification.constant';
import { ThumbUpAlt } from "@mui/icons-material";
import CommentIcon from '@mui/icons-material/Comment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Description = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    font-size: 16px;
    font-weight: 700;
    padding-bottom: 1vh;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const AvatarWrapper = styled.div`
    display: flex;
    width: 30%;  
    align-items: center;
    justify-content: center;
    position: relative;
`;

const Content = styled.div`
    display: flex;
    width: 70%;  
    align-items: start;
    justify-content: left;
    padding: 0 5px;
    font-size: 14px;
`;

const ImgWrapper = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--primary-color);
    background-color: var(--primary-color);
    /* height: 10px; */
    bottom: -10%;
    right: -10%;
    color: white;
    height: 30px;
    width: 30px;
    border-radius: 50px;
`;

function IconImg({notificationType}) {
    const [icon, setIcon] = useState()
    useEffect(() => {
        if (notificationType == NOTIFICATION_TYPE.LIKE) {
            setIcon(<ThumbUpAlt style={{fontSize: "1.9rem"}}/>)
        } else if (notificationType == NOTIFICATION_TYPE.COMMENT) {
            setIcon(<CommentIcon style={{fontSize: "1.9rem"}}/>)
        } else if (notificationType == NOTIFICATION_TYPE.FRIEND_REQUEST) {
            setIcon(<PersonAddIcon style={{fontSize: "1.9rem"}}/>)
        }
    }, [])


    return (
        <ImgWrapper>{icon}</ImgWrapper>
    )
}


export default function Notification({ closeToast, toastProps, avatar, profile_name, content, notification_type }) {
    return (
        <>
            <Description>Notification</Description>
            <Wrapper>
                <AvatarWrapper>
                    <Avatar
                        src={avatar ? avatar : null}
                        style={{ height: "100%", width: "80%", fontSize: "7vh" }}>
                        {avatar ? null : profile_name?.at(0)}
                    </Avatar>
                    <IconImg notification_type={notification_type} />
                </AvatarWrapper>
                <Content>
                    <TextTruncate
                        line={3}
                        element="span"
                        truncateText="…"
                        text={content}
                    // textTruncateChild={<a href="#">Read on</a>}
                    />
                </Content>
            </Wrapper>
        </>
    )
}
