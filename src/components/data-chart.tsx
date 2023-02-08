import { XYPlot, XAxis, YAxis, VerticalBarSeries } from 'react-vis';
import { Launch } from 'src/__generated__/graphql';
import { useState, useEffect } from 'react';
import { calculateConsumedRocketEnergy } from 'src/utils/utils';
import { QueryQuery } from '../__generated__/graphql';

type DataChartProprs = {
	data: QueryQuery
};

// TODO: Fix TS

export default function DataChart({ data }: DataChartProprs) {
	const [lineData, setLineData] = useState<any>()

	useEffect(() => {
		const processedData = data?.launches?.map((launch, index) => ({
			// x: new Date(launch?.launch_date_local).toLocaleDateString(),
			x: index,
			y: calculateConsumedRocketEnergy(
				// @ts-ignore
				launch?.rocket.rocket?.mass.kg,
				// @ts-ignore
				launch?.rocket.rocket?.first_stage.fuel_amount_tons,
				// @ts-ignore
				launch?.rocket.rocket?.second_stage.fuel_amount_tons,)
		}));

		setLineData(processedData);
	}, [data]);

	console.log(lineData);

	return (
		<XYPlot width={1550} height={1500}>
			{/* <HorizontalGridLines /> */}
			<VerticalBarSeries barWidth={0.2} data={lineData} />
			<YAxis />
			<XAxis />
		</XYPlot>
	);
}