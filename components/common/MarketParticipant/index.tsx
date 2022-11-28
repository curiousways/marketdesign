import { AnimationProps, motion } from 'framer-motion';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { classNames } from '@/utils/index';
import { fadeInDown } from '@/utils/animations';
import { RoleId } from '@/types/roles';
import HammerIcon from '../../walkthroughs/icons/HammerIcon';
import PoundcashTag from '../../walkthroughs/icons/PoundcashTag';
import CartPlus from '../../walkthroughs/icons/CartPlus';
import OfferIcon from '../../walkthroughs/icons/OfferIcon';
import { MarketParticipantTitle } from '../MarketParticipantTitle';
import { Products } from '../../../types/products';
import { BiodiversityCount } from '../BiodiversityCount';
import { NutrientCount } from '../NutrientCount';

const PROJECT_HEIGHT = 120;
const PROJECT_WIDTH = 800;
const PROJECT_BOTTOM_MARGIN = 15;
const COLLAPSED_PROJECT_HEIGHT = 60;
const COLLAPSED_PROJECT_WIDTH = 210;
const SHOW_LOSERS_MAX_SCREEN_WIDTH = 1700;

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
  isMyFirstProject?: boolean;
  isMyLastProject?: boolean;
  isMySubsequentProject?: boolean;
  showCosts?: boolean;
  showWinners?: boolean;
  showSurpluses?: boolean;
  isMarketSolved?: boolean;
};

const getAdjustedCost = (cost: number, accepted: boolean | number) =>
  typeof accepted === 'number' ? (accepted / 100) * cost : cost;

const calculatePayment = (
  cost: number,
  discountOrBonus: number,
  accepted: boolean | number,
  projectRoleId: RoleId,
) => {
  const adjustedCost = getAdjustedCost(cost, accepted);

  if (projectRoleId === 'buyer') {
    return adjustedCost - discountOrBonus;
  }

  return adjustedCost + discountOrBonus;
};

const getMyProjectStyles = (
  isMyProject?: boolean,
  isMyFirstProject?: boolean,
  isMyLastProject?: boolean,
): CSSProperties => {
  const borderRadius = '0.5rem';
  const borderWidth = '2px';
  const borderColor = 'black';
  const borderStyle = 'solid';

  if (!isMyProject) {
    return { borderRadius };
  }

  const myProjectStyles: CSSProperties = {
    borderRightColor: borderColor,
    borderLeftColor: borderColor,
    borderRightStyle: borderStyle,
    borderLeftStyle: borderStyle,
    borderRightWidth: borderWidth,
    borderLeftWidth: borderWidth,
  };

  if (isMyFirstProject) {
    Object.assign(myProjectStyles, {
      borderTopColor: borderColor,
      borderTopStyle: borderStyle,
      borderTopWidth: borderWidth,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    });
  }

  if (isMyLastProject) {
    Object.assign(myProjectStyles, {
      borderBottomColor: borderColor,
      borderBottomStyle: borderStyle,
      borderBottomWidth: borderWidth,
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    });

    if (!isMyFirstProject) {
      Object.assign(myProjectStyles, {
        marginTop: 0,
      });
    }
  }

  return myProjectStyles;
};

const useRowAnimation = (
  showLoserStyles?: boolean,
  isMySubsequentProject?: boolean,
) => {
  const [animation, setAnimation] = useState<AnimationProps['animate']>();

  useEffect(() => {
    const commonStyles: AnimationProps['animate'] = {
      opacity: 1,
      width: PROJECT_WIDTH,
    };

    const marginTop = isMySubsequentProject ? -PROJECT_BOTTOM_MARGIN : 0;

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
  }, [showLoserStyles, isMySubsequentProject]);

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
        padding: '1.25rem',
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
  isMyFirstProject,
  isMyLastProject,
  isMySubsequentProject,
  showCosts,
  showWinners,
  showSurpluses,
  isMarketSolved,
}: MarketParticipantProps) => {
  const isBuyer = projectRoleId === 'buyer';

  const showLoserStyles = isLoser && showWinners;
  const isNotAccepted = showWinners && !accepted;

  const rowAnimation = useRowAnimation(showLoserStyles, isMySubsequentProject);

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

  return (
    <motion.div
      data-testid={`${isLoser ? 'losing-' : ''}${projectRoleId}-participant`}
      variants={fadeInDown}
      initial="hidden"
      animate={rowAnimation}
      style={{ overflow: 'visible' }}
      className="overflow-hidden bg-white select-none"
    >
      {/* Add a divider between multiple user projects. */}
      {isMySubsequentProject && (
        <div className="border-black border-l-2 border-r-2 relative h-[2px] z-10 bg-white">
          <div
            className={`border-t-2 border-dashed ${dividerColor} w-full absolute`}
          />
        </div>
      )}

      <div className="relative flex flex-col items-center">
        <motion.div
          animate={projectAnimation}
          style={getMyProjectStyles(
            isMyProject,
            isMyFirstProject,
            isMyLastProject,
          )}
          className={classNames(
            'absolute flex overflow-hidden left-0 top-0',
            className,
          )}
        >
          {/* Percentage-based background colour */}
          <div
            className={`absolute h-full ${backgroundColor} top-0 left-0`}
            style={{
              width:
                typeof accepted === 'number' && showWinners
                  ? `${accepted}%`
                  : '100%',
            }}
          />

          {/* Full-width background colour */}
          <div
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
              subtitle={subtitle}
              isMyProject={isMyProject}
              accepted={accepted}
              showAcceptedCosts={showCosts && showWinners}
              projectCost={projectCost}
              hideMainTitle={isMySubsequentProject}
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
                count={products.biodiversity}
                adjustCount={showWinners}
                accepted={accepted}
                shadowColor={shadowColor}
                showLoserStyles={showLoserStyles}
              />
              <NutrientCount
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
                <motion.div
                  variants={fadeInDown}
                  initial="hidden"
                  animate={showCosts ? 'visible' : ''}
                  className="bg-white rounded-lg border border-black px-1 w-[95px]"
                  data-testid="bid-or-offer"
                >
                  <div className="w-[29px] h-[29px] mx-auto relative bottom-3 flex justify-center items-center rounded-full bg-white border border-black">
                    {isBuyer ? <HammerIcon /> : <OfferIcon />}
                  </div>
                  <div className="text-center text-sm relative -mt-2">
                    <p className="text-light-grey">
                      {isBuyer ? 'Bid' : 'Offer'}
                    </p>
                    <p>£{adjustedCost.toLocaleString()}</p>
                    {adjustedCost !== projectCost && showWinners && (
                      <p className={`${textColor} opacity-50`}>
                        £{projectCost.toLocaleString()}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Discount/Bonus */}
                <motion.div
                  variants={fadeInDown}
                  initial="hidden"
                  animate={showSurpluses ? 'visible' : ''}
                  className="bg-white rounded-lg border border-black px-1 w-[95px]"
                  data-testid="discount-or-bonus"
                >
                  <div className="w-[29px] h-[29px] mx-auto relative bottom-3 flex justify-center items-center rounded-full bg-white border border-black">
                    <p className="text-black">{isBuyer ? '-' : '+'}</p>
                  </div>
                  <div className="text-center text-sm relative -mt-2">
                    <p className="text-light-grey">
                      {isBuyer ? 'Discount' : 'Bonus'}
                    </p>
                    <p>£{discountOrBonus.toLocaleString()}</p>
                  </div>
                </motion.div>

                {/* Pays/Received */}
                <motion.div
                  variants={fadeInDown}
                  initial="hidden"
                  animate={isMarketSolved && !isNotAccepted ? 'visible' : ''}
                  className="bg-white rounded-lg border border-black px-1 w-[95px]"
                  data-testid="pays-or-received"
                >
                  <div className="w-[29px] h-[29px] mx-auto relative bottom-3 flex justify-center items-center rounded-full bg-white border border-black">
                    {isBuyer ? <PoundcashTag /> : <CartPlus />}
                  </div>
                  <div className="text-center text-sm relative -mt-2">
                    <p className="text-light-grey">
                      {isBuyer ? 'Pays' : 'Received'}
                    </p>
                    <p>
                      £
                      {calculatePayment(
                        projectCost,
                        discountOrBonus,
                        accepted,
                        projectRoleId,
                      ).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
