import React from 'react'
import { Avatar } from "@mui/material";
import styled from 'styled-components';
import TextTruncate from 'react-text-truncate';

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
`;

const Content = styled.div`
    display: flex;
    width: 70%;  
    align-items: start;
    justify-content: left;
    padding: 0 5px;
    font-size: 14px;
`;

export default function Notification({ closeToast, toastProps, avatar, profile_name, content }) {
    return (
        <>
            <Description>Notification</Description>
            <Wrapper>
                <AvatarWrapper>
                    <Avatar
                        src={avatar ? avatar : null}
                        // alt={profile_name}
                        style={{ height: "100%", width: "80%", fontSize: "7vh" }}>
                        {avatar ? null : profile_name?.at(0)}
                    </Avatar>
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
