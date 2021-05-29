import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../../Auth/auth';

export default function NotAuthorizedRoute({ component: Component, ...other }) {
	return (
		<Route
			{...other}
			render={(props) => {
				if (!Auth.isAuthenticated()) {
					return <Component {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: '/',
								state: {
									from: props.location
								}
							}}
						/>
					);
				}
			}}
		/>
	);
}
