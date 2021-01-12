import React from 'react';
import { Avatar } from '@material-ui/core';
import styled from 'styled-components'

function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

export interface TeamCirclesProps{
  className?: string;
  members: Array<any>;
}

export const TeamCircles : React.FC<TeamCirclesProps> = ({
  members = [],
  className
}) => {
    return (
        <div className={className}>
            {members.map((mbr) => {
                const member = mbr
                if(member) return <Avatar style={{backgroundColor: '#'+ intToRGB(hashCode(member.name))}}>{member.name.split(' ').map((x) => x.substring(0, 1))}</Avatar>
            })}
        </div>
    )
}

export const StyledCircles = styled(TeamCircles)`
  display: flex;

  .MuiAvatar-root:not(:first-child){
    margin-left: -18px;
  }

`
