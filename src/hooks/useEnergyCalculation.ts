import { useState } from "react";
import { calculateConsumedRocketEnergy } from "src/utils/utils";
import { Launch, QueryQuery } from '../__generated__/graphql';

/**
 * This hook is responsible for calculating the total energy usage of the selected launches.
 * It also keeps track of the selected launches.
*/

export default function useEnergyCalculation() {
	const [totalEnergyUsage, setTotalEnergyUsage] = useState<number>(0);
	const [selectedLaunches, setSelectedLaunches] = useState<string[]>([]);
	
	const calculateTotalEnergyUsage = (data: QueryQuery): number => {
		let totalEnergyUsage = 0;
		const spaceXLaunches = data.launches as Launch[];

		spaceXLaunches.forEach((launch: Launch) => {
			const launchId = launch.id;
			const rocketMass = launch.rocket?.rocket?.mass?.kg;
			const rocketFirstStageFuelAmount = launch?.rocket?.rocket?.first_stage?.fuel_amount_tons;
			const rocketSecondStageFuelAmount = launch?.rocket?.rocket?.second_stage?.fuel_amount_tons;

			if (launchId && selectedLaunches.includes(launchId)) {
				if (rocketMass && rocketFirstStageFuelAmount && rocketSecondStageFuelAmount) {
					totalEnergyUsage += calculateConsumedRocketEnergy(
						rocketMass,
						rocketFirstStageFuelAmount,
						rocketSecondStageFuelAmount,
					);
				}
			}
		});
		setTotalEnergyUsage(totalEnergyUsage);
		return totalEnergyUsage;
	};

	return { calculateTotalEnergyUsage, totalEnergyUsage, selectedLaunches, setSelectedLaunches }
}
