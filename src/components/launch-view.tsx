import { Launch } from '../__generated__/graphql';
import { Card, CardContent, Checkbox, Grid, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

type LaunchesViewProps = {
	launch: Launch | null;
	handleCheckboxChange: (id: string) => void;
	selectedLaunches: string[];
}

export function LaunchView({ launch, handleCheckboxChange, selectedLaunches }: LaunchesViewProps) {

	if (!launch) return null;

	return (
		<Grid item key={launch.id}>
			<SItem >
				<CardContent>
					<Checkbox
						icon={<RocketLaunchOutlinedIcon fontSize="large" />}
						checkedIcon={<RocketLaunchIcon fontSize="large" />}
						size="medium"
						checked={launch.id ? selectedLaunches.includes(launch.id) : false}
						onChange={() => {
							if (launch.id)
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
	)
}

const SItem = styled(Card)(({ theme }) => ({
	...theme.typography.body2,
	backgroundColor: theme.palette.background.paper,
	width: '20rem',
	height: 'fit-content',
	padding: theme.spacing(1),
	margin: theme.spacing(1),
	textAlign: 'center',
}));

const SLink = styled(Link)(({ theme }) => ({
	...theme.typography.h5,
	color: theme.palette.text.secondary,
	fontWeight: theme.typography.fontWeightBold
}));