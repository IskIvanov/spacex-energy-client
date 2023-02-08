import { Launch } from '../__generated__/graphql';
import { Card, CardContent, CardMedia, Checkbox, Grid, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import RedditIcon from '@mui/icons-material/Reddit';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import useAuth from 'src/hooks/useAuth';

type LaunchesViewProps = {
	launch: Launch | null;
	handleCheckboxChange: (id: string) => void;
	selectedLaunches: string[];
}

export function LaunchView({ launch, handleCheckboxChange, selectedLaunches }: LaunchesViewProps) {
	const { user } = useAuth();
	const missionImage = launch?.links?.flickr_images

	if (!launch) return null;

	return (
		<Grid item key={launch.id}>
			<SItem >
				{missionImage && missionImage?.length > 0 && <CardMedia component='img' height='194' src={missionImage[1] || ''} alt='Mission Image' />}
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
						<Typography><b>Mission:</b> {launch?.mission_name}</Typography>

						{user?.role === 'admin' && launch.details ? <Typography><b>Details:</b> {launch.details}</Typography> : null}

						<Typography><b>Rocket:</b> {launch?.rocket?.rocket_name}</Typography>
						<Typography><b>Cost per launch:</b> {launch?.rocket?.rocket?.cost_per_launch}</Typography>
						<Typography><b>Date Launched:</b> {new Date(launch.launch_date_local).toLocaleDateString()}</Typography>
						<Stack direction={'row'} spacing={'1rem'} justifyContent={'center'}>
							{launch?.links?.wikipedia && <SLink href={launch?.links?.wikipedia}> Wiki </SLink>}
							{launch?.links?.reddit_campaign && <Link color={'inherit'} href={launch?.links?.reddit_campaign}><RedditIcon fontSize='large' /></Link>}
						</Stack>
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