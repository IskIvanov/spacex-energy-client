// Create functional component
import { useQuery } from "@apollo/client";
import { gql } from 'src/__generated__/gql';
import { Grid, CardContent, Card, Typography, Checkbox, CardActions, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { Stack } from "@mui/system";

// Done: Query SpaceX Api for launches. You decide which launches to display and whether or not to include filters.
// Done: Display launch information
// Done: Allow the user to select multiple launches

// Allow the user to request the estimated total energy usage for the selected launches
// Display the estimated energy consumption for the selected launches.

// TODO: Add visual componets to display SpaceX launches data
// TODO: Pick material-ui components for displaying data
// TODO: Integrate Material-ui Table Component and display data
// TODO: Build two dialogs for displaying energy usage data

// Column fields should match the fields in the GraphQL query

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

// TODO: Extract logic from component and create custom hook
export default function LaunchesData() {
	const { loading, error, data } = useQuery(GET_SPACEX_LAUNCHES);
	const [selectedLaunches, setSelectedLaunches] = useState<string[]>([]);

	const handleCheckboxChange = (id: string) => {
		if (selectedLaunches.includes(id)) {
			setSelectedLaunches(selectedLaunches.filter(l => l !== id));
		} else {
			setSelectedLaunches([...selectedLaunches, id]);
		}
	};

	useEffect(() => {
		console.log('selectedLaunches', selectedLaunches);
	}, [selectedLaunches]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return (
		<Stack direction={'column'} spacing={'3rem'}  >
			<Sbutton variant="outlined" color="success" size="small">Estimated Total Energy</Sbutton>
			<Grid container justifyContent='center' marginTop={'3rem'}>
				{data!.launches?.map((launch) => (
					<Grid item key={launch?.id}>
						<SItem >
							<CardContent>
								<Checkbox
									checked={launch?.id ? selectedLaunches.includes(launch.id) : false}
									onChange={() => {
										if (launch?.id)
											handleCheckboxChange(launch.id);
										else
											console.log('Launch id is undefined');
									}}
								/>
								<Typography>{launch?.rocket?.rocket?.name}</Typography>
								<Typography>{launch?.details}</Typography>
							</CardContent>
							<CardActions>
								<Button variant="outlined" color="success" size="small">Rocket Energy Usage</Button>
							</CardActions>
						</SItem>

					</Grid>
				))}
			</Grid>
		</Stack>
	)
}

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