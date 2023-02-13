import { render, screen } from '@testing-library/react';
import Dashboard from "src/components/dashboard";
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';

describe('Dashboard', () => {
	it('Should show launches static text from Dashboard', () => {
		render(
			<MockedProvider>
				<Dashboard />
			</MockedProvider>
		);
		expect(screen.queryByText('Estimated Total Energy')).toBeInTheDocument();
		expect(screen.queryByText('Select Launches')).toBeInTheDocument();
	});
});