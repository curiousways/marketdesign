import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProjectDetails } from './index';

describe('ProjectDetails', () => {
  it('disables the cost input when the form is not enabled', async () => {
    render(
      <ProjectDetails
        projects={[
          {
            title: 'My Project',
            cost: 42000,
            products: { biodiversity: 1, nutrients: 2 },
          },
        ]}
        onFormSubmit={jest.fn()}
        roleId="buyer"
        getProjectCost={jest.fn()}
        setProjectCost={jest.fn()}
      />,
    );

    const textInput = screen.getByRole('textbox');

    expect(textInput).toBeDisabled();
  });

  it('disables a cost select input when the form is not enabled', async () => {
    render(
      <ProjectDetails
        projects={[
          {
            title: 'My Project',
            cost: [42000, 43000],
            products: { biodiversity: 1, nutrients: 2 },
          },
        ]}
        onFormSubmit={jest.fn()}
        roleId="buyer"
        getProjectCost={jest.fn()}
        setProjectCost={jest.fn()}
      />,
    );

    const selectInput = screen.getByRole('combobox');

    expect(selectInput).toBeDisabled();
  });

  it('enables the cost input when the form is enabled', async () => {
    render(
      <ProjectDetails
        isFormEnabled
        projects={[
          {
            title: 'My Project',
            cost: 42000,
            products: { biodiversity: 1, nutrients: 2 },
          },
        ]}
        onFormSubmit={jest.fn()}
        roleId="buyer"
        getProjectCost={jest.fn()}
        setProjectCost={jest.fn()}
      />,
    );

    const textInput = screen.getByRole('textbox');

    expect(textInput).not.toBeDisabled();
  });
});
