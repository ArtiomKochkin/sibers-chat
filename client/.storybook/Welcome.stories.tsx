import React from 'react';
import { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Welcome',
  parameters: {
    docs: {
      description: {
        component: 'Добро пожаловать в Storybook!',
      },
    },
  },
};

export default meta;

export const Default = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h1>Welcome to Storybook</h1>
    <p>
      Здесь вы можете просматривать и тестировать компоненты приложения.
    </p>
  </div>
);