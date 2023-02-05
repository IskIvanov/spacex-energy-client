// Create functional component
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { calculateConsumedRocketEnergy } from "../utils/utils";

// TODO: Add visual componets to display spacex launche data
// TODO: Pick material-ui components for displaying data

const GET_SPACEX_LAUNCHES = gql`
  query Query {
  launches {
    id
    details
    rocket {
      rocket {
        name
        mass {
          kg
        }
        first_stage {
          fuel_amount_tons
        }
        second_stage {
          fuel_amount_tons
        }
        cost_per_launch
        wikipedia
      }
    }
  }
}
`;

export default function EnergyView() {
	const { loading, error, data } = useQuery(GET_SPACEX_LAUNCHES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;
	console.log(data);
	return (
		<div>
			SpaceX Energy Client
			{data.launches.map((launch: any) => {
				const rocketMass = launch.rocket.rocket.mass.kg;
				const fuelAmountTonsFirstStage = launch.rocket.rocket.first_stage.fuel_amount_tons;
				const fuelAmountTonsSecondStage = launch.rocket.rocket.second_stage.fuel_amount_tons;
				const consumedEnergy = calculateConsumedRocketEnergy(
					rocketMass,
					fuelAmountTonsFirstStage,
					fuelAmountTonsSecondStage
				);
				return (
					<div key={launch.id} style={{ margin: '1rem', }}>
						{launch.upcoming ? <p>Upcoming Launch</p> : <p>Past Launch</p>}
						{launch.mission_name && <h3>{launch.mission_name}</h3>}
						{launch.details && <p>{launch.details}</p>}
						<p>Rocket Name: {launch.rocket.rocket.name}</p>
						<p>Rocket Mass: {launch.rocket.rocket.mass.kg} kg</p>
						<p>Total fuel consumed: {launch.rocket.rocket.first_stage.fuel_amount_tons + launch.rocket.rocket.second_stage.fuel_amount_tons} kg</p>
						<p>Cost per launch: {launch.rocket.rocket.cost_per_launch} dollars</p>
						<p>Cosumed rocket energy: {consumedEnergy} Joules </p>
					</div>
				);
			})}
		</div>
	)
}