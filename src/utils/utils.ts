// Calculate cosumed rocket energy

export const calculateConsumedRocketEnergy = (
	rocketMass: number ,
	fuelAmountTonsFirstStage: number,
	fuelAmountTonsSecondStage: number
  ): number => {
	const kgPerTon = 1000;
	const totalFuelMass =
	  (fuelAmountTonsFirstStage + fuelAmountTonsSecondStage) * kgPerTon;
	const totalMass = rocketMass + totalFuelMass;
	const energeticValuePerKg = 1.35 * 10 ** 7;
	return totalMass * energeticValuePerKg;
  };