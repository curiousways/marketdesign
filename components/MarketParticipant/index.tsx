import { AnimationProps, motion } from 'framer-motion';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { classNames } from '@/utils/index';
import { fadeInDown } from '@/utils/animations';
import { RoleId } from '@/types/roles';
import { HammerIcon } from '../../icons/HammerIcon';
import { PoundcashTag } from '../../icons/PoundcashTag';
import { CartPlus } from '../../icons/CartPlus';
import { OfferIcon } from '../../icons/OfferIcon';
import { MarketParticipantTitle } from '../MarketParticipantTitle';
import { Products } from '../../types/products';
import { BiodiversityCount } from '../BiodiversityCount';
import { NutrientCount } from '../NutrientCount';
import { getAdjustedCost } from '../../utils/project';
import { MarketParticipantMetric } from '../MarketParticipantMetric';

const PROJECT_HEIGHT = 120;
const PROJECT_WIDTH = 800;
const PROJECT_BOTTOM_MARGIN = 15;
const COLLAPSED_PROJECT_HEIGHT = 60;
const COLLAPSED_PROJECT_WIDTH = 210;
const SHOW_LOSERS_MAX_SCREEN_WIDTH = 1700;
const PROJECT_PADDING = '1.25rem';

type MarketParticipantProps = {
  title: string;
  subtitle?: string;
  projectRoleId: 'buyer' | 'seller';
  projectCost: number;
  accepted: boolean | number;
  discountOrBonus: number;
  products: Products;
  isLoser?: boolean;
  loserIndex?: number;
  className?: string;
  isMyProject?: boolean;
  isFirstGroupedProject?: boolean;
  isLastGroupedProject?: boolean;
  isSubsequentGroupedProject?: boolean;
  showCosts?: boolean;
  showWinners?: boolean;
  showSurpluses?: boolean;
  isMarketSolved?: boolean;
  isGroupedProject?: boolean;
  isDivisible?: boolean;
  totalCost: number;
};

const calculatePayment = (
  cost: number,
  discountOrBonus: number,
  accepted: boolean | number,
  projectRoleId: RoleId,
  isGroupedProject?: boolean,
) => {
  const adjustedCost = isGroupedProject
    ? cost
    : getAdjustedCost(cost, accepted);

  if (projectRoleId === 'buyer') {
    return adjustedCost - discountOrBonus;
  }

  return Math.round(adjustedCost + discountOrBonus);
};

const getBorderRadiusStyles = (
  isGroupedProject?: boolean,
  isFirstGroupedProject?: boolean,
  isLastGroupedProject?: boolean,
  isNotFullWidth?: boolean,
): CSSProperties => {
  const borderRadius = '0.5rem';

  if (!isGroupedProject) {
    return { borderRadius };
  }

  const styles: CSSProperties = {};

  if (isFirstGroupedProject) {
    Object.assign(styles, {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: isNotFullWidth ? 0 : borderRadius,
    });
  }

  if (isLastGroupedProject) {
    Object.assign(styles, {
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: isNotFullWidth ? 0 : borderRadius,
    });
  }

  return styles;
};

const getMyProjectStyles = (
  isMyProject?: boolean,
  isFirstGroupedProject?: boolean,
  isLastGroupedProject?: boolean,
): CSSProperties => {
  const styles = getBorderRadiusStyles(
    isMyProject,
    isFirstGroupedProject,
    isLastGroupedProject,
  );

  const borderWidth = '2px';
  const borderColor = 'black';
  const borderStyle = 'solid';

  if (!isMyProject) {
    return styles;
  }

  Object.assign(styles, {
    borderRightColor: borderColor,
    borderLeftColor: borderColor,
    borderRightStyle: borderStyle,
    borderLeftStyle: borderStyle,
    borderRightWidth: borderWidth,
    borderLeftWidth: borderWidth,
  });

  if (isFirstGroupedProject) {
    Object.assign(styles, {
      borderTopColor: borderColor,
      borderTopStyle: borderStyle,
      borderTopWidth: borderWidth,
    });
  }

  if (isLastGroupedProject) {
    Object.assign(styles, {
      borderBottomColor: borderColor,
      borderBottomStyle: borderStyle,
      borderBottomWidth: borderWidth,
    });

    if (!isFirstGroupedProject) {
      Object.assign(styles, {
        marginTop: 0,
      });
    }
  }

  return styles;
};

const useRowAnimation = (
  showLoserStyles?: boolean,
  isSubsequentGroupedProject?: boolean,
) => {
  const [animation, setAnimation] = useState<AnimationProps['animate']>();

  useEffect(() => {
    const commonStyles: AnimationProps['animate'] = {
      opacity: 1,
      width: PROJECT_WIDTH,
    };

    const marginTop = isSubsequentGroupedProject
      ? -PROJECT_BOTTOM_MARGIN + 2
      : 0;

    if (!showLoserStyles) {
      setAnimation({
        height: PROJECT_HEIGHT,
        marginBottom: PROJECT_BOTTOM_MARGIN,
        marginTop,
        ...commonStyles,
      });

      return;
    }

    setAnimation({
      height: [
        PROJECT_HEIGHT,
        PROJECT_HEIGHT,
        PROJECT_HEIGHT,
        PROJECT_HEIGHT,
        PROJECT_HEIGHT,
        0,
        0,
      ],
      marginBottom: [
        PROJECT_BOTTOM_MARGIN,
        PROJECT_BOTTOM_MARGIN,
        PROJECT_BOTTOM_MARGIN,
        PROJECT_BOTTOM_MARGIN,
        PROJECT_BOTTOM_MARGIN,
        0,
        0,
      ],
      ...commonStyles,
    });
  }, [showLoserStyles, isSubsequentGroupedProject]);

  return animation;
};

const useProjectAnimation = (
  showLoserStyles?: boolean,
  fade?: boolean,
  loserIndex = 0,
) => {
  const [animation, setAnimation] = useState<AnimationProps['animate']>();

  useEffect(() => {
    const commonStyles: AnimationProps['animate'] = {
      opacity: fade ? 0.5 : 1,
    };

    const spacing = 10;
    const defaultTransform = 'translate3d(0px, 0px, 0px)';
    const collapsedTransformX = `-${COLLAPSED_PROJECT_WIDTH + spacing}px`;
    const collapsedTransformY = `${
      loserIndex * COLLAPSED_PROJECT_HEIGHT +
      (loserIndex ? loserIndex * spacing : 0)
    }px`;

    const collapsedTransform1 = `translate3d(${collapsedTransformX}, 0px, 0px)`;
    const collapsedTransform2 = `translate3d(${[
      collapsedTransformX,
      collapsedTransformY,
      '0px',
    ].join(', ')})`;

    if (!showLoserStyles) {
      setAnimation({
        padding: PROJECT_PADDING,
        height: PROJECT_HEIGHT,
        width: PROJECT_WIDTH,
        transform: defaultTransform,
        ...commonStyles,
      });

      return;
    }

    const styles = {
      padding: '.25rem',
      height: [
        PROJECT_HEIGHT,
        PROJECT_HEIGHT,
        COLLAPSED_PROJECT_HEIGHT,
        COLLAPSED_PROJECT_HEIGHT,
        COLLAPSED_PROJECT_HEIGHT,
        COLLAPSED_PROJECT_HEIGHT,
        COLLAPSED_PROJECT_HEIGHT,
      ],
      width: [
        PROJECT_WIDTH,
        PROJECT_WIDTH,
        COLLAPSED_PROJECT_WIDTH,
        COLLAPSED_PROJECT_WIDTH,
        COLLAPSED_PROJECT_WIDTH,
        COLLAPSED_PROJECT_WIDTH,
        COLLAPSED_PROJECT_WIDTH,
      ],
      ...commonStyles,
    };

    if (window.innerWidth >= SHOW_LOSERS_MAX_SCREEN_WIDTH) {
      styles.transform = [
        defaultTransform,
        defaultTransform,
        collapsedTransform1,
        collapsedTransform1,
        collapsedTransform1,
        collapsedTransform2,
        collapsedTransform2,
      ];
    }

    setAnimation(styles);
  }, [showLoserStyles, loserIndex, fade]);

  return animation;
};

export const MarketParticipant: FC<MarketParticipantProps> = ({
  title,
  subtitle,
  projectRoleId,
  projectCost,
  accepted,
  discountOrBonus,
  products,
  isLoser,
  loserIndex,
  className = '',
  isMyProject,
  isFirstGroupedProject,
  isLastGroupedProject,
  isSubsequentGroupedProject,
  showCosts,
  showWinners,
  showSurpluses,
  isMarketSolved,
  totalCost,
  isGroupedProject,
  isDivisible,
}: MarketParticipantProps) => {
  const isBuyer = projectRoleId === 'buyer';

  const showLoserStyles = isLoser && showWinners;
  const isNotAccepted = showWinners && !accepted;
  const showResults = !isDivisible || isLastGroupedProject;
  const shiftResults = isDivisible && !!(isGroupedProject && showResults);

  const rowAnimation = useRowAnimation(
    showLoserStyles,
    isSubsequentGroupedProject,
  );

  const projectAnimation = useProjectAnimation(
    showLoserStyles,
    isNotAccepted,
    loserIndex,
  );

  // Define some colour classes.
  const shadowColor = isBuyer ? 'neo-shadow-brown' : 'neo-shadow-green';
  const backgroundColor = isBuyer ? 'bg-brown' : 'bg-green-light';
  const textColor = isBuyer ? 'text-brown' : 'text-green-light';
  const dividerColor = isBuyer ? 'border-brown' : 'border-green-light';

  // Adjust metrics for projects that were only partially accepted.
  const adjustedCost = getAdjustedCost(projectCost, accepted);

  // The width of the main colour bar for partially accepted projects.
  const backgroundColourWidth =
    typeof accepted === 'number' && showWinners ? `${accepted}%` : '100%';

  return (
    <motion.div
      data-testid={`${isLoser ? 'losing-' : ''}${projectRoleId}-participant`}
      variants={fadeInDown}
      initial="hidden"
      animate={rowAnimation}
      style={{ overflow: 'visible' }}
      className="select-none"
    >
      {/* Add a divider between multiple user projects. */}
      {isSubsequentGroupedProject && (
        <div className="relative">
          <div
            className={classNames(
              'border-l-2 border-r-2 h-[2px] absolute w-full -top-[2px]',
              isMyProject ? 'border-black' : '',
            )}
          >
            <div
              className={classNames(
                'border-t-2 border-dashed w-full absolute',
                dividerColor,
                isNotAccepted ? 'opacity-50' : '',
              )}
            />
          </div>
          {!showWinners && (
            <div
              className={`absolute z-20 top-0 text-white font-bold mx-10 px-1 translate-y-[-50%] -top-[2px] ${backgroundColor}`}
            >
              {isDivisible ? 'mix' : 'or'}
            </div>
          )}
        </div>
      )}

      <div className="relative flex flex-col items-center">
        <motion.div
          animate={projectAnimation}
          style={getMyProjectStyles(
            isMyProject,
            isFirstGroupedProject,
            isLastGroupedProject,
          )}
          className={classNames(
            'absolute flex left-0 top-0 bg-white',
            className,
          )}
        >
          {/* Percentage-based background colour */}
          <div
            className={`absolute h-full ${backgroundColor} top-0 left-0`}
            style={{
              ...getBorderRadiusStyles(
                isGroupedProject,
                isFirstGroupedProject,
                isLastGroupedProject,
                backgroundColourWidth !== '100%',
              ),
              width: backgroundColourWidth,
            }}
          />

          {/* Full-width background colour */}
          <div
            style={getBorderRadiusStyles(
              isGroupedProject,
              isFirstGroupedProject,
              isLastGroupedProject,
            )}
            className={`absolute h-full w-full ${backgroundColor} top-0 left-0 opacity-50`}
          />

          {/* Content */}
          <div
            className={classNames(
              'z-10 items-center flex w-full',
              showLoserStyles ? 'gap-x-2' : 'gap-x-10 justify-between',
            )}
          >
            <MarketParticipantTitle
              title={title}
              subtitle={isDivisible ? 'Divisible' : subtitle}
              isMyProject={isMyProject}
              accepted={accepted}
              showAcceptedCosts={showCosts && showWinners}
              projectCost={projectCost}
              hideMainTitle={isSubsequentGroupedProject}
              showLoserStyles={showLoserStyles}
            />

            {/* Products */}
            <div
              className={classNames(
                'flex',
                showLoserStyles ? 'gap-x-4' : 'gap-x-10 flex-[20%]',
              )}
            >
              <BiodiversityCount
                type={isBuyer ? 'negative' : 'positive'}
                count={products.biodiversity}
                adjustCount={showWinners}
                accepted={accepted}
                shadowColor={shadowColor}
                showLoserStyles={showLoserStyles}
              />
              <NutrientCount
                type={isBuyer ? 'negative' : 'positive'}
                count={products.nutrients}
                adjustCount={showWinners}
                accepted={accepted}
                shadowColor={shadowColor}
                showLoserStyles={showLoserStyles}
              />
            </div>

            {!showLoserStyles && (
              <div className="flex gap-x-10 flex-[50%]">
                {/* Bid/Offer */}
                <MarketParticipantMetric
                  heading={isBuyer ? 'Bid' : 'Offer'}
                  show={!!showCosts}
                  icon={isBuyer ? <HammerIcon /> : <OfferIcon />}
                  shiftOffset={PROJECT_PADDING}
                  testID="bid-or-offer"
                >
                  <p>£{Math.round(adjustedCost).toLocaleString()}</p>
                  {adjustedCost !== projectCost && showWinners && (
                    <p className={`${textColor} opacity-50`}>
                      £{Math.round(projectCost).toLocaleString()}
                    </p>
                  )}
                </MarketParticipantMetric>

                {/* Discount/Bonus */}
                <MarketParticipantMetric
                  heading={isBuyer ? 'Discount' : 'Bonus'}
                  show={!!(showSurpluses && !isNotAccepted && showResults)}
                  icon={isBuyer ? '-' : '+'}
                  shiftResults={shiftResults}
                  shiftOffset={PROJECT_PADDING}
                  testID="discount-or-bonus"
                >
                  <p>£{Math.round(discountOrBonus).toLocaleString()}</p>
                </MarketParticipantMetric>

                {/* Pays/Received */}
                <MarketParticipantMetric
                  heading={isBuyer ? 'Pays' : 'Received'}
                  show={!!(isMarketSolved && !isNotAccepted && showResults)}
                  icon={isBuyer ? <PoundcashTag /> : <CartPlus />}
                  shiftResults={shiftResults}
                  shiftOffset={PROJECT_PADDING}
                  testID="pays-or-received"
                >
                  <p>
                    £
                    {calculatePayment(
                      isGroupedProject ? totalCost : projectCost,
                      discountOrBonus,
                      accepted,
                      projectRoleId,
                      isGroupedProject,
                    ).toLocaleString()}
                  </p>
                </MarketParticipantMetric>
              </div>
            )}
          </div>
          {isMarketSolved && isNotAccepted && !isDivisible && !showLoserStyles && (
            <p
              style={{ top: `${PROJECT_HEIGHT / 2}px` }}
              className="font-bold text-white z-20 whitespace-nowrap right-8 absolute translate-y-[-50%] text-xl"
            >
              Not Accepted
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
