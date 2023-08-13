import React from 'react';

interface Props {
    name?: string;
}

export const AccountGrid: React.FC<Props> = ({
                                              name="Test"}) => {
    return(
        <div>
            <div>{name}</div>
            <div>{name}</div>
            <div>{name}</div>
            <div>{name}</div>
            <div>{name}</div>
            <div>{name}</div>
            <div>{name}</div>
            <div>{name}</div>
            <div>{name}</div>
            <div>{name}</div>
        </div>
    );
}