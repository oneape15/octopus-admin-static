import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2020 oneape15"
    links={[
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/oneape15/octopus-admin-static',
        blankTarget: true,
      },
      {
        key: 'Octopus Admin',
        title: 'Octopus Admin',
        href: '#',
        blankTarget: true,
      }
    ]}
  />
);
