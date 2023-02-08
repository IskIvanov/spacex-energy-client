// Create functional component
import { useQuery } from "@apollo/client";
import { gql } from 'src/__generated__/gql';
import { Grid, Typography, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Stack } from "@mui/system";
import ElectricMeterOutlinedIcon from '@mui/icons-material/ElectricMeterOutlined';
import useEnergyCalculation from "src/hooks/useEnergyCalculator";
import { LaunchView } from "./launch-view";

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
export default function Dashboard() {
	const { loading, error, data } = useQuery(GET_SPACEX_LAUNCHES);
	const { calculateTotalEnergyUsage, totalEnergyUsage, selectedLaunches, setSelectedLaunches } = useEnergyCalculation();

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

	if (error) return <p>Error : {error.message}</p>;

	return (
		<Stack direction={'column'} spacing={'3rem'}  >
			<Stack direction={'row'} spacing={'3rem'} justifyContent={'space-around'} >
				<Sbutton variant="outlined" color="success" size="small" onClick={handleEnergyUsage}>Estimated Total Energy</Sbutton>
				<Typography variant="h4" ><ElectricMeterOutlinedIcon fontSize="large" /> {totalEnergyUsage} Joules/kg </Typography>
			</Stack>
			<SText>Select Rockets</SText>
			<Grid container justifyContent='center' marginTop={'3rem'}>
				{loading && <CircularProgress color='error' />}
				{data && data.launches?.map((launch, index) => (
					<LaunchView key={index} launch={launch} handleCheckboxChange={handleCheckboxChange} selectedLaunches={selectedLaunches} />
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

const Sbutton = styled(Button)(({ theme }) => ({
	width: 'fit-content',
	textAlign: 'center',
	padding: theme.spacing(2),
	margin: theme.spacing(1),
}));