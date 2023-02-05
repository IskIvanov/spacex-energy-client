// Create functional component
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_SPACEX_LAUNCHES = gql`
  query Query($find: LaunchFind, $limit: Int, $order: String) {
  launches(find: $find, limit: $limit, order: $order) {
    id
    details
    mission_name
    upcoming
    tentative_max_precision
  }
}
`;

export default function EnergyView() {
	const { loading, error, data } = useQuery(GET_SPACEX_LAUNCHES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;
	console.log(data);
	return (
		<div>
			SpaceX Energy Client
			{data.launches.map((launch: any) => {
				return (
					<div key={launch.id} style={{ margin: '1rem' }}>
						{launch.upcoming ? <p>Upcoming Launch</p> : <p>Past Launch</p>}
						{launch.mission_name && <h3>{launch.mission_name}</h3>}
						{launch.details && <p>{launch.details}</p>}
					</div>
				);
			})}
		</div>
	)
}