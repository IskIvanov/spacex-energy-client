import { Launch } from '../__generated__/graphql';
import { Card, CardContent, CardMedia, Checkbox, Grid, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import RedditIcon from '@mui/icons-material/Reddit';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import useAuth from 'src/hooks/useAuth';

type LaunchesViewProps = {
	launchData: Launch | null;
	handleCheckboxChange: (id: string) => void;
	selectedLaunches: string[];
}

// This is the component that shows the spaceX launch information
export function LaunchView({ launchData, handleCheckboxChange, selectedLaunches }: LaunchesViewProps) {
	const { user } = useAuth();

	const missionImage = launchData?.links?.flickr_images;
	const rocket = launchData?.rocket?.rocket_name;
	const costPerLaunch = launchData?.rocket?.rocket?.cost_per_launch;
	const launchDate = new Date(launchData?.launch_date_local).toLocaleDateString();
	const wikiPediaLink = launchData?.links?.wikipedia;
	const redditCompaignLink = launchData?.links?.reddit_campaign;
	const missionName = launchData?.mission_name;
	const launchDetails = user?.role === 'admin' && launchData?.details;

	if (!launchData) return null;

	return (
		<Grid item key={launchData.id}>
			<SItem >
				{missionImage && missionImage?.length > 0 && <CardMedia component='img' height='194' src={missionImage[1] || ''} alt='Mission Image' />}
				<CardContent>
					<Checkbox
						icon={<RocketLaunchOutlinedIcon fontSize="large" />}
						checkedIcon={<RocketLaunchIcon fontSize="large" />}
						size="medium"
						checked={launchData.id ? selectedLaunches.includes(launchData.id) : false}
						onChange={() => {
							if (launchData.id)
								handleCheckboxChange(launchData.id);
							else
								console.log('Launch id is undefined');
						}}
					/>
					<Stack direction={'column'} spacing={'1rem'}>
						<Typography><b>Mission:</b> {missionName}</Typography>

						{launchDetails ? <Typography><b>Details:</b> {launchData.details}</Typography> : null}

						<Typography><b>Rocket:</b> {rocket}</Typography>
						<Typography><b>Cost per launch:</b> {costPerLaunch}</Typography>
						<Typography><b>Date Launched:</b> {launchDate}</Typography>
						<Stack direction={'row'} spacing={'1rem'} justifyContent={'center'}>
							{wikiPediaLink && <SLink href={wikiPediaLink}> Wiki </SLink>}
							{redditCompaignLink && <Link color={'inherit'} href={redditCompaignLink}><RedditIcon fontSize='large' /></Link>}
						</Stack>
					</Stack>
				</CardContent>
			</SItem>
		</Grid>
	)
}

const SItem = styled(Card)(({ theme }) => ({
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