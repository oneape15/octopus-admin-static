import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less';

export default():React.ReactNode => (
  <PageContainer content="仪表盘">
    <p style={{ textAlign: 'center', marginTop: 24 }}>
      Want to add more pages? Please refer to{' '}
      <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
        use block
      </a>
      。
    </p>
  </PageContainer>
);