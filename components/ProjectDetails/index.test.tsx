import { ReactNode } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { ProjectDetails } from './index';
import { Project } from '../../types/project';
import { ProjectsContext } from '../../context/ProjectsContext';
import { MAP_REGION_PATHS } from '../MapRegion';
import { MAP_INDICES } from '../../constants/map';

const createProject = (overrides?: Partial<Project>) => ({
  title: 'My Project',
  cost: 42000,
  products: { biodiversity: 1, nutrients: 2 },
  accepted: () => true,
  discountOrBonus: 0,
  ...overrides,
});

type WrapperProps = { children: ReactNode };

const setProjectCost = jest.fn();
const setIsProjectDivisible = jest.fn();

const wrapper = ({ children }: WrapperProps) => (
  <ProjectsContext.Provider
    value={{
      setProjectCost,
      getProjectCost: jest.fn(),
      getAcceptedProjectCost: jest.fn(),
      setIsProjectDivisible,
      isProjectDivisible: () => false,
    }}
  >
    {children}
  </ProjectsContext.Provider>
);

describe('ProjectDetails', () => {
  it('disables the cost input when the form is not enabled', async () => {
    render(
      <ProjectDetails
        projects={[createProject()]}
        onFormSubmit={jest.fn()}
        roleId="buyer"
      />,
      { wrapper },
    );

    const textInput = screen.getByRole('textbox');

    expect(textInput).toBeDisabled();
  });

  it('disables the input for inactive projects when the form is enabled', () => {
    render(
      <ProjectDetails
        isFormEnabled
        projects={[
          createProject({ subtitle: 'Field 1', cost: 42000 }),
          createProject({ subtitle: 'Field 2', isInactive: true }),
        ]}
        onFormSubmit={jest.fn()}
        roleId="buyer"
      />,
      { wrapper },
    );

    const textInputs = screen.getAllByRole('textbox');
    const listItems = screen.getAllByRole('listitem');

    expect(textInputs).toHaveLength(2);

    expect(listItems[0]).toHaveTextContent('Field 1');
    expect(textInputs[0]).not.toBeDisabled();

    expect(listItems[1]).toHaveTextContent('Field 2');
    expect(textInputs[1]).toBeDisabled();
  });

  it('disables a cost select input when the form is not enabled', async () => {
    render(
      <ProjectDetails
        projects={[createProject({ cost: [42000, 43000] })]}
        onFormSubmit={jest.fn()}
        roleId="buyer"
      />,
      { wrapper },
    );

    const selectInput = screen.getByRole('combobox');

    expect(selectInput).toBeDisabled();
  });

  it('enables the cost input when the form is enabled and calls the callback on change', async () => {
    const project = createProject();

    render(
      <ProjectDetails
        isFormEnabled
        projects={[project]}
        onFormSubmit={jest.fn()}
        roleId="buyer"
      />,
      { wrapper },
    );

    const textInput = screen.getByRole('textbox');

    expect(textInput).not.toBeDisabled();

    fireEvent.change(textInput, { target: { value: '42000' } });

    expect(setProjectCost).toHaveBeenCalledTimes(1);
    expect(setProjectCost).toHaveBeenCalledWith(project, 42000);
  });

  it('enables a cost select input when the form is enabled and calls the callback on change', async () => {
    const project = createProject({ cost: [42000, 43000] });

    render(
      <ProjectDetails
        isFormEnabled
        projects={[project]}
        onFormSubmit={jest.fn()}
        roleId="buyer"
      />,
      { wrapper },
    );

    const selectInput = screen.getByRole('combobox');

    expect(selectInput).not.toBeDisabled();

    fireEvent.change(selectInput, { target: { value: '43000' } });

    expect(setProjectCost).toHaveBeenCalledTimes(1);
    expect(setProjectCost).toHaveBeenCalledWith(project, 43000);
  });

  it.each`
    roleId       | placeholder
    ${'buyer'}   | ${'Enter bid...'}
    ${'seller'}  | ${'Enter offer...'}
    ${'generic'} | ${''}
  `(
    'sets the expected placeholder text for a $roleId',
    ({ roleId, placeholder }) => {
      render(
        <ProjectDetails
          isFormEnabled
          projects={[createProject()]}
          onFormSubmit={jest.fn()}
          roleId={roleId}
        />,
        { wrapper },
      );

      const textInput = screen.getByRole('textbox');

      expect(textInput).toHaveProperty('placeholder', placeholder);
    },
  );

  it('lists the expected projects', () => {
    render(
      <ProjectDetails
        projects={[
          createProject({ subtitle: 'Field 1', cost: 42000 }),
          createProject({ subtitle: 'Field 2', cost: 43000 }),
        ]}
        onFormSubmit={jest.fn()}
        roleId="buyer"
      />,
      { wrapper },
    );

    const listItems = screen.getAllByRole('listitem');

    expect(listItems).toHaveLength(2);

    expect(listItems[0]).toHaveTextContent('Field 1');
    expect(listItems[0]).toHaveTextContent('£42,000');

    expect(listItems[1]).toHaveTextContent('Field 2');
    expect(listItems[1]).toHaveTextContent('£43,000');
  });

  it('does not grey out an active project', () => {
    render(
      <ProjectDetails
        projects={[createProject()]}
        onFormSubmit={jest.fn()}
        roleId="buyer"
      />,
      { wrapper },
    );

    const listItem = screen.getByRole('listitem');

    expect(listItem.className).not.toContain('opacity');
  });

  it('greys out an inactive project', () => {
    render(
      <ProjectDetails
        projects={[createProject({ isInactive: true })]}
        onFormSubmit={jest.fn()}
        roleId="buyer"
      />,
      { wrapper },
    );

    const listItem = screen.getByRole('listitem');

    expect(listItem.className).toContain('opacity');
  });

  it('does not submit the form if not enabled', () => {
    const onFormSubmit = jest.fn();

    render(
      <ProjectDetails
        projects={[createProject()]}
        onFormSubmit={onFormSubmit}
        roleId="buyer"
      />,
      { wrapper },
    );

    fireEvent.click(screen.getByText('Submit'));

    expect(onFormSubmit).not.toHaveBeenCalled();
  });

  it('submits the form if enabled', () => {
    const onFormSubmit = jest.fn();

    render(
      <ProjectDetails
        isFormEnabled
        projects={[createProject()]}
        onFormSubmit={onFormSubmit}
        roleId="buyer"
      />,
      { wrapper },
    );

    fireEvent.submit(screen.getByText('Submit'));

    expect(onFormSubmit).toHaveBeenCalledTimes(1);
  });

  it('updates the project divisibility when the divisibility input is checked', async () => {
    const project = createProject();

    render(
      <ProjectDetails
        isFormEnabled
        showDivisibleInput
        isDivisibleInputEnabled
        projects={[project]}
        onFormSubmit={jest.fn()}
        roleId="buyer"
      />,
      { wrapper },
    );

    fireEvent.click(screen.getByText('Divisible'));
    fireEvent.submit(screen.getByText('Submit'));

    expect(setIsProjectDivisible).toHaveBeenCalledTimes(1);
    expect(setIsProjectDivisible).toHaveBeenCalledWith(project, true);
  });

  it('updates the project divisibility when the divisibility input is not checked', async () => {
    const project = createProject();

    render(
      <ProjectDetails
        isFormEnabled
        showDivisibleInput
        isDivisibleInputEnabled
        projects={[project]}
        onFormSubmit={jest.fn()}
        roleId="buyer"
      />,
      { wrapper },
    );

    fireEvent.submit(screen.getByText('Submit'));

    expect(setIsProjectDivisible).toHaveBeenCalledTimes(1);
    expect(setIsProjectDivisible).toHaveBeenCalledWith(project, false);
  });

  it('revises the form if enabled', () => {
    const onFormRevise = jest.fn();

    render(
      <ProjectDetails
        isFormReviseEnabled
        projects={[createProject()]}
        onFormSubmit={jest.fn()}
        onFormRevise={onFormRevise}
        roleId="buyer"
      />,
      { wrapper },
    );

    fireEvent.click(screen.getByText('Revise'));

    expect(onFormRevise).toHaveBeenCalledTimes(1);
  });

  it('does not revise the form if not enabled', () => {
    const onFormRevise = jest.fn();

    render(
      <ProjectDetails
        isFormEnabled
        projects={[createProject()]}
        onFormSubmit={jest.fn()}
        onFormRevise={onFormRevise}
        roleId="buyer"
      />,
      { wrapper },
    );

    expect(screen.queryByText('Revise')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Submit'));

    expect(onFormRevise).not.toHaveBeenCalled();
  });

  it('hides the submit button', () => {
    render(
      <ProjectDetails
        isFormSubmitHidden
        projects={[createProject()]}
        onFormSubmit={jest.fn()}
        roleId="buyer"
      />,
      { wrapper },
    );

    expect(screen.getByText('Submit')).toHaveClass('hidden');
  });

  it('shows the selected map region', async () => {
    const region = 's1';

    render(
      <ProjectDetails
        projects={[createProject({ mapRegions: [region] })]}
        onFormSubmit={jest.fn()}
        roleId="buyer"
      />,
      { wrapper },
    );

    const mapRegion = screen.getByTestId('map-region');
    const path = mapRegion.getAttribute('d');

    expect(path).toBe(MAP_REGION_PATHS[MAP_INDICES[region]]);
  });

  it('shows multiple selected map regions', async () => {
    const regionA = 's1';
    const regionB = 's2';

    render(
      <ProjectDetails
        projects={[createProject({ mapRegions: [regionA, regionB] })]}
        onFormSubmit={jest.fn()}
        roleId="buyer"
      />,
      { wrapper },
    );

    const mapRegions = screen.getAllByTestId('map-region');

    expect(mapRegions.map((el) => el.getAttribute('d'))).toEqual([
      MAP_REGION_PATHS[MAP_INDICES[regionA]],
      MAP_REGION_PATHS[MAP_INDICES[regionB]],
    ]);
  });

  it('lists projects with a cost per credit', () => {
    render(
      <ProjectDetails
        projects={[
          createProject({
            subtitle: 'Field 1',
            cost: 42000,
            costPerCredit: 25000,
            products: { biodiversity: 1 },
          }),
          createProject({
            subtitle: 'Field 2',
            cost: 43000,
            costPerCredit: 30000,
            products: { nutrients: 1 },
          }),
        ]}
        onFormSubmit={jest.fn()}
        roleId="buyer"
      />,
      { wrapper },
    );

    const listItems = screen.getAllByRole('listitem');

    expect(listItems).toHaveLength(2);

    expect(within(listItems[0]).queryByTestId('credit')).toHaveTextContent(
      '£25,000',
    );

    expect(within(listItems[1]).queryByTestId('credit')).toHaveTextContent(
      '£30,000',
    );
  });

  it('lists projects with a shared cost', () => {
    render(
      <ProjectDetails
        projects={[
          createProject({
            subtitle: 'Field 1',
            cost: 42000,
            costPerCredit: 25000,
            sharedCost: 100000,
          }),
          createProject({
            subtitle: 'Field 2',
            cost: 43000,
            costPerCredit: 25000,
            sharedCost: 100000,
          }),
        ]}
        onFormSubmit={jest.fn()}
        roleId="buyer"
      />,
      { wrapper },
    );

    const listItems = screen.getAllByRole('listitem');

    expect(listItems).toHaveLength(3);

    expect(within(listItems[0]).queryByTestId('credit')).toBeNull();
    expect(within(listItems[1]).queryByTestId('credit')).toBeNull();
    expect(within(listItems[2]).getByTestId('credit')).not.toBeNull();

    expect(within(listItems[2]).getByTestId('credit')).toHaveTextContent(
      '£100,000',
    );
  });
});
