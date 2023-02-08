// Create functional component
import { useQuery } from "@apollo/client";
import { gql } from 'src/__generated__/gql';
import { Grid, Typography, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Stack } from "@mui/system";
import ElectricMeterOutlinedIcon from '@mui/icons-material/ElectricMeterOutlined';
import useEnergyCalculation from "src/hooks/useEnergyCalculation";
import { LaunchView } from "./launch-view";
import { Launch } from "src/__generated__/graphql";
import useAuth from "src/hooks/useAuth";
import DataChart from "./data-chart";

const GET_SPACEX_LAUNCHES = gql(/* GraphQL */`
  query Query {
  launches {
    id
	mission_name
    details
	launch_date_local
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
      }
    }
	links {
		flickr_images
		reddit_campaign
		wikipedia
		video_link
	}
  }
}`);

// TODO: Extract logic from component and create custom hook
// TODO: Fix TS

export default function Dashboard() {
	const { user } = useAuth();
	const { loading, error, data } = useQuery(GET_SPACEX_LAUNCHES);
	const { calculateTotalEnergyUsage, totalEnergyUsage, selectedLaunches, setSelectedLaunches } = useEnergyCalculation();

	const launches = data?.launches;
	const recentLaunches = launches ? Array.from(launches).reverse() : [];

	// @ts-ignore
	const filteredImageLaunches = recentLaunches.filter((launch: Launch) => launch.links.flickr_images.length > 0);

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
			<SText>Select Launch</SText>
			<div style={{ background: 'white' }}>
				{data && <DataChart data={data} />}
			</div>
			{/* <D3LineChart /> */}
			<Grid container justifyContent='center' marginTop={'3rem'}>
				{loading && <CircularProgress color='error' />}
				{/* If user has an Admin role see all Launches */}
				{user?.role === 'admin' && recentLaunches.map((launch, index) => (
					<LaunchView key={index} launch={launch} handleCheckboxChange={handleCheckboxChange} selectedLaunches={selectedLaunches} />
				))}
				{/* If user is User has a user role see only launches with image */}
				{user?.role === 'user' && filteredImageLaunches.map((launch, index) => (
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