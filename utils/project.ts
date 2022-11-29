export const getAdjustedCost = (cost: number, accepted: boolean | number) =>
  typeof accepted === 'number' ? (accepted / 100) * cost : cost;
