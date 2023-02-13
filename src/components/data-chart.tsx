import { XYPlot, XAxis, YAxis, LineSeries, AreaSeries } from 'react-vis';
import { useState, useEffect } from 'react';
import { calculateConsumedRocketEnergy } from 'src/utils/utils';
import { QueryQuery } from '../__generated__/graphql';
import { Box, styled, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { green, grey } from '@mui/material/colors';
import useEnergyCalculation from 'src/hooks/useEnergyCalculation';

type DataChartProprs = {
	data: QueryQuery
};


export default function DataChart({ data }: DataChartProprs) {
	const [lineData, setLineData] = useState<any>()

	useEffect(() => {
		const processedData = data?.launches?.map((launch) => {
			// Launches without a rocket are not included in the chart
			if (launch?.rocket) {
				const rocketMass = launch.rocket.rocket?.mass?.kg || 0;
				const fuelFirstStage = launch.rocket.rocket?.first_stage?.fuel_amount_tons || 0;
				const fuelSecondStage = launch.rocket.rocket?.second_stage?.fuel_amount_tons || 0;
				return {
					x: new Date(launch?.launch_date_local).getTime(),
					y: calculateConsumedRocketEnergy(
						rocketMass,
						fuelFirstStage,
						fuelSecondStage,
					)
				}
			} else {
				return null;
			}

		});
		setLineData(processedData);
	}, [data]);

	return (
		<>
			<Stack flexDirection={'row'} justifyContent={'center'}>
				<SBox>
					<Typography variant='body2' margin={'0.3rem 1rem 0 1rem'}>Estimated energy consumed by Space X</Typography>
					<XYPlot width={800} height={300}
						margin={{
							left: 35,
							bottom: 80
						}}>
						<XAxis
							title='Date'
							attr="x"
							attrAxis="y"
							orientation="bottom"
							tickLabelAngle={-46}
							tickFormat={function tickFormat(d) { return new Date(d).toLocaleDateString() }}
						/>
						<YAxis
							title='(TJ)'
							attr="y"
							attrAxis="x"
							orientation="left"
						/>
						<LineSeries curve="curveBasis" color={green[600]} data={lineData} />
						<AreaSeries curve="curveBasis" color={green[400]} opacity={0.1} data={lineData} />
					</XYPlot>
				</SBox>
			</Stack>
		</>
	);
}

const SBox = styled(Box)(() => ({
	width: 'fit-content',
	height: 'fit-content',
	backgroundColor: grey[900],
}));