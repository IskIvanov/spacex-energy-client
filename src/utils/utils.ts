/*
 * This function calculates the consumed rocket energy
 * @param rocketMass - rocket mass in kg
 * @param fuelAmountTonsFirstStage - fuel amount in tons for first stage
 * @param fuelAmountTonsSecondStage - fuel amount in tons for second stage
 * @returns consumed rocket energy in joules
 * 
*/
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