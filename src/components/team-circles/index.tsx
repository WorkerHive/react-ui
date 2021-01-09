import React from 'react';
import { Avatar } from '@material-ui/core';
import styles from './styles.module.css';

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
  members: Array<any>;
}

export const TeamCircles : React.FC<TeamCirclesProps> = (props) => {
    return (
        <div className={styles.teamCircles}>
            {props.members.map((mbr) => {
                const member = mbr
                if(member) return <Avatar style={{backgroundColor: '#'+ intToRGB(hashCode(member.name))}}>{member.name.split(' ').map((x) => x.substring(0, 1))}</Avatar>
            })}
        </div>
    )
}
