import type { Project } from '@/types/walkthrough';
import { classNames } from '@/utils/index';
import { FunctionComponent } from 'react';

type Props = {
  project: Project;
}

export const ProjectTitle: FunctionComponent<Props> = ({ project }: Props) => {
  const { title, subtitle, isMyProject } = project;
  return (
    <div className="flex flex-col text-black">
      <p
        className={classNames(isMyProject ? 'font-bold' : '')}
      >
        {title}
      </p>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};
