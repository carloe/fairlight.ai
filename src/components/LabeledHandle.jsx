import React from 'react';
import { Handle } from 'reactflow';

export const LabeledHandle = ({ label, ...handleProps }) => (
    <div className="flex items-center">
        <span className="mr-2 text-xs ">{label}</span>
        <Handle {...handleProps} style={{top: '0px'}} />
    </div>
);