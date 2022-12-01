import { CSSProperties, FC, ReactNode } from 'react';
import { classNames } from '../../utils';

type ProductBoxProps = {
  boxStyle?: 'buyer' | 'seller' | 'outcome';
  children?: ReactNode;
  hidden?: boolean;
};

type ProductBoxStyles = {
  [boxStyleKey in 'buyer' | 'seller' | 'outcome']: CSSProperties;
};

const styles: ProductBoxStyles = {
  buyer: {
    background: '#9D7F69',
    boxShadow: [
      '1px 1px 2px rgba(195, 157, 130, 0.3)',
      '-1px -1px 2px rgba(119, 97, 80, 0.5)',
      'inset -3px 3px 6px rgba(119, 97, 80, 0.2)',
      'inset 3px -3px 6px rgba(119, 97, 80, 0.2)',
      'inset -3px -3px 6px rgba(195, 157, 130, 0.9)',
      'inset 3px 3px 8px rgba(119, 97, 80, 0.9)',
    ].join(', '),
  },
  seller: {
    background: 'linear-gradient(135deg, #C0D7B8 0%, #AEC3A6 100%)',
    boxShadow: [
      '-4px 4px 8px rgba(161, 180, 154, 0.2)',
      '4px -4px 8px rgba(161, 180, 154, 0.2)',
      '-4px -4px 8px rgba(205, 230, 196, 0.9)',
      '4px 4px 10px rgba(161, 180, 154, 0.9)',
      'inset 1px 1px 2px rgba(205, 230, 196, 0.3)',
      'inset -1px -1px 2px rgba(161, 180, 154, 0.5)',
    ].join(', '),
  },
  outcome: {
    background: 'linear-gradient(135deg, #86D6EF 0%, #7AC2D9 100%)',
    boxShadow: [
      '-4px 4px 8px rgba(113, 180, 201, 0.2)',
      '4px -4px 8px rgba(113, 180, 201, 0.2)',
      '-4px -4px 8px rgba(143, 228, 255, 0.9)',
      '4px 4px 10px rgba(113, 180, 201, 0.9)',
      'inset 1px 1px 2px rgba(143, 228, 255, 0.3)',
      'inset -1px -1px 2px rgba(113, 180, 201, 0.5)',
    ].join(', '),
  },
};

export const ProductBox: FC<ProductBoxProps> = ({
  boxStyle,
  children,
  hidden,
}: ProductBoxProps) => (
  <div
    style={boxStyle ? styles[boxStyle] : undefined}
    className={classNames(
      'rounded-lg flex items-center justify-center relative',
      boxStyle ? 'h-[66px] w-[66px]' : '',
      hidden ? 'opacity-20' : '',
    )}
  >
    {children}
  </div>
);
