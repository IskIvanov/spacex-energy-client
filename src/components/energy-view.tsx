// Create functional component
import { useQuery } from "@apollo/client";
import { gql } from 'src/__generated__/gql';
import { calculateConsumedRocketEnergy } from "../utils/utils";
import { Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';


// TODO: Add visual componets to display SpaceX launches data
// TODO: Pick material-ui components for displaying data

const GET_SPACEX_LAUNCHES = gql(/* GraphQL */`
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
}`);


export default function EnergyView() {
	const { loading, error, data } = useQuery(GET_SPACEX_LAUNCHES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;
	console.log(data);
	return (
		<Grid container>
			{data!.launches?.map((launch) => {
				const rocketMass = launch!.rocket?.rocket?.mass?.kg;
				const fuelAmountTonsFirstStage = launch!.rocket?.rocket?.first_stage?.fuel_amount_tons;
				const fuelAmountTonsSecondStage = launch!.rocket?.rocket?.second_stage?.fuel_amount_tons;
				let consumedEnergy
				if (rocketMass && fuelAmountTonsFirstStage && fuelAmountTonsSecondStage) {
					consumedEnergy = calculateConsumedRocketEnergy(
						rocketMass,
						fuelAmountTonsFirstStage,
						fuelAmountTonsSecondStage
					);
				}

				return (
					<SGrid item key={launch?.id} justifyContent={'center'} alignItems={'center'}>
						<SItem>
							<p>{launch?.details}</p>
							<p>Rocket Name: {launch?.rocket?.rocket?.name}</p>
							<p>Rocket Mass: {launch?.rocket?.rocket?.mass?.kg} kg</p>
							<p>Total fuel consumed: {launch!.rocket?.rocket?.first_stage?.fuel_amount_tons + launch?.rocket?.rocket?.second_stage?.fuel_amount_tons} kg</p>
							<p>Cost per launch: {launch?.rocket?.rocket.cost_per_launch} dollars</p>
							<p>Cosumed rocket energy: {consumedEnergy} Joules </p>
						</SItem>
					</SGrid>
				);
			})}
		</Grid>
	)
}

const SGrid = styled(Grid)(({ }) => ({
	margin: '1rem auto 1rem auto',
}));

const SItem = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	backgroundColor: theme.palette.background.paper,
	width: '25rem',
	height: '25rem',
	padding: theme.spacing(1),
	textAlign: 'center',
}));