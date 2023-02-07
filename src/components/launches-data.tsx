// Create functional component
import { useQuery } from "@apollo/client";
import { gql } from 'src/__generated__/gql';
import { Grid, CardContent, Card, Typography, Checkbox, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import ElectricMeterOutlinedIcon from '@mui/icons-material/ElectricMeterOutlined';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { calculateConsumedRocketEnergy } from "src/utils/utils";
import Link from "next/link";
import useEnergyCalculationHook from "src/hooks/useEnergyCalculator";
import useEnergyCalculation from "src/hooks/useEnergyCalculator";
import { Launch } from '../__generated__/graphql';

/**
 * -  Assume you have access to a `user` object at the top level of your application
 *  	(retrieved from the auth system ). 
 * 		Filter out some items from the list based on the user's permissions to view these items.
 * 		 You are free to mock the `user` object and the `permissions` structure however you see fit.
 * 
 * -  Using a data visualization library/framework, compare data from multiple launches in one view.
 * 	  If you're using a UI library, pick one component you believe you will need and customize it,
 * 	   visually or in terms of provided functionality.
 */

const GET_SPACEX_LAUNCHES = gql(/* GraphQL */`
  query Query {
  launches {
    id
	mission_name
    details
	launch_date_utc
    rocket {
	  rocket_name
      rocket {
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

// TODO: Extract logic from component and create custom hook
export default function LaunchesData() {
	const { loading, error, data } = useQuery(GET_SPACEX_LAUNCHES);
	const [launchesData, setLaunchesData] = useState<Launch[] | any>([]);
	const { calculateTotalEnergyUsage, totalEnergyUsage, selectedLaunches, setSelectedLaunches } = useEnergyCalculation();

	useEffect(() => {
		if (data?.launches) {
			setLaunchesData(data.launches);
		}
	}, [data]);

	const handleCheckboxChange = (id: string) => {
		if (selectedLaunches.includes(id)) {
			setSelectedLaunches(selectedLaunches.filter((launchId) => launchId !== id));
		} else {
			setSelectedLaunches([...selectedLaunches, id]);
		}
	};

	const handleEnergyUsage = () => {
		if (data) {
			calculateTotalEnergyUsage(data);
		}
		else {
			console.log('Data is undefined');
		}

	};


	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return (
		<Stack direction={'column'} spacing={'3rem'}  >
			<Stack direction={'row'} spacing={'3rem'} justifyContent={'space-around'} >
				<Sbutton variant="outlined" color="success" size="small" onClick={handleEnergyUsage}>Estimated Total Energy</Sbutton>
				<Typography variant="h4" ><ElectricMeterOutlinedIcon fontSize="large" /> {totalEnergyUsage} Joules/kg </Typography>
			</Stack>
			<SText>Select Rockets</SText>
			<Grid container justifyContent='center' marginTop={'3rem'}>
				{data!.launches?.map((launch) => (
					<Grid item key={launch?.id}>
						<SItem >
							<CardContent>
								<Checkbox
									icon={<RocketLaunchOutlinedIcon fontSize="large" />}
									checkedIcon={<RocketLaunchIcon fontSize="large" />}
									size="medium"
									checked={launch?.id ? selectedLaunches.includes(launch.id) : false}
									onChange={() => {
										if (launch?.id)
											handleCheckboxChange(launch.id);
										else
											console.log('Launch id is undefined');
									}}
								/>
								<Stack direction={'column'} spacing={'1rem'}>
									<Typography><b>Mission Name:</b> {launch?.mission_name}</Typography>
									{launch?.details && <Typography><b>Mission Details:</b> {launch?.details}</Typography>}
									<Typography><b>Rocket Name:</b> {launch?.rocket?.rocket_name}</Typography>
									<Typography><b>Cost per launch:</b> {launch?.rocket?.rocket?.cost_per_launch}</Typography>
									{launch?.rocket?.rocket?.wikipedia && <SLink href={launch?.rocket?.rocket?.wikipedia}> Wiki </SLink>}
								</Stack>
							</CardContent>
						</SItem>
					</Grid>
				))}
			</Grid>
		</Stack>
	)
}

const SText = styled(Typography)(({ theme }) => ({
	...theme.typography.h4,
	color: theme.palette.text.secondary,
	fontWeight: theme.typography.fontWeightBold,
	display: 'flex',
	justifyContent: 'center',
	textDecoration: 'underline',
}));

const SLink = styled(Link)(({ theme }) => ({
	...theme.typography.h5,
	color: theme.palette.text.secondary,
	fontWeight: theme.typography.fontWeightBold
}));

const Sbutton = styled(Button)(({ theme }) => ({
	width: 'fit-content',
	textAlign: 'center',
	padding: theme.spacing(2),
	margin: theme.spacing(1),
}));

const SItem = styled(Card)(({ theme }) => ({
	...theme.typography.body2,
	backgroundColor: theme.palette.background.paper,
	width: '20rem',
	height: 'fit-content',
	padding: theme.spacing(1),
	margin: theme.spacing(1),
	textAlign: 'center',
}));