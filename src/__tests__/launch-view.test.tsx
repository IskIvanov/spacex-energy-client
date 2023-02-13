import { render, screen } from '@testing-library/react';
import { LaunchView } from 'src/components/launch-view';
import { Launch } from '../__generated__/graphql';

const mockedLaunch: Launch =
{
	id: '1',
	mission_name: 'Mission 1',
	details: 'Details 1',
	launch_date_local: '2021-01-01',
	rocket: {
		rocket_name: 'Rocket 1',
		rocket: {
			mass: {
				kg: 1000,
			},
			first_stage: {
				fuel_amount_tons: 1000,
			},
			second_stage: {
				fuel_amount_tons: 1000,
			},
			cost_per_launch: 1000,
		},
	},
	links: {
		flickr_images: ['image link'],
		reddit_campaign: 'redit link',
		wikipedia: 'wiki link',
		video_link: 'video link',
	},
}


describe('Launch View', () => {
	it('Should render Launches View component', async () => {
		render(
			<LaunchView launchData={mockedLaunch} handleCheckboxChange={() => { }} selectedLaunches={['1']} />
		);
		screen.debug();
		expect(screen.queryByText('Date Launched:')).toBeTruthy();
		expect(screen.queryByText('01/01/2021')).toBeTruthy();
		expect(screen.queryByText('Cost per launch:')).toBeTruthy();
		expect(screen.queryByText('Mission 1')).toBeTruthy();
		expect(screen.queryByText('Wiki')).toBeTruthy();
	});
});